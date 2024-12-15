import Tween, { TweenAtTimeParams, TweenChangeProps } from "../Tween";

export class EaseOutCubicTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(params,
            "EaseOutCubicTween", 
        );
    }
    update(
        params:TweenAtTimeParams,
    ):(typeof this.obj) {
        const newParams = this.setParams(params);
        let { lastT, nextT, beginValue, valueChange, actionDuration } = newParams;
        // super.update({ t: nextT })

        const newValue = valueChange * (Math.pow((nextT/actionDuration-1),3) + 1) + beginValue;

        if (!this.checkIfFinished(nextT, actionDuration)) {
            this.obj[this.propertyToChange] = newValue;
        }
        return this.obj;
    }
}
export default EaseOutCubicTween;