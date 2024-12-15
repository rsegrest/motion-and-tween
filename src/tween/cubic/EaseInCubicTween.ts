import Tween, { TweenAlgorithmParams, TweenAtTimeParams, TweenChangeProps } from "../Tween";

export class EaseInCubicTween extends Tween {
    constructor(
        params:TweenChangeProps) {
        super(params,
            "EaseInCubicTween", 
        );
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let {nextT, beginValue, valueChange, actionDuration} = params;
        const newValue = valueChange * Math.pow((nextT/actionDuration),3) + beginValue;
        return newValue;
    }
    update(
        params:TweenAtTimeParams,
    ):(typeof this.obj) {
        return super.update(params,this.tweenAlgorithm)
        // const newParams = this.setParams(params);
        // let { nextT, beginValue, valueChange, actionDuration } = newParams;
        // // super.update({ t: nextT })

        

        // if (!this.checkIfFinished(nextT, actionDuration)) {
        //     this.obj[this.propertyToChange] = newValue;
        // }
        // return this.obj;
    }
}
export default EaseInCubicTween;