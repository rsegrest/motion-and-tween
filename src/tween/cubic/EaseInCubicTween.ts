import Tween, { TweenAlgorithmParams, TweenProps } from "../Tween.js";

export class EaseInCubicTween extends Tween {
    constructor(params: TweenProps) {
        super(params, "EaseInCubicTween");
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        const newValue =
            valueChange * Math.pow(nextT / actionDuration, 3) + beginValue;
        return newValue;
    }
}
export default EaseInCubicTween;
