var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red","blue","green","yellow"];
var start = false;
var level = 0;
var clicked = 0;

function nextSequence() {
  level += 1;
  clicked = 0;
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  $("h1").text("level "+level);
}

$(".btn").click(function(e) {
  var userChosenColour = e.target.id;
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswers(clicked);
  clicked += 1;
});

$(document).keypress(function(event) {
  if (start == false) {
    reset();
    nextSequence();
  }
});
function reset()
{
  level=0;
  start=true;
  gamePattern=[];
}
function playSound(name) {
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor) {
  var btn = $("#" + currentColor);
  btn.addClass("pressed");
  setTimeout(function() {
       btn.removeClass("pressed");
   }, 100);
}


function checkAnswers(clicked) {
  if(userClickedPattern[clicked]!=gamePattern[clicked]) {
    playSound("wrong");
    $("h1").text("Game Over! Start again");
    start=false;
    $("body").addClass("game-over");
    setTimeout(function() {
         $("body").removeClass("game-over");
     }, 500);

  }
  else if(clicked + 1 == level) {
    setTimeout(function() {
      nextSequence()
    }, 700);
  }
}
