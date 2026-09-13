import Tween, { TweenAlgorithmParams, TweenProps } from "../Tween.js";

export class EaseInOutCircularTween extends Tween {
    constructor(params: TweenProps) {
        super(params, "EaseInOutCircularTween");
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        let timeStep = nextT / (actionDuration / 2);
        let newValue;

        if (timeStep <= 1) {
            // const timeStep = nextT / (actionDuration / 2);
            newValue =
                (valueChange / 2) * (1 - Math.sqrt(1 - Math.pow(timeStep, 2))) +
                beginValue;
        } else {
            timeStep = timeStep - 2;
            newValue =
                (valueChange / 2) * Math.sqrt(1 - Math.pow(timeStep, 2)) +
                (beginValue + valueChange / 2);
        }
        return newValue;
    }
}
export default EaseInOutCircularTween;
