/** The Style-Manager
 * To make sure that no CSS-Style of a correct answer will
 * be applied to wrong Tasks, it uses a Map to indicate
 * the correct CSS-Style to be applied to the current Task
 * via the ID of the current Task.
 */

const style = document.getElementById("task-style");

export function renderAllStyles(taskStyles) {
    let css = "";
    console.log("Begin rendering");

    for (const rule of taskStyles.values()) {
        css += rule + "\n";
        console.log(css);
    }

    style.textContent = css;
}