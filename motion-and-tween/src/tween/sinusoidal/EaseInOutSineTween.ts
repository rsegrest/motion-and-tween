import Tween, { TweenFuncParams, TweenProps } from "../../Tween";

export class EaseInOutSineTween extends Tween {
    constructor(params:TweenProps) {
        super({
            ...params,
            funcName: "EaseInOutSinusoidalTween", 
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
        return change!/2 * (1 - Math.cos(Math.PI*t!/duration!)) + begin!;
    }
}
export default EaseInOutSineTween;