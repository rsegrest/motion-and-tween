import Tween, { TweenAlgorithmParams, TweenAtTimeParams, TweenChangeProps } from "../Tween";

export class EaseInSinusoidalTween extends Tween {
    constructor(params:TweenChangeProps) {
        super(params,
            "EaseInSinusoidalTween", 
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
        const newValue =  valueChange * (1-Math.cos((nextT/actionDuration) * (Math.PI/2))) + beginValue;
        // const newValue = beginValue + (valueChange * nextT) / duration;
        return newValue;
    }
    update(
        params: TweenAtTimeParams|null|undefined = null,
    ): (typeof this.obj) {
        return super.update(params,this.tweenAlgorithm)
    }
}
export default EaseInSinusoidalTween;


