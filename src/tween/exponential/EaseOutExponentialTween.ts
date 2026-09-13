import Tween, { TweenAlgorithmParams, TweenProps } from "../Tween.js";

export class EaseOutExponentialTween extends Tween {
    constructor(params: TweenProps) {
        super(params, "EaseOutExponentialTween");
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        const newValue =
            valueChange * (-Math.pow(2, (-10 * nextT) / actionDuration) + 1) +
            beginValue;
        return newValue;
    }
}
export default EaseOutExponentialTween;
