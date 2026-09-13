import Tween, { TweenAlgorithmParams, TweenProps } from "../Tween.js";

export class EaseInOutQuinticTween extends Tween {
    constructor(params: TweenProps) {
        super(params, "EaseInOutQuinticTween");
    }

    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        const timeStep = nextT / (actionDuration / 2);
        let newValue;
        if (timeStep < 1) {
            newValue = (valueChange / 2) * Math.pow(timeStep, 5) + beginValue;
        } else {
            newValue =
                (valueChange / 2) * (Math.pow(timeStep - 2, 5) + 2) +
                beginValue;
        }
        return newValue;
    }
}
export default EaseInOutQuinticTween;
