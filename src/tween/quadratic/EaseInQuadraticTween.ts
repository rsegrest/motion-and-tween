import Tween, { TweenAlgorithmParams, TweenProps } from "../Tween.js";

export class EaseInQuadraticTween extends Tween {
    constructor(params: TweenProps) {
        super(params, "EaseInQuadraticTween");
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        const timeStep = nextT / actionDuration;
        const newValue = valueChange * Math.pow(timeStep, 2) + beginValue;
        return newValue;
    }
}
export default EaseInQuadraticTween;
