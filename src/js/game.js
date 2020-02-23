(function () {

    var fields, pressed, gameOptions, level, gameContainer, createTimer, endGame;

    function addClass(element, className) {
        element.classList.add(className);
    }

    function removeClass(element, className) {
        element.classList.remove(className);
    }

    function containsClass(element, className) {
        return element.classList.contains(className);
    }

    function stopGame(win) {
        fields.forEach(function (field) {
            removeClass(field, 'allowed');
        });

        endGame(win);
    }

    function fieldClickEventListener(field) {
        field.addEventListener('click', function () {
            if (!containsClass(field, 'allowed'))
                return;

            removeClass(field, 'allowed');

            if (containsClass(field, 'light')) {
                removeClass(field, 'light');
                addClass(field, 'correct-transition');

                pressed++;
                if (pressed == gameOptions.numLights)
                    // win
                    stopGame(true);
            } else {
                // lose
                addClass(field, 'wrong-transition');

                setTimeout(function () {
                    fields.forEach(function (innerField) {
                        if (containsClass(innerField, 'light'))
                            addClass(innerField, 'miss-transition');
                    });
                }, 500);

                stopGame(false);
            }
        });
    }

    function initGame() {
        gameContainer.innerHTML = '';

        fields = [];
        pressed = 0;

        for (var i = 0; i < gameOptions.numFields; i++) {
            // create all fields
            var newField = document.createElement('div');
            addClass(newField, 'field');
            addClass(newField, 'start');

            fieldClickEventListener(newField);

            var newElement = document.createElement('div');
            addClass(newElement, 'field-' + level);
            newElement.appendChild(newField);

            gameContainer.appendChild(newElement);
            fields.push(newField);
        }

        setTimeout(function () {
            // random choose fields
            var leftLights = gameOptions.numLights;
            var leftFields = gameOptions.numFields - 1;

            fields.forEach(function (field) {
                if (Math.random() < leftLights / leftFields) {
                    addClass(field, 'light');
                    addClass(field, 'shine');

                    leftLights--;
                }

                leftFields--;
            });
        }, 0);

        setTimeout(function () {
            // fade choosen fields
            fields.forEach(function (field) {
                removeClass(field, 'shine');
            });
        }, gameOptions.showingTime * 1.3);

        setTimeout(function () {
            // make clickable all fields
            fields.forEach(function (field) {
                removeClass(field, 'start');
                addClass(field, 'allowed');
            });

            createTimer();
        }, gameOptions.showingTime * 2.3);
    }

    function startGame(_gameOptions, _level, _gameContainer, _createTimer, _endGame) {
        gameOptions = _gameOptions;
        level = _level;
        gameContainer = _gameContainer;
        createTimer = _createTimer;
        endGame = _endGame;

        initGame();
    }

    window.Game = {
        start: startGame,
        restart: initGame
    };

}());