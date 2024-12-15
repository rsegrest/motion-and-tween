import Tween, { TweenAtTimeParams, TweenChangeProps } from "../Tween";

export class EaseInQuarticTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(params,
            "EaseInQuarticTween", 
        );
    }
    update(
        params:TweenAtTimeParams,
    ):(typeof this.obj) {
        const newParams = this.setParams(params);
        let { nextT, beginValue, valueChange, actionDuration } = newParams;
        // super.update({ t: nextT })

        let timeStep = nextT/actionDuration;
        let newValue = valueChange*Math.pow(timeStep,4) + beginValue

        if (!this.checkIfFinished(nextT, actionDuration)) {
            this.obj[this.propertyToChange] = newValue;
        }
        return this.obj;
    }

}
export default EaseInQuarticTween;