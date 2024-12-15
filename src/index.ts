import p5 from "p5";
import LinearTween from "./tween/linear/LinearTween";
import { TweenChangeProps } from "./tween/Tween";

class Rectangle {
  public x:number = 10;
  public y:number = 10;
  public w:number = 50;
  public h:number = 50;
}
console.log('width, height:')
console.log(window.innerWidth);
console.log(window.innerHeight);

const sketch = (s: p5) => {
  // Declare variables outside setup and draw
  let x = 100;
  let y = 100;

  let linearTween:LinearTween;
  let tp:TweenChangeProps;
  let rect:any;

  s.setup = () => {
    s.createCanvas(700, 410);
    // rect = s.rect(10,10,50,50);
    rect = new Rectangle();
    tp = {
      obj: rect,
      propertyToChange: 'x',
      beginValue: 10,
      // finishValue: 10,
      valueChange: 20,
      actionDuration: 10,
      useSeconds: false,
    }
    linearTween = new LinearTween(tp);
  };

  s.draw = () => {
    s.background(0);
    s.fill(255);
    const r = linearTween.update() as Rectangle;
    // s.rect(r.x, r.y, r.w, r.h)
  };
};

// Attach the sketch to a new p5 instance
new p5(sketch);
