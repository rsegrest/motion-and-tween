import Tween, { TweenFuncParams, TweenProps } from "../../Tween";

export class EaseInQuadraticTween extends Tween {
    constructor(params:TweenProps) {
        super({
            ...params,
            funcName: "EaseInQuadraticTween", 
        });
    }
    update({
        t = this._time,
        begin = this._begin,
        change = this._change,
        duration = this._duration
    }:TweenFuncParams):number {
        if (t! > duration!) {
            this.isComplete = true;
            return this.finish;
        }
        t! /= duration!;
        return (
            ((change || 0)*t!*t! + begin!)
        );
    }
}
export default EaseInQuadraticTween;