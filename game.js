
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Listener to check if a keyboard button is pressed to start the game
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Listener to determine which button is pressed when a user clicks a button
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id"); // Uses jQuery to grab the id (color) of the button pressed. 
  userClickedPattern.push(userChosenColour); // Adds color to the array of colors picked


  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { // Checks if correct button is pressed
      if (userClickedPattern.length === gamePattern.length){ // Checks if last button in current sequence is pressed
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else { // If incorrect button was pressed
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  // Picks random number (0-3) that corresponds to a color
  var randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColour);
  
  // Uses jQuery to select a button from the document. Since each button has an id value of their color 
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// function playSound(name) {
//   var audio = new Audio("sounds/" + name + ".mp3");
//   audio.play();
// }

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
