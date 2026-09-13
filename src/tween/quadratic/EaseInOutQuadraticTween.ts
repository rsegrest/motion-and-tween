import Tween, { TweenAlgorithmParams, TweenProps } from "../Tween.js";

export class EaseInOutQuadraticTween extends Tween {
    constructor(params: TweenProps) {
        super(params, "EaseInOutQuadraticTween");
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        let timeStep = nextT / (actionDuration / 2);
        let newValue;
        if (timeStep < 1) {
            newValue = (valueChange / 2) * Math.pow(timeStep, 2) + beginValue;
        } else {
            timeStep = timeStep - 1;
            newValue =
                -(valueChange / 2) * (timeStep * (timeStep - 2) - 1) +
                beginValue;
        }
        return newValue;
    }
}
export default EaseInOutQuadraticTween;
