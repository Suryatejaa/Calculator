const display = document.getElementById("display");
let lastActionWasCalculate = false;
let isOperatorLast = false;

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
    try {
        display.value = eval(display.value);
        lastActionWasCalculate = true;
        isOperatorLast = false;
    } catch (error) {
        display.value = "Error";
        lastActionWasCalculate = true;
        isOperatorLast = false;
    }
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
