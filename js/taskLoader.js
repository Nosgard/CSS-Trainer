/** The Task-Loader
 * Uses the Fetch-API to get all Tasks written in "tasks.json"
 * and only provides the Array containing all important data
 */

export async function loadTasks() {
    const response = await fetch("./taskData/tasks.json");
    const data = await response.json();
    return data.tasks;
}