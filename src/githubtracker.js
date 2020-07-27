let mite = {};

let settings = {};

let cache = {
    tracker: false,
    clientsLoaded: false,
    projectsLoaded: false,
    servicesLoaded: false,
    sidebarPlaced: false,
    miteLoaded: false,
    miteRunning: false,
    miteNote: "",
    buttonClick: 0,
    miteRefresh: 0
};

function removeElement(selector) {
    let oldWrapper = document.querySelector(selector);

    if (oldWrapper !== null) {
        oldWrapper.remove();
    }
}

function runAsync(callback, timeout = 0) {
    window.setTimeout(() => {
        try {
            callback();
        } catch(error) {
            console.log(error);
        }
    }, timeout);
}

function clearSelect(selector) {
    document.querySelectorAll(`${selector} option`).forEach(option => option.remove());
}

function enable(selector) {
    document.querySelector(selector).disabled = false;
}

function disable(selector) {
    document.querySelector(selector).disabled = true;
}

function appendToSelect(selector, optionValue, optionName) {
    let option = document.createElement('option');
    option.setAttribute('value', optionValue);
    option.innerHTML = optionName;

    document.querySelector(selector).appendChild(option);
}

function xhrError(_, msg) {
    console.log(msg);
}

function elementPresent(selector) {
    let elem = document.querySelector(selector);
    return ! elem !== null;
}

function addTimiterToIssueSidebar () {
    removeElement('#timiter-wrapper');

    let githubSidebar = document.querySelector('#partial-discussion-sidebar');
    githubSidebar.prepend(getTimiterSidebarContent());

    cache.sidebarPlaced = true;
    document.querySelector('#timiter-clients').addEventListener('change', populateProjectList);
    document.querySelector('#timiter-tracking-button').addEventListener('click', timerButtonPressed);
}

function initTimiter() {
    browser.storage.sync.get().then((result) => {
        settings = result;
        mite = new Mite({
            account: settings.miteInstance,
            api_key: settings.miteApiKey
        });
        cache.miteLoaded = true;
    });
}

function getTimiterSidebarContent () {
    let content = document.createElement('div');
    content.id = "timiter-wrapper";
    content.className = 'discussion-sidebar-item';

    content.appendChild(getTimiterSidebarTitle());
    content.appendChild(getTimiterClientSelect());
    content.appendChild(getTimiterProjectSelect());
    content.appendChild(getTimiterServiceSelect());
    content.appendChild(getTimiterButton());
    content.appendChild(getCurrentTimerParagraph());
    content.appendChild(getMiteLink());
    return content;
}

function getMiteLink() {
    let link = document.createElement('a');
    link.id = "timiter-mite-link";
    link.href = '#';

    return link;
}

function getCurrentTimerParagraph() {
    let para = document.createElement('p');
    para.id = "timiter-current-timer";
    para.innerHTML = "Loading content ...";

    return para;
}

function getTimiterSidebarTitle () {
    let titleLink = document.createElement('a');
    titleLink.href = 'https://gebruederheitz.de';
    titleLink.innerHTML = '/gebrüderheitz';

    let title = document.createElement('summary');
    title.classList.add('text-bold');
    title.classList.add('discussion-sidebar-heading');
    title.classList.add('discussion-sidebar-toggle');
    title.classList.add('timiter-heading');

    title.innerHTML = `Timiter Tracking by ${titleLink.outerHTML}`;

    return title;
}

function getTimiterClientSelect () {
    const icon = '<svg class="octicon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.5 14.25c0 .138.112.25.25.25H4v-1.25a.75.75 0 01.75-.75h2.5a.75.75 0 01.75.75v1.25h2.25a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25v12.5zM1.75 16A1.75 1.75 0 010 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 00.25-.25V8.285a.25.25 0 00-.111-.208l-1.055-.703a.75.75 0 11.832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0114.25 16h-3.5a.75.75 0 01-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 01-.75-.75V14h-1v1.25a.75.75 0 01-.75.75h-3zM3 3.75A.75.75 0 013.75 3h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 3.75zM3.75 6a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM3 9.75A.75.75 0 013.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 9.75zM7.75 9a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM7 6.75A.75.75 0 017.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 017 6.75zM7.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"/></svg>';

    return getTimiterSelect('timiter-clients', icon);
}

function getTimiterProjectSelect () {
    const icon = '<svg class="octicon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75zM1.5 1.75a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25V1.75zM11.75 3a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75zm-8.25.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5zM8 3a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 008 3z"/></svg>';

    return getTimiterSelect('timiter-projects', icon);
}

function getTimiterServiceSelect () {
    const icon = '<svg class="octicon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6.75 0A1.75 1.75 0 005 1.75V3H1.75A1.75 1.75 0 000 4.75v8.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0016 13.25v-8.5A1.75 1.75 0 0014.25 3H11V1.75A1.75 1.75 0 009.25 0h-2.5zM9.5 3V1.75a.25.25 0 00-.25-.25h-2.5a.25.25 0 00-.25.25V3h3zM5 4.5H1.75a.25.25 0 00-.25.25V6a2 2 0 002 2h9a2 2 0 002-2V4.75a.25.25 0 00-.25-.25H5zm-1.5 5a3.484 3.484 0 01-2-.627v4.377c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V8.873a3.484 3.484 0 01-2 .627h-9z"/></svg>';

    return getTimiterSelect('timiter-services', icon);
}

