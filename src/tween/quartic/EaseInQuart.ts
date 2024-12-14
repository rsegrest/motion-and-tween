import Tween, { TweenFuncParams, TweenProps } from "../../Tween";

export class EaseInQuartic extends Tween {
    constructor(params:TweenProps) {
        super({
            ...params,
            funcName: "EaseInQuarticTween", 
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
        return change! * Math.pow((t!/duration!),4) + begin!;
    }
}
export default EaseInQuartic;