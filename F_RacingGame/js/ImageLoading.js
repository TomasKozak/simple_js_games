const car1Pic = document.createElement("img");
const car2Pic = document.createElement("img");
var trackPics = [];

let picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady(){
    picsToLoad--;
    if(picsToLoad == 0){
        imageLoadingDoneStartGame();
    }
}

function beginLoadinImage(imgVar, fileName){
    imgVar.onload = countLoadedImagesAndLaunchIfReady();
    imgVar.src = fileName;
}

function loadImageForTrackCode(trackCode, fileName){
    trackPics[trackCode] = document.createElement("img");
    beginLoadinImage(trackPics[trackCode], fileName);
}

function loadImages() {
    var imageList = [{varName: car1Pic, theFile: "images/player1car.png"},
                     {varName: car2Pic, theFile: "images/player2car.png"},

                     {trackType: TRACK_WALL, theFile: "images/track_wall.png"},
                     {trackType: TRACK_ROAD, theFile: "images/track_road.png"},
                     {trackType: TRACK_GOAL, theFile: "images/track_goal.png"},
                     {trackType: TRACK_FLAG, theFile: "images/track_flag.png"},
                     {trackType: TRACK_TREE, theFile: "images/track_tree.png"}
                    ];

    picsToLoad = imageList.length;

    for (var i = 0; i < imageList.length; i++) {
        if (imageList[i].varName != undefined) {
            beginLoadinImage(imageList[i].varName, imageList[i].theFile);
        } else {
            loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
        }
    }

}
