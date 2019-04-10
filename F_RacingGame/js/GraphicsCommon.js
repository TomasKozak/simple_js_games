
function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng){
    canvasContext.save();
    canvasContext.translate(atX, atY);
    canvasContext.rotate(withAng);
    canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
    canvasContext.restore();
}

function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

function colorWords(words, x, y, color){
    canvasContext.fillStyle = color;
    canvasContext.fillText(words, x, y);
}

function colorTimer(time, x, y, color){
    canvasContext.font="60px Arial";
    canvasContext.fillStyle = color;
    canvasContext.fillText(time, x, y);
}
