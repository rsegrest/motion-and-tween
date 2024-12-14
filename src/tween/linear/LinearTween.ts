import Tween, { TweenFuncParams, TweenProps } from "../../Tween";

export class LinearTween extends Tween {
    constructor(params: TweenProps) {
        super({
            ...params,
            funcName: "LinearTween",
        });
    }
    // TODO: Record t in _time?
    update({
        t,
        begin,
        change,
        duration,
    }: TweenFuncParams | undefined): Object {
        if (!t) {
            t = this._time;
        }
        if (!begin) {
            begin = this._begin;
        }
        if (!change) {
            change = this._change;
        }
        if (!duration) {
            duration = this._duration;
        }
        if (t! > duration!) {
            this.isComplete = true;
            return this.finish;
        }
        // return t;

        const newValue = begin! + (change! * t!) / duration!;
        this.obj[this.prop] = newValue;
        return this.obj;
    }
}
export default LinearTween;
