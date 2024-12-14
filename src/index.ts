import p5 from "p5";

const sketch = (s: p5) => {
  // Declare variables outside setup and draw
  let x = 100;
  let y = 100;

  s.setup = () => {
    s.createCanvas(700, 410);
  };

  s.draw = () => {
    console.log(s.frameCount);
    s.background(0);
    s.fill(255);
    s.rect(x, y, 50, 50);
  };
};

// Attach the sketch to a new p5 instance
new p5(sketch);
