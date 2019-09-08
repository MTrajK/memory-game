# Memory Game

Simple responsive and mobile-friendlly browser game made in pure JS and CSS. 

[Play Game](https://mtrajk.github.io/Memory-Game/)

![alt text](https://raw.githubusercontent.com/MTrajK/Memory-Game/master/img/game_screenshot.png "Memory game screenshot")

### Goals

1. Experimenting with GitHub pages.
2. The idea of the first version was to experiment with [jQuery](https://jquery.com/). ([You can see the first solution here](https://github.com/MTrajK/Memory-Game/tree/master/js/jQuery%20solution))\
    But after several years I opened this project again and I noticed that I'm using less than 10 jQuery methods. And for those methods, I'm using 2 libraries in total ~330 kb...\
    Because of that, I changed those jQuery methods with vanilla JS and CSS. 
    * I replaced the famous jQuery dollar sign `$('selector')` with `document.querySelector('selector')`.
    * Instead of jQuery `element.animate()` I'm using CSS animations `transition: all 1.3s ease-in-out;`, and after that whenever the background-color is changed there is an animation.
    * For manipulating with CSS classes `element.addClass('class')` `element.removeClass('class')` `element.hasClass('class')` I'm using `element.classList.add('class')` `element.classList.remove('class')` `element.classList.contains('class')`.
    * For manipulating with CSS properties `element.css('property-name', 'value')` I'm using `element.style.propertyName = 'value`.
    * For creating elements `$('<div></div>')` I'm using `document.createElement('div')`.
    * I replaced `element.show()` and `element.hide()` with `element.style.display = 'block'` and `element.style.display = 'none'`.
    * And also I replaced event handlers `element.on('event', function)` with `element.addEventListener('event', function)`.
