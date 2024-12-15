import Tween, { TweenAtTimeParams, TweenChangeProps } from "../../Tween";

export class EaseInOutCubicTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(params,
            "EaseInOutCubicTween", 
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
        // let newT = (t!/=(duration!/2));
        // if (newT < 1) {
        //     return (change!/2*Math.pow(t!,3)+begin!);
        // }
        // return change!/2*(Math.pow((t!-2),3)+2)+begin!;
        const newParams = this.setParams(params);
        if (doThrow) {
            throw(newParams);
        }
        let { lastT, nextT, beginValue, valueChange, actionDuration } = newParams;
        super.update({ t: nextT })

        let newValue;
        let timeStep = nextT/(actionDuration/2)
        if (timeStep < 1) {
            newValue = ((valueChange/2)*(Math.pow(timeStep,3))+beginValue);
        } else {
            newValue = (valueChange/2)*(Math.pow((timeStep-2),3)+2)+beginValue
        }
        if (!this.checkIfFinished(nextT, actionDuration)) {
            this.obj[this.propertyToChange] = newValue;
        }
        return this.obj;
    }
}
export default EaseInOutCubicTween;