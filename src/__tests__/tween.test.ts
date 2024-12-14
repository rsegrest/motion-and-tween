import { MotionProps } from "../Motion";
import { TweenFuncParams, TweenProps } from "../Tween";
import LinearTween from "../tween/linear/LinearTween";

describe("Tween", () => {
    class Rectangle {
        public x: number = 10;
        public y: number = 10;
        public w: number = 50;
        public h: number = 50;
        public toString = () => {
            return `Rectangle[x=${this.x}, y=${this.y}, w=${this.w}, h=${this.h}]`;
        };
    }
    // let tp: TweenProps = {};
    let rect: Rectangle = new Rectangle();
    let mp: MotionProps = {
        obj: rect,
        prop: "x",
        begin: 10,
        duration: 100,
        useSeconds: false,
    };
    let tfp: TweenFuncParams = {
        t: 1,
        begin: 0,
        change: 10,
        duration: 100,
    };
    let tfp2: TweenFuncParams = {
        t: 2, // t is now 2
        begin: 0, // begin at t=0?
        change: 10, // total change in x...
        duration: 100, // ...over a duration of 100 ms
    };

    let linearTween: LinearTween = new LinearTween(mp);

    it("should tween", () => {
        expect(linearTween).toBeDefined();
        expect(rect.toString()).toBe("Rectangle[x=10, y=10, w=50, h=50]");
        let r = linearTween.update(tfp) as Rectangle;
        expect(r.x).toBe(10.1);
        r = linearTween.update(tfp2) as Rectangle;
        expect(r.x).toBe(10.2);
    });
});
