let mite = {};

function addTimiterToIssueSidebar () {
    let oldWrapper = document.querySelector('#timiter-wrapper');

    if (oldWrapper !== null) {
        oldWrapper.remove();
    }

    let githubSidebar = document.querySelector('#partial-discussion-sidebar');
    githubSidebar.prepend(getTimiterSidebarContent());

    window.setTimeout(() => {
        enableTrackingButton();
    });

    let settings = getBrowserSettings();
    settings.then((result) => {
        addMiteToWindow(result.miteInstance, result.miteApiKey);
        window.setTimeout(() => {
            populateClientList();
            window.setTimeout(() => {
                populateProjectList();
            }, 500);
        });
        window.setTimeout(() => {
            populateServiceList();
        });
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
    select.classList.add('btn');
    select.classList.add('btn-block');
    select.classList.add('btn-sm');

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

function getBrowserSettings() {
    return browser.storage.sync.get();
}

function addMiteToWindow(instance, apikey) {
    try {
        mite = new Mite({account: instance, api_key: apikey});
    } catch (error) {
        console.log(error);
    }

    updateMiteLink(instance);
}

function updateMiteLink(instance) {
    document.querySelector("#timiter-mite-link").href = `https://${instance}.mite.yo.lk`;
    document.querySelector("#timiter-mite-link").innerHTML = 'Open Mite.';
}

function populateClientList () {
    function addDataToList(clients){
        clearCustomerSelect();
        clients.forEach((client) => {
            addCustomerToSelect(client.customer.id, client.customer.name);
        });
        enableCustomerSelect();
        document.querySelector('#timiter-clients').addEventListener('change', () => {
            populateProjectList();
        });
    }

    function clearCustomerSelect() {
        document.querySelector('#timiter-clients').childNodes.forEach((child) => child.remove());
    }

    function enableCustomerSelect() {
        document.querySelector('#timiter-clients').disabled = false;
    }

    function addCustomerToSelect(id, name) {
        let option = document.createElement('option');
        option.setAttribute('value', id);
        option.innerHTML = name;

        document.querySelector('#timiter-clients').appendChild(option);
    }

    mite.Customer.active( {
        success  : function(data) {addDataToList(data)},
        error    : function(xhr, msg) {console.log(msg)}
    });
}

function populateProjectList () {
    function addDataToList(projects){
        clearProjectSelect();
        let myProjects = projects.filter(project => project.project.customer_id == getCurrentCustomer());
        myProjects.forEach((project) => {
            addProjectToSelect(project.project.id, project.project.name);
        });
        enableProjectSelect();
    }

    function clearProjectSelect() {
        document.querySelector('#timiter-projects').childNodes.forEach((child) => child.remove());
    }

    function enableProjectSelect() {
        document.querySelector('#timiter-projects').disabled = false;
    }

    function disableProjectSelect() {
        document.querySelector('#timiter-projects').disabled = true;
    }

    function addProjectToSelect(id, name) {
        let option = document.createElement('option');
        option.setAttribute('value', id);
        option.innerHTML = name;

        document.querySelector('#timiter-projects').appendChild(option);
    }

    function getCurrentCustomer() {
        return parseInt(document.querySelector('#timiter-clients').value);
    }

    disableProjectSelect();

    mite.Project.active({
        success  : function(data) {addDataToList(data)},
        error    : function(xhr, msg) {console.log(msg)}
    });
}

function populateServiceList () {
    function addDataToList(services){
        clearServiceSelect();
        services.forEach((service) => {
            addServiceToSelect(service.service.id, service.service.name);
        });
        enableServiceSelect();
    }

    function clearServiceSelect() {
        document.querySelector('#timiter-services').childNodes.forEach((child) => child.remove());
    }

    function enableServiceSelect() {
        document.querySelector('#timiter-services').disabled = false;
    }

    function addServiceToSelect(id, name) {
        let option = document.createElement('option');
        option.setAttribute('value', id);
        option.innerHTML = name;

        document.querySelector('#timiter-services').appendChild(option);
    }

    mite.Service.active({
        success  : function(data) {addDataToList(data)},
        error    : function(xhr, msg) {console.log(msg)}
    });
}

function startTracking (event) {
    event.preventDefault();

    let project = document.querySelector('#timiter-projects').value;
    let service = document.querySelector('#timiter-services').value;

    let title = document.querySelector('.js-issue-title').innerHTML.trim();
    let number = document.querySelector('.gh-header-number').innerHTML;

    let args = {
        note: `${number} - ${title}`,
        project_id: project,
        service_id: service
    };

    let callbacks = {
        success  : function(data) {
            let id = data.time_entry.id;

            let callbacks = {
                error    : function(xhr, msg) {console.log(msg);}
            };

            mite.Tracker.start(id,callbacks);
            document.querySelector('#timiter-tracking-button').disabled = true;

        },
        error    : function(xhr, msg) {console.log(msg);}
    };

    mite.TimeEntry.create(args, callbacks);
}

function reallyEnableTrackinButton() {
    document.querySelector('#timiter-tracking-button').addEventListener('click', startTracking);
    document.querySelector('#timiter-tracking-button').disabled = false;
    document.querySelector('#timiter-button-text').innerHTML = 'Start Timer';
}

function enableTrackingButton() {
    document.querySelector('#timiter-tracking-button').disabled = true;
    document.querySelector('#timiter-tracking-button').removeEventListener('click', startTracking);

    let client = document.querySelector('#timiter-clients').value;
    let project = document.querySelector('#timiter-projects').value;
    let service = document.querySelector('#timiter-services').value;

    let dummyText = "Loading content ...";

    if (client != dummyText && project != dummyText && service != dummyText) {
        reallyEnableTrackinButton();
    } else {
        window.setTimeout(() => {
            enableTrackingButton();
        }, 200);
    }
}

function updateCurrentTimer() {
    let callbacks = {
        success: (data) => {
            if (typeof(data.tracker.tracking_time_entry) !== 'undefined') {
                let id = data.tracker.tracking_time_entry.id;
                let callbacks = {
                    success: (data) => {
                        let note = data.time_entry.note;
                        let text = `You are currently tracking <span class="text-green">${note}</span>.`;

                        document.querySelector('#timiter-current-timer').innerHTML = text;
                        makeTheTrackingButtonStop(note);
                    },
                    error: function(xhr, msg) {console.log(msg);}
                };
                mite.TimeEntry.find(id, callbacks);
            } else {
                document.querySelector('#timiter-current-timer').innerHTML = "No timer running.";
            }
            window.setTimeout(updateCurrentTimer, 5000);
        },
        error: function(xhr, msg) {console.log(msg);}
    };

    try {
        mite.Tracker.find(callbacks);
    } catch (_) {
        window.setTimeout(updateCurrentTimer, 500);
    }
}

function stopMiteTimer(event) {
    event.preventDefault();
    document.querySelector('#timiter-tracking-button').removeEventListener('click', stopMiteTimer);

    let callbacks = {
        success: (data) => {
            if (typeof(data.tracker.tracking_time_entry) !== 'undefined') {
                let id = data.tracker.tracking_time_entry.id;
                callbacks = {
                    success: () => {
                        console.log('stopping');
                        document.querySelector('#timiter-button-text').innerHTML = "Start Timer";
                        enableTrackingButton();
                    },
                    error: function(xhr, msg) {console.log(msg);}
                };

                mite.Tracker.stop(id,callbacks);
            }
        },
        error: function(xhr, msg) {console.log(msg);}
    };

    mite.Tracker.find(callbacks);
}

function makeTheTrackingButtonStop(note) {
    let title = document.querySelector('.js-issue-title').innerHTML.trim();
    let number = document.querySelector('.gh-header-number').innerHTML;

    let currentIssue = `${number} - ${title}`;

    let buttonText = "Replace Timer";

    if (currentIssue == note) {
        buttonText = "Stop Timer";
        document.querySelector('#timiter-tracking-button').removeEventListener('click', startTracking);
        document.querySelector('#timiter-tracking-button').addEventListener('click', stopMiteTimer);
    }

    document.querySelector('#timiter-button-text').innerHTML = buttonText;
    document.querySelector('#timiter-tracking-button').disabled = false;
}

try {
    addTimiterToIssueSidebar();
    updateCurrentTimer();
} catch (error) {
    console.log(error);
}
