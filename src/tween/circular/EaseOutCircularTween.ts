import Tween, { TweenAtTimeParams, TweenChangeProps } from "../Tween";

export class EaseOutCircularTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(
            params,
            "EaseOutCircularTween", 
        );
    }
    update(
        params:TweenAtTimeParams,
    ):(typeof this.obj) {
        const newParams = this.setParams(params);
        let {nextT, beginValue, valueChange, actionDuration: duration} = newParams;
        // super.update({ t: nextT })
        const timeStep = (nextT/duration)-1
        const newValue = valueChange * Math.sqrt(1 - ((timeStep)*timeStep)) + beginValue;

        if (!this.checkIfFinished(nextT,duration)) {
            this.obj[this.propertyToChange] = newValue;
        }
        return this.obj;
    }
}
export default EaseOutCircularTween;