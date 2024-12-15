import Tween, { TweenAtTimeParams, TweenChangeProps } from "../Tween";

export class EaseOutQuinticTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(params,
            "EaseOutQuinticTween", 
        );
    }
    update(
        params:TweenAtTimeParams,
    ):(typeof this.obj) {
        const newParams = this.setParams(params);
        let { nextT, beginValue, valueChange, actionDuration } = newParams;
        // super.update({ t: nextT })
        let newValue = valueChange * (Math.pow((nextT/actionDuration-1),5) + 1) + beginValue;

        if (!this.checkIfFinished(nextT, actionDuration)) {
            this.obj[this.propertyToChange] = newValue;
        }
        return this.obj;
    }
}
export default EaseOutQuinticTween;