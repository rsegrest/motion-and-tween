import { Vector } from "../motion/index.js";
import { Position } from "../location/index.js";
import {
    CircularTween,
    ExponentialTween,
    LinearTween,
} from "../tween/index.js";

interface Movable {
    x: number;
}

function createLinearTween(movable: Movable): LinearTween {
    return new LinearTween({
        obj: movable,
        propertyToChange: "x",
        beginValue: 0,
        actionDuration: 10,
        valueChange: 10,
    });
}

describe("Regression tests", () => {
    it("should ease out along a circular curve", () => {
        const movable: Movable = { x: 0 };
        const tween = new CircularTween.EaseOut({
            obj: movable,
            propertyToChange: "x",
            beginValue: 0,
            actionDuration: 10,
            valueChange: 100,
        });
        tween.update({ t: 1 });
        expect(movable.x).toBeCloseTo(43.589);
        tween.update({ t: 5 });
        expect(movable.x).toBeCloseTo(86.603);
    });

    it("should not modify the target object during construction", () => {
        const movable: Movable = { x: 999 };
        createLinearTween(movable);
        expect(movable.x).toBe(999);
    });

    it("should advance exactly one frame per nextFrame call", () => {
        const movable: Movable = { x: 0 };
        const tween = createLinearTween(movable);
        tween.nextFrame();
        tween.nextFrame();
        tween.nextFrame();
        expect(tween.getTime()).toBe(3);
        expect(movable.x).toBe(3);
        tween.prevFrame();
        expect(tween.getTime()).toBe(2);
        expect(movable.x).toBe(2);
    });

    it("should rewind to time zero", () => {
        const movable: Movable = { x: 0 };
        const tween = createLinearTween(movable);
        tween.update({ t: 6 });
        tween.rewind(0);
        expect(tween.getTime()).toBe(0);
        expect(movable.x).toBe(0);
    });

    it("should not move after stop() until resume() is called", () => {
        const movable: Movable = { x: 0 };
        const tween = createLinearTween(movable);
        tween.update();
        tween.update();
        tween.stop();
        tween.update();
        tween.update();
        expect(movable.x).toBe(2);
        tween.resume();
        tween.update();
        expect(movable.x).toBe(3);
    });

    it("should stop at the finish value when not looping", () => {
        const movable: Movable = { x: 0 };
        const tween = createLinearTween(movable);
        for (let frame = 0; frame < 15; frame++) tween.update();
        expect(movable.x).toBe(10);
        expect(tween.getTime()).toBe(10);
    });

    it("should loop when update() passes the end of a looping tween", () => {
        const movable: Movable = { x: 0 };
        const tween = createLinearTween(movable);
        tween.setIsLooping(true);
        for (let frame = 0; frame < 11; frame++) tween.update();
        expect(tween.getTime()).toBe(1);
        expect(movable.x).toBe(1);
    });

    it("should honor zero-valued overrides in expandParams and update", () => {
        const movable: Movable = { x: 0 };
        const tween = new LinearTween({
            obj: movable,
            propertyToChange: "x",
            beginValue: 10,
            actionDuration: 10,
            valueChange: 10,
        });
        const expanded = tween.expandParams({ t: 5, beginValue: 0, valueChange: 0 });
        expect(expanded.beginValue).toBe(0);
        expect(expanded.valueChange).toBe(0);
        expect(tween.expandParams({ actionDuration: 20 }).actionDuration).toBe(20);
        tween.update({ t: 5, valueChange: 0 });
        expect(movable.x).toBe(10);
    });

    it("should hit exact begin and finish values for exponential tweens", () => {
        const tweenClasses = [
            ExponentialTween.EaseIn,
            ExponentialTween.EaseOut,
            ExponentialTween.EaseInOut,
        ];
        tweenClasses.forEach((TweenClass) => {
            const movable: Movable = { x: 0 };
            const tween = new TweenClass({
                obj: movable,
                propertyToChange: "x",
                beginValue: 0,
                actionDuration: 10,
                valueChange: 1000,
            });
            tween.update({ t: 0 });
            expect(movable.x).toBe(0);
            tween.update({ t: 10 });
            expect(movable.x).toBe(1000);
        });
    });

    it("should accept finishValue instead of valueChange", () => {
        const movable: Movable = { x: 0 };
        const tween = new LinearTween({
            obj: movable,
            propertyToChange: "x",
            beginValue: 0,
            actionDuration: 10,
            finishValue: 50,
        });
        tween.update({ t: 5 });
        expect(movable.x).toBe(25);
    });

    it("should continue from the current position to a new finish value", () => {
        const movable: Movable = { x: 0 };
        const tween = createLinearTween(movable);
        tween.update({ t: 5 });
        tween.continueTo(20, 4);
        expect(tween.getBegin()).toBe(5);
        expect(tween.getActionDuration()).toBe(4);
        tween.update();
        expect(movable.x).toBe(8.75);
    });

    it("should yoyo back to the original begin value", () => {
        const movable: Movable = { x: 0 };
        const tween = createLinearTween(movable);
        tween.update({ t: 10 });
        tween.yoyo();
        tween.update({ t: 5 });
        expect(movable.x).toBe(5);
        tween.update({ t: 10 });
        expect(movable.x).toBe(0);
    });

    it("should move a Position that starts at zero", () => {
        const position = new Position(0, 0);
        position.addVector(new Vector(5, 5));
        expect(position.x).toBe(5);
        expect(position.y).toBe(5);
        expect(position.toString()).toBe("Position[5,5]");
    });

    it("should re-export the Vector class from the motion module", () => {
        expect(new Vector(1, 2).toString()).toBe("Vector2D[1, 2]");
    });
});
