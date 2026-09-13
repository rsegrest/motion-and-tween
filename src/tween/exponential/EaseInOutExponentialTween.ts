import Tween, { TweenAlgorithmParams, TweenProps } from "../Tween.js";

export class EaseInOutExponentialTween extends Tween {
    constructor(params: TweenProps) {
        super(params, "EaseInOutExponentialTween");
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        let timeStep = nextT / (actionDuration / 2);
        let newValue;
        if (timeStep < 1) {
            newValue =
                (valueChange / 2) * Math.pow(2, 10 * (timeStep - 1)) +
                beginValue;
        } else {
            const calculatedValue = -Math.pow(2, -10 * --timeStep) + 2;
            newValue = (valueChange / 2) * calculatedValue + beginValue;
        }
        return newValue;
    }
}
export default EaseInOutExponentialTween;
