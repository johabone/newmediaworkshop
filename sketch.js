function setup() {
  const parent = select('#sketch-holder');
  const size = parent.width;
  const cnv = createCanvas(size, size);
  cnv.parent('sketch-holder');
  background(255);
  noFill();
  stroke(30);

  translate(width / 2, height / 2);

  const R = width * 0.3;
  const r = R * 0.33;
  const d = R * 0.5;

  beginShape();
  for (let t = 0; t < TWO_PI * 40; t += 0.005) {
    const x = (R - r) * cos(t) + d * cos((R - r) / r * t);
    const y = (R - r) * sin(t) - d * sin((R - r) / r * t);
    vertex(x, y);
  }
  endShape();
}
