import Tween, { TweenAlgorithmParams, TweenProps } from "../Tween.js";

export class EaseOutCubicTween extends Tween {
    constructor(params: TweenProps) {
        super(params, "EaseOutCubicTween");
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        const newValue =
            valueChange * (Math.pow(nextT / actionDuration - 1, 3) + 1) +
            beginValue;
        return newValue;
    }
}
export default EaseOutCubicTween;
