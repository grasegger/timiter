function saveOptions(e) {
    e.preventDefault();

    let instance =  document.querySelector("#mite-instance").value;
    const httpRegex = /https?:\/\//gi;
    const miteRegex = /\.mite.yo.lk.*$/gi;

    instance = instance.replace(httpRegex, '');
    instance = instance.replace(miteRegex, '');

    browser.storage.sync.set({
        miteInstance: instance,
        miteApiKey: document.querySelector("#mite-api-key").value
    });

    setApiKeyURL();
}

function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector("#mite-instance").value = result.miteInstance || "";
        document.querySelector("#mite-api-key").value = result.miteApiKey || "";
        setApiKeyURL();
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let getting = browser.storage.sync.get();
    getting.then(setCurrentChoice, onError);
}

function setApiKeyURL () {
    let instance =  document.querySelector("#mite-instance").value;
    const httpRegex = /https?:\/\//gi;
    const miteRegex = /\.mite.yo.lk.*$/gi;
    instance = instance.replace(httpRegex, '');
    instance = instance.replace(miteRegex, '');

    if (instance.length > 0 ) {

        let url = `https://${instance}.mite.yo.lk/myself`;

        document.querySelector("#yourself-url").innerHTML = `<a href=${url}>your mite settings page</a>`;
    } else {
        document.querySelector("#yourself-url").innerHTML = `your mite settings page`;
    }
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("#mite-instance").addEventListener("keyup", setApiKeyURL);

