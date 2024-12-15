import Tween, { TweenAtTimeParams, TweenChangeProps } from "../Tween";

export class EaseInOutExponentialTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(
            params,
            "EaseInOutExponentialTween", 
        );
    }

    update(
        params:TweenAtTimeParams,
    ):(typeof this.obj) {
        const newParams = this.setParams(params);
        let { nextT, beginValue, valueChange, actionDuration } = newParams;
        // super.update({ t: nextT })

        let timeStep = nextT/(actionDuration/2)
        let newValue;
        if (timeStep <= 1) {
            newValue = (valueChange/2) * Math.pow(2,10*(timeStep-1)) + beginValue;
        } else {
            timeStep = timeStep - 1;
            newValue = (valueChange/2) * (-Math.pow(-2,-10*(timeStep)) + 2) + beginValue;
        }
        
        if (!this.checkIfFinished(nextT, actionDuration)) {
            this.obj[this.propertyToChange] = newValue;
        }
        return this.obj;
    }
}
export default EaseInOutExponentialTween;