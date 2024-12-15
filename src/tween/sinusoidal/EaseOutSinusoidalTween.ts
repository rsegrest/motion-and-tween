import Tween, { TweenAtTimeParams, TweenChangeProps } from "../Tween";

export class EaseOutSinusoidalTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(params,
            "EaseOutSinusoidalTween", 
        );
    }
    update(
        params:TweenAtTimeParams,
    ):(typeof this.obj) {
        const newParams = this.setParams(params);
        let { nextT, beginValue, valueChange, actionDuration } = newParams;
        // super.update({ t: nextT })
        let newValue =  valueChange * (Math.sin((nextT/actionDuration) * (Math.PI/2))) + beginValue;

        if (!this.checkIfFinished(nextT, actionDuration)) {
            this.obj[this.propertyToChange] = newValue;
        }
        return this.obj;
    }
}
export default EaseOutSinusoidalTween;