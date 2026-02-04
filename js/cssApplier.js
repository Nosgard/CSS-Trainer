/** The CSS-Applier
 * Will be called, when everything has gone successful with the Task.
 * It applies the CSS-Rule to the Elements Display
 */

let styleTag;

export function applyCSS(css) {
    if(!styleTag) {
        styleTag = document.createElement("style");
        document.head.appendChild(styleTag);
    }

    styleTag.textContent = css;
}