import Tween, { TweenFuncParams, TweenProps } from "../../Tween";

export class LinearTween extends Tween {
    constructor(params:TweenProps) {
        super({
            ...params,
            funcName: "LinearTween", 
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
        return (
            ((change || 0)*t!/duration! + begin!)
        );
    }
}
export default LinearTween;