import p5 from "p5";
var sketch = function (s) {
    // Declare variables outside setup and draw
    var x = 100;
    var y = 100;
    s.setup = function () {
        s.createCanvas(700, 410);
    };
    s.draw = function () {
        s.background(0);
        s.fill(255);
        s.rect(x, y, 50, 50);
    };
};
// Attach the sketch to a new p5 instance
new p5(sketch);
