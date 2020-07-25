function createSidebarElement() {

    let css = document.createElement('style');
    css.innerHTML = `
.timite-heading::marker {
    content: '';
}
`;

    console.log(css);
    document.head.appendChild(css);

    let sidebar = document.querySelector("#partial-discussion-sidebar");

    let sidebarItem = document.createElement('div');
    sidebarItem.className = "discussion-sidebar-item";
    sidebarItem.innerHTML = '<summary class="text-bold discussion-sidebar-heading discussion-sidebar-toggle timite-heading">Timiter Tracking by <a href="https://gebruederheitz.de">/gebrüderheitz</a></summary>';

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
    sidebarItem.appendChild(trackingButton);
    sidebar.prepend(sidebarItem);
}

createSidebarElement();
