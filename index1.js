// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB2HRfN-hVJgtAZqAG-k2Ot5bTc0prvpVE",
    authDomain: "calculator-surya.firebaseapp.com",
    projectId: "calculator-surya",
    storageBucket: "calculator-surya.appspot.com",
    messagingSenderId: "397004330048",
    appId: "1:397004330048:web:88e8d69e1446270fc0fba5",
    measurementId: "G-FH817MH6R8",
    databaseURL: "https://calculator-surya-default-rtdb.firebaseio.com/"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
database.ref("List/" + "Targets").set({
    name: "niel",
    state: "alive"
});


const display = document.getElementById("display");
let lastActionWasCalculate = false;
let isOperatorLast = false;
const setCode = "22-08-2001";
const operators = '+-*/%';

function appendToDisplay(input) {
    requestAnimationFrame(() => {

        const isOperator = operators.includes(input);

        if ((display.value === '' || lastActionWasCalculate) && !isOperatorLast && !'+-*/%'.includes(input)) {
            display.value = input;
            lastActionWasCalculate = false;
            isOperatorLast = false;
        } else if (lastActionWasCalculate && '+-*/%'.includes(input)) {
            display.value += input;
            lastActionWasCalculate = false;
            isOperatorLast = true;
        } else {

            if (isOperator && isOperatorLast) {
                display.value = display.value.slice(0, -1);
            }

            display.value += input;
            isOperatorLast = '+-*/%'.includes(input);
            if (lastActionWasCalculate && '+-*/'.includes(input)) {
                lastActionWasCalculate = false;
            }
        }
    });
}

function clearDisplay() {
    display.value = "";
    lastActionWasCalculate = false;
    isOperatorLast = false;
}

function isMathExpression(input) {
    return /[\d+\-*/()%]/.test(input);
}

function calculate() {
    const inputValue = display.value;



    if (inputValue === setCode) {
        document.getElementById("calculator").style.display = "none";
        document.getElementById("admin").style.display = "block";
        document.getElementById("outblock").style.display = "none";
        return;
    }

    if (inputValue.includes('.')) {
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
    } else if (isMathExpression) {
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
        lastActionWasCalculate = true;
    }

}

function adminSetMessage() {
    const birthday = document.getElementById("adminBirthdayInput").value;
    const message = document.getElementById("adminMessageInput").value;

    if (birthday && message) {
        database.ref('messages/' + birthday).set(message, function (error) {
            if (error) {
                alert("Message could not be set: " + error.message);
            } else {
                alert("Message set successfully!");
                document.getElementById("adminBirthdayInput").value = '';
                document.getElementById("adminMessageInput").value = '';
            }
        });
    } else {
        alert("Enter code and Message too");
    }
}

function closeAdminSection() {
    document.getElementById("admin").style.display = "none";
    document.getElementById("calculator").style.display = "block";
    document.getElementById("outblock").style.display = "block";
    clearDisplay();

}

function viewMessage() {
    const birthday = document.getElementById("userBirthdayinput").value;
    const messageOutput = document.getElementById("messageOutput");

    if (birthday) {
        database.ref('messages/' + birthday).once('value').then(function (snapshot) {
            if (snapshot.exists()) {
                messageOutput.textContent = snapshot.val();
            } else {
                messageOutput.textContent = "Hey Buddy, No message set for you...";
            }
        });
    } else {
        alert("Enter the code");
    }
}

function backSpace() {
    display.value = display.value.slice(0, -1);
}

let debounceTimeout;
document.addEventListener("keydown", function (event) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
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
            backSpace();
        }
    }, 100);
});

window.appendToDisplay = appendToDisplay;
window.clearDisplay = clearDisplay;
window.calculate = calculate;
window.adminSetMessage = adminSetMessage;
window.closeAdminSection = closeAdminSection;
window.viewMessage = viewMessage;
window.backSpace = backSpace;

