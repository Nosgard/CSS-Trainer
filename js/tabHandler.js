export function getActiveTab() {
    return document.querySelector('#tabs input[name="tabs"]:checked + label + .tab');
}