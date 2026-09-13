import Tween, { TweenAlgorithmParams, TweenProps } from "../Tween.js";

export class EaseOutQuadraticTween extends Tween {
    constructor(params: TweenProps) {
        super(params, "EaseOutQuadraticTween");
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        const timeStep = nextT / actionDuration;
        const newValue =
            -valueChange * (timeStep * (timeStep - 2)) + beginValue;

        return newValue;
    }
}
export default EaseOutQuadraticTween;
