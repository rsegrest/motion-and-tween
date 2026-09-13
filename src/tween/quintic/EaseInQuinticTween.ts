import Tween, { TweenAlgorithmParams, TweenProps } from "../Tween.js";

export class EaseInQuinticTween extends Tween {
    constructor(params: TweenProps) {
        super(params, "EaseInQuinticTween");
    }

    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        const newValue =
            valueChange * Math.pow(nextT / actionDuration, 5) + beginValue;
        return newValue;
    }
}
export default EaseInQuinticTween;
