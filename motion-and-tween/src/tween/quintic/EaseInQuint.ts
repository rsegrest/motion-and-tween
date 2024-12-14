import Tween, { TweenFuncParams, TweenProps } from "../../Tween";

export class EaseInQuintic extends Tween {
    constructor(params:TweenProps) {
        super({
            ...params,
            funcName: "EaseInQuinticTween", 
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
        return change! * Math.pow((t!/duration!),5) + begin!;
    }
}
export default EaseInQuintic;