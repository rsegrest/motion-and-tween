import Tween, { TweenAtTimeParams, TweenChangeProps } from "../../Tween";

export class LinearTween extends Tween {
    constructor(params: TweenChangeProps) {
        super(
            params,
            "LinearTween",
        );
        
    }
    update(
        params: TweenAtTimeParams|null|undefined = null,
        doThrow:boolean = false,
    ): (typeof this.obj) {
        let newParams = this.setParams(params);
        if (doThrow) {
            throw(newParams)
        }
        let {nextT, beginValue, valueChange, actionDuration: duration} = newParams;
        const newValue = beginValue + (valueChange * nextT) / duration;
        
        super.update({ t: nextT })
        // TODO: Move to super.update() ? 
        if (!this.checkIfFinished(nextT,duration)) {
            this.obj[this.propertyToChange] = newValue;
        }
        return this.obj;
    }
}
export default LinearTween;
