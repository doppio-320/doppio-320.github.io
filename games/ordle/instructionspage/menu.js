removeHintDeleteHS();
if(localStorage.getItem("highscore") === null) {
    localStorage.setItem("highscore", 0);
    document.getElementById("highScoreButton").innerHTML = "Highscore: " + localStorage.getItem("highscore");
}

function hintDeleteHS() {
    document.getElementById("highScoreButton").innerHTML = "Click to clear highscore";    
}

function deleteHS() {
    localStorage.setItem("highscore", 0);
    document.getElementById("highScoreButton").innerHTML = "Highscore: " + localStorage.getItem("highscore");
}

function removeHintDeleteHS() {
    document.getElementById("highScoreButton").innerHTML = "Highscore: " + localStorage.getItem("highscore");
}

function setMusicOption(value) {
    localStorage.setItem("musicOn", value);
}

function setTimeDifficulty(high, low) {
    localStorage.setItem("maxTime", high);
    localStorage.setItem("minTime", low);
}

function setSizeDifficulty(min, max) {
    localStorage.setItem("minSize", min);
    localStorage.setItem("maxSize", max);
    console.log("test");
}

function setMusicHighlight(el) {
    var objs = document.getElementsByClassName("musicOption");

    for(var i = 0; i < objs.length; i++) {
        objs[i].classList.remove("selectedButton");
    }

    el.classList.add("selectedButton");
}

function setTimeHighlight(el) {
    var objs = document.getElementsByClassName("timeOption");

    for(var i = 0; i < objs.length; i++) {
        objs[i].classList.remove("selectedButton");
    }

    el.classList.add("selectedButton");
}

function setSizeHighlight(el) {
    var objs = document.getElementsByClassName("sizeOption");

    for(var i = 0; i < objs.length; i++) {
        objs[i].classList.remove("selectedButton");
    }

    el.classList.add("selectedButton");
}

function playGame() {
    window.location.href = "../gamepage/game.html";
}