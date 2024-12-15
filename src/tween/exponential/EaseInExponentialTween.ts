import Tween, { TweenAtTimeParams, TweenChangeProps } from "../Tween";

export class EaseInExponentialTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(params,
            "EaseInExponentialTween", 
        );
    }
    update(
        params:TweenAtTimeParams,
    ):(typeof this.obj) {
        const newParams = this.setParams(params);
        let { nextT, beginValue, valueChange, actionDuration } = newParams;
        // super.update({ t: nextT })

        const newValue = valueChange * Math.pow(2, 10 * (nextT/actionDuration - 1)) + beginValue;
        if (!this.checkIfFinished(nextT, actionDuration)) {
            this.obj[this.propertyToChange] = newValue;
        }
        return this.obj;
    }
}
export default EaseInExponentialTween;