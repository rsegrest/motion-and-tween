import Tween, {
    TweenAlgorithmParams,
    TweenAtTimeParams,
    TweenChangeProps,
} from "../Tween";

export class EaseOutCircularTween extends Tween {
    constructor(params: TweenChangeProps) {
        super(params, "EaseOutCircularTween");
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        const newValue =
            valueChange * Math.pow(nextT / actionDuration, 3) + beginValue;
        return newValue;
    }
    update(params: TweenAtTimeParams | null = null): typeof this.obj {
        return super.update(params, this.tweenAlgorithm);
    }
}
export default EaseOutCircularTween;
