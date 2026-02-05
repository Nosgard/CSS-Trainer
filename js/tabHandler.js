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