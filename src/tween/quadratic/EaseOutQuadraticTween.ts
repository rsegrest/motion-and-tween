import Tween, { TweenAlgorithmParams, TweenAtTimeParams, TweenChangeProps } from "../Tween";

export class EaseOutQuadraticTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(params,
            "EaseOutQuadraticTween", 
        );
    }
    tweenAlgorithm(params:TweenAlgorithmParams):number {
        let {nextT, beginValue, valueChange, actionDuration} = params;
        const timeStep = nextT/actionDuration;
        const newValue = -valueChange*(timeStep*(timeStep-2)) + beginValue
        
        return newValue;
    }
    update(
        params:TweenAtTimeParams,
    ):(typeof this.obj) {
        return super.update(params,this.tweenAlgorithm)
    }
}
export default EaseOutQuadraticTween;