function getTimiterSelect (selectID, icon) {
    let selectWrapper = document.createElement('div');
    selectWrapper.className = "timiter-select-wrapper";

    let iconWrapper = document.createElement('div');
    iconWrapper.innerHTML = icon;

    let select = document.createElement('select');
    select.id = selectID;
    select.disabled = true;
    select.classList.add('timiter-select');
    select.classList.add('form-select');
    select.classList.add('select-sm');

    let dummyOption = document.createElement('option');
    dummyOption.innerHTML = 'Loading content ...';

    selectWrapper.appendChild(iconWrapper);
    selectWrapper.appendChild(select);
    select.appendChild(dummyOption);

    return selectWrapper;
}

function getTimiterButton () {
    let trackingButton = document.createElement('button');
    trackingButton.id = "timiter-tracking-button";
    trackingButton.disabled = true;
    trackingButton.classList.add('btn');
    trackingButton.classList.add('btn-block');
    trackingButton.classList.add('btn-outline');
    trackingButton.classList.add('btn-sm');
    trackingButton.classList.add('timite-track-button');
    trackingButton.innerHTML = `
    <svg class="octicon octicon-clock"
    xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zm.5 4.75a.75.75 0 00-1.5 0v3.5a.75.75 0 00.471.696l2.5 1a.75.75 0 00.557-1.392L8.5 7.742V4.75z"/></svg>
    <span id="timiter-button-text">Start Tracking</span>
    `;

    return trackingButton;
}

function populateClientList () {
    const selectID = '#timiter-clients';

    function addDataToList(clients){
        clients.forEach((client) => {
            appendToSelect(selectID, client.customer.id, client.customer.name);
        });
        enable(selectID);

        try {
            let client = settings[getRepo()].client;
            document.querySelector('#timiter-clients').value = client;
        } catch(error) {
            if (typeof(error) != TypeError) {
                console.log(error);
            }
        }
        cache.clientsLoaded = true;
    }

    if ( ! cache.miteLoaded || ! elementPresent(selectID) ) {
        runAsync(populateClientList, 500);
    } else {
        clearSelect(selectID);
        disable(selectID);
        cache.clientsLoaded = false;
        mite.Customer.active( {
            success  : addDataToList,
            error    : xhrError,
        });
    }
}

function populateProjectList () {
    const selectID = '#timiter-projects';

    function getCurrentCustomer() {
        return parseInt(document.querySelector('#timiter-clients').value);
    }

    function addDataToList(data) {
        let projects = data.filter(project => project.project.customer_id == getCurrentCustomer());
        projects.forEach((project) => {
            appendToSelect(selectID, project.project.id, project.project.name);
        });
        enable(selectID);

        try {
            let project = settings[getRepo()].project;
            document.querySelector('#timiter-projects').value = project;
        } catch(error) {
            if (typeof(error) != TypeError) {
                console.log(error);
            }
        }

        cache.projectsLoaded = true;
    }

    function loadProjects () {
        mite.Project.active( {
            success  : addDataToList,
            error    : xhrError,
        });
    }

    if ( ! cache.miteLoaded ||
         ! cache.clientsLoaded ||
         ! elementPresent(selectID) ) {
        runAsync(populateProjectList, 500);
    } else {
        disable(selectID);
        clearSelect(selectID);
        cache.projectsLoaded = false;
        runAsync(loadProjects, 500);
    }
}

function populateServiceList () {
    const selectID = '#timiter-services';

    function addDataToList(data){
        clearSelect(selectID);
        data.forEach((service) => {
            appendToSelect(selectID, service.service.id, service.service.name);
        });
        enable(selectID);
        cache.servicesLoaded = true;

        if (typeof(settings.lastService) != 'undefined') {
            document.querySelector('#timiter-services').value = settings.lastService;
        }
    }

    if ( ! cache.miteLoaded || ! elementPresent(selectID) ) {
        runAsync(populateServiceList, 500);
    } else {
        disable(selectID);
        cache.servicesLoaded = false;
        mite.Service.active( {
            success  : addDataToList,
            error    : xhrError,
        });
    }
}

function startTracking () {
    function startTracker(data) {
        let id = data.time_entry.id;

        let callbacks = {error: xhrError};

        mite.Tracker.start(id,callbacks);
    }

    let project = document.querySelector('#timiter-projects').value;
    let service = document.querySelector('#timiter-services').value;

    let args = {
        note: getCurrentIssueName(),
        project_id: project,
        service_id: service
    };

    let callbacks = {
        success: startTracker,
        error: xhrError
    };

    mite.TimeEntry.create(args, callbacks);
}

