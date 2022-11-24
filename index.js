var buttonColor = ["red","blue","yellow","green"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})

// Detecting the click and adding the voice to that
$(".btn").click(function(){
  var userClicked = $(this).attr("id");
  userClickedPattern.push(userClicked);
  // console.log(userClickedPattern);
  playSound(userClicked);
  animate(userClicked);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("SUCCESS");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function (){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// play sound function
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Getting the random next sequence
function nextSequence(){
  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var choosenColor = buttonColor[randomNumber];
  gamePattern.push(choosenColor);
  $("#" + choosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(choosenColor);
};

function animate(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
