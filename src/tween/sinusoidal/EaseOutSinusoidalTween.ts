import Tween, { TweenAlgorithmParams, TweenAtTimeParams, TweenChangeProps } from "../Tween";

export class EaseOutSinusoidalTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(params,
            "EaseOutSinusoidalTween", 
        );
    }
    tweenAlgorithm(params:TweenAlgorithmParams):number {
        let {nextT, beginValue, valueChange, actionDuration} = params;
        const newValue =  valueChange * (Math.sin((nextT/actionDuration) * (Math.PI/2))) + beginValue;
        return newValue;
    }
    update(
        params: TweenAtTimeParams|null|undefined = null,
    ): (typeof this.obj) {
        return super.update(params,this.tweenAlgorithm)
    }
}
export default EaseOutSinusoidalTween;