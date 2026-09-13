import Tween, { TweenAlgorithmParams, TweenProps } from "../Tween.js";

export class EaseOutCircularTween extends Tween {
    constructor(params: TweenProps) {
        super(params, "EaseOutCircularTween");
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        const timeStep = nextT / actionDuration - 1;
        const newValue =
            valueChange * Math.sqrt(1 - Math.pow(timeStep, 2)) + beginValue;
        return newValue;
    }
}
export default EaseOutCircularTween;
