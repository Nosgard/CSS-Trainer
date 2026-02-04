import { readEditor } from "./readEditor.js";
import { buildCSS } from "./cssBuilder.js";
import { applyCSS } from "./cssApplier.js";
import { loadTasks } from "./taskLoader.js";
import { validateTask } from "./taskValidator.js";

const btnCheck = document.querySelector(".btn.check");

let taskData = [];

(async () => {
    const tasks = await loadTasks();
    taskData = tasks;
})();

btnCheck.addEventListener("click", () => {

    const input = readEditor();

    let isAnswerCorrect = validateTask(taskData[0], input);

    if (isAnswerCorrect) {
        console.log("Correct");
        let cssRule = buildCSS(taskData[0].target, input.property, input.value);
        console.log(cssRule);

        applyCSS(cssRule);
    }
})