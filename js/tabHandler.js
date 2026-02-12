export function getActiveTabInput() {
    return document.querySelector('#tabs input[name="tabs"]:checked');
}

export function getActiveTab() {
    return document.querySelector('#tabs input[name="tabs"]:checked + label + .tab');
}

// The active Task will be derived from the ID of the active Tab Input
export function getActiveTask(activeTabInput, taskData) {

    if (!activeTabInput) {
        return null;
    }

    const taskId = Number(activeTabInput.dataset.taskId);

    const task = taskData.find(task => task.id === taskId);

    if (!task) {
        console.error('Task not found');
        return null;
    }

    return task;
}

/** True: Tab is no Task
 * False: Tab is a Task */
function isTabTask() {
    const activeTabInput = getActiveTabInput();
    return activeTabInput?.dataset.taskId;
}

/** Depending on the active Tab and any attempted Task
 * (have given one Answer no matter if right or wrong)
 * either show or hide the Reset-Button
 */
export function updateResetButton(btnReset, taskData) {
    const anyTaskAttempted = taskData.some(task => task.attempted === true);

    if (isTabTask() && anyTaskAttempted) {
        btnReset.style.display = "inline-block";
    }
    else {
        btnReset.style.display = "none";
    }
}

// Depending on the active Tab either show or hide the Check-Button
export function updateCheckButton(btnCheck) {
    btnCheck.style.display = isTabTask()
        ? "inline-block"
        : "none";
}

/** The Check-Button is only allowed to be used as long as the 
 * active Task remains unsolved. Once it's the case, disable
 * the Check-Button */
export function updateCheckButtonState(btnCheck, activeTask) {
    if (activeTask) {
        btnCheck.disabled = activeTask.solved;
    }
}

// Disables all Input-Fields in an active Tab.
// I.e. the user has entered the correct answer
export function lockInputs(activeTab) {
    const activeInputs = activeTab.querySelectorAll("input");

    activeInputs.forEach(input => {
        input.disabled = true;
    });
}

/** When the Input-Fields in an active Tab got locked,
 * I.e. the user has entered the correct answer, use
 * this Function to set the Input-Fields in their
 * original State
*/
export function recoverInputs(activeTab) {
    const activeInputs = activeTab.querySelectorAll("input");

    activeInputs.forEach(input => {
        if (input.disabled) {
            input.disabled = false;
        }

        input.value = "";
    });
}

// Gives the Editor a Style depending on the given answer
export function styleEditor(activeTab, isAnswerCorrect) {
    const editor = activeTab.querySelector('.csscode');

    setStyleByAnswer(editor, isAnswerCorrect);
}

// Gives the Label of a Tab a Style depending on the given answer
export function styleTabLabel(tabLabel, isAnswerCorrect) {
    setStyleByAnswer(tabLabel, isAnswerCorrect);
}

/** Takes an Element and checks if the Answer was correct.
 * The Answer can be right or wrong.
 * Either way, the Element gets a fitting Class to set the
 * Style. The Styles are defined in styles.css. For further
 * Information, go to styles.css and look for the Sections
 * that are marked with "JavaScript based" */

function setStyleByAnswer(styleElement, isAnswerCorrect) {
    if (isAnswerCorrect) {

        if (styleElement.classList.contains("wrong")) {
            styleElement.classList.remove("wrong");
        }

        styleElement.classList.add("solved");
    }
    else {
        if (!styleElement.classList.contains("wrong")) {
            styleElement.classList.add("wrong");
        }
    }
}

// Removes any given Style related to a given Answer
export function removeStyleByAnswer(tabLabel) {
    tabLabel.classList.remove("solved", "wrong");
}