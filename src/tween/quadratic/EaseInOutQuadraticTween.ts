import Tween, { TweenAtTimeParams, TweenChangeProps } from "../../Tween";

export class EaseInOutQuadraticTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(params,
            "EaseInOutQuadraticTween", 
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
        let { nextT, beginValue, valueChange, actionDuration } = newParams;
        super.update({ t: nextT })

        let timeStep = nextT/(actionDuration/2);
        let newValue;
        if (timeStep < 1) {
            newValue = valueChange/2*Math.pow(timeStep,2) + beginValue
        } else {
            timeStep = timeStep - 1;
            newValue = -(valueChange/2)*((timeStep*(timeStep-2)) - 1) + beginValue;
        }

        if (!this.checkIfFinished(nextT, actionDuration)) {
            this.obj[this.propertyToChange] = newValue;
        }
        return this.obj;
    }
}
export default EaseInOutQuadraticTween;