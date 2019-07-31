let video;
let myPoseNet;


let ring;
let wave2;
let boob;
let wing;
let tear;

// body key points
let poses = [];
let filterIndex = 0;
let tintValues;

function preload() {

  //models

  ring = loadModel('img/ring.obj', true);
  boob = loadModel('img/boob.obj',true);
  wing = loadModel('img/wing.obj',true);
  tear = loadModel('img/tear.obj',true);
  fire = loadModel('img/fire.obj',true);
  wave2 = loadModel('img/wave2.obj',true);
}

function setup() {
  var constraints = {
    video: {
      mandatory: {
        minWidth: 1280,
        minHeight: 720
      },
      optional: [{ maxFrameRate: 10 }]
    },
    audio: false
  };
  video = createCapture(constraints);
  video.hide();
  createCanvas(1280, 720, WEBGL);
  myPoseNet = ml5.poseNet(video, 'multiple', modelReady);
  noStroke();

  tintValues = [Math.floor(random(100, 255)), Math.floor(random(100, 255)), Math.floor(random(100, 255))];
}

function draw() {
  background(200);

  tint(tintValues[0], tintValues[1], tintValues[2]);

  image(video, - width / 2, - height / 2);

  for (let j = 0; j < poses.length; j++) {
    let pose = poses[j];
    drawWave();
    if (filterIndex === 0) {
      drawFaceMode(pose);
    } else if (filterIndex === 1) {
      drawBodyMode(pose);
    }
  }
}

function drawFaceMode(pose) {
  if (pose.leftEar) drawEar2(pose.leftEar,pose.scale);
  if (pose.rightEar) drawEar(pose.rightEar,pose.scale);
  if (pose.rightEye) drawEye(pose.rightEye, pose.scale);
  if (pose.leftEye) drawEye(pose.leftEye, pose.scale);
  if (pose.nose) drawRing(pose.nose, pose.scale);
}

function drawBodyMode(pose) {
  if (pose.boob) drawBoob(pose.boob, pose.scale);
  if (pose.nose) drawFire(pose.nose, pose.scale);
  if (pose.leftKnee) drawCone(pose.leftKnee, pose.scale);
  if (pose.rightKnee) drawCone(pose.rightKnee, pose.scale);
  if (pose.leftWrist) drawSphere(pose.leftWrist, pose.scale);
  if (pose.rightWrist) drawSphere(pose.rightWrist, pose.scale);
}

function mousePressed() {
  filterIndex = filterIndex + 1;
  if (filterIndex > 1) filterIndex = 0;
  tintValues = [Math.floor(random(100, 255)), Math.floor(random(100, 255)), Math.floor(random(100, 255))];
}



function drawCone(position, myScale) {

  push();
  translate(position.x - width / 2, position.y - height / 2);
  scale(myScale * 3);
   rotateX(frameCount * 0.01);
  normalMaterial(255);
  cone(40, 70);
  pop();
}
function drawSphere(position, myScale) {

  push();
  translate(position.x - width / 2, position.y - height / 2);
  scale(myScale * 3);
   rotateX(frameCount * 0.01);
  normalMaterial(255);
  sphere(10);
  pop();
}
function drawWave() {

  push()
  translate(- width / 2 , - height / 2 +700);
  scale(6);
  rotateX(frameCount * 0.04);
  normalMaterial(255);
 model(wave2);
  pop();
}

function drawEye(position, myScale) {
  push();
  translate(position.x - (width / 2), position.y - (height / 2));
  scale(myScale);
  rotateX(frameCount * 0.03);
  //rotateY(frameCount * 0.01);
  //rotateZ(3);
  normalMaterial(255);
  model(tear);
  pop();
}

