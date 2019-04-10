let mouseX;
let mouseY;


const KEY_ARROW_LEFT = 37;
const KEY_ARROW_UP = 38;
const KEY_ARROW_RIGHT = 39;
const KEY_ARROW_DOWN = 40;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

function calculateMousePos(evt) {
    const rect = canvas.getBoundingClientRect();
    const root = document.documentElement;
    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;
    return{
        x:mouseX,
        y:mouseY
    };
}

function keySet(keyEvent, whichCar, setTo){
    if(state !== gameStates.ACTIVE) {
        return;
    }
    if(keyEvent.keyCode === whichCar.controlKeyLeft){
        whichCar.keyHeld_TurnLeft = setTo;
    }
    if(keyEvent.keyCode === whichCar.controlKeyRight){
        whichCar.keyHeld_TurnRight = setTo;
    }
    if(keyEvent.keyCode === whichCar.controlKeyUp){
        whichCar.keyHeld_Gas = setTo;
    }
    if(keyEvent.keyCode === whichCar.controlKeyDown){
        whichCar.keyHeld_Reverse = setTo;
    }
}

function keyPressed(evt){
    console.log("Key pressed: "+evt.keyCode);
    keySet(evt,p1,true);
    keySet(evt,p2,true);
}

function keyReleased(evt){
    keySet(evt,p1,false);
    keySet(evt,p2,false);
}

function inputSetup(){
    canvas.addEventListener('mousemove',
        function(evt){
            const mousePos = calculateMousePos(evt);
        }
    );
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup',keyReleased);

    p1.setupInput(KEY_ARROW_UP, KEY_ARROW_DOWN, KEY_ARROW_RIGHT, KEY_ARROW_LEFT);
    p2.setupInput(KEY_W, KEY_S, KEY_D, KEY_A);
}
