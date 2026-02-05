/** The Editor-Reader
 * When the user has entered his answer in the CSS-Editor,
 * it will take all values in the Input-Fields from the
 * selected Task and provide them for further processing
 */

export function readEditor(activeTab) {
    let selector = activeTab.querySelector(".css-selector")?.value || "";
    let property = activeTab.querySelector(".css-property")?.value || "";
    let value = activeTab.querySelector(".css-value")?.value || "";

    if (!selector || !property || !value)
    {
        alert("Please fill out all inputs to continue");
        return null;
    }

    return {
        selector,
        property,
        value
    };
}