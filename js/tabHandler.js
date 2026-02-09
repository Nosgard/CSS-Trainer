export function getActiveTab() {
    return document.querySelector('#tabs input[name="tabs"]:checked + label + .tab');
}

// The active Task will be derived from the ID of the active Tab
export function getActiveTask(activeTab, taskData) {

    if (!activeTab)
    {
        return null;
    }

    const taskId = Number(activeTab.dataset.taskId);

    const task = taskData.find(task => task.id === taskId);

    if (!task) {
        console.error('Task not found');
        return null;
    }

    return task;
}

/**True: Tab is no Task
 * False: Tab is a Task */
function isCheckButtonActive() {
    const activeTab = getActiveTab();
    return activeTab?.dataset.taskId;
}

// Depending on the active Tab either show or hide the Check-Button
export function updateCheckButton(btnCheck) {
    btnCheck.style.display = isCheckButtonActive()
    ? "inline-block"
    : "none";
}

/**The Check-Button is only allowed to be used as long as the 
 * active Task remains unsolved. Once it's the case, disable
 * the Check-Button */
export function updateCheckButtonState(btnCheck, activeTask) {
    if (activeTask)
    {
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

//Gives the Editor a Style depending on the given answer
export function styleEditor(activeTab, isAnswerCorrect) {
    const editor = activeTab.querySelector('.csscode');

    setStyleByAnswer(editor, isAnswerCorrect);
}

// Gives the Tab a Style depending on the given answer
export function styleTab(tabLabel, isAnswerCorrect) {
    setStyleByAnswer(tabLabel, isAnswerCorrect);
}

/** Takes an Element and checks if the Answer was correct.
 * The Answer can be right or wrong.
 * Either way, the Element gets a fitting Class to set the
 * Style. The Styles are defined in styles.css. For further
 * Information, go to styles.css and look for the Sections
 * that are marked with "JavaScript based" */

function setStyleByAnswer(styleObject, isAnswerCorrect) {
    if (isAnswerCorrect) {

        if(styleObject.classList.contains("wrong"))
        {
            styleObject.classList.remove("wrong");
        }

       styleObject.classList.add("solved");
    }
    else
    {
        if(!styleObject.classList.contains("wrong"))
        {
            styleObject.classList.add("wrong");
        }
    }
}