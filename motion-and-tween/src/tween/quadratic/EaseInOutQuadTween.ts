import Tween, { TweenFuncParams, TweenProps } from "../../Tween";

export class EaseOutQuadraticTween extends Tween {
    constructor(params:TweenProps) {
        super({
            ...params,
            funcName: "EaseInOutQuadTween", 
        });
    }
    update({
        t = this._time,
        begin = this._begin,
        change = this._change,
        duration = this._duration
    }:TweenFuncParams):number {
        // console.log(`t: ${t}, duration: ${duration}`);
        if (t! > duration!) { 
            this.isComplete = true;
            return this.finish;
        }
        let newT = (t!/=(duration!/2));
        if ((newT) < 1) return change!/2*t!*t! + begin!;
        --newT;
        return (-change!/2*(newT*(newT-2) - 1) + begin!);
    }
}
export default EaseOutQuadraticTween;