
function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('sketch-holder');
  background(255);
  noFill();
  stroke(0);
  translate(width / 2, height / 2);

  let R = 120;
  let r = 40;
  let d = 60;

  beginShape();
  for (let t = 0; t < TWO_PI * 20; t += 0.01) {
    let x = (R - r) * cos(t) + d * cos(((R - r) / r) * t);
    let y = (R - r) * sin(t) - d * sin(((R - r) / r) * t);
    vertex(x, y);
  }
  endShape();
}
