import Tween, { TweenAtTimeParams, TweenChangeProps } from "../../Tween";

export class EaseInExponentialTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(params,
            "EaseInExponentialTween", 
        );
    }
    update(
        params:TweenAtTimeParams,
        doThrow:boolean = false,
    ):(typeof this.obj) {
        
        // if (t! > duration!) {
        //     this.isComplete = true;
        //     return this.finish;
        // }
        // return change! * Math.pow(2, 10 * (t!/duration! - 1)) + begin!;
        const newParams = this.setParams(params);
        if (doThrow) {
            throw(newParams);
        }
        let { lastT, nextT, beginValue, valueChange, actionDuration } = newParams;
        super.update({ t: nextT })

        // const newValue = valueChange * Math.pow((nextT/actionDuration),3) + beginValue;
        const newValue = valueChange * Math.pow(2, 10 * (nextT/actionDuration - 1)) + beginValue;

        if (!this.checkIfFinished(nextT, actionDuration)) {
            this.obj[this.propertyToChange] = newValue;
        }
        return this.obj;
    }
}
export default EaseInExponentialTween;