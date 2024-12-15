import Tween, { TweenAtTimeParams, TweenChangeProps } from "../../Tween";

export class EaseInCircularTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(
            params,
            "EaseInCircularTween", 
        );
    }
    // Math.easeInCirc = function (t,begin,change,duration) 
    // return change * (1- Math.sqrt(1 - (t/=duration)*t)) + begin 
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
        
        const timeStep = (nextT/duration); // 5/10
        const newValue = valueChange * (1-(Math.sqrt(1-Math.pow(timeStep,2)))) + beginValue;

        if (!this.checkIfFinished(nextT,duration)) {
            this.obj[this.propertyToChange] = newValue;
        }
        return this.obj;
    }
}
export default EaseInCircularTween;