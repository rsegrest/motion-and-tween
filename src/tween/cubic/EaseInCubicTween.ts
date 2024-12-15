import Tween, { TweenAtTimeParams, TweenChangeProps } from "../../Tween";

export class EaseInCubicTween extends Tween {
    constructor(
        params:TweenChangeProps) {
        super(params,
            "EaseInCubicTween", 
        );
    }
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

        
        const newValue = valueChange * Math.pow((nextT/actionDuration),3) + beginValue;

        if (!this.checkIfFinished(nextT, actionDuration)) {
            this.obj[this.propertyToChange] = newValue;
        }
        return this.obj;
    }
}
export default EaseInCubicTween;