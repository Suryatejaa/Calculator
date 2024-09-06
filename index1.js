// Initialize Firebase
//import { evaluate } from './node_modules/mathjs/lib/esm/index.js';


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
const setCode = "99";
const operators = '+-*/%';

function appendToDisplay(input) {
    requestAnimationFrame(() => {

        const isOperator = operators.includes(input);

        if (isAwaitingPasscode && display.value.length >= 4) {
            return;
        }

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

        display.scrollTop = display.scrollHeight;
    });
}
const headerText = document.querySelector('.welcome');
function clearDisplay() {
    display.value = "";
    lastActionWasCalculate = false;
    isOperatorLast = false;
    headerText.innerHTML = "itz Not just <br> A Calculator...";
}

function isMathExpression(input) {
    return /[\d+\-*/()%]/.test(input);
}

function clear99BlockInputs() {

    document.getElementById("adminBirthdayInput").value = '';
    document.getElementById("userBirthdayinput").value = '';
    document.getElementById("adminpCode").value = '';
    document.getElementById("userpCode").value = '';
    // document.getElementById("messageoutput").value = '';
}

let isAwaitingPasscode = false;
let currentUCode = '';
let changeHeaderTextFun = false;

const calculator = document.getElementById("calculator");
const admin = document.getElementById("admin");
const outblock = document.getElementById("outblock");

//showElement('calculator','outblock'); // Ensure calculator is visible
//showElement('outblock');  

function showElement(...elementIds) {
    const allelements = ['calculator', 'admin', 'outblock'];
    allelements.forEach(id => {
        const element = document.getElementById(id);
        if (elementIds.includes(id)) {
            element.classList.add('show');
            element.classList.remove('hide');
        } else {
            element.classList.add('hide');
            element.classList.remove('show');
        }
    });
}


function calculate() {
    const inputValue = display.value;
    const headerText = document.querySelector('.welcome');


    if (inputValue === setCode) {
        calculator.classList.add('hide');
        outblock.classList.add('hide');
        admin.classList.add('show');

        //showElement('admin')

        clear99BlockInputs();
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

        if (!isAwaitingPasscode) {
            database.ref('messages/' + inputValue).once('value').then(function (snapshot) {
                if (snapshot.exists()) {

                    headerText.innerHTML = "What's the <br> pCode";
                    currentUCode = inputValue;
                    isAwaitingPasscode = true;
                    display.value = '';
                } else {
                    try {
                        let expression = inputValue.replace(/%/g, '*0.01*');
                        display.value = math.evaluate(expression);
                        lastActionWasCalculate = true;
                        isOperatorLast = false;
                    } catch (error) {
                        display.value = "Error";
                        lastActionWasCalculate = true;
                        isOperatorLast = false;
                    }
                    headerText.innerHTML = "itz Not just <br> A Calculator...";
                }
            });
        } else {
            const pCode = inputValue;

            database.ref('messages/' + currentUCode).once('value').then(function (snapshot) {
                const data = snapshot.val();
                if (data.pCode === pCode) {
                    if (Date.now() < data.expiry) {
                        display.value = data.message;
                        displayMessage(document.getElementById('display'), data.message);
                        headerText.innerHTML = "Here's U R <br> Message:";

                        isAwaitingPasscode = false;
                        changeHeaderTextFun = true;


                    } else {
                        display.value = "Message expired";
                        headerText.innerHTML = "Message expired";
                        database.ref('messages/' + inputValue).remove();
                    }
                } else {
                    display.value = 'Incorrect pCode';
                    headerText.innerHTML = "Try <br> Again!";
                    isAwaitingPasscode = false;
                    changeHeaderTextFun = true;

                }
                setTimeout(() => {
                    headerText.innerHTML = "itz Not just <br> A Calculator...";
                    isAwaitingPasscode = false;
                    currentUCode = '';
                    //display.value = '';
                }, 1000);
            });

        }

    };
    lastActionWasCalculate = true;
}



// function changeHeaderText() {
//     const headerText = document.querySelector('.welcome')
//     headerText.innerHTML = "Not just <br> A Calculator...";
//     isAwaitingPasscode = false;
//     currentUCode = '';
//     display.value = '';
// }



function adminSetMessage() {
    const uCode = document.getElementById("adminBirthdayInput").value;
    const pCode = document.getElementById("adminpCode").value;
    const message = document.getElementById("adminMessageInput").value;


    if (uCode && pCode && message) {
        const expiryTime = Date.now() + 24 * 60 * 60 * 1000;
        database.ref('messages/' + uCode).set({
            pCode: pCode,
            message: message,
            expiry: expiryTime
        }, function (error) {
            if (error) {
                alert("Message could not be set: " + error.message);
            } else {
                alert("Message set successfully!");
                document.getElementById("adminBirthdayInput").value = '';
                document.getElementById("adminpCode").value = '';
                document.getElementById("adminMessageInput").value = '';
            }
        });
    } else {
        alert("Enter code and Message too");
    }
}

function closeAdminSection() {

    calculator.classList.remove('hide');
    outblock.classList.remove('hide');
    admin.classList.remove('show');

    // showElement('calculator','outblock')
    // // showElement('outblock')
    // const admin = document.getElementById('admin');
    // admin.classList.add('hide')
    messageOutput.textContent = "";
    clearDisplay();

}

function displayMessage(element, message) {
    //const messageOutput = document.getElementById("messageOutput");
    element.textContent = message;
    element.scrollTop = 0;

    let scrollInterval;
    const scrollSpeed = 25;
    const scrollStep = 1;
    let isUserIntracting = false;

    function startScrolling() {
        scrollInterval = setInterval(() => {
            if (!isUserIntracting && element.scrollTop < element.scrollHeight - element.clientHeight) {
                element.scrollTop += scrollStep;
            } else {
                clearInterval(scrollInterval);
            }
        }, scrollSpeed);
    }

    function detectUser(event) {
        isUserIntracting = true;
        clearInterval(scrollInterval);

        // if (event.type === 'touchstart') {
        //     event.preventDefault();
        // }
    }

    function allowUserIntreraction(event) {
        isUserIntracting = false;
        //event.preventDefault();
    }

    element.addEventListener('mousedown', detectUser);
    element.addEventListener('touchstart', detectUser, { passive: false }); 
    element.addEventListener('wheel', detectUser);
    element.addEventListener('keydown', detectUser);
    //element.addEventListener('scroll', detectUser)

    element.addEventListener('mouseup', allowUserIntreraction);
    element.addEventListener('touchend', allowUserIntreraction, { passive: false });

    startScrolling();
}



function viewMessage() {
    const uCode = document.getElementById("userBirthdayinput").value;
    const pCode = document.getElementById("userpCode").value;
    const messageOutput = document.getElementById("messageOutput");

    if (uCode && pCode) {
        database.ref('messages/' + uCode).once('value').then(function (snapshot) {
            if (snapshot.exists()) {
                const data = snapshot.val();
                if (data.pCode === pCode) {
                    if (Date.now() < data.expiry) {
                        displayMessage(messageOutput, data.message);
                        //messageOutput.textContent = data.message;
                        //messageOutput.scrollTop = messageOutput.scrollHeight;
                    } else {
                        messageOutput.textContent = "Message has expired.";
                        database.ref('messages/' + uCode).remove();
                    }
                } else {
                    messageOutput.textContent = "Incorrect passcode.";
                }
            } else {
                messageOutput.textContent = "Hey Buddy, No message set for you...";
            }
        });
    } else {
        alert("Enter the uCode and pCode");
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

        // if (changeHeaderTextFun) {
        //     changeHeaderText()
        // }

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

