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


    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        bodyElement.classList.add(savedTheme);
        calTheme.classList.add(savedTheme);
        outerBlock.classList.add(savedTheme);
        equatBtn.classList.add(savedTheme);
        display.classList.add(savedTheme);
        themeToggle.classList.add(savedTheme);

        Array.from(operetorBtn).forEach(btn => btn.classList.add(savedTheme));
        Array.from(themeText).forEach(text => text.classList.add('c'));

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


            Array.from(operetorBtn).forEach(btn => btn.classList.add('l'));
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

            Array.from(operetorBtn).forEach(btn => btn.classList.remove('l'));
            Array.from(themeText).forEach(text => text.classList.add('c'));

            themeToggle.classList.add('shrink');
            localStorage.removeItem('theme');
        }
    });

});