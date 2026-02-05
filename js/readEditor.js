/** The Editor-Reader
 * When the user has entered his answer in the CSS-Editor,
 * it will take all values in the Input-Fields from the
 * selected Task and provide them for further processing
 */

export function readEditor(activeTab) {
    return {
        selector: activeTab.querySelector(".css-selector")?.value || "",
        property: activeTab.querySelector(".css-property")?.value || "",
        value: activeTab.querySelector(".css-value")?.value || ""
    };
}