let canvas;
let canvasContext;

var p1 = new carClass();
var p2 = new carClass();

var gameStates = {
  ACTIVE: 0,
  LOADING: 1,
  INIT_INPUT: 1,
  PAUSED: 1,
  AT_START: 1,
  FINISHED: 1,
};
var state;
var mainInterval;

window.onload = function(){
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    colorRect(0,0,canvas.width,canvas.height,'black');
    colorWords("LoadingImages", canvas.width/2, canvas.height/2, 'white');
    state = gameStates.LOADING;
    loadImages();
};

function imageLoadingDoneStartGame(){
    state = gameStates.LOADING;
    inputSetup();
    loadLevel(levelOne);
}

function loadLevel(whichLevel) {
    trackGrid = whichLevel.slice();
    p1.reset(car1Pic, "Blue Car");
    p2.reset(car2Pic, "Green Car");
    var time = 5
    drawEverything();
    countDownInterval = setInterval(function() {
        drawEverything();
        colorTimer(time, 200,200,"red");
        time--;
        if(time < 0) {
            state = gameStates.ACTIVE;
            var FPS = 60;
            mainInterval = setInterval(function () {
                drawEverything();
                moveEverything();
            }, 1000/FPS);
            clearInterval(countDownInterval);
        }
    }, 1000);
}


function drawEverything(){
    drawTracks();
    p1.draw();
    p2.draw();
}

function moveEverything() {
    p1.move();
    p2.move();
}
