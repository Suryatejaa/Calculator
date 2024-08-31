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


    button.forEach(btn => {
        btn.addEventListener('touchend', function () {
            setTimeout(() => btn.classList.remove('active'), 200);
        });
    });

    window.onload = function () {
        setTimeout(() => {
            themeToggle.classList.add('shrink');

            for (let k = 0; k < themeText.length; k++) {
                themeText[k].classList.add('c');
            }
        }, 500);
    };

    themeToggle.addEventListener('click', () => {
        bodyElement.classList.toggle('l');
        calTheme.classList.toggle('l');
        outerBlock.classList.toggle('l');
        equatBtn.classList.toggle('l');
        // button.classList.toggle('l');
        display.classList.toggle('l');


        for (let i = 0; i < operetorBtn.length; i++) {
            operetorBtn[i].classList.toggle('l');
        }

        if (themeToggle.classList.contains('l')) {
            themeToggle.classList.remove('l');
        }
        else {
            themeToggle.classList.add('l');
        }
    });

});