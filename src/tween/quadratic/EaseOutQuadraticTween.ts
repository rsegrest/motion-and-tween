import Tween, { TweenAtTimeParams, TweenChangeProps } from "../Tween";

export class EaseOutQuadraticTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(params,
            "EaseOutQuadraticTween", 
        );
    }
    update(
        params:TweenAtTimeParams,
    ):(typeof this.obj) {
        const newParams = this.setParams(params);
        let { nextT, beginValue, valueChange, actionDuration } = newParams;
        // super.update({ t: nextT })

        const timeStep = nextT/actionDuration;
        const newValue = -valueChange*(timeStep*(timeStep-2)) + beginValue

        if (!this.checkIfFinished(nextT, actionDuration)) {
            this.obj[this.propertyToChange] = newValue;
        }
        return this.obj;
    }
}
export default EaseOutQuadraticTween;