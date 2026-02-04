export function buildCSS({selector, property, value}) {
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