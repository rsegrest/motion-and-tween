import Tween, { TweenFuncParams, TweenProps } from "../../Tween";

export class EaseInExponentialTween extends Tween {
    constructor(params:TweenProps) {
        super({
            ...params,
            funcName: "EaseInExponentialTween", 
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
        return change! * Math.pow(2, 10 * (t!/duration! - 1)) + begin!;
    }
}
export default EaseInExponentialTween;