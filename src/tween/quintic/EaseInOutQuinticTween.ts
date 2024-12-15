import Tween, { TweenAtTimeParams, TweenChangeProps } from "../../Tween";

export class EaseInOutQuinticTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(params,
                "EaseInOutQuinticTween", 
            );
        }
    update(
        params:TweenAtTimeParams,
        doThrow:boolean = false,
    ):(typeof this.obj) {
        // let newT = (t!/=(duration!/2));
        // if (newT < 1) {
        //     return (change!/2*Math.pow(t!,5)+begin!);
        // }
        // return change!/2*(Math.pow((t!-2),5)+2)+begin!;
        const newParams = this.setParams(params);
        if (doThrow) {
            throw(newParams);
        }
        let { lastT, nextT, beginValue, valueChange, actionDuration } = newParams;
        super.update({ t: nextT })
        const timeStep = nextT/(actionDuration/2);
        let newValue;
        if (timeStep < 1) {
            newValue = (valueChange/2) * Math.pow((timeStep),5) + beginValue;
        } else {
            newValue = (valueChange/2) * (Math.pow((timeStep-2),5)+2) + beginValue;
        }

        if (!this.checkIfFinished(nextT, actionDuration)) {
            this.obj[this.propertyToChange] = newValue;
        }
        return this.obj;
    }
}
export default EaseInOutQuinticTween;