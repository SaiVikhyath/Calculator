

let firstNumber = "";
let secondNumber = "";
let operator = "";
let result = "";
let resetDisplay = false;

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clear = document.querySelector(".clear");
const backspace = document.querySelector(".backspace");
const decimalButton = document.querySelector(".decimal");
const expressionDisplay = document.querySelector(".operation");
const resultDisplay = document.querySelector(".result");
const equals = document.querySelector("#equals");

numbers.forEach((button) => 
    button.addEventListener("click", () => appendNumber(button.textContent))
)

operators.forEach((button) => 
    button.addEventListener("click", () => setOperation(button.textContent))
)

equals.addEventListener("click", evaluateExpression);
clear.addEventListener("click", clearScreen);
backspace.addEventListener("click", deleteNumber);
decimalButton.addEventListener("click", appendDecimal);

function clearScreen() {
    expressionDisplay.textContent = "";
    resultDisplay.textContent = "0";
    firstNumber = "";
    secondNumber = "";
    operator = "";
}

function appendDecimal() {

    console.log("IN APPEND DECIMAL");

    if (resetDisplay) {
        resetScreen();
    }
    if (resultDisplay.textContent === "") {
        resultDisplay.textContent = "0";
    }
    if (resultDisplay.textContent.includes(".")) {
        return;
    }
    resultDisplay.textContent += ".";
}

function deleteNumber() {
    resultDisplay.textContent = resultDisplay.textContent.toString().slice(0, -1);
}

function resetScreen() {
    resultDisplay.textContent = "";
    resetDisplay = false;
}

function appendNumber(number) {
    if (resultDisplay.textContent === "0" || resetDisplay) {
        resetScreen();
    }
    resultDisplay.textContent += number;
}

function evaluateExpression() {
    if (operator === "" || resetDisplay) {
        return;
    }
    if (operator === "/" && resultDisplay.textContent === "0") {
        alert("Cannot divide by zero!");
        return;
    }
    secondNumber = resultDisplay.textContent;
    resultDisplay.textContent = roundUp(
        operate(firstNumber, secondNumber, operator)
    )

    expressionDisplay.textContent = `${firstNumber} ${operator} ${secondNumber} =`
    operator = "";
}

function roundUp(res) {
    return Math.round(res * 1000) / 1000;
}

function setOperation(operatorArg) {
    if (operator != "") {
        evaluateExpression()
    }
    firstNumber = resultDisplay.textContent;
    operator = operatorArg;
    expressionDisplay.textContent = `${firstNumber} ${operator}`;
    resetDisplay = true;
}

function add(first, second) {
    return first + second;
}

function subtract(first, second) {
    return first - second;
}

function multiply(first, second) {
    return first * second;
}

function divide(first, second) {
    if (second == 0) {
        return null;
    }
    return first / second;
}

function operate(firstNumber, secondNumber, operator) {

    first = Number(firstNumber);
    second = Number(secondNumber);

    if (operator === "+") {
        return add(first, second);
    }
    else if (operator === "-") {
        return subtract(first, second);
    }
    else if (operator === "*") {
        return multiply(first, second);
    }
    else if (operator === "/") {
        return divide(first, second);
    }
    return null;

}
