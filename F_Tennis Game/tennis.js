var canvas;
var canvasContext;
var ballX = 395;
var ballSpeedX = 6;
var ballY = 295;
var ballSpeedY = 3;
var startSpeedX = 6;
var startspeedY = 3;

var paddle1Y = 250;
var paddle2Y = 250;
const paddleHeight = 100;
const paddleWidth = 10;

var scoreP1 = 0;
var scoreP2 = 0;
const winscore = 3;
var endGame = false;



function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return{
        x:mouseX,
        y:mouseY
    };
}
function computerMovement(){
    if(paddle2Y + paddleHeight/2  > ballY + 35){
        paddle2Y -= 4;
    }
    if(paddle2Y + paddleHeight/2  < ballY - 35){
        paddle2Y += 4;
    }
}
function handleMouseClick(){
    if(endGame){
        scoreP1 = 0;
        scoreP2 = 0;
        endGame = false;
    }
}

window.onload = function(){

    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    var FPS = 60;
    setInterval(function () {
        moveEverything();
        drawEverything();
    }
    , 1000/FPS);

    canvas.addEventListener('mousedown', handleMouseClick);

    canvas.addEventListener('mousemove',
        function(evt){
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y - paddleHeight/2;
        }
    );


};

function moveEverything() {
    computerMovement();
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballX >= canvas.width - paddleWidth) {
        if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            var deltaY = ballY - (paddle2Y + paddleHeight/2);
            ballSpeedY = deltaY * 0.2;
        }
        else {
            scoreP1++;
            resetBall();
        }
    }
    if (ballX <= paddleWidth) {
        if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            deltaY = ballY - (paddle1Y + paddleHeight/2);
            ballSpeedY = deltaY * 0.35;
        }
        else {
            scoreP2++;
            resetBall();
        }
    }
    if(ballY >= canvas.height){
        ballSpeedY = -ballSpeedY;
    }
    if(ballY <= 0){
        ballSpeedY = -ballSpeedY;
    }

}

function drawNet(){
    for(var i = 0; i < canvas.height; i+=40){
        colorRect(canvas.width/2-1,i,2,20, 'white');
    }
}

function drawEverything(){

    colorRect(0,0,canvas.width,canvas.height, 'black');
    if(endGame){
        if (scoreP1 >= winscore) {
            canvasContext.fillStyle = 'white';
            canvasContext.fillText("Winner: Player 1", 300, 200);
            canvasContext.fillText("Click to continue", 350, 500);
            ballSpeedX = -startSpeedX;
            ballSpeedY = startspeedY;
        }
        else {
            if (scoreP2 >= winscore) {
                canvasContext.fillStyle = 'white';
                canvasContext.fillText("Winner: Player 2", 500, 200);
                canvasContext.fillText("Click to continue", 350, 500);
                ballSpeedX = startSpeedX;
                ballSpeedY = startspeedY;
            }
        }
        return;
    }

    drawNet();
    colorRect(0,paddle1Y,paddleWidth,paddleHeight,'white');
    colorRect(canvas.width-paddleWidth,paddle2Y,paddleWidth,paddleHeight,'white');
    colorBall(ballX,ballY,5,'green');
    canvasContext.fillStyle = 'white';
    canvasContext.fillText(scoreP1, 300, 200);
    canvasContext.fillText(scoreP2, 500, 200);
}
function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}
function colorBall(centerX, centerY, radius, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2,true);
    canvasContext.fill();
}
function resetBall(){
   if(scoreP1 >= winscore || scoreP2 >= winscore){
       endGame = true;
   }
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}