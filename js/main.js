import { readEditor } from "./readEditor.js";
import { buildCSS } from "./cssBuilder.js";
import { applyCSS } from "./cssApplier.js";
import { loadTasks } from "./taskLoader.js";
import { validateTask } from "./taskValidator.js";
import { getActiveTab, getActiveTask } from "./tabHandler.js";

const btnCheck = document.querySelector(".btn.check");


/** This is the Main Part of the Application, where all the Action takes place.
 * First the File takes all important methods from the other JS-Files,
 * then it stores all Tasks associated to the Application
 * from ./taskData/tasks.json.
 * To make sure that only the selected Task will be processed,
 * all user inputs will only be read from the Tab selected by the user.
 * For further information, read the documentation of readEditor.js.
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

    // Only take the Task of the selected Task into consideration!
    const activeTab = getActiveTab();
    const activeTask = getActiveTask(activeTab, taskData);
    const input = readEditor(activeTab);

    if (input) {

        let isAnswerCorrect = validateTask(activeTask, input);

        if (isAnswerCorrect) {
            console.log("Correct");
            let cssRule = buildCSS(activeTask.target, input.property, input.value);
            console.log(cssRule);

            applyCSS(cssRule);
        }
    }
})