import Tween, { TweenAtTimeParams, TweenChangeProps } from "../../Tween";

export class EaseOutCircularTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(
            params,
            "EaseOutCircularTween", 
        );
    }
    update(
        params:TweenAtTimeParams,
        doThrow:boolean = false
    ):(typeof this.obj) {
        const newParams = this.setParams(params);
        if (doThrow) {
            throw(newParams);
        }
        let {lastT, nextT, beginValue, valueChange, actionDuration: duration} = newParams;
        super.update({ t: nextT })
        const timeStep = (nextT/duration)-1
        // throw(timeStep);
        const newValue = valueChange * Math.sqrt(1 - ((timeStep)*timeStep)) + beginValue;

        if (!this.checkIfFinished(nextT,duration)) {
            this.obj[this.propertyToChange] = newValue;
        }
        return this.obj;
    }
}
export default EaseOutCircularTween;