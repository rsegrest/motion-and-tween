import Tween, { TweenFuncParams, TweenProps } from "../../Tween";

export class EaseOutCircularTween extends Tween {
    constructor(params:TweenProps) {
        super({
            ...params,
            funcName: "EaseOutCircularTween", 
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
        let newT = (t!/duration!-1);
        return (change||0) * Math.sqrt(1 - newT*newT) + begin!;
    }
}
export default EaseOutCircularTween;