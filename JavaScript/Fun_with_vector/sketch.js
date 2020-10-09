let v1, v2, size;
function setup() {
	size = 50
	createCanvas(400, 400, WEBGL);
	v1 = createVector(size , size)
	v2 = createVector(-size, size)
	v3 = createVector(-size, -size)
	v4 = createVector(size, -size)

	v5 = createVector(width, height)
	v6 = createVector(-width, height)
	v7 = createVector(-width, -height)
	v8 = createVector(width, -height)
}

function draw() {
	background(220);

	line(v1.x, v1.y, v5.x, v5.y)
	line(v2.x, v2.y, v6.x, v6.y)
	line(v3.x, v3.y, v7.x, v7.y)
	line(v4.x, v4.y, v8.x, v8.y)

	quad(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y, v4.x, v4.y)


	v1.y += 0.05
	v2.y -= 0.05
	v3.y += 0.05
	v4.y -= 0.05

}
