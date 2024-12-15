import Tween, { TweenAtTimeParams, TweenChangeProps } from "../Tween";

export class EaseInOutSinusoidalTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(params,
            "EaseInOutSinusoidalTween", 
        );
    }

    update(
        params:TweenAtTimeParams,
    ):(typeof this.obj) {
        const newParams = this.setParams(params);
        let { nextT, beginValue, valueChange, actionDuration } = newParams;
        // super.update({ t: nextT })
        let newValue = (valueChange/2) * (1-(Math.cos(Math.PI*(nextT/actionDuration)))) + beginValue;

        if (!this.checkIfFinished(nextT, actionDuration)) {
            this.obj[this.propertyToChange] = newValue;
        }
        return this.obj;
    }
}
export default EaseInOutSinusoidalTween;