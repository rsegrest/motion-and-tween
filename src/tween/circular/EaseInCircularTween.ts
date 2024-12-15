import Tween, { TweenAlgorithmParams, TweenAtTimeParams, TweenChangeProps } from "../Tween";

export class EaseInCircularTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(
            params,
            "EaseInCircularTween", 
        );
    }

    tweenAlgorithm(params:TweenAlgorithmParams):number {
        let {nextT, beginValue, valueChange, actionDuration: duration} = params;
        const timeStep = (nextT/duration);
        const newValue = valueChange * (1-(Math.sqrt(1-Math.pow(timeStep,2)))) + beginValue;
        return newValue;
    }
    update(
        params: TweenAtTimeParams|null|undefined = null,
    ): (typeof this.obj) {
        console.log('update ease-in-circular')
        return super.update(params,this.tweenAlgorithm)
    }
}
export default EaseInCircularTween;