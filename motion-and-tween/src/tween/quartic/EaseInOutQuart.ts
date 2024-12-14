import Tween, { TweenFuncParams, TweenProps } from "../../Tween";

export class EaseInOutQuartic extends Tween {
    constructor(params:TweenProps) {
        super({
            ...params,
            funcName: "EaseInOutQuarticTween", 
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
        let newT = (t!/=(duration!/2));
        if (newT < 1) return (change||0)/2*Math.pow(t!,4)+begin!;

        return ((-change!/2)*(Math.pow((t!-2),4)-2)+begin!);
    }
}
export default EaseInOutQuartic;