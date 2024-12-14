import Tween, { TweenFuncParams, TweenProps } from "../../Tween";

export class EaseOutQuartic extends Tween {
    constructor(params:TweenProps) {
        super({
            ...params,
            funcName: "EaseOutQuarticTween", 
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
        return -(change||0) * (Math.pow((t!/duration!-1),4) - 1) + begin!;
    }
}
export default EaseOutQuartic;