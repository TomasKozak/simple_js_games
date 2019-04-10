const GROUNDSPEED_DECAY_MULT = 0.98;
const DRIVE_POWER = 0.1;
const TURN_RATE = 0.03;
const MIN_SPEED_TO_TURN = 0.3;


function carClass() {

    this.ang = -Math.PI / 2;
    this.X;
    this.Y;
    this.speed = 0;
    this.myCarPic;
    this.name = "Untitled";

    this.keyHeld_Gas = false;
    this.keyHeld_Reverse = false;
    this.keyHeld_TurnLeft = false;
    this.keyHeld_TurnRight = false;

    this.controlKeyUp;
    this.controlKeyDown;
    this.controlKeyRight;
    this.controlKeyLeft;

    this.setupInput = function(upKey, downKey, rightKey, leftKey){
        this.controlKeyUp = upKey;
        this.controlKeyDown = downKey;
        this.controlKeyRight = rightKey;
        this.controlKeyLeft = leftKey;
    }

    this.move = function () {
        this.speed *= GROUNDSPEED_DECAY_MULT;
        if (this.keyHeld_Gas) {
            this.speed += DRIVE_POWER;
        }
        if (this.keyHeld_Reverse) {
            this.speed += -DRIVE_POWER;
        }
        if (Math.abs(this.speed) >= MIN_SPEED_TO_TURN) {
            if (this.keyHeld_TurnRight) {
                this.ang += TURN_RATE;
            }
            if (this.keyHeld_TurnLeft) {
                this.ang += -TURN_RATE;
            }
        }
        this.X += Math.cos(this.ang) * this.speed;
        this.Y += Math.sin(this.ang) * this.speed;

        cartrackHandling(this);
    }

    this.reset = function (whichImage) {
        this.myCarPic = whichImage;
        for (let i = 0; i < tracknumH; i++) {
            for (let j = 0; j < tracknumV; j++) {
                const trackIndex = i + j * tracknumH;
                if (trackGrid[trackIndex] == TRACK_PLAYER) {
                    trackGrid[trackIndex] = TRACK_ROAD;
                    this.ang = -Math.PI/2;
                    this.speed = 0;
                    this.X = i * trackheight + trackwidth / 2;
                    this.Y = j * trackwidth + trackheight / 2;
                    return;
                }
            }
        }
    }

    this.draw = function() {
        drawBitmapCenteredWithRotation(this.myCarPic, this.X, this.Y, this.ang);
    }
}