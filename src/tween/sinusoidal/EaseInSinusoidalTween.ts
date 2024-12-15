import Tween, { TweenAtTimeParams, TweenChangeProps } from "../../Tween";

export class EaseInSinusoidalTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(params,
            "EaseInSinusoidalTween", 
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
        let newValue =  valueChange * (1-Math.cos((nextT/actionDuration) * (Math.PI/2))) + beginValue;

        if (!this.checkIfFinished(nextT, actionDuration)) {
            this.obj[this.propertyToChange] = newValue;
        }
        return this.obj;
    }
}
export default EaseInSinusoidalTween;


