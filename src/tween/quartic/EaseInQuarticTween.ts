import Tween, { TweenAlgorithmParams, TweenAtTimeParams, TweenChangeProps } from "../Tween";

export class EaseInQuarticTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(params,
            "EaseInQuarticTween", 
        );
    }
    // update(
    //     params:TweenAtTimeParams,
    // ):(typeof this.obj) {
    //     const newParams = this.setParams(params);
    //     let { nextT, beginValue, valueChange, actionDuration } = newParams;
    //     // super.update({ t: nextT })

        
    //     if (!this.checkIfFinished(nextT, actionDuration)) {
    //         this.obj[this.propertyToChange] = newValue;
    //     }
    //     return this.obj;
    // }
    
    tweenAlgorithm(params:TweenAlgorithmParams):number {
        let {nextT, beginValue, valueChange, actionDuration} = params;
        let timeStep = nextT/actionDuration;
        let newValue = valueChange*Math.pow(timeStep,4) + beginValue
        return newValue;
    }
    update(
        params: TweenAtTimeParams|null|undefined = null,
    ): (typeof this.obj) {
        return super.update(params,this.tweenAlgorithm)
    }

}
export default EaseInQuarticTween;