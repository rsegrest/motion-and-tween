import Tween, { TweenAlgorithmParams, TweenProps } from "../Tween.js";

export class EaseOutSinusoidalTween extends Tween {
    constructor(params: TweenProps) {
        super(params, "EaseOutSinusoidalTween");
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        const newValue =
            valueChange * Math.sin((nextT / actionDuration) * (Math.PI / 2)) +
            beginValue;
        return newValue;
    }
}
export default EaseOutSinusoidalTween;
