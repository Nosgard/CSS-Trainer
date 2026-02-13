import {styleEditor, styleTabLabel, lockInputs} from "./tabHandler.js";


export function loadTaskItemStyles(taskInputs) {
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
}