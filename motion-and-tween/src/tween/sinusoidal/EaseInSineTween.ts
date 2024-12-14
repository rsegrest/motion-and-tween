import Tween, { TweenFuncParams, TweenProps } from "../../Tween";

export class EaseInSineTween extends Tween {
    constructor(params:TweenProps) {
        super({
            ...params,
            funcName: "EaseInSinusoidalTween", 
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
        return -change! * Math.cos(t!/duration! * (Math.PI/2)) + change! + begin!;
        
    }
}
export default EaseInSineTween;


