import { readEditor } from "./readEditor.js";
import { buildCSS } from "./cssBuilder.js";
import { renderAllStyles } from "./styleManager.js";
import { loadTasks } from "./taskLoader.js";
import { validateTask } from "./taskValidator.js";
import { getActiveTab, getActiveTask, updateCheckButton, updateCheckButtonState, lockInputs, styleEditor, styleTab } from "./tabHandler.js";

/** This is the Main Part of the Application, where all the Action takes place.
 * First the File takes all important methods from the other JS-Files,
 * then it stores all Tasks associated to the Application
 * from ./taskData/tasks.json.
 * The Check-Button is only allowed to be used on actual Tasks
 * so the Application continuously checks if the user has selected
 * a Task.
 * 
 * -- The Check-Button Event-Listener --
 * To make sure that only the selected Task will be processed,
 * all user inputs will only be read from the Tab selected by the user.
 * For further information, read the documentation of readEditor.js.
 * Once you've entered your answer, there will be a Task Validation:
 * Is your answer correct?
 * - Awesome! Then the CSS-Rule will be applied to the Elements Display
 * and saved in a Map-Class. This will make sure that the CSS-Rule will
 * be applied everytime you go back to the solved Task!
 * 
 * Is your answer wrong?
 * - No worries! The Elements Display remains untouched. You
 * can simply edit your answer and check it again!
 * 
 * Either way, the CSS-Editor receives a Style fitting to the answer
 * 
 * Important!
 * The Check-Button is the key to the whole processing
 * of the Task Validation. Handle with care!
 */
const btnCheck = document.querySelector(".btn.check");
const tabs = document.querySelectorAll('#tabs input[name="tabs"]');
let taskData = [];
const taskStyles = new Map();

(async () => {
    const tasks = await loadTasks();
    taskData = tasks;
})();

window.addEventListener("DOMContentLoaded", () => {
    updateCheckButton(btnCheck);
});

tabs.forEach(tab => {
    tab.addEventListener("change", () => {
        const activeTab = getActiveTab();
        const activeTask = getActiveTask(activeTab, taskData);

        updateCheckButton(btnCheck);
        updateCheckButtonState(btnCheck, activeTask);
    });
});


btnCheck.addEventListener("click", () => {

    // Take the Label of the selected Tab for Styling-Purposes later on
    const tabLabel = document.querySelector('#tabs input[type="radio"]:checked + label');

    // Only take the Task of the selected Tab into consideration!
    const activeTab = getActiveTab();
    const activeTask = getActiveTask(activeTab, taskData);
    const input = readEditor(activeTab);

    if (input) {

        let isAnswerCorrect = validateTask(activeTask, input);

        if (isAnswerCorrect) {
            console.log("Correct");
                
            const cssRule = buildCSS(activeTask.target, input.property, input.value);

            taskStyles.set(activeTask.id, cssRule);
            renderAllStyles(taskStyles);

            activeTask.solved = true;

            updateCheckButtonState(btnCheck, activeTask);

            lockInputs(activeTab);
            
        }

        styleEditor(activeTab, isAnswerCorrect);
        styleTab(tabLabel, isAnswerCorrect);
    }
})