import Tween, { TweenAtTimeParams, TweenChangeProps } from "../Tween";

export class EaseInCircularTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(
            params,
            "EaseInCircularTween", 
        );
    }
    update(
        params:TweenAtTimeParams,
    ):(typeof this.obj) {
        const newParams = this.setParams(params);
        let {nextT, beginValue, valueChange, actionDuration: duration} = newParams;
        // super.update({ t: nextT })
        
        const timeStep = (nextT/duration);
        const newValue = valueChange * (1-(Math.sqrt(1-Math.pow(timeStep,2)))) + beginValue;

        if (!this.checkIfFinished(nextT,duration)) {
            this.obj[this.propertyToChange] = newValue;
        }
        return this.obj;
    }
}
export default EaseInCircularTween;