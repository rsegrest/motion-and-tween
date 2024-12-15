import Tween, { TweenAtTimeParams, TweenChangeProps } from "../../Tween";

export class EaseInOutCircularTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(params,
            "EaseInOutCircularTween", 
        );
    }

    // timeStep Values:
    // t = 5:
        // d = 10/2 = 5
        // t1 = 5/5 = 0
        // t2 = -2
        // 1 - (-2^2) = -3
    // t = 9:
        // d = 10/2 = 5
        // t1 = 9/5 = 1.4
        // t2 = -0.6
        // 1 - (-0.6^2)=0.36 = 0.64
    update(params:TweenAtTimeParams,doThrow:boolean=false):(typeof this.obj) {
        const newParams = this.setParams(params);
        if (doThrow) {
            throw(newParams);
        }
        let {lastT, nextT, beginValue, valueChange, actionDuration: duration} = newParams;
        super.update({ t: nextT })
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