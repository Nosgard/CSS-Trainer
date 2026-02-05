/** The Task-Validator
 * The Heart of the Task Processing, that takes all Data from
 * the current Task along with the entered input values
 * to check if the CSS-Rule was written correctly according
 * to the given Exercise
 */

export function validateTask(taskData, {selector, property, value}) {
    console.log(taskData.exercise);
    console.log("Selector: " + selector);
    console.log("Property: " + property);
    console.log("Value: " + value);

    return taskData.expected.selector === selector
    && taskData.expected.rules.property === property
    && taskData.expected.rules.value === value;
}