import Tween, { TweenAtTimeParams, TweenChangeProps } from "../../Tween";

export class EaseOutQuinticTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(params,
            "EaseOutQuinticTween", 
        );
    }
    update(
        params:TweenAtTimeParams,
        doThrow:boolean = false,
    ):(typeof this.obj) {
        // return (change||0) * (Math.pow((t!/duration!-1),5) + 1) + begin!;
        const newParams = this.setParams(params);
        if (doThrow) {
            throw(newParams);
        }
        let { lastT, nextT, beginValue, valueChange, actionDuration } = newParams;
        super.update({ t: nextT })
        let newValue = valueChange * (Math.pow((nextT/actionDuration-1),5) + 1) + beginValue;

        if (!this.checkIfFinished(nextT, actionDuration)) {
            this.obj[this.propertyToChange] = newValue;
        }
        return this.obj;
    }
}
export default EaseOutQuinticTween;