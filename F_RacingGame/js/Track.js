
const trackheight = 40;
const trackwidth = 40;
const tracknumH = 20;
const tracknumV = 15;
const trackGap = 2;

var levelOne = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4,
                 1, 4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,
                 1, 4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                 1, 4, 1, 0, 0, 0, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1,
                 1, 1, 5, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 5, 0, 0, 1,
                 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 4, 1, 0, 0, 1,
                 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1,
                 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 1,
                 1, 0, 0, 1, 4, 1, 0, 0, 1, 1, 1, 1, 5, 0, 0, 1, 1, 0, 0, 1,
                 1, 0, 0, 1, 4, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1,
                 1, 2, 2, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1,
                 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 5, 1, 1, 1, 1, 0, 0, 0, 1,
                 1, 0, 3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                 1, 0, 3, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
                 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var trackGrid = [];

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYER = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;

function rowColToArrayIndex(Col, Row){
    var index = tracknumH * Row + Col;
    return index;
}

function cartrackHandling(whichCar){
    var cartrackCol = Math.floor(whichCar.X / trackwidth);
    var cartrackRow = Math.floor(whichCar.Y / trackheight);
    var trackIndexUnderCar = rowColToArrayIndex(cartrackCol, cartrackRow);

    if(cartrackCol >= 0 && cartrackCol < tracknumH && cartrackRow >= 0 && cartrackRow < tracknumV){
        if( trackGrid[trackIndexUnderCar] != TRACK_ROAD){
            whichCar.X -= Math.cos(whichCar.ang) * whichCar.speed;
            whichCar.Y -= Math.sin(whichCar.ang) * whichCar.speed;
            whichCar.speed *= -0.5;
        }
        if(trackGrid[trackIndexUnderCar] == TRACK_GOAL){
            console.log(whichCar.name + "WINS!");
            state = gameStates.FINISHED;
            clearInterval(mainInterval);
            loadLevel(levelOne);
        }
    }
}

function drawTracks(){
    var trackIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;
    for(var i = 0; i < tracknumV; i++) {
        for(var j = 0; j < tracknumH; j++) {
            var tileKindHere = trackGrid[trackIndex];
            var useImage = trackPics[tileKindHere];
            canvasContext.drawImage(useImage, drawTileX, drawTileY);
            trackIndex++;
            drawTileX += trackwidth;
        }
        drawTileX = 0;
        drawTileY += trackheight;
    }
}
