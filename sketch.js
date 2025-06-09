// User variables
var nAngles = 20;
var nInc = 0.001;
var minSize = 1;
var maxSize = 40;
var nDrawsPerFrame = 2;

// Other
var c = 0;
var nx = 0;
var ny = 10000;
var nz = 50000;
var angle;

let img; // var for adding image

function preload() { // Load the image file
  
  img = loadImage('work3.png'); //image location in P5
}

  // Display the image on the canvas


function setup() {
  createCanvas(100%, 730);
  noStroke();
  colorMode(HSB);
  background(0);
  angle = 1 / nAngles * TAU;
  image(img, 0, 0) ; // image orientation in Canvas
  
}

function draw() {
  push();
  translate(width / 2, height / 2);

  for (var j = 0; j < nDrawsPerFrame; j++) {
    // Noise
    var x = map(noise(nx), 0, 1, -width, width);
    var y = map(noise(ny), 0, 1, -height, height);
    var s = map(noise(nz), 0, 1, minSize, maxSize);
    nx += nInc;
    ny += nInc;
    nz += nInc * 4;


    var center = createVector(0, 0);
    var drawPoint = createVector(x, y);
    var cmAngle = atan2(drawPoint.y - center.y, drawPoint.x - center.x);
    var magnitude = center.dist(drawPoint);

    for (var i = 0; i < nAngles; i++) {
      var a = i * angle + cmAngle;
      var v = p5.Vector.fromAngle(a).mult(magnitude);
      v.add(center);
      fill(0, 0.05);
      ellipse(v.x + 3, v.y + 3, s, s);
      fill(c, 64, 100, 0.1);
      ellipse(v.x, v.y, s, s);
    }

    c = (c + 1) % 360;
  }
  pop();
}

// save jpg
let lapse = 0;    // mouse timer
function mousePressed(){
  if (millis() - lapse > 400){
    save("img_" + month() + '-' + day() + '_' + hour() + '-' + minute() + '-' + second() + ".jpg");
    lapse = millis();
  } 
}
