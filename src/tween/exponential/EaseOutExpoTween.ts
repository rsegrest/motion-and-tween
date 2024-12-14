import Tween, { TweenFuncParams, TweenProps } from "../../Tween";

export class EaseOutExponentialTween extends Tween {
    constructor(params:TweenProps) {
        super({
            ...params,
            funcName: "EaseOutExponentialTween", 
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
        return (change||0) * (-Math.pow(2, -10 * t!/duration!) + 1) + begin!;
    }
}
export default EaseOutExponentialTween;