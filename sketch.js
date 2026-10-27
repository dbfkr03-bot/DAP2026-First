let walkers = [];
let numWalkers = 80;

function setup() {
  createCanvas(800, 600);
  background(15, 15, 20);
  
  for (let i = 0; i < numWalkers; i++) {
    walkers.push(new NetworkWalker(random(width), random(height)));
  }
}

function draw() {
  background(15, 15, 20, 30);

  strokeWeight(0.8);
  for (let i = 0; i < walkers.length; i++) {
    for (let j = i + 1; j < walkers.length; j++) {
      let d = p5.Vector.dist(walkers[i].pos, walkers[j].pos);
      if (d < 85) {
        let alpha = map(d, 0, 85, 150, 0);
        stroke(100, 200, 255, alpha);
        line(walkers[i].pos.x, walkers[i].pos.y, walkers[j].pos.x, walkers[j].pos.y);
      }
    }
  }

  for (let w of walkers) {
    w.update();
    w.checkEdges();
    w.display();
  }
}

class NetworkWalker {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.r = random(3, 7);
    this.speed = random(1, 2.2);
  }

  update() {
    let step = p5.Vector.random2D();
    step.mult(this.speed);
    this.pos.add(step);

    let mouse = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(mouse, this.pos);
    let d = dir.mag();
    
    if (d < 150 && d > 15) {
      dir.normalize();
      dir.mult(0.5);
      this.pos.add(dir);
    }
  }

  checkEdges() {
    if (this.pos.x < 0) this.pos.x = width;
    else if (this.pos.x > width) this.pos.x = 0;

    if (this.pos.y < 0) this.pos.y = height;
    else if (this.pos.y > height) this.pos.y = 0;
  }

  display() {
    noStroke();
    fill(100, 200, 255, 200);
    ellipse(this.pos.x, this.pos.y, this.r);
  }
}