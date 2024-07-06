const display = document.getElementById("display");
let lastActionWasCalculate = false;
let isOperatorLast = false;
const  setCode="2-8-2002";

function appendToDisplay(input) {
    if ((display.value === '0' || lastActionWasCalculate) && !isOperatorLast && !'+-*/%'.includes(input)) {
        display.value = input;
        lastActionWasCalculate = false;
        isOperatorLast = false;

    } else if (lastActionWasCalculate && '+-*/%'.includes(input)) {
        display.value += input;
        lastActionWasCalculate = false;
        isOperatorLast = true;

    } else {
        display.value += input;
        //isOperatorLast = '+-*/'.includes(input);
    }
}

function clearDisplay() {
    display.value = "0";
    lastActionWasCalculate = false;
    isOperatorLast = false;
}

function calculate() {
    if (display.value === setCode){
        window.location.href= "Message.html";
        return;
    }

    try {
        let expression = display.value.replace(/%/g, '*0.01*');
        display.value = eval(expression);
        lastActionWasCalculate = true;
        isOperatorLast = false;
    } catch (error) {
        display.value = "Error";
        lastActionWasCalculate = true;
        isOperatorLast = false;
    }
}    
function backSpace(){
    display.value = display.value.slice(0, -1);
    
}

document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (key === 'Enter') {
        event.preventDefault(); // Prevent form submission on Enter
        calculate();
    }

    if ((key >= '0' && key <= '9') || key === '.') {
        appendToDisplay(key);
    }

    if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendToDisplay(key);
    }

    if (key === 'Escape') {
        clearDisplay();
    }

    if (key === 'Backspace') {
        display.value = display.value.slice(0, -1);
    }

    display.value = display.value;
});
