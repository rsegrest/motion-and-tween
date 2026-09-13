import Tween, { TweenAlgorithmParams, TweenProps } from "../Tween.js";

export class EaseOutQuarticTween extends Tween {
    constructor(params: TweenProps) {
        super(params, "EaseOutQuarticTween");
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        const { nextT, beginValue, valueChange, actionDuration } = params;
        const newValue =
            -valueChange * (Math.pow(nextT / actionDuration - 1, 4) - 1) +
            beginValue;
        return newValue;
    }
}
export default EaseOutQuarticTween;
