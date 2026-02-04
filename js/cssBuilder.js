/** The CSS-Builder
 * Used to put all pieces given via the parameters together
 * and create a CSS-Rule that will later be applied to
 * the Elements Display
 */

export function buildCSS(selector, property, value) {
    if(!selector || !property || !value)
    {
        console.error("Some inputs are empty!");
        return null;
    }

    return `
        ${selector} {
            ${property}: ${value};
        }
    `;
}