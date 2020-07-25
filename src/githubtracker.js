function createSidebarElement() {

    let css = document.createElement('style');
    css.innerHTML = `
.timiter-heading::marker {
    content: '';
}

.timiter-select-wrapper {
    display: grid;
    grid-template-columns: 24px 1fr;
    grid-template-rows: 1fr;
    align-items: center;
    justify-items: center;
    justify-content: center;
    margin-bottom: .5rem;
}

.timiter-select-wrapper > div > svg {
    margin: 0 6px;
}
`;

    document.head.appendChild(css);

    let sidebar = document.querySelector("#partial-discussion-sidebar");

    let sidebarItem = document.createElement('div');
    sidebarItem.className = "discussion-sidebar-item";
    sidebarItem.innerHTML = '<summary class="text-bold discussion-sidebar-heading discussion-sidebar-toggle timiter-heading">Timiter Tracking by <a href="https://gebruederheitz.de">/gebrüderheitz</a></summary>';

    let clientWrapper = document.createElement('div');
    clientWrapper.className = "timiter-select-wrapper";

    let clientIcon = document.createElement('div');
    clientIcon.innerHTML = '<svg class="octicon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.5 14.25c0 .138.112.25.25.25H4v-1.25a.75.75 0 01.75-.75h2.5a.75.75 0 01.75.75v1.25h2.25a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25v12.5zM1.75 16A1.75 1.75 0 010 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 00.25-.25V8.285a.25.25 0 00-.111-.208l-1.055-.703a.75.75 0 11.832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0114.25 16h-3.5a.75.75 0 01-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 01-.75-.75V14h-1v1.25a.75.75 0 01-.75.75h-3zM3 3.75A.75.75 0 013.75 3h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 3.75zM3.75 6a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM3 9.75A.75.75 0 013.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 9.75zM7.75 9a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM7 6.75A.75.75 0 017.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 017 6.75zM7.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"/></svg>';

    let clientSelect = document.createElement('select');
    clientSelect.className = "timiter-select";
    clientSelect.classList.add('btn');
    clientSelect.classList.add('btn-block');
    clientSelect.classList.add('btn-sm');

    let clients = [
        {
            'client_name': 'Test',
            'id': '0000',
        }
    ];

    clients.forEach((client) => {
        let option = document.createElement('option');
        option.setAttribute('value', client.id);
        option.innerHTML = client.client_name;
        clientSelect.appendChild(option);
    });

    let projectWrapper = document.createElement('div');
    projectWrapper.className = "timiter-select-wrapper";

    let projectIcon = document.createElement('div');
    projectIcon.innerHTML = '<svg class="octicon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75zM1.5 1.75a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25V1.75zM11.75 3a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75zm-8.25.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5zM8 3a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 008 3z"/></svg>';

    let projectSelect = document.createElement('select');
    projectSelect.className = "timiter-select";
    projectSelect.classList.add('btn');
    projectSelect.classList.add('btn-block');
    projectSelect.classList.add('btn-sm');

    let projects = [
        {
            'project_name': 'Support',
            'id': '0000',
        }
    ];

    projects.forEach((project) => {
        let option = document.createElement('option');
        option.setAttribute('value', project.id);
        option.innerHTML = project.project_name;
        projectSelect.appendChild(option);
    });

    let serviceWrapper = document.createElement('div');
    serviceWrapper.className = "timiter-select-wrapper";

    let serviceIcon = document.createElement('div');
    serviceIcon.innerHTML = '<svg class="octicon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6.75 0A1.75 1.75 0 005 1.75V3H1.75A1.75 1.75 0 000 4.75v8.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0016 13.25v-8.5A1.75 1.75 0 0014.25 3H11V1.75A1.75 1.75 0 009.25 0h-2.5zM9.5 3V1.75a.25.25 0 00-.25-.25h-2.5a.25.25 0 00-.25.25V3h3zM5 4.5H1.75a.25.25 0 00-.25.25V6a2 2 0 002 2h9a2 2 0 002-2V4.75a.25.25 0 00-.25-.25H5zm-1.5 5a3.484 3.484 0 01-2-.627v4.377c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V8.873a3.484 3.484 0 01-2 .627h-9z"/></svg>';

    let serviceSelect = document.createElement('select');
    serviceSelect.className = "timiter-select";
    serviceSelect.classList.add('btn');
    serviceSelect.classList.add('btn-block');
    serviceSelect.classList.add('btn-sm');

    let services = [
        {
            'service_name': 'Entwicklung',
            'id': '0000',
        }
    ];

    services.forEach((service) => {
        let option = document.createElement('option');
        option.setAttribute('value', service.id);
        option.innerHTML = service.service_name;
        serviceSelect.appendChild(option);
    });

    let trackingButton = document.createElement('button');
    trackingButton.classList.add('btn');
    trackingButton.classList.add('btn-block');
    trackingButton.classList.add('btn-sm');
    trackingButton.classList.add('timite-track-button');
    trackingButton.innerHTML = `
<svg class="octicon octicon-clock"
xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zm.5 4.75a.75.75 0 00-1.5 0v3.5a.75.75 0 00.471.696l2.5 1a.75.75 0 00.557-1.392L8.5 7.742V4.75z"/></svg>
Start Tracking
`;

    clientWrapper.appendChild(clientIcon);
    clientWrapper.appendChild(clientSelect);
    sidebarItem.appendChild(clientWrapper);

    projectWrapper.appendChild(projectIcon);
    projectWrapper.appendChild(projectSelect);
    sidebarItem.appendChild(projectWrapper);

    serviceWrapper.appendChild(serviceIcon);
    serviceWrapper.appendChild(serviceSelect);
    sidebarItem.appendChild(serviceWrapper);

    sidebarItem.appendChild(trackingButton);
    sidebar.prepend(sidebarItem);
}

createSidebarElement();
