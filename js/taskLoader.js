export async function loadTasks() {
    const response = await fetch("./taskData/tasks.json");
    const data = await response.json();
    return data.tasks;
}