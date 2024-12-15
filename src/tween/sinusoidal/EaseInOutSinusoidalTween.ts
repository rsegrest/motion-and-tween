import Tween, { TweenAtTimeParams, TweenChangeProps } from "../../Tween";

export class EaseInOutSinusoidalTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(params,
            "EaseInOutSinusoidalTween", 
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
        // let timeStep = nextT/(actionDuration/2)
        let newValue = (valueChange/2) * (1-(Math.cos(Math.PI*(nextT/actionDuration)))) + beginValue;

        if (!this.checkIfFinished(nextT, actionDuration)) {
            this.obj[this.propertyToChange] = newValue;
        }
        return this.obj;
    }
    // return change!/2 * (1 - Math.cos(Math.PI*t!/duration!)) + begin!;
}
export default EaseInOutSinusoidalTween;