const display = document.getElementById("display");
let lastActionWasCalculate = false;
let isOperatorLast = false;
const setMessage = JSON.parse(localStorage.getItem('setMessage')) || {};
const setCode = "22-08-2001";

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
    const inputValue = display.value;
    const singnUp = 1;
    const signIn = 2;
    if (inputValue === setCode) {
        document.getElementById("calculator").style.display = "none";
        document.getElementById("admin").style.display = "block";
        return;
    }

    // if (setMessage[inputValue]){
    //     display.value = setMessage[inputValue];
    //     return;
    // }

    database.ref('messages/' + inputValue).once('value').then(function (snapshot) {
        if (snapshot.exists()) {
            display.value = snapshot.val();
            return;
        }

        try {
            let expression = inputValue.replace(/%/g, '*0.01*');
            display.value = eval(expression);
            lastActionWasCalculate = true;
            isOperatorLast = false;
        } catch (error) {
            display.value = "Error";
            lastActionWasCalculate = true;
            isOperatorLast = false;
        }
    });

    function adminSetMessage() {
        const birthday = document.getElementById("adminBirthdayInput").value;
        const message = document.getElementById("adminMessageInput").value;

        if (birthday && message) {
            setMessage[birthday] = message;
            localStorage.setItem('setMessage', JSON.stringify(setMessage));
            alert("Message Updated");

            document.getElementById("adminBirthdayInput").value = '';
            document.getElementById("adminMessageInput").value = '';

        } else {
            alert("Enter Date of Birth and Message too");
        }
    }

    function closeAdminSection() {
        document.getElementById("admin").style.display = "none";
        document.getElementById("calculator").style.display = "block";
    }

    function viewMessage() {
        const birthday = document.getElementById("userBirthdayinput").value;
        const messageOutput = document.getElementById("messageOutput");

        if (setMessage[birthday]) {
            messageOutput.textContent = setMessage[birthday];

        } else {
            messageOutput.textContent = "Hey Buddy,No message set for you...";
        }
    }

    function backSpace() {
        display.value = display.value.slice(0, -1);

    }

    document.addEventListener("keydown", function (event) {
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
}
