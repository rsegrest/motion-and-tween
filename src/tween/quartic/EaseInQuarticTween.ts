import Tween, { TweenAtTimeParams, TweenChangeProps } from "../../Tween";

export class EaseInQuarticTween extends Tween {
    // constructor(params:TweenChangeProps) {
    //     super({
    //         ...params,
    constructor(params:TweenChangeProps) {
        super(params,
            "EaseInQuarticTween", 
        );
    }
    //     });
    // }
    // update({
    //     t = this._currentTime,
    //     beginValue: begin = this._beginValue,
    //     valueChange: change = this._valueChange,
    //     duration = this._duration
    // }:TweenFuncParams):number {
    //     if (t! > duration!) {
    //         this.isComplete = true;
    //         return this.finish;
    //     }
    //     return change! * Math.pow((t!/duration!),4) + begin!;
    // }
    update(
        params:TweenAtTimeParams,
        doThrow:boolean = false,
    ):(typeof this.obj) {
        // let newT = (t!/=(duration!/2));
        // if ((newT) < 1) return change!/2*t!*t! + begin!;
        // --newT;
        // return (-change!/2*(newT*(newT-2) - 1) + begin!);
        const newParams = this.setParams(params);
        if (doThrow) {
            throw(newParams);
        }
        let { lastT, nextT, beginValue, valueChange, actionDuration } = newParams;
        super.update({ t: nextT })

        // let timeStep = nextT/(actionDuration/2);
        // const newValue = -valueChange*(timeStep*(timeStep-2)) + beginValue
        let timeStep = nextT/actionDuration;
        let newValue = valueChange*Math.pow(timeStep,4) + beginValue

        if (!this.checkIfFinished(nextT, actionDuration)) {
            this.obj[this.propertyToChange] = newValue;
        }
        return this.obj;
    }

}
export default EaseInQuarticTween;