function getCurrentIssueName() {
    let title = document.querySelector('.js-issue-title').innerHTML.trim();
    let number = document.querySelector('.gh-header-number').innerHTML;
    return `${number} - ${title}`;
}

function isMiteRunning() {
    return cache.miteRunning;
}

function isTimerForThisIssue() {
    return isMiteRunning() && getCurrentIssueName() == cache.miteNote;
}

function stopTracking () {
    function stopTracker (data)  {
        if (typeof(data.tracker.tracking_time_entry) !== 'undefined') {
            let id = data.tracker.tracking_time_entry.id;
            let callbacks = {error: xhrError};

            mite.Tracker.stop(id,callbacks);
        }
    }

    let callbacks = {
        success: stopTracker,
        error: xhrError
    };

    mite.Tracker.find(callbacks);
}

function timerButtonPressed() {
    rememberRepoSelect();
    rememberService();
    disable('#timiter-tracking-button');
    document.querySelectorAll('.timiter-select')
        .forEach(select => select.disabled = true);

    cache.buttonClick = Date.now();

    if (isTimerForThisIssue()) {
        stopTracking();
    }
    else {
        startTracking();
    }
}

function renderTimerButton() {
    if (cache.miteLoaded &&
        cache.clientsLoaded &&
        cache.projectsLoaded &&
        cache.servicesLoaded &&
        (cache.miteRefresh > cache.buttonClick))
    {
        enable('#timiter-tracking-button');

        if (isTimerForThisIssue()) {
            document.querySelector('#timiter-button-text')
                .innerHTML = "Stop Timer";
        }
        else if (isMiteRunning()) {
            document.querySelector('#timiter-button-text')
                .innerHTML = "Replace Timer";
        } else {
            document.querySelector('#timiter-button-text')
                .innerHTML = "Start Timer";
        }
    } else {
        disable('#timiter-tracking-button');
    }
    runAsync(renderTimerButton, 200);
}

function renderInfo () {
    if (cache.miteRunning) {
        let note = document.createElement('span');
        note.className = "text-orange";
        note.innerHTML = cache.miteNote;
        document.querySelector('#timiter-current-timer')
            .innerHTML= `You are currently tracking: ${note.outerHTML}`;
    } else {
        document.querySelector('#timiter-current-timer')
            .innerHTML= "No timer running.";
    }

    runAsync(renderInfo, 1000);
}

function renderMiteLink() {
    if (! cache.miteLoaded ){
        runAsync(renderMiteLink, 1000);
    } else {
        let link = document.querySelector('#timiter-mite-link');
        link.href = `https://${settings.miteInstance}.mite.yo.lk`;
        link.innerHTML = 'Open Mite';
    }
}

function updateMiteInfo(oneshot = false) {
    function setVariables(data) {
        cache.miteRunning = true;
        cache.miteNote = data.time_entry.note;
        cache.miteRefresh = Date.now();
    }

    function setTimeEntry (data) {
        if (typeof(data.tracker.tracking_time_entry) !== 'undefined') {
            let callbacks = {
                success: setVariables,
                error: xhrError
            };
            mite.TimeEntry.find(data.tracker.tracking_time_entry.id, callbacks);
        } else {
            cache.miteRunning = false;
            cache.miteRefresh = Date.now();
        }
    }

    let callbacks = {
        success: setTimeEntry,
        error: xhrError
    };

    if (cache.miteLoaded) {
        mite.Tracker.find(callbacks);
        if (!oneshot) {
            runAsync(updateMiteInfo, 2000);
        }
    } else {
        if (!oneshot) {
            runAsync(updateMiteInfo, 500);
        }
    }

}

function renderSelects() {
    if (cache.miteRefresh > cache.buttonClick) {
        document.querySelectorAll('.timiter-select')
            .forEach(select => select.disabled = false);
    } else {
        document.querySelectorAll('.timiter-select')
            .forEach(select => select.disabled = true);
    }

    runAsync(renderSelects, 500);
}

function getRepo() {
    let pattern = /.*github.com\/(.*?)\/issues.*/gi;
    return location.href.replace(pattern, '$1');
}

function rememberRepoSelect() {
    let client = document.querySelector('#timiter-clients').value;
    let project = document.querySelector('#timiter-projects').value;

    let repoSettings = {};
    repoSettings[getRepo()] = {
        client: client,
        project: project
    };

    browser.storage.sync.set(repoSettings);
}

function rememberService() {
    let service = document.querySelector('#timiter-services').value;

    browser.storage.sync.set({
        lastService: service
    });
}

function init () {
    runAsync(addTimiterToIssueSidebar);
    runAsync(initTimiter);
    runAsync(populateClientList);
    runAsync(populateProjectList);
    runAsync(populateServiceList);
    runAsync(renderTimerButton);
    runAsync(renderInfo);
    runAsync(renderMiteLink);
    runAsync(updateMiteInfo);
    runAsync(renderSelects);
}

runAsync(init);
