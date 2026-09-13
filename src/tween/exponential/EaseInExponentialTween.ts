import Tween, { TweenAlgorithmParams, TweenProps } from "../Tween.js";

export class EaseInExponentialTween extends Tween {
    constructor(params: TweenProps) {
        super(params, "EaseInExponentialTween");
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        const newValue =
            valueChange * Math.pow(2, 10 * (nextT / actionDuration - 1)) +
            beginValue;
        return newValue;
    }
}
export default EaseInExponentialTween;
