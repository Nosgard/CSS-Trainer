import {readEditor} from "./readEditor.js";
import {buildCSS} from "./cssBuilder.js";
import {applyCSS} from "./cssApplier.js";

const btnCheck = document.querySelector(".btn.check");

btnCheck.addEventListener("click", () => {
    
    const input = readEditor();
    const cssRule = buildCSS(input);
    console.log(cssRule);

    applyCSS(cssRule);
})