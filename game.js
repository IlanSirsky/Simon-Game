var buttonColors = ["red", "blue", "green", "yellow"];
var gamePatern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$(document).on("keypress", function () {
    if (!gameStarted){
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted = true;
    }
});

$("#start").on("click", function() {
    if (!gameStarted){
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted = true;
    }
});

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    userClickedPattern = [];

    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColor = buttonColors[randomNumber];
    gamePatern.push(randomChosenColor);

    playSound(randomChosenColor);
    playAnimation(randomChosenColor);
}

function playSound(name){
    var audio = new Audio("./sounds/" + name +".mp3");
    audio.play();
}

function playAnimation(colorChosen) {
    $('#' + colorChosen).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
}

function animatePress(colorChosen) {
    $('#' + colorChosen).addClass("pressed");
    setTimeout(() => {
        $('#' + colorChosen).removeClass("pressed");
    }, 100);
}

$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePatern[currentLevel] === userClickedPattern[currentLevel]) {
        if ((userClickedPattern.length) === gamePatern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
}

function startOver() {
    level = 0;
    gamePatern = [];
    gameStarted = false;
}