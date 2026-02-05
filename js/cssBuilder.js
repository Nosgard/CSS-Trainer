/** The CSS-Builder
 * Used to put all pieces given via the parameters together
 * and create a CSS-Rule that will later be applied to
 * the Elements Display
 */

export function buildCSS(selector, property, value) {
    return `
        ${selector} {
            ${property}: ${value};
        }
    `;
}