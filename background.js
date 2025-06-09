{\rtf1\ansi\ansicpg1252\cocoartf2709
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 /*\
By Okazz\
*/\
let colors = ['#08804e', '#f0bd15', '#d10406', '#fd7800', '#2abde4', '#f3f7fa', '#574689'];\
\
let ctx;\
let centerX, centerY;\
let circles = [];\
\
function setup() \{\
	createCanvas(900, 900);\
	rectMode(CENTER);\
	colorMode(HSB, 360, 100, 100, 100);\
	ctx = drawingContext;\
	centerX = width / 2;\
	centerY = height / 2;\
\
	for (let i = 0; i < 36 * 3; i++) \{\
		let x = width * random(0.1, 0.9);\
		let y = height * random(0.1, 0.9);\
		let d = width * random(0.02, 0.05);\
		let clr = colors[floor(i) % colors.length]\
		circles.push(new Mover(x, y, d, clr));\
	\}\
\
\}\
\
function draw() \{\
	background('#212121');\
\
	noStroke();\
	let len = min(width, height) * 0.1;\
	for (let i = 0; i < circles.length; i++) \{\
		for (let j = 0; j < circles.length; j++) \{\
			let c1 = circles[i];\
			let c2 = circles[j];\
			if (c1 != c2) \{\
				drawBridge(c1.x, c1.y, c1.d, c2.x, c2.y, c2.d, len, c1.clr, c2.clr);\
			\}\
		\}\
	\}\
\
	for (let c of circles) \{\
		c.run();\
	\}\
\
\
	for (let i = 0; i < circles.length; i++) \{\
		let c1 = circles[i];\
		for (let j = i + 1; j < circles.length; j++) \{\
			let c2 = circles[j];\
			let dx = c2.x - c1.x;\
			let dy = c2.y - c1.y;\
			let distance = sqrt(dx * dx + dy * dy);\
			let minDist = c1.d + c2.d;\
\
			if (distance < minDist && distance > 0) \{\
				let force = (minDist - distance) * 0.002;\
				let nx = dx / distance;\
				let ny = dy / distance;\
				c1.vx -= force * nx;\
				c1.vy -= force * ny;\
				c2.vx += force * nx;\
				c2.vy += force * ny;\
			\}\
		\}\
	\}\
\}\
\
\
function drawBridge(x1, y1, d1, x2, y2, d2, dst, clr1, clr2) \{\
	let r = dst / 2;\
\
	let r1 = d1 / 2;\
	let r2 = d2 / 2;\
	let R1 = r1 + r;\
	let R2 = r2 + r;\
\
	let dx = x2 - x1;\
	let dy = y2 - y1;\
	let d = sqrt(dx * dx + dy * dy);\
\
	if (d > R1 + R2) \{\
		return;\
	\}\
\
	let dirX = dx / d;\
	let dirY = dy / d;\
\
	let a = (R1 * R1 - R2 * R2 + d * d) / (2 * d);\
	let underRoot = R1 * R1 - a * a;\
	if (underRoot < 0) return;\
	let h = sqrt(underRoot);\
\
\
	let midX = x1 + dirX * a;\
	let midY = y1 + dirY * a;\
\
	let perpX = -dirY * h;\
	let perpY = dirX * h;\
\
	let cx1 = midX + perpX;\
	let cy1 = midY + perpY;\
\
	let cx2 = midX - perpX;\
	let cy2 = midY - perpY;\
\
	if (dist(cx1, cy1, cx2, cy2) < r * 2) \{\
		return;\
	\}\
\
	let ang1 = atan2(y1 - cy1, x1 - cx1);\
	let ang2 = atan2(y2 - cy1, x2 - cx1);\
	let ang3 = atan2(y2 - cy2, x2 - cx2);\
	let ang4 = atan2(y1 - cy2, x1 - cx2);\
\
	if (ang2 < ang1) \{\
		ang2 += TAU;\
	\}\
\
	let grd = ctx.createLinearGradient(x1, y1, x2, y2);\
	grd.addColorStop(0.3, clr1);\
	grd.addColorStop(0.7, clr2);\
	ctx.fillStyle = grd;\
\
	beginShape();\
	for (let i = ang1; i < ang2; i += TAU / 180) \{\
		vertex(cx1 + r * cos(i), cy1 + r * sin(i));\
	\}\
\
	if (ang4 < ang3) \{\
		ang4 += TAU;\
	\}\
	for (let i = ang3; i < ang4; i += TAU / 180) \{\
		vertex(cx2 + r * cos(i), cy2 + r * sin(i));\
	\}\
	endShape();\
\}\
\
class Mover \{\
	constructor(x, y, d, clr) \{\
		this.x = x;\
		this.y = y;\
		this.d = d;\
		this.clr = clr;\
		this.vx = random(-1, 1);\
		this.vy = random(-1, 1);\
	\}\
\
	show() \{\
		noStroke();\
		fill(this.clr);\
		circle(this.x, this.y, this.d);\
	\}\
\
	move() \{\
		this.x += this.vx;\
		this.y += this.vy;\
\
		let radius = this.d / 2;\
\
		if (this.x < radius || this.x > width - radius) \{\
			this.vx *= -1;\
		\}\
		if (this.y < radius || this.y > height - radius) \{\
			this.vy *= -1;\
		\}\
\
		this.x = constrain(this.x, radius, width - radius);\
		this.y = constrain(this.y, radius, height - radius);\
	\}\
\
	run() \{\
		this.show();\
		this.move();\
	\}\
\}}