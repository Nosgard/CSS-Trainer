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

    if(isAnswerCorrect) {
        if (editor.classList.contains("wrong"))
        {
            editor.classList.remove("wrong");
        }

        editor.classList.add("solved");
    }
    else
    {
        if(!editor.classList.contains("wrong"))
        {
            editor.classList.add("wrong");
        }
    }
    
}