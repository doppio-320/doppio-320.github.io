deck = [  
];

function randInt(min, max) {
    return Math.floor(min + (max - min) * Math.random());
}

function getRandomLetter() {
    return getAlphabetFromIndex(randInt(1, 27));
}

function getAlphabetFromIndex(int) {
    if(int < 1 || int > 26) {
        return '';
    }

    var lib = "abcdefghijklmnopqrstuvwxyz";
    
    return lib.charAt(int - 1);
}

function getIndexOfAlphabet(txt) {
    var result = "";

    var letter = txt.charAt(0).toUpperCase().charCodeAt(0);
    if(letter > 64 && letter < 91) {
        return letter - 64;        
    }
    console.error("Item is not in alphabet")
    return -1;
}

let isPlaying = false;

let defaultTime = 20; //Easy - 20/10, Medium - 15/9, Hard - 10/7
let lowestTime = 10; 
let roundsBeforeTimeLoss = 4;
let timeLeft = defaultTime;

let defaultDeckSize = 5; //Easy - 5/7, Medium 6/9, Hard - 8/10
let largestDeckSize = 7;
let currentDeckSize = defaultDeckSize;
let roundsBeforeDeckIncrease = 8;

let canEdit = false;
let editMode = false;
let currentSelection = 0;
let timeIsRunning = false;

let tickRate = 30;
let tickPeriod = 1/tickRate;
let tickPeriodMillis = tickPeriod * 1000;

let lastroundStart = null;
let slowestCompletionTime = 4;

let score = 0;
let highScore = 0;

let enableMusic = true;
let audio = new Audio("music/song1.mp3");

//First start
loadStorageData();
setupInput();
setInterval(function() {
    if(timeIsRunning) {
        timeLeft -= tickPeriod;    
        document.getElementById("timerBar").style = "width: calc(100% * " + (timeLeft / defaultTime).toString() + ")";

        if((timeLeft / defaultTime) < 0.15) {
            document.body.classList.add("lowTime");
        } else {
            document.body.classList.remove("lowTime");
        }
        
        if(timeLeft < 0) {
            canEdit = false;
            timeIsRunning = false;

            if(score > highScore) {
                highScore = score;
                localStorage.setItem("highscore", highScore);
            }
            document.getElementById("highScoreDisplay").innerHTML = "Highscore: " + highScore;
            document.getElementById("preGameMessage").innerHTML = "Time is up! Score: " + score;
            document
            document.getElementById("preGameDisplay").style.display = "block";            
            isPlaying = false;            

            loadStorageData();
        }
    }
}, tickPeriodMillis);

document.getElementById("highScoreDisplay").innerHTML = "Highscore: " + highScore;

function newRound() {        
    timeLeft = defaultTime;
    timeIsRunning = true;
    canEdit = true;
    currentSelection = 0;
    editMode = false;
    generateDeck(currentDeckSize);
    visualizeDeck();
    lastroundStart = new Date().getTime();
}

function loadStorageData() {
    if(localStorage.getItem("maxTime") != null) {
        defaultTime = Number.parseInt(localStorage.getItem("maxTime"));
    }    
    if(localStorage.getItem("minTime") != null) {
        lowestTime = Number.parseInt(localStorage.getItem("minTime"));    
    }        

    if(localStorage.getItem("minSize") != null) {
        defaultDeckSize = Number.parseInt(localStorage.getItem("minSize"));  
    }        
    if(localStorage.getItem("maxSize") != null) {
        largestDeckSize = Number.parseInt(localStorage.getItem("maxSize"));
    }      
    currentDeckSize = defaultDeckSize;

    if(localStorage.getItem("musicOn") != null) {
        enableMusic = (localStorage.getItem("musicOn") === 'true');
    }       

    if(localStorage.getItem("highscore") != null) {
        highScore = Number.parseInt(localStorage.getItem("highscore"));
    }
}

function playMusic() {  
    if(!enableMusic)  
        return;
        
    audio.play();
    audio.loop = true;    
    audio.volume = 0.2;
}

