(function () {
    var game = document.querySelector('#game');
    var time = document.querySelector('#time');
    var menu = document.querySelector('#menu');
    var currentTime = document.querySelector('#current-time');
    var bestTime = document.querySelector('#best-time');
    var btnMenu = document.querySelector('#btn-menu');
    var btnTry = document.querySelector('#btn-try');
    var gameBtns = document.querySelector('#game-buttons');
    var modalBackground = document.querySelector('#modal-background');
    var modal = document.querySelector('#modal');
    var closeModal = document.querySelector('#close-modal');
    var modalText = document.querySelector('#modal-text');

    var fields = [];
    var start = false;
    var pressed = 0;
    var level = undefined;
    var timer = 0;
    var localStorageTime = undefined;
    var timerInterval = undefined;
    var gameOptions = {
        numLights: undefined,
        numFields: undefined,
        showingTime: undefined
    };

    var StopGame = function () {
        clearInterval(timerInterval);
        timer = 0;

        fields.forEach(function (field) {
            field.classList.add('stop');
        });
    };

    var FieldAddEventListeners = function (field) {
        field.addEventListener('click', function () {
            if (start && !field.classList.contains('stop')) {
                if (field.classList.contains('light')) {
                    field.classList.add('stop');
                    pressed++;
                    
                    field.classList.add('win-transition');
                    field.style.backgroundColor = '#ffce75';

                    if (pressed == gameOptions.numLights) {
                        modalText.innerHTML = 'Congratulations, you won!!!';
                        if ((localStorageTime === null) || (localStorageTime > timer)) {
                            if (localStorageTime !== null)
                                modalText.innerHTML = 'Congratulations, new record!!!';
                            localStorage.setItem(`MemoryGame.${level}`, timer);
                            bestTime.innerHTML = currentTime.innerHTML;
                        }

                        StopGame();
                        
                        setTimeout(function () {
                            gameBtns.style.display = 'block';
                            modalBackground.style.display = 'block';
                        }, 500);
                    }
                } else {
                    StopGame();

                    field.classList.add('lost-transition');
                    field.style.backgroundColor = '#ff5c81';
                    modalText.innerHTML = 'You lost.';

                    setTimeout(function () {
                        fields.forEach(function (innerField) {
                            if (innerField.classList.contains('light') && !innerField.classList.contains('win-transition')) {
                                innerField.classList.add('miss-transition');
                                innerField.style.backgroundColor = '#ffffc2'
                            }
                        });
                    }, 500);

                    setTimeout(function () {
                        gameBtns.style.display = 'block';
                        modalBackground.style.display = 'block';
                    }, 1000);
                }
            }
        });

        field.addEventListener('mouseenter', function () {
            if (start && !field.classList.contains('stop'))
                field.style.backgroundColor = '#56ccde';
        });
        
        field.addEventListener('mouseleave', function () {
            if (start && !field.classList.contains('stop'))
                field.style.backgroundColor = '#5bc0de';
        });
    };

    var ConvertTime = function (t) {
        var sec = parseInt(t / 1000);
        var millsec = parseInt((t % 1000) / 10);
        if (millsec < 10)
            millsec = `0${millsec}`;
        
        return `${sec}.${millsec}`;
    };

    var StartGame = function () {
        start = false;
        pressed = 0;
        game.innerHTML = '';
        fields = [];

        currentTime.innerHTML = '0.00';
        localStorageTime = localStorage.getItem(`MemoryGame.${level}`);
        if (localStorageTime === null)
            bestTime.innerHTML = '/';
        else {
            localStorageTime = parseInt(localStorageTime);
            bestTime.innerHTML = ConvertTime(localStorageTime);
        }

        for (var i = 0; i < gameOptions.numFields; i++) {
            var newField = document.createElement('div');
            newField.classList.add('field');

            FieldAddEventListeners(newField);

            var newElement = document.createElement('div');
            newElement.classList.add('field-' + level);
            newElement.appendChild(newField);

            game.appendChild(newElement);
            fields.push(newField);
        }

        var i = 0;
        while (i < gameOptions.numLights) {
            var rand = Math.round(Math.random() * 100) % gameOptions.numFields;

            if (!fields[rand].classList.contains('light')) {
                fields[rand].classList.add('light');
                i++;
            }
        }
        
        menu.style.display = 'none';
        game.style.display = 'block';
        time.style.display = 'block';

        setTimeout(function () {
            fields.forEach(function (field) {
                if (field.classList.contains('light')) {
                    field.style.backgroundColor = '#ffce75';
    
                    setTimeout(function () {
                        field.style.backgroundColor = '#5bc0de';
                    }, gameOptions.showingTime * 1.3);
                }
            });
        }, 
        // execute this after the StartGame function is completed 
        // (add this in stack, the game element should be shown by the DOM for the css animations)
        0); 

        setTimeout(function () {
            start = true;
            fields.forEach(function (field) {
                field.style.cursor = 'pointer';
                field.classList.add('no-transition');
            });
            timerInterval = setInterval(function () {
                timer += 10;
                currentTime.innerHTML = ConvertTime(timer);
            }, 10);
        }, gameOptions.showingTime * 2.3);
    };

    document.querySelectorAll('#menu button').forEach(function (button) {
        button.addEventListener('click', function () {
            level = button.getAttribute('id');
    
            switch (level) {
                case 'easy':
                    gameOptions.numFields = 9;
                    gameOptions.numLights = 4;
                    gameOptions.showingTime = 1300;
                    break;
                case 'normal':
                    gameOptions.numFields = 16;
                    gameOptions.numLights = 6;
                    gameOptions.showingTime = 1800;
                    break;
                case 'hard':
                    gameOptions.numFields = 25;
                    gameOptions.numLights = 10;
                    gameOptions.showingTime = 2300;
                    break;
            }
    
            StartGame();
        });
    });

    btnMenu.addEventListener('click', function () {
        game.style.display = 'none';
        time.style.display = 'none';
        gameBtns.style.display = 'none';
        menu.style.display = 'block';
    });

    btnTry.addEventListener('click', function () {
        StartGame();
    });

    modalBackground.addEventListener('click', function () {
        modalBackground.style.display = 'none';
    });

    modal.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    closeModal.addEventListener('click', function () {
        modalBackground.style.display = 'none';
    });
})();