var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var level = 0;
function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $("#level-title").html("Level " + level);
}

$(".btn").on("click", function () {
  var check = false;
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  var index = userClickedPattern.length - 1;
  checkAnswer(index);
});

function checkAnswer(index) {
  if (userClickedPattern[index] === gamePattern[index]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").html("Game over! Press any key to restart!");
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
    startOver();
  }
}
function animatePress(name) {
  var chosenButton = $("#" + name);
  chosenButton.addClass("pressed");
  setTimeout(function () {
    chosenButton.removeClass("pressed");
  }, 100);
}
$(document).on("keypress", function (event) {
  if (level == 0) {
    nextSequence();
  }
});
function startOver() {
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
}
