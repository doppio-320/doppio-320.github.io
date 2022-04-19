var popMinFrequency = 2;
var popMaxFrequency = 10;
var popDuration = 750;

var gameFrequency = 50;
var gameTime = 0;

var hole1NextPop = 1000;
var hole1Popped = false;
var hole1TimePopped;

var hole2NextPop = 1000;
var hole2Popped = false;
var hole2TimePopped;

var hole3NextPop = 1000;
var hole3Popped = false;
var hole3TimePopped;

var hole4NextPop = 1000;
var hole4Popped = false;
var hole4TimePopped;

var hole5NextPop = 1000;
var hole5Popped = false;
var hole5TimePopped;

var score = 0;
var miss = 0;

var musicStarted = false;
var gameStarted = false;
var gameEnded = false;

function playerReady() {
    if(gameStarted == true) {
        return;
    }

    gameStarted = true;

    setTimeout(() => {
        startGame();
    }, 6200);
    document.getElementById("gameStart").style.visibility = 'hidden';
    var audio = new Audio('audio/music.mp3');
    audio.play();
    audio.volume = 0.1;
    document.getElementById("score").style.visibility = "visible";
    document.getElementById("score").innerHTML = "Get Ready!";
    
    setTimeout(() => {
        endGame();
    }, 220000);
}

function startGame() {    
    setInterval(() => {
        iterate();
    }, gameFrequency);

     hole1NextPop = (randRange(popMinFrequency, popMaxFrequency)*1000);     
     hole2NextPop = (randRange(popMinFrequency, popMaxFrequency)*1000);     
     hole3NextPop = (randRange(popMinFrequency, popMaxFrequency)*1000);     
     hole4NextPop = (randRange(popMinFrequency, popMaxFrequency)*1000);     
     hole5NextPop = (randRange(popMinFrequency, popMaxFrequency)*1000);     
}

function iterate() {  
    if(gameEnded) {
        return;
    }
    
    gameTime += gameFrequency;    

    document.getElementById("score").innerHTML = "SCORE: " + score + " MISSES: " + miss;

    //Hole 1 processing
    if(gameTime > hole1NextPop && hole1Popped == false) {        
        hole1Popped = true;
        hole1TimePopped = gameTime;
        document.getElementById("hole1").src = "sprites/surprise.png";
    }

    if(hole1Popped == true) {
        if(gameTime > (hole1TimePopped + popDuration)) {
            hole1Popped = false;
            document.getElementById("hole1").src = "sprites/norm.png";
            hole1NextPop = gameTime + (randRange(popMinFrequency, popMaxFrequency)*1000);
            miss++;
        }
    }

    //Hole 2 processing
    if(gameTime > hole2NextPop && hole2Popped == false) {        
        hole2Popped = true;
        hole2TimePopped = gameTime;
        document.getElementById("hole2").src = "sprites/surprise.png";
    }

    if(hole2Popped == true) {
        if(gameTime > (hole2TimePopped + popDuration)) {
            hole2Popped = false;
            document.getElementById("hole2").src = "sprites/norm.png";
            hole2NextPop = gameTime + (randRange(popMinFrequency, popMaxFrequency)*1000);
            miss++;
        }
    }

    //Hole 3 processing
    if(gameTime > hole3NextPop && hole3Popped == false) {        
        hole3Popped = true;
        hole3TimePopped = gameTime;
        document.getElementById("hole3").src = "sprites/surprise.png";
    }

    if(hole3Popped == true) {
        if(gameTime > (hole3TimePopped + popDuration)) {
            hole3Popped = false;
            document.getElementById("hole3").src = "sprites/norm.png";
            hole3NextPop = gameTime + (randRange(popMinFrequency, popMaxFrequency)*1000);
            miss++;
        }
    }

    //Hole 4 processing
    if(gameTime > hole4NextPop && hole4Popped == false) {        
        hole4Popped = true;
        hole4TimePopped = gameTime;
        document.getElementById("hole4").src = "sprites/surprise.png";
    }

    if(hole4Popped == true) {
        if(gameTime > (hole4TimePopped + popDuration)) {
            hole4Popped = false;
            document.getElementById("hole4").src = "sprites/norm.png";
            hole4NextPop = gameTime + (randRange(popMinFrequency, popMaxFrequency)*1000);
            miss++;
        }
    }

    //Hole 5 processing
    if(gameTime > hole5NextPop && hole5Popped == false) {        
        hole5Popped = true;
        hole5TimePopped = gameTime;
        document.getElementById("hole5").src = "sprites/surprise.png";
    }

    if(hole5Popped == true) {
        if(gameTime > (hole5TimePopped + popDuration)) {
            hole5Popped = false;
            document.getElementById("hole5").src = "sprites/norm.png";
            hole5NextPop = gameTime + (randRange(popMinFrequency, popMaxFrequency)*1000);
            miss++;
        }
    }
}

function randRange(min, max) {
    return ((Math.random() * (max - min)) + min);
}

function hole1Bonk() {
    if(hole1Popped) {
        hole1Popped = false;
        hole1NextPop = gameTime + (randRange(popMinFrequency, popMaxFrequency)*1000);        
        successBonk("1");
    }
}

function hole2Bonk() {
    if(hole2Popped) {
        hole2Popped = false;        
        hole2NextPop = gameTime + (randRange(popMinFrequency, popMaxFrequency)*1000);
        successBonk("2");
    }
}

function hole3Bonk() {
    if(hole3Popped) {
        hole3Popped = false;    
        hole3NextPop = gameTime + (randRange(popMinFrequency, popMaxFrequency)*1000);        
        successBonk("3");
    }
}

function hole4Bonk() {
    if(hole4Popped) {
        hole4Popped = false;    
        hole4NextPop = gameTime + (randRange(popMinFrequency, popMaxFrequency)*1000);        
        successBonk("4");
    }
}

function hole5Bonk() {
    if(hole5Popped) {
        hole5Popped = false;    
        hole5NextPop = gameTime + (randRange(popMinFrequency, popMaxFrequency)*1000);        
        successBonk("5");
    }
}

function successBonk(hole) {
    new Audio('audio/bonk.mp3').play();
    document.getElementById("hole"+hole).src = "sprites/bonk.png";
    setTimeout(() => {
        document.getElementById("hole"+hole).src = "sprites/norm.png";
    }, 500);
    score++;
}

function endGame() {
    gameEnded = true;
    document.getElementById("gameStart").style.visibility = 'visible';
    document.getElementById("message").innerHTML = "Great Work! SCORE: " + score + " MISSED: " + miss;
    document.getElementById("score").style.visibility = 'hidden';
}