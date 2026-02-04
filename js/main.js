import { readEditor } from "./readEditor.js";
import { buildCSS } from "./cssBuilder.js";
import { applyCSS } from "./cssApplier.js";
import { loadTasks } from "./taskLoader.js";
import { validateTask } from "./taskValidator.js";

const btnCheck = document.querySelector(".btn.check");


/** This is the Main Part of the Application, where all the Action takes place.
 * First the File takes all important methods from the other JS-Files,
 * then it stores all Tasks associated to the Application from
 * from ./taskData/tasks.json
 * 
 * Important!
 * The Check-Button that gets an Event-Listener is the key
 * to the whole processing of the Task Validation. Handle with care!
 */
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