export function readEditor() {
    return {
        selector: document.querySelector(".css-selector").value,
        property: document.querySelector(".css-property").value,
        value: document.querySelector(".css-value").value
    };
}