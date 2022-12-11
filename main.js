lwristX = 0;
lwristY = 0;
rwristX = 0;
rwristY = 0;
leftwristconfidence = "";

function setup() {
  canvas = createCanvas(400, 400);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
}
function draw() {
  image(video, 0, 0, 400, 400);
  fill("#9F2B68");
  stroke("#9F2B68");

  if (leftwristconfidence > 0.02) {
    circle(lwristX, lwristY, 20);

    innumberleftwristY = Number(lwristY);
    wholenumberonly = floor(innumberleftwristY);
    wholedivided = wholenumberonly / 500;
    document.getElementById("batn2").innerHTML = "Volume =" + wholedivided;
    song.setVolume(wholedivided);
  }
  circle(rwristX, rwristY, 20);
  if (rwristY > 0) {
    song.rate(0.5);
    document.getElementById("speedbatn").innerHTML = "Speed is 0.5";
  }
}
song = "";
function preload() {
  song = loadSound("music.mp3");
  song2 = loadSound("music2.mp3");
}
function play() {
  if (lwristY > 0 && lwristY < 250) {
    song.isPlaying(true);
    document.getElementById("header").innerHTML =
      "song 1 will be playing right now, because Left wrist Y is greater then 0, and less then 250!";
  }
  if (lwristY > 250 && lwristY < 500) {
    song2.isPlaying(true);
    song.isPlaying(false);
    document.getElementById("header").innerHTML =
      "song 2 will be playing right now, because Left wrist Y is greater then 250, and less then 500!";
  }
}
function modelLoaded() {
  console.log("Model loaded tehehhehehehehehheheheheh");
}
function gotPoses(results) {
  if (results.length > 0) {
    lwristX = results[0].pose.leftWrist.x;
    lwristY = results[0].pose.leftWrist.y;
    rwristX = results[0].pose.rightWrist.x;
    rwristY = results[0].pose.rightWrist.y;
    console.log(rwristX);
    leftwristscore = results[0].pose.keypoints[9].score;
    console.log(leftwristconfidence);
  }
}
