/*
By Okazz
*/
let colors = ['#08804e', '#f0bd15', '#d10406', '#fd7800', '#2abde4', '#f3f7fa', '#574689'];

let ctx;
let centerX, centerY;
let circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  colorMode(HSB, 360, 100, 100, 100);
  ctx = drawingContext;
  centerX = width / 2;
  centerY = height / 2;

  circles = [];  // reset circles in case of window resize
  for (let i = 0; i < 36 * 3; i++) {
    let x = width * random(0.1, 0.9);
    let y = height * random(0.1, 0.9);
    let d = width * random(0.02, 0.05);
    let clr = colors[floor(i) % colors.length];
    circles.push(new Mover(x, y, d, clr));
  }

  // Send canvas behind page content
  let canvas = document.querySelector('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '-1';          // behind everything
  canvas.style.pointerEvents = 'none'; // clicks go through
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // Reposition circles for new canvas size
  centerX = width / 2;
  centerY = height / 2;

  circles = [];
  for (let i = 0; i < 36 * 3; i++) {
    let x = width * random(0.1, 0.9);
    let y = height * random(0.1, 0.9);
    let d = width * random(0.02, 0.05);
    let clr = colors[floor(i) % colors.length];
    circles.push(new Mover(x, y, d, clr));
  }
}

function draw() {
  background('#212121');

  noStroke();
  let len = min(width, height) * 0.1;
  for (let i = 0; i < circles.length; i++) {
    for (let j = 0; j < circles.length; j++) {
      let c1 = circles[i];
      let c2 = circles[j];
      if (c1 != c2) {
        drawBridge(c1.x, c1.y, c1.d, c2.x, c2.y, c2.d, len, c1.clr, c2.clr);
      }
    }
  }

  for (let c of circles) {
    c.run();
  }

  for (let i = 0; i < circles.length; i++) {
    let c1 = circles[i];
    for (let j = i + 1; j < circles.length; j++) {
      let c2 = circles[j];
      let dx = c2.x - c1.x;
      let dy = c2.y - c1.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = c1.d + c2.d;

      if (distance < minDist && distance > 0) {
        let force = (minDist - distance) * 0.002;
        let nx = dx / distance;
        let ny = dy / distance;
        c1.vx -= force * nx;
        c1.vy -= force * ny;
        c2.vx += force * nx;
        c2.vy += force * ny;
      }
    }
  }
}

function drawBridge(x1, y1, d1, x2, y2, d2, dst, clr1, clr2) {
  let r = dst / 2;

  let r1 = d1 / 2;
  let r2 = d2 / 2;
  let R1 = r1 + r;
  let R2 = r2 + r;

  let dx = x2 - x1;
  let dy = y2 - y1;
  let d = sqrt(dx * dx + dy * dy);

  if (d > R1 + R2) {
    return;
  }

  let dirX = dx / d;
  let dirY = dy / d;

  let a = (R1 * R1 - R2 * R2 + d * d) / (2 * d);
  let underRoot = R1 * R1 - a * a;
  if (underRoot < 0) return;
  let h = sqrt(underRoot);

  let midX = x1 + dirX * a;
  let midY = y1 + dirY * a;

  let perpX = -dirY * h;
  let perpY = dir
