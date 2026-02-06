export function getActiveTab() {
    return document.querySelector('#tabs input[name="tabs"]:checked + label + .tab');
}

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
function checkButtonActive() {
    const activeTab = getActiveTab();
    return activeTab?.dataset.taskId;
}

export function updateCheckButton() {
    const btnCheck = document.querySelector(".btn.check");
    btnCheck.style.display = checkButtonActive()
    ? "inline-block"
    : "none";
}

export function lockInputs() {
    const activeTab = getActiveTab();
    const activeInputs = activeTab.querySelectorAll("input");

    activeInputs.forEach(input => {
        input.disabled = true;
    });
}

export function styleEditor(isAnswerCorrect) {
    const activeTab = getActiveTab();
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