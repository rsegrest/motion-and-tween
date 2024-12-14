import Tween, { TweenFuncParams, TweenProps } from "../../Tween";

export class EaseInOutCircularTween extends Tween {
    constructor(params:TweenProps) {
        super({
            ...params,
            funcName: "EaseInOutCircularTween", 
        });
    }
    update({
        t = this._time,
        begin = this._begin,
        change = this._change,
        duration = this._duration
    }:TweenFuncParams):number {
        
        let nextT = (t!/duration!/2);
        // if (newT < 1) return change.x/2 * (Math.sqrt(1 - t!*t!) - 1) + begin;
        if (nextT < 1) return change!/2 * (Math.sqrt(1 - t!*t!) - 1) + begin!;
        nextT -= 2;
        return change!/2 * (Math.sqrt(1 - t!*t!) + 1) + begin!;
    }
}
export default EaseInOutCircularTween;