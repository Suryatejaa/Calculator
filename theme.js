document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themebtn');
    const themeText = document.getElementsByClassName('theme');
    const calTheme = document.getElementById('calculator');
    const bodyElement = document.body;
    const button = document.querySelectorAll('button');
    const operetorBtn = document.getElementsByClassName('operator-btn');
    const equatBtn = document.getElementById('equal-btn');
    const outerBlock = document.getElementById('outblock');
    const display = document.getElementById('display');
    const adminBlock = document.getElementById('admin');
    const adminBtn = document.getElementsByClassName('msg-btn');
    const welcome = document.getElementById('welcome')
    const inputFields = [
        { input: document.getElementById('adminBirthdayInput'), tooltip: document.getElementById('adminInputTooltip'), type: 'general' },
        { input: document.getElementById('userBirthdayinput'), tooltip: document.getElementById('userInputTooltip'), type: 'general' },
        { input: document.getElementById('adminpCode'), tooltip: document.getElementById('adminpCodeTooltip'), type: 'passcode' },
        { input: document.getElementById('userpCode'), tooltip: document.getElementById('userpCodeTooltip'), type: 'passcode' },
        { input: document.getElementById('adminMessageInput'), tooltip: document.getElementById('textareaTooltip'), type: 'message' },

    ];


    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        bodyElement.classList.add(savedTheme);
        calTheme.classList.add(savedTheme);
        outerBlock.classList.add(savedTheme);
        equatBtn.classList.add(savedTheme);
        display.classList.add(savedTheme);
        themeToggle.classList.add(savedTheme);
        adminBlock.classList.add(savedTheme);

        Array.from(operetorBtn).forEach(btn => btn.classList.add(savedTheme));
        Array.from(themeText).forEach(text => text.classList.add('c'));
        Array.from(adminBlock).forEach(btn => btn.classList.add(savedTheme));

        if (savedTheme === 'light') {
            themeToggle.classList.add('shrink');
        }
    }

    button.forEach(btn => {
        btn.addEventListener('touchend', function () {
            setTimeout(() => btn.classList.remove('active'), 200);
        });
    });



    window.onload = function () {
        setTimeout(() => {
            themeToggle.classList.add('shrink');

            Array.from(themeText).forEach(text => text.classList.add('c'));
        }, 500);
    };

    themeToggle.addEventListener('click', () => {

        const currentTheme = bodyElement.classList.contains('l') ? 'light' : 'default';
        if (currentTheme === 'default') {
            bodyElement.classList.add('l');
            calTheme.classList.add('l');
            outerBlock.classList.add('l');
            equatBtn.classList.add('l');
            display.classList.add('l');
            themeToggle.classList.add('l');
            adminBlock.classList.add('l');
            welcome.classList.add('l');


            Array.from(operetorBtn).forEach(btn => btn.classList.add('l'));
            Array.from(adminBtn).forEach(btn => btn.classList.add('l'));
            Array.from(themeText).forEach(text => text.classList.add('c'));

            themeToggle.classList.add('shrink');
            // themeText.classList.add('c')
            localStorage.setItem('theme', 'light');

        } else {
            bodyElement.classList.remove('l');
            calTheme.classList.remove('l');
            outerBlock.classList.remove('l');
            equatBtn.classList.remove('l');
            display.classList.remove('l');
            themeToggle.classList.remove('l');
            adminBlock.classList.remove('l');
            welcome.classList.remove('l');

            Array.from(operetorBtn).forEach(btn => btn.classList.remove('l'));
            Array.from(adminBtn).forEach(btn => btn.classList.remove('l'));
            Array.from(themeText).forEach(text => text.classList.add('c'));

            themeToggle.classList.add('shrink');
            localStorage.removeItem('theme');
        }
    });

    const validChars = /^[0-9+\-*/%]*$/;
    const validPcodeChars = /^[0-9+\-*/%]*$/;

    // Function to validate input
    function validInput(event, tooltip) {
        const inputValue = event.target.value;

        if (validChars.test(inputValue)) {
            // If input is valid, remove invalid class and hide the tooltip
            event.target.classList.remove('invalid-input');
            tooltip.classList.add('hide');
            tooltip.style.display = 'none'; // Hide tooltip
        } else {
            // If input is invalid, add invalid class and show the tooltip
            event.target.classList.add('invalid-input');
            tooltip.classList.remove('hide');
            tooltip.style.display = 'inline-block'; // Show tooltip

            // Remove the last invalid character
            event.target.value = inputValue.slice(0, -1);

            setTimeout(function () {
                event.target.classList.remove('invalid-input');
                tooltip.classList.add('hide');

            }, 1000);
        }
    }

    function validPCode(event, tooltip) {
        const inputValue = event.target.value;

        if (validPcodeChars.test(inputValue) && inputValue.length <= 4) {
            // If input is valid, remove invalid class and hide the tooltip
            event.target.classList.remove('invalid-input');
            tooltip.classList.add('hide');
            tooltip.style.display = 'none'; // Hide tooltip
        } else {
            // If input is invalid, add invalid class and show the tooltip
            event.target.classList.add('invalid-input');
            tooltip.classList.remove('hide');
            tooltip.style.display = 'inline-block'; // Show tooltip

            // Remove the last invalid character
            event.target.value = inputValue.slice(0, -1);

            setTimeout(function () {
                event.target.classList.remove('invalid-input');
                tooltip.classList.add('hide');

            }, 1000);
        }
    }

    function messageToottip(event, tooltip) {
        const inputValue = event.target.value
        
        event.target.classList.add('valid-input')
        tooltip.classList.remove('hide')
        tooltip.style.display = "inline-block"
        
        setTimeout(function () {
            event.target.classList.remove('valid-input')
            tooltip.classList.add('hide')
        },800)
    }


    // Convert inputFields array to an array of DOM elements
    Array.from(inputFields).forEach(function (field) {
        if (field.input) {
            // Correctly reference field.input when adding event listener
            field.input.addEventListener('input', function (event) {

                if (field.type == 'passcode') {
                    validPCode(event, field.tooltip);
                }
                else if (field.type == 'general'){
                    validInput(event, field.tooltip);
                }
                else if(field.type == 'message') {
                    messageToottip(event, field.tooltip);
                }
            });
        } else {
            console.error('Input field not found for: ', field);
        }
    });

    function clearInput(inputId) {
        alert('Hello')
        document.getElementById(inputId).value = '';
    }

    const textareaTooltip = document.getElementById('adminMessageInput');
    const tooltip = document.getElementById('textareaTooltip');

    textareaTooltip.addEventListener('input', function () {
        tooltip.classList.add('show');
    });
});