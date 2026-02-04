let styleTag;

export function applyCSS(css) {
    if(!styleTag) {
        styleTag = document.createElement("style");
        document.head.appendChild(styleTag);
    }

    styleTag.textContent = css;
}