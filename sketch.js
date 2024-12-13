// const Tween = require('./tween.js');
let qbert = null;

class QBert {
  constructor(
  ) {
    this.scale = 1;
    const center = (width/2);
    this.currentPosition = new Position(center,400);
    this.tweens = {x:[],y:[]};
    const obj = this;
    const prop = null;
    
    this.setupJump();
    // this.horizontalTween = new Tween({
    //   obj,prop,func,begin,finish,duration,useSeconds
    // });

    
    // this.horizontalTween.setFunc(this.horizontalTween.linearTween);
    // console.log('QBert constructor: func: ' + func);
    // console.log('QBert constructor: this.tween.func: ' + this.horizontalTween.func);
    
  }
  setupJump() {
    const center = width/2;
    const upTween = new Tween({
      obj: this,
      prop: this.currentPosition.y,
      func: TweenTypes.EASE_OUT_QUAD,
      begin: this.currentPosition.y,
      finish: this.currentPosition.y-100,
      duration: 6,
      useSeconds: true
    })
    const downTween = new Tween({
      obj: this,
      prop: this.currentPosition.y,
      func: TweenTypes.EASE_IN_QUAD,
      begin: this.currentPosition.y-100,
      finish: this.currentPosition.y+25,
      duration: 6,
      useSeconds: true
    })

    this.tweens.y.push(upTween);
    this.tweens.y.push(downTween);
    this.tweens.x.push(new Tween({
      obj: this,
      prop: this.currentPosition.x,
      func: TweenTypes.LINEAR,
      begin: center,
      finish: center - 50,
      duration: 12,
      useSeconds: false
    }));
    
  }
  tween() {
    let newX = this.currentPosition.x;
    let newY = this.currentPosition.y;

    if (this.tweens.y.length > 0) {
      this.tweens.x[0].nextFrame();
      newX = this.tweens.x[0].getPosition();
      if (this.tweens.x[0].isComplete) { this.tweens.x.shift(); }
      if (this.tweens.x[0].isComplete) {
        this.tweens.x.shift();
        console.log('x tween complete')
        if (this.tweens.x.length > 0) {
          console.log('next tween is : ' + this.tweens.x[0].funcName);
        }
      }
    }
    
    if (this.tweens.y.length > 0) {
      this.tweens.y[0].nextFrame();
      newY = this.tweens.y[0].getPosition();
      console.log('tween is : ' + this.tweens.y[0].funcName);
      if (this.tweens.y[0].isComplete) {
        this.tweens.y.shift();
        console.log('y tween complete');
        if (this.tweens.y.length > 0) {
          console.log('next tween is : ' + this.tweens.y[0].funcName);
        }
      }
    }
    
    this.currentPosition = new Position(newX, newY);
  }
  draw() {
    // this.horizontalTween.nextFrame();
    // let newPos = this.horizontalTween.getPosition();
    // if (newPos.x !== null) { this.currentPosition.x = newPos.x; }
    // if (newPos.y !== null) { this.currentPosition.y = newPos.y; }
    
    // console.log(this.currentPosition);
    stroke(48);
    strokeWeight(3);
    fill('rgb(255,100,0)');
    this.tween();
    // ellipse(this.currentPosition.x,
    //   this.currentPosition.y-(30*this.scale),
    //   (27*this.scale),(55*this.scale));
    ellipse(this.currentPosition.x,
      this.currentPosition.y-(30*this.scale),
      (27*this.scale),(55*this.scale));
  }
}

function setup() {
  createCanvas(800,600);
  background(128);
  qbert = new QBert();
}
function drawCircle() {
  fill(255);
  strokeWeight(1);
  circle(newPosition.x,newPosition.y,10);
}
function draw() {
  background(128);
  frameRate(30);

  qbert.draw();

  // let begin = new Position(10,10);
  // let change = new Position(200,200);
  // let duration = 48;
  // newPosition = Tween.easeOutCirc(frameCount,begin,change,duration);
  // console.log(`draw():newPosition: ${newPosition}`); 
  // drawCircle();
}
