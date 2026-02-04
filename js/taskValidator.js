export function validateTask(taskData, {selector, property, value}) {
    console.log(taskData.exercise);
    console.log("Selector: " + selector);
    console.log("Property: " + property);
    console.log("Value: " + value);

    return taskData.expected.selector == selector
    && taskData.expected.rules.property == property
    && taskData.expected.rules.value == value;
}