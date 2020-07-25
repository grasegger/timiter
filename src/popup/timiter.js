function showError (error) {
    document.querySelector('#body-wrapper').innerHTML = `Error:<br>${error}`;
}

function showTimer(tracker) {

    showEntryData = (timeEntry) => {
        time = luxon.DateTime.fromFormat(timeEntry.tracking.since.replace('T', ''), "yyyy-MM-ddHH:mm:ssZZ").toRelative();
        document.querySelector('#body-wrapper').innerHTML = `
<ul>
    <li>Customer: ${timeEntry.customer_name}</li>
    <li>Project: ${timeEntry.project_name}</li>
    <li>Service: ${timeEntry.service_name}</li>
    <li>Started: ${time}</li>
</ul>
`;
    };

    if (! tracker.hasOwnProperty('tracking_time_entry')) {
        document.querySelector('#body-wrapper').innerHTML = "<p>No timer running. Visit a github page to start one.</p>";
    } else {
        window.mite.TimeEntry.find(
            tracker.tracking_time_entry.id,
            (data) => {
                showEntryData(data.time_entry);
            });

        setTimeout(updateTracker, 5000);
    }

}

function updateTracker() {
    console.log("update");
    window.mite.Tracker.find((data) => {
        showTimer(data.tracker);
    });
}

function prepareApi() {
    function setOptions(result) {
        window.mite = new Mite({
            account: result.miteInstance,
            api_key: result.miteApiKey,
        });
        updateTracker();
    }

    function onError(error) {
        console.log(`Error: ${error}`);
        showError(error);
    }

    let getting = browser.storage.sync.get();
    getting.then(setOptions, onError);
}

function SetupStaticInfo() {
    function setOptions(result) {
        document.querySelector('#instance-link').href = `https://${result.miteInstance}.mite.yo.lk`;
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let getting = browser.storage.sync.get();
    getting.then(setOptions, onError);
}
document.addEventListener("DOMContentLoaded", prepareApi);
document.addEventListener("DOMContentLoaded", SetupStaticInfo);
