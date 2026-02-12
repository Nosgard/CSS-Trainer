import { readEditor } from "./readEditor.js";
import { buildCSS } from "./cssBuilder.js";
import { renderAllStyles } from "./styleManager.js";
import { loadTasks } from "./taskLoader.js";
import { validateTask } from "./taskValidator.js";
import {
    getActiveTabInput, getActiveTab, getActiveTask, updateResetButton,
    updateCheckButton, updateCheckButtonState, lockInputs, recoverInputs, styleEditor,
    styleTabLabel, removeStyleByAnswer
} from "./tabHandler.js";

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
const headStyle = document.getElementById("task-style");
const btnReset = document.querySelector(".btn.reset");
const btnCheck = document.querySelector(".btn.check");
const tabs = document.querySelectorAll('#tabs input[name="tabs"]');
const tabLabels = document.querySelectorAll('#tabs input[name="tabs"] + label');
const taskTabs = document.querySelectorAll("#tabs input[data-task-id] + label + .tab");
let taskData = [];
const taskStyles = new Map();
const taskInputs = new Map();

/** Asynchronous Call of:
 * 1. The Tasks (For more Info: taskData/tasks.json)
 * 2. All stored Informations from the Local-Storage */
(async () => {
    const tasks = await loadTasks();

    const lsTaskData = localStorage.getItem('taskData');
    const lsTaskStyles = localStorage.getItem('taskStyles');
    const lsTaskInputs = localStorage.getItem('taskInputs');

    if (lsTaskData) {
        taskData = JSON.parse(lsTaskData);
    }
    else {
        taskData = tasks;

        return;
    }

    if (lsTaskStyles) {
        const parseStyles = JSON.parse(lsTaskStyles);

        parseStyles.forEach(([key, value]) => {
            taskStyles.set(Number(key), value);
        });

        renderAllStyles(taskStyles, headStyle);
    }

    if (lsTaskInputs) {
        const parseInputs = JSON.parse(lsTaskInputs);

        parseInputs.forEach(([key, value]) => {
            taskInputs.set(Number(key), value);
        });
    }

    for (const task of taskInputs.values()) {
        const taskLabel = document.querySelector(`#tabs input[data-task-id="${task.id}"] + label`);
        const taskTab = document.querySelector(`#tabs input[data-task-id="${task.id}"] + label + .tab`);
        taskTab.querySelector(".css-selector").value = task.selector;
        taskTab.querySelector(".css-property").value = task.property;
        taskTab.querySelector(".css-value").value = task.value;

        if (task.solved) {
            styleEditor(taskTab, true);
            styleTabLabel(taskLabel, true);
            lockInputs(taskTab);
        }
        else if (task.attempted) {
            styleEditor(taskTab, false);
            styleTabLabel(taskLabel, false);
        }
    }
})();

// Don't let the Check-Button appear on Tabs not related to Tasks
window.addEventListener("DOMContentLoaded", () => {
    updateResetButton(btnReset, taskData);
    updateCheckButton(btnCheck);
});

/** For every Tab, you make sure that the Check-Button is not
 * available to be used when either the Introduction-Tab
 * or a Tab with a solved Task is selected
*/
tabs.forEach(tab => {
    tab.addEventListener("change", () => {
        const activeTabInput = getActiveTabInput();
        const activeTask = getActiveTask(activeTabInput, taskData);

        updateResetButton(btnReset, taskData);
        updateCheckButton(btnCheck);
        updateCheckButtonState(btnCheck, activeTask);
    });
});


btnCheck.addEventListener("click", () => {

    // Take the Label of the selected Tab for Styling-Purposes later on
    const tabLabel = document.querySelector('#tabs input[type="radio"]:checked + label');

    // Only take the Task of the selected Tab into consideration!
    const activeTabInput = getActiveTabInput();
    const activeTab = getActiveTab();
    const activeTask = getActiveTask(activeTabInput, taskData);
    const input = readEditor(activeTab);

    if (input) {

        let isAnswerCorrect = validateTask(activeTask, input);

        if (isAnswerCorrect) {
            console.log("Correct");

            // The new CSS-Rule consists of a given Selector in the JSON-File. The rest comes from the Input
            const cssRule = buildCSS(activeTask.target, input.property, input.value);

            // Add the CSS-Rule to a Map so that it can be applied when the user goes back to the answered Task
            taskStyles.set(activeTask.id, cssRule);
            renderAllStyles(taskStyles, headStyle);

            activeTask.solved = true;

            localStorage.setItem('taskStyles', JSON.stringify([...taskStyles]));

            updateCheckButtonState(btnCheck, activeTask);

            lockInputs(activeTab);

        }

        if (!activeTask.attempted) {
            activeTask.attempted = true;
        }

        localStorage.setItem('taskData', JSON.stringify(taskData));

        const taskEntries = {
            id: activeTabInput?.dataset.taskId,
            solved: activeTask.solved,
            attempted: activeTask.attempted,
            selector: input.selector,
            property: input.property,
            value: input.value
        };

        taskInputs.set(Number(activeTabInput?.dataset.taskId), taskEntries);

        localStorage.setItem('taskInputs', JSON.stringify([...taskInputs]));

        updateResetButton(btnReset, taskData);

        styleEditor(activeTab, isAnswerCorrect);
        styleTabLabel(tabLabel, isAnswerCorrect);
    }
});

btnReset.addEventListener("click", () => {
    const activeTabInput = getActiveTabInput();
    const activeTask = getActiveTask(activeTabInput, taskData);

    // Clear the hole Style and the Map with all saved Styles
    headStyle.innerHTML = "";

    taskStyles.clear();
    taskInputs.clear();

    // Reset the JSON-Elements "attempted" and "solved" if necessary
    taskData.forEach(task => {
        if (task.attempted) {
            task.attempted = false;
        }

        if (task.solved) {
            task.solved = false;
        }
    });

    // Remove the Style of every CSS-Editor
    taskTabs.forEach(tab => {
        recoverInputs(tab);

        const editor = tab.querySelector(".csscode");
        removeStyleByAnswer(editor);
    });

    // Remove the Style of every Tab-Label
    tabLabels.forEach(label => {
        removeStyleByAnswer(label);
    })

    updateResetButton(btnReset, taskData);
    updateCheckButton(btnCheck);
    updateCheckButtonState(btnCheck, activeTask);

    localStorage.removeItem('taskData');
    localStorage.removeItem('taskStyles');
    localStorage.removeItem('taskInputs');
});