function drawBoob(position, myScale) {
  push();
  translate(position.x - width / 2, position.y - height / 2 + 30 + myScale * 150);
  scale(myScale*4);
  rotateX(frameCount * 0.05);
  normalMaterial(255);
  model(boob);
  pop();
}
function drawFire(position, myScale) {
  push();
  translate(position.x - width / 2 , position.y - height / 2 + myScale * 10 + 20);
  scale(myScale * 3);
  rotateZ(3);
  normalMaterial(255);
  model(fire);
  pop();
}


function drawRing(position, myScale) {
  push();
  translate(position.x - width / 2 , position.y - height / 2 + myScale * 10 + 20);
  scale(myScale / 3);
  rotateX(frameCount * 0.05);
  rotateZ(frameCount * 0.05);
  normalMaterial(255);
  model(ring);
  pop();
}

function drawEar(position, myScale) {
  push();
  translate(position.x - width / 2 , position.y - height / 2 +70);
  scale(myScale);
  rotateY(frameCount * 0.05);
  rotateZ(frameCount * 0.05);
  normalMaterial(255);
  model(wing);
  pop();
}
function drawEar2(position, myScale) {
  push();
  translate(position.x - width / 2 , position.y - height / 2 +70);
  scale(myScale);
  rotateY(frameCount * 0.05);
  rotateZ(frameCount * 0.05);
  normalMaterial(255);
  model(wing);
  pop();
}





function modelReady() {
  console.log('model ready');
  myPoseNet.on('pose', function(results) {
    if (results && results.length > 0) {
      poses = results.map(poseResult => {
        let myPose = {};
        if (poseResult.pose && poseResult.pose.nose) {
          myPose.nose = poseResult.pose.nose;
        }
        if (poseResult.pose && poseResult.pose.leftWrist) {
          myPose.leftWrist = poseResult.pose.leftWrist;
        }
        if (poseResult.pose && poseResult.pose.leftHip) {
          myPose.leftHip = poseResult.pose.leftHip;
        }
        if (poseResult.pose && poseResult.pose.leftEar) {
          myPose.leftEar = poseResult.pose.leftEar;
        }
        if (poseResult.pose && poseResult.pose.rightEar) {
            myPose.rightEar = poseResult.pose.rightEar;
        }
        if (poseResult.pose && poseResult.pose.leftWrist) {
          myPose.leftWrist = poseResult.pose.leftWrist;
        }
        if (poseResult.pose && poseResult.pose.rightWrist) {
            myPose.rightWrist = poseResult.pose.rightWrist;
        }
        if (poseResult.pose && poseResult.pose.leftEye) {
          myPose.leftEye = poseResult.pose.leftEye;
        }
        if (poseResult.pose && poseResult.pose.rightEye) {
          myPose.rightEye = poseResult.pose.rightEye;
        }
        if (poseResult.pose && poseResult.pose.leftKnee) {
          myPose.leftKnee = poseResult.pose.leftKnee;
        }
        if (poseResult.pose && poseResult.pose.rightKnee) {
          myPose.rightKnee = poseResult.pose.rightKnee;
        }
        if (poseResult.pose && poseResult.pose.leftShoulder && poseResult.pose.rightShoulder) {
          myPose.boob = {
            x: (poseResult.pose.leftShoulder.x + poseResult.pose.rightShoulder.x) / 2,
            y: poseResult.pose.leftShoulder.y
          };
        }
        if (poseResult.pose && poseResult.pose.rightElbow) {
          myPose.rightElbow = poseResult.pose.rightElbow;
        }
        if (poseResult.pose && poseResult.pose.leftElbow) {
          myPose.leftElbow = poseResult.pose.leftElbow;
        }
        if (poseResult.pose && poseResult.pose.leftEye && poseResult.pose.rightEye) {
          const eyeDist = dist(poseResult.pose.leftEye.x, poseResult.pose.leftEye.y, poseResult.pose.rightEye.x, poseResult.pose.rightEye.y)
          myPose.scale = map(eyeDist, 0, 200, 0, 1.2)
        } else myPose.scale = 1;
        return myPose;
      })
    }
  })
}
