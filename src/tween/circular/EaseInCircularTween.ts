import Tween, { TweenAlgorithmParams, TweenProps } from "../Tween.js";

export class EaseInCircularTween extends Tween {
    constructor(params: TweenProps) {
        super(params, "EaseInCircularTween");
    }

    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let {
            nextT,
            beginValue,
            valueChange,
            actionDuration: duration,
        } = params;
        const timeStep = nextT / duration;
        const newValue =
            valueChange * (1 - Math.sqrt(1 - Math.pow(timeStep, 2))) +
            beginValue;
        return newValue;
    }
}
export default EaseInCircularTween;
