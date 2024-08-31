document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themebtn');
    const calTheme = document.getElementById('calculator');
    const bodyElement = document.body;
    const buttons = document.querySelectorAll('.button');
    const operetorBtn = document.getElementsByClassName('operator-btn');
    const equatBtn = document.getElementById('equal-btn');
    const outerBlock = document.getElementById('outblock');
    const display = document.getElementById('display');



    themeToggle.addEventListener('click', () => {
        bodyElement.classList.toggle('l');
        calTheme.classList.toggle('l');
        outerBlock.classList.toggle('l');
        equatBtn.classList.toggle('l');
        // btn.classList.toggle('l');
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