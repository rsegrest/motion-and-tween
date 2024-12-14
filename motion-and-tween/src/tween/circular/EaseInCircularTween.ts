import Tween, { TweenFuncParams, TweenProps } from "../../Tween";

export class EaseInCircularTween extends Tween {
    constructor(params:TweenProps) {
        super({
            ...params,
            funcName: "EaseInCircularTween", 
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
        let nextT = (t!/=duration!);
        return -change! * (Math.sqrt(1 - (nextT)*t!) - 1) + begin!;
    }
}
export default EaseInCircularTween;