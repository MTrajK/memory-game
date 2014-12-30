$("#game").hide();

var array = new Array();
var start = false;
var pressed = 0;
var light;

// za da moze da se pritiska
setTimeout(function () {
    start = true;
}, 5500);

$("button").click(function(){
    var fields;
    var level = $(this).attr("id");

    switch (level){
        case "easy":
            fields = 9;
            light = 4;
            break;
        case "normal":
            fields = 16;
            light = 6;
            break;
        case "hard":
            fields = 25;
            light = 10;
            break;
    }

    var game = $("#game");

    for (var i=0; i<fields; i++){
        var newFi = $("<div class='field'></div>");
        var newEl = $("<div></div>").addClass("field-"+level).append(newFi);
        game.append(newEl);
        array.push(newFi);
    }

    var i=0;
    while (i<light){
        var rand = Math.round(Math.random()*100)%fields;
        if (!array[rand].hasClass("light")){
            array[rand].addClass("light");
            i++;
        }
    }

    for (var i=0; i<fields; i++)
        if (array[i].hasClass("light")) {
            array[i].animate({
                backgroundColor: "#ffce75"      // vaka da se animiraat pozadinite samo preku jquery ui moze
            }, 1000, function () {
                $(this).animate({
                    backgroundColor: "#5bc0de"
                }, 3500)
            });
        }

    $("#menu").hide();
    $("#game").show();
});

$("#game").on("click", ".field", function(){
    if (start && ! $(this).hasClass("stop")){
        if ($(this).hasClass("light")) {
            $(this).addClass("stop");
            pressed++;

            $(this).animate({
                backgroundColor: "#ffce75"
            }, 500, function(){
                if (pressed == light)
                    alert("Победивте!!");
            });

            if (pressed == light)
                start = false;  // ova treba da stoi nadvor, za da se onevozmozi pritiskanje od kako ke zavrski

        } else {
            $(this).animate({
                backgroundColor: "#ff5c81"
            }, 500, function(){
                alert("Изгубивте!!"); // za da poceka da se napravi animacijata prvo
            });

            start = false;
        }
    }
});

$("#game").on("mouseenter", ".field", function(){
    if (start  && ! $(this).hasClass("stop"))
        $(this).css("background-color", "#56ccde");
});

$("#game").on("mouseleave", ".field", function(){
    if (start  && ! $(this).hasClass("stop"))
        $(this).css("background-color", "#5bc0de");
});