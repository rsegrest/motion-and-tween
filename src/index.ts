import p5 from "p5";
import LinearTween from "./tween/linear/LinearTween";
import Tween, { TweenChangeProps } from "./tween/Tween";
import { EaseInCircularTween } from "./tween/circular";
// import { EaseInCircularTween } from "./tween/circular";

class Rectangle {
  public x:number = 10;
  public y:number = 10;
  public w:number = 50;
  public h:number = 50;
}
// console.log('width, height:')
// console.log(window.innerWidth);
// console.log(window.innerHeight);

const sketch = (s: p5) => {
  // Declare variables outside setup and draw
  // let x = 100;
  // let y = 100;

  let linearTween:LinearTween;
  let easeInCirc:EaseInCircularTween;
  let tp:TweenChangeProps;
  let tp2:TweenChangeProps;
  let rect:any;
  let r2:any;

  s.setup = () => {
    s.createCanvas(window.innerWidth, window.innerHeight);
    // rect = s.rect(10,10,50,50);
    // rect = new Rectangle();
    r2 = new Rectangle();
    // r2.y = 70;
    tp2 = {
      obj: r2,
      propertyToChange: 'x',
      beginValue: 100,
      valueChange: 500,
      actionDuration: 120,
      useSeconds: false,
    }
    // const tp2 = {
    //   ...tp,
    //   obj: r2,
    // }
    // linearTween = new LinearTween(tp);
    easeInCirc = new EaseInCircularTween(tp2);
  };

  s.draw = () => {
    s.background(0);
    s.fill(255);
    // const r = linearTween.update() as Rectangle;
    r2 = easeInCirc.update() as Rectangle;
    // s.rect(r.x, r.y, r.w, r.h)
    console.log(r2)
    s.rect(r2.x, r2.y, r2.w, r2.h)
  };
};

// Attach the sketch to a new p5 instance
new p5(sketch);
