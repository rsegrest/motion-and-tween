import Tween, { TweenFuncParams, TweenProps } from "../../Tween";

export class EaseOutQuadraticTween extends Tween {
    constructor(params:TweenProps) {
        super({
            ...params,
            funcName: "EaseOutQuadraticTween", 
        });
    }
    update({
        t = this._time,
        begin = this._begin,
        change = this._change,
        duration = this._duration
    }:TweenFuncParams):number {
        // console.log(`t: ${t}, duration: ${duration!}`);
        if (t! >= duration!) {
            // console.log('marking easeOutQuad as complete');
            this.isComplete = true;
            return this.finish;
        }
        const nextT = t!/=duration!;
        return -change! * nextT*(nextT-2) + begin!;
    }
}
export default EaseOutQuadraticTween;