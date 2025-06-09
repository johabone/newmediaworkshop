const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let circleY;
let direction = 1;
let speed = 0.7;
const radius = 50;
const centerX = window.innerWidth / 2;

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  circleY = height / 2;
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  // Yellow background (optional because body already yellow, but to be safe)
  ctx.fillStyle = 'yellow';
  ctx.fillRect(0, 0, width, height);

  // Draw blue circle
  ctx.beginPath();
  ctx.arc(centerX, circleY, radius, 0, Math.PI * 2);
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.closePath();

  // Move circle up and down
  circleY += speed * direction;
  if (circleY > height - radius) {
    direction = -1;
  } else if (circleY < radius) {
    direction = 1;
  }

  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  resize();
});

resize();
animate();