function setupInput() {    
    document.addEventListener("keydown", function(event) {
        if(event.key === "Enter" && !isPlaying) {
            isPlaying = true;                        

            playMusic();

            document.getElementById("preGameMessage").innerHTML = "Get ready in 3...";                        

            setTimeout(function() {
                document.getElementById("preGameMessage").innerHTML = "Get ready in 2...";
            }, 1000);

            setTimeout(function() {
                document.getElementById("preGameMessage").innerHTML = "Get ready in 1...";
            }, 2000);

            setTimeout(function() {
                document.getElementById("preGameMessage").innerHTML = "GO!";
            }, 3000);

            setTimeout(function() {
                document.getElementById("preGameDisplay").style.display = "none";
                newRound();
            }, 4000);
        }

        if(!canEdit) {
            return;
        }        

        if(event.key === "a" || event.key === "d") {
            if(event.key === "d") {
                if(currentSelection < deck.length - 1) {                          
                    if(editMode) {
                        var temp = deck[currentSelection + 1];
                        deck[currentSelection + 1] = deck[currentSelection];
                        deck[currentSelection] = temp;                                       
                    }                    
                    currentSelection++;  
                }
            } else if(event.key === "a") {
                if(currentSelection > 0) {                    
                    if(editMode) {
                        var temp = deck[currentSelection - 1];
                        deck[currentSelection - 1] = deck[currentSelection];
                        deck[currentSelection] = temp;                        
                    }                    
                    currentSelection--;
                }
            }            

            visualizeDeck();
            checkAnswer();
        }    

        if(event.key === "Shift") {
            editMode = !editMode;

            visualizeDeck();
            checkAnswer();
        }

    });
}

function generateDeck(length) {    
    deck = [];

    for(var i = 0; i < length; i++) {               
        if(randInt(0, 2) == 1) {
            do {
                var roll = randInt(1, 26);                     
            } while(deck.includes(roll) || deck.includes(getAlphabetFromIndex(roll).toUpperCase()));                        
            deck.push(roll);
        } else {
            do {                
                var roll = getRandomLetter().toUpperCase();                                                 
            } while(deck.includes(roll) || deck.includes(getIndexOfAlphabet(roll)));
            deck.push(roll);
        }
    }
}

function isSorted() {
    var convert = [];

    for(var i = 0; i < deck.length; i++) {        
        if(!Number.isInteger(deck[i])) {
            convert.push(getIndexOfAlphabet(deck[i]));
        } else {
            convert.push(deck[i]);
        }
    }

    for(var i = 0; i < convert.length; i++) {
        if(convert[i + 1] <= convert[i]) {            
            return false;
        }
    }
    return true;
}

function checkAnswer() {
    if(editMode) {
        return;
    }

    if(!isSorted()) {
        return;
    }

    var msgCont = document.getElementById("messageContainer");
    msgCont.classList.add("positiveMessage");
    setTimeout(function() {
        msgCont.classList.remove("positiveMessage");        
        newRound();
    }, 1500);
    canEdit = false;
    timeIsRunning = false;    
    score += 1;
    if(score > highScore) {
        highScore = score;   
        localStorage.setItem("highscore", highScore);
    }

    if((new Date().getTime() - lastroundStart) / 1000 < slowestCompletionTime) {
        score += 4;

        deck = ["B", "O", "N", "U", "S"];
        visualizeDeck();
    }
    document.getElementById("gameMessage").innerHTML = "Score: " + score;

    roundsBeforeTimeLoss--;
    roundsBeforeDeckIncrease--;

    if(roundsBeforeTimeLoss == 0) {
        roundsBeforeTimeLoss = 4;
        if(defaultTime > lowestTime) {
            defaultTime--;
        }        
    }

    if(roundsBeforeDeckIncrease == 0) {
        roundsBeforeDeckIncrease = 8;
        if(currentDeckSize < largestDeckSize) {
            currentDeckSize++;            
        }        
    }
}

function visualizeDeck() {
    var shuffleDisplay = document.getElementById("shuffleDisplay");
    shuffleDisplay.innerHTML = '';
    
    for(var i = 0; i < deck.length; i++) {        
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(deck[i]));
        shuffleDisplay.appendChild(li);

        if(i === currentSelection) {
            li.setAttribute("class", "selected");            
            
            if(editMode) {
                li.style.border = "6px solid rgb(0, 255, 0)";
            }
        }        
    }

    if(deck.length === 0) {
        for(var i = 0; i < 5; i++) {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode("-"));
            shuffleDisplay.appendChild(li);
        }
    }
}