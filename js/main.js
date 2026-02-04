import {readEditor} from "./readEditor.js";
import {buildCSS} from "./cssBuilder.js";
import {applyCSS} from "./cssApplier.js";
import {loadTasks} from "./taskLoader.js";

const btnCheck = document.querySelector(".btn.check");

let taskData = [];

    (async () => {
        const tasks = await loadTasks();
        taskData = tasks;
    })();

btnCheck.addEventListener("click", () => {
    
    /*const input = readEditor();
    const cssRule = buildCSS(input);
    console.log(cssRule);

    applyCSS(cssRule);*/

    console.log(taskData);
})