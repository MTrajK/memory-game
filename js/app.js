(function() {

    var menu = {
        selector: document.querySelector('#menu'),
        buttons: document.querySelectorAll('#menu button')
    };
    var time = {
        selector: document.querySelector('#time'),
        current: document.querySelector('#time-current'),
        best: document.querySelector('#time-best')
    };
    var gameContainer = document.querySelector('#game-container');
    var endButtons = {
        selector: document.querySelector('#end-buttons'),
        menu: document.querySelector('#end-menu'),
        try: document.querySelector('#end-try')
    };
    var modal = {
        background: document.querySelector('#modal-background'),
        container: document.querySelector('#modal-container'),
        text: document.querySelector('#modal-text'),
        button: document.querySelector('#modal-button')
    };

    var levels = {
        easy: {
            numFields: 9,
            numLights: 4,
            showingTime: 1300
        },
        normal: {
            numFields: 16,
            numLights: 6,
            showingTime: 1800
        },
        hard: {
            numFields: 25,
            numLights: 10,
            showingTime: 2300
        }
    }

    // helpers
    function hide(element) {
        element.style.display = 'none';
    }

    function show(element) {
        element.style.display = 'block';
    }

    function convertTime(t) {
        var sec = parseInt(t / 1000);
        var millsec = parseInt((t % 1000) / 10);
        if (millsec < 10)
            millsec = `0${millsec}`;

        return `${sec}.${millsec}`;
    }

    // time
    var level, timer, localStorageTime, timerInterval;

    function createTimer() {
        timerInterval = setInterval(function() {
            timer += 10;
            time.current.innerHTML = convertTime(timer);
        }, 10);
    }

    function adjustTimer() {
        timer = 0;
        localStorageTime = localStorage.getItem(`MemoryGame.${level}`);

        time.current.innerHTML = '/';
        if (localStorageTime === null)
            time.best.innerHTML = '/';
        else {
            localStorageTime = parseInt(localStorageTime);
            time.best.innerHTML = convertTime(localStorageTime);
        }
    }

    function endGame(win) {
        clearInterval(timerInterval);

        if (win) {
            modal.text.innerHTML = 'Congratulations, you win!!!';

            if ((localStorageTime === null) || (localStorageTime > timer)) {
                modal.text.innerHTML = 'Congratulations, new record!!!';
                time.best.innerHTML = time.current.innerHTML;
                localStorage.setItem(`MemoryGame.${level}`, timer);
            }
        } else
            modal.text.innerHTML = 'You lose.';

        setTimeout(function () {
            show(modal.background);
            show(endButtons.selector);;
        }, win ? 500 : 1000);
    }

    // menu buttons
    menu.buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            level = button.getAttribute('id');
            Game.start(levels[level], level, gameContainer, createTimer, endGame);

            hide(menu.selector);
            show(gameContainer);
            show(time.selector);

            adjustTimer();
        })
    });

    // end buttons
    endButtons.menu.addEventListener('click', function () {
        hide(time.selector);
        hide(gameContainer);
        hide(endButtons.selector);
        show(menu.selector);
    });
    endButtons.try.addEventListener('click', function () {
        hide(endButtons.selector);

        Game.restart();

        adjustTimer();
    });

    // modal
    modal.background.addEventListener('click', function () {
        hide(modal.background);
    });
    modal.container.addEventListener('click', function (event) {
        event.stopPropagation();
    });
    modal.button.addEventListener('click', function () {
        hide(modal.background);
    });

}());