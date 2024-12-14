import Tween, { TweenFuncParams, TweenProps } from "../../Tween";

export class EaseOutSineTween extends Tween {
    constructor(params:TweenProps) {
        super({
            ...params,
            funcName: "EaseOutSinusoidalTween", 
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
        return (change||0) * Math.sin(t!/duration! * (Math.PI/2)) + begin!;
    }
}
export default EaseOutSineTween;