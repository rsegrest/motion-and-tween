import Tween, { TweenAtTimeParams, TweenChangeProps } from "../Tween";

export class EaseOutQuarticTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(params,
            "EaseOutQuarticTween", 
        );
    }
    update(
        params:TweenAtTimeParams,
    ):(typeof this.obj) {
        const newParams = this.setParams(params);
        let { nextT, beginValue, valueChange, actionDuration } = newParams;
        // super.update({ t: nextT })

        let newValue = -valueChange * (Math.pow(((nextT/actionDuration)-1),4) - 1) + beginValue;

        if (!this.checkIfFinished(nextT, actionDuration)) {
            this.obj[this.propertyToChange] = newValue;
        }
        return this.obj;
    }
}
export default EaseOutQuarticTween;