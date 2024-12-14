import Tween, { TweenFuncParams, TweenProps } from "../../Tween";

export class EaseInQuartic extends Tween {
    constructor(params:TweenProps) {
        super({
            ...params,
            funcName: "EaseOutQuinticTween", 
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
        return (change||0) * (Math.pow((t!/duration!-1),5) + 1) + begin!;
    }
}
export default EaseInQuartic;