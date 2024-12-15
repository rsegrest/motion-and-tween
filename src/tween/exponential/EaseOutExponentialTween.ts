import Tween, { TweenAtTimeParams, TweenChangeProps } from "../Tween";

export class EaseOutExponentialTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(
            params,
            "EaseOutExponentialTween", 
        );
    }

    update(
        params:TweenAtTimeParams,
    ):(typeof this.obj) {
        const newParams = this.setParams(params);
        let { nextT, beginValue, valueChange, actionDuration } = newParams;
        // super.update({ t: nextT })

        // const newValue = valueChange * Math.pow((nextT/actionDuration),3) + beginValue;
        const newValue =  (valueChange) * (-Math.pow(2, (-10 * nextT/actionDuration)) + 1) + beginValue;

        if (!this.checkIfFinished(nextT, actionDuration)) {
            this.obj[this.propertyToChange] = newValue;
        }
        return this.obj;
    }
}
export default EaseOutExponentialTween;