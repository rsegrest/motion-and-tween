import Tween, { TweenAtTimeParams, TweenChangeProps } from "../../Tween";

export class EaseOutQuadraticTween extends Tween {
    //     const nextT = t!/=duration!;
    //     return -change! * nextT*(nextT-2) + begin!;
    constructor(params:TweenChangeProps) {
        super(params,
            "EaseOutQuadraticTween", 
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

        const timeStep = nextT/actionDuration;
        const newValue = -valueChange*(timeStep*(timeStep-2)) + beginValue

        if (!this.checkIfFinished(nextT, actionDuration)) {
            this.obj[this.propertyToChange] = newValue;
        }
        return this.obj;
    }
}
export default EaseOutQuadraticTween;