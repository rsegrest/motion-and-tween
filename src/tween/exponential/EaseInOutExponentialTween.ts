import Tween, { TweenAtTimeParams, TweenChangeProps } from "../../Tween";

export class EaseInOutExponentialTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(
            params,
            "EaseInOutExponentialTween", 
        );
    }
    // update({
    //     t = this._currentTime,
    //     beginValue: begin = this._beginValue,
    //     valueChange: change = this._valueChange,
    //     duration = this._duration
    // }:TweenFuncParams):number {
        
    //     if (t! > this._duration) {
    //         this.isComplete = true;
    //         return this.finish;
    //     }
    //     let newT = (t!/=(duration!/2));
    //     if (newT < 1) {(change||0)/2 * Math.pow(2, 10 * (t! - 1)) + begin! }
    //     --t!;
    //     return (this._valueChange||0)/2 * (-Math.pow(2, -10 * t!) + 2) + begin!;
    // }
    update(
        params:TweenAtTimeParams,
        doThrow:boolean = false,
    ):(typeof this.obj) {
        const newParams = this.setParams(params);
        if (doThrow) {
            throw(newParams);
        }
        let { lastT, nextT, beginValue, valueChange, actionDuration } = newParams;
        super.update({ t: nextT })

        let timeStep = nextT/(actionDuration/2)
        let newValue;
        if (timeStep <= 1) {
            newValue = (valueChange/2) * Math.pow(2,10*(timeStep-1)) + beginValue;
        } else {
            timeStep = timeStep - 1;
            newValue = (valueChange/2) * (-Math.pow(-2,-10*(timeStep)) + 2) + beginValue;
        }
        
        if (!this.checkIfFinished(nextT, actionDuration)) {
            this.obj[this.propertyToChange] = newValue;
        }
        return this.obj;
    }
}
export default EaseInOutExponentialTween;