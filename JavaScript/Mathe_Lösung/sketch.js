let f1v1;
let f1v2;
let f2start;
let sc = -3;
function setup() {
  createCanvas(1400, 600, WEBGL);
  translate(width / 2, height / 2);
  f1v1 = createVector(114.921, -131.088, 10,973);
  f1v2 = createVector(109.304, -117.709, 10,973);

  f2v1 = createVector(91.389, 84.788, 10,985);
  f2v2 = createVector(82.902, 75.945, 10,985);	

  f1v2.mult(sc);
  f2v2.mult(sc);

  f2start = f2v1;
  f2v1.mult(2);
  


}

function draw() {
  background(100);
  stroke(0, 0, 255);
  strokeWeight(8);
  point(f1v1.x, f1v1.y, f1v1.z);
  strokeWeight(1.2);
  line(f1v1.x,f1v1.y,f1v1.z,f1v2.x,f1v2.y,f1v2.z);

  stroke(255, 0, 0);
  strokeWeight(8);
  point(f2start.x, f2start.y, f2start.z)
  strokeWeight(1.2);
  line(f2v1.x,f2v1.y,f2v1.z,f2v2.x,f2v2.y,f2v2.z);

}