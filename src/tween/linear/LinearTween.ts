import Tween, { TweenAlgorithmParams, TweenProps } from "../Tween.js";

export class LinearTween extends Tween {
    constructor(params: TweenProps) {
        super(params, "LinearTween");
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let {
            nextT,
            beginValue,
            valueChange,
            actionDuration: duration,
        } = params;
        const newValue = beginValue + (valueChange * nextT) / duration;
        return newValue;
    }
}
export default LinearTween;
