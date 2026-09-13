import Tween, { TweenAlgorithmParams, TweenProps } from "../Tween.js";

export class EaseInQuarticTween extends Tween {
    constructor(params: TweenProps) {
        super(params, "EaseInQuarticTween");
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        let timeStep = nextT / actionDuration;
        let newValue = valueChange * Math.pow(timeStep, 4) + beginValue;
        return newValue;
    }
}
export default EaseInQuarticTween;
