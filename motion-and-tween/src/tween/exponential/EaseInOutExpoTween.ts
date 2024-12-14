import Tween, { TweenFuncParams, TweenProps } from "../../Tween";

export class EaseInOutExponentialTween extends Tween {
    constructor(params:TweenProps) {
        super({
            ...params,
            funcName: "EaseInOutExponentialTween", 
        });
    }
    update({
        t = this._time,
        begin = this._begin,
        change = this._change,
        duration = this._duration
    }:TweenFuncParams):number {
        
        if (t! > this._duration) {
            this.isComplete = true;
            return this.finish;
        }
        let newT = (t!/=(duration!/2));
        if (newT < 1) {(change||0)/2 * Math.pow(2, 10 * (t! - 1)) + begin! }
        --t!;
        return (this._change||0)/2 * (-Math.pow(2, -10 * t!) + 2) + begin!;
    }
}
export default EaseInOutExponentialTween;