import Tween, { TweenAlgorithmParams, TweenProps } from "../Tween.js";

export class EaseInSinusoidalTween extends Tween {
    constructor(params: TweenProps) {
        super(params, "EaseInSinusoidalTween");
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        const newValue =
            valueChange *
                (1 - Math.cos((nextT / actionDuration) * (Math.PI / 2))) +
            beginValue;
        return newValue;
    }
}
export default EaseInSinusoidalTween;
