import Tween, { TweenAlgorithmParams, TweenProps } from "../Tween.js";

export class EaseInOutSinusoidalTween extends Tween {
    constructor(params: TweenProps) {
        super(params, "EaseInOutSinusoidalTween");
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        const newValue =
            (valueChange / 2) *
                (1 - Math.cos(Math.PI * (nextT / actionDuration))) +
            beginValue;
        return newValue;
    }
}
export default EaseInOutSinusoidalTween;
