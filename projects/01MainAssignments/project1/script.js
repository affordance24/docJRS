var numEllipses = 6;
var ellipseSizeLarge = 50;
var ellipseSizeSmall = 25;
var x = [];
var y = [];
var xspeed = [];
var yspeed = [];
var isLarge = []; // Indicates whether the ellipse is large or small
var score = 0;
var startTime;
var Run = true;

function setup() {
  createCanvas(windowWidth, windowHeight-45);
  createEllipses();
  startTime = millis(); // Record the start time
  frameRate (120)

  // Add refresh button
  var restartButton = createButton('Restart');
  restartButton.position(10, height + 10);
  restartButton.mousePressed(refreshGame);
}

function draw() {
  background(0, 0, 0, 20);

  if (Run) {
    var elapsedTime = millis() - startTime;
    drawStopwatch(elapsedTime);
    StartGame();
    displayScore();
  }
}

function createEllipses() {
  for (var i = 0; i < numEllipses; i++) {
    x[i] = random(width);
    y[i] = random(height);
    xspeed[i] = random(1, 3);
    yspeed[i] = random(1, 3);
    isLarge[i] = random() > 0.5; // Randomly set the size of the ellipse
  }
}

function StartGame() {
  for (var i = 0; i < numEllipses; i++) {
    stroke(0, 50);
    fill(255);

    x[i] += xspeed[i];
    y[i] += yspeed[i];

    // Check for bouncing
    if (x[i] > width - (isLarge[i] ? ellipseSizeLarge / 2 : ellipseSizeSmall / 2) || x[i] < (isLarge[i] ? ellipseSizeLarge / 2 : ellipseSizeSmall / 2)) {
      xspeed[i] *= -1;
    }
    if (y[i] > height - (isLarge[i] ? ellipseSizeLarge / 2 : ellipseSizeSmall / 2) || y[i] < (isLarge[i] ? ellipseSizeLarge / 2 : ellipseSizeSmall / 2)) {
      yspeed[i] *= -1;
    }

    ellipse(x[i], y[i], isLarge[i] ? ellipseSizeLarge : ellipseSizeSmall, isLarge[i] ? ellipseSizeLarge : ellipseSizeSmall);
  }
}

function displayScore() {
  fill(255);
  textSize(20);
  text("Score: " + score, 10, 30);
}

function drawStopwatch(time) {
    var milliseconds = int(time % 100);
    var seconds = int(time / 1000);
    var minutes = int(seconds / 60);
    var hours = int(minutes / 60);
    seconds %= 60;
    minutes %= 60;
  
    fill(255);
    textSize(20);
    text(nf(hours, 2) + ':' + nf(minutes, 2) + ':' + nf(seconds, 2) + '.' + nf(milliseconds, 2), width - 135, 30);
  }
  
function mousePressed() {
  if (Run) {
    checkClick();
  }
}

function checkClick() {
  for (var i = 0; i < numEllipses; i++) {
    var d = dist(x[i], y[i], mouseX, mouseY);

    // Check for click on ellipse
    if (d < (isLarge[i] ? ellipseSizeLarge / 2 : ellipseSizeSmall / 2)) {
      score += isLarge[i] ? 2 : 5; // 2 points for large ellipse, 5 points for small ellipse
      resetEllipse(i);
    }
  }
}

function resetEllipse(index) {
  x[index] = random(width);
  y[index] = random(height);
  xspeed[index] = random(-2, 1);
  yspeed[index] = random(-2, 3);
  isLarge[index] = random() > 0.5; // Randomly set the size of the ellipse
}

function refreshGame() {
  score = 0;
  createEllipses();
  startTime = millis(); // Reset the start time
  loop(); // Resume drawing if it was stopped
}