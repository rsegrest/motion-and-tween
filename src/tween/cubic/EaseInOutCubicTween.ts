import Tween, { TweenAtTimeParams, TweenChangeProps } from "../Tween";

export class EaseInOutCubicTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(params,
            "EaseInOutCubicTween", 
        );
    }
    update(
        params:TweenAtTimeParams,
    ):(typeof this.obj) {
        const newParams = this.setParams(params);
        let { nextT, beginValue, valueChange, actionDuration } = newParams;
        // super.update({ t: nextT })

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