import Tween, { TweenAtTimeParams, TweenChangeProps } from "../Tween";

export class EaseInOutCircularTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(params,
            "EaseInOutCircularTween", 
        );
    }
    update(params:TweenAtTimeParams):(typeof this.obj) {
        const newParams = this.setParams(params);
        let { nextT, beginValue, valueChange, actionDuration: duration} = newParams;
        // super.update({ t: nextT })
        let newValue;

        if (nextT/duration <= 0.5) {
            const timeStep = (nextT/(duration/2))
            newValue = (valueChange/2) * (1-Math.sqrt(1-Math.pow(timeStep,2))) + beginValue;
        } else {
            const timeStep = (nextT/(duration))
            newValue = (valueChange/2) * (Math.sqrt(1 - Math.pow(timeStep,2))) + (beginValue + (valueChange/2));
        }
        if (!this.checkIfFinished(nextT,duration)) {
            this.obj[this.propertyToChange] = newValue;
        }
        return this.obj;
    }
}
export default EaseInOutCircularTween;