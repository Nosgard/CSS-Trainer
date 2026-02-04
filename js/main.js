import {readEditor} from "./readEditor.js";

const btnCheck = document.querySelector(".btn.check");

btnCheck.addEventListener("click", () => {
    console.log(readEditor());
})