all: dependencies templates icons

clean:
	rm -rf build

structure: clean
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
	docker run --rm -it -v ${shell pwd}/build/icons:/icons timiter/imagemagick sh -c 'convert /icons/timiter.svg -alpha set -channel RGBA -fuzz 40% -fill none -floodfill +0+0 white -shave 1x1 -trim +repage -resize 32x32 /icons/timiter-32.png'
	docker run --rm -it -v ${shell pwd}/build/icons:/icons timiter/imagemagick sh -c 'convert /icons/timiter-32.png -channel RGB -negate /icons/timiter-32-light.png'
