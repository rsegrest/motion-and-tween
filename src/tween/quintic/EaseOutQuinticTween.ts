import Tween, { TweenAlgorithmParams, TweenProps } from "../Tween.js";

export class EaseOutQuinticTween extends Tween {
    constructor(params: TweenProps) {
        super(params, "EaseOutQuinticTween");
    }

    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        const newValue =
            valueChange * (Math.pow(nextT / actionDuration - 1, 5) + 1) +
            beginValue;
        return newValue;
    }
}
export default EaseOutQuinticTween;
