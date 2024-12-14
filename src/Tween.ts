import Motion, { MotionProps } from "./Motion";

export interface TweenProps extends MotionProps{
    finish:number;
    change:number;
    funcName:string;
}
export interface TweenFuncParams {
    t?:number|null;
    begin?:number|null;
    change?:number|null;
    duration?:number|null;
}

export class Tween extends Motion {
    protected isComplete:boolean = false;
    protected funcName:string = '';
    protected _change:number|null = null;
    protected func:Function|null = null;
    protected finish:number = 0;

    constructor({
        obj,
        prop,
        begin,
        finish,
        duration,
        useSeconds,
        funcName = '',
    }:TweenProps) {
        super({obj,prop,begin,duration,useSeconds});
        this._change = null; // change;
        this.isComplete = false;
        this.setFinish(finish);
        this.funcName = funcName;
    }
    continueTo(finish:number,duration:number) {
        this.setBegin(this.getPosition());
        this.setFinish(finish);
        if (!duration) {
            this.setDuration(duration);
        }
        this.start();
    }
    yoyo() {
        this.continueTo(this.getBegin(),this.getDuration());
    }
    getPosition(t?:number) {
        if (!t) { t = this._time; }
        let returnValue = this._pos;
        if (this.func) {
            returnValue = this.func(t,this._begin,this._change,this._duration);
        }
        return returnValue;
    }

    setChange(change:number) {
        this._change = change;
    }
    getChange() {
        return this._change;
    }
    setFinish(finish:number) {
        this.finish = finish;
        this._change = (this.finish - this._begin)
    }
    getFinish() {
        return ((this._change||0) + this._begin)
    }

}
export default Tween;



