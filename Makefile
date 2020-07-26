MAKEFLAGS += --jobs=8
all: dependencies templates icons version

bumpversion:
	sh .semver.sh -p ${shell cat .version}

version: structure bumpversion
	sed -i '' "s|SEMVER_VERSION_HERE|${shell cat .version}|g" build/manifest.json

clean:
	rm -rf build

npmdeps: clean
	docker run --rm -it -v ${shell pwd}/src:/src node:alpine sh -c 'cd /src && npm install'

structure: npmdeps
	mkdir -p build
	rsync -ra src/ build/

dockerfiles: structure
	docker build -t timiter/imagemagick Dockerfiles/imagemagick
	docker build -t timiter/pug Dockerfiles/pug

dependencies: structure
	git clone https://github.com/yolk/mite.js build/mite
	curl https://moment.github.io/luxon/global/luxon.min.js > build/luxon.js

templates: dockerfiles
	docker run --rm -it -v ${shell pwd}/build/:/templates timiter/pug sh -c 'pug /templates'

icons: dockerfiles
	docker run --rm -it -v ${shell pwd}/build/icons:/icons timiter/imagemagick sh -c 'convert /icons/timiter.svg -alpha set -channel RGBA -fuzz 40% -fill none -floodfill +0+0 white -shave 1x1 -trim +repage -resize 48x48 /icons/timiter-48.png'
	docker run --rm -it -v ${shell pwd}/build/icons:/icons timiter/imagemagick sh -c 'convert /icons/timiter.svg -alpha set -channel RGBA -fuzz 40% -fill none -floodfill +0+0 white -shave 1x1 -trim +repage -resize 96x96 /icons/timiter-96.png'
	docker run --rm -it -v ${shell pwd}/build/icons:/icons timiter/imagemagick sh -c 'convert /icons/timiter.svg -alpha set -channel RGBA -fuzz 40% -fill none -floodfill +0+0 white -shave 1x1 -trim +repage -resize 32x32 /icons/timiter-32.png'
	docker run --rm -it -v ${shell pwd}/build/icons:/icons timiter/imagemagick sh -c 'convert /icons/timiter-32.png -channel RGB -negate /icons/timiter-32-light.png'

safari: all
	yes | xcrun safari-web-extension-converter build --project-location ./safari-build --app-name Timiter --bundle-identifier de.gebruederheitz.timiter --copy-resources --force --no-open --objc
	cd safari-build/Timiter && xcodebuild build
