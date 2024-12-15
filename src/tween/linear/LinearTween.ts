import Tween, { TweenAlgorithmParams, TweenAtTimeParams, TweenChangeProps } from "../Tween";

export class LinearTween extends Tween {
    constructor(params: TweenChangeProps) {
        super(
            params,
            "LinearTween",
        );
        
    }
    tweenAlgorithm(params:TweenAlgorithmParams):number {
        let {nextT, beginValue, valueChange, actionDuration: duration} = params;
        const newValue = beginValue + (valueChange * nextT) / duration;
        return newValue;
    }
    update(
        params: TweenAtTimeParams|null|undefined = null,
    ): (typeof this.obj) {
        return super.update(params,this.tweenAlgorithm)
        // let newParams = this.setParams(params);
        // const newValue = this.tweenAlgorithm(newParams);
        // super.update({ t: newParams.nextT })
        
        // if (!this.checkIfFinished(
        //     newParams.nextT,
        //     newParams.actionDuration
        // )) {
        //     this.obj[this.propertyToChange] = newValue;
        // }
        // return this.obj;
    }
}
export default LinearTween;
