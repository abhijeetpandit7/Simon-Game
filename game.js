var gamePattern=[];
var userClickedPattern=[];
var buttonColors = ["red","blue","green","yellow"];
var started=false;
var level=0;

$(document).keydown(function(){
  if(!started){
    $("h1").html=("Level "+level);
    nextSequence();
    started=true;}
  });

$(".btn").click(function() {
  var userChosenColor=event.target.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
}
);

function nextSequence(){
  var randomChosenColor;
  var randomNumber;
  userClickedPattern=[];
  level++;
  $("h1").html("Level "+level);
  randomNumber = Math.floor(Math.random()*4);
  randomChosenColor = buttonColors[randomNumber];
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
  playSound(randomChosenColor);
}

function checkAnswer(currentLevel1){
  if(gamePattern[currentLevel1]===userClickedPattern[currentLevel1]){
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){nextSequence();},1000);
    }
  }
  else{
    $("h1").html("Game Over, Press any key to restart");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");},200);
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    startOver();
  }
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){$("#"+currentColor).removeClass("pressed");},100);
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function startOver(){
  started=false;
  level=0;
  gamePattern=[];
}
