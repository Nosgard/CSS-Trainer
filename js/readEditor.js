/** The Editor-Reader
 * When the user has entered his answer in the CSS-Editor,
 * it will take all values in the Input-Fields and provide
 * them for further processing
 */

export function readEditor() {
    return {
        selector: document.querySelector(".css-selector").value,
        property: document.querySelector(".css-property").value,
        value: document.querySelector(".css-value").value
    };
}