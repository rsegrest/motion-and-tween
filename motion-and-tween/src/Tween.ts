import Motion, { MotionProps } from "./Motion";
// import EaseInCubic from "./tween/cubic/EaseInCubicTween";
// import EaseInOutCubic from "./tween/cubic/EaseInOutCubicTween";
// import LinearTween from "./tween/linear/LinearTween";
// import EaseInQuadraticTween from "./tween/quadratic/EaseInQuadTween";
// import EaseOutQuadraticTween from "./tween/quadratic/EaseOutQuadTween";
// import EaseInOutQuartic from "./tween/quartic/EaseInOutQuart";
// import EaseInQuartic from "./tween/quartic/EaseInQuart";
// import TweenType from "./TweenType";

export interface TweenProps extends MotionProps{
    finish:number;
    change:number;
    funcName:string;
    // func:Function|string;
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
        // func,
        // funcName,
    }:TweenProps) {
        super({obj,prop,begin,duration,useSeconds});
        this._change = null; // change;
        this.isComplete = false;
        this.setFinish(finish);
        this.funcName = funcName;
        // this.setFunc(func);
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
    // setFunc(f:Function|string) {
        // if (typeof f === 'function') {
            // this.funcName = f.name;
            // this.func = f;
            // return;
        // } else {
            // this.funcName = f;
            // const sf = this.selectFunc(f);
            // this.func = sf as Function;
        // }
    // }
    getFunc() {
        return this.func;
    }

    // add(tween) {
    //     this._tweens.push(tween);
    // }
    
    // remove(tween) {
    //     const i = this._tweens.indexOf(tween);
    
    //     if (i !== -1) {
    //     this._tweens.splice(i, 1);
    //     }
    // }
    
    // update(time:number, preserve) {
    //     if (this._tweens.length === 0) return false;
    
    //     let i = 0;
    
    //     time = time !== undefined ? time : performance.now();
    
    //     while (i < this._tweens.length) {
    //     if (this._tweens[i].update(time) === false) {
    //         this._tweens.splice(i, 1);
    //     } else {
    //         i++;
    //     }
    //     }
    
    //     return true;
    // }
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

    // // LINEAR
    // linear({
    //     t = this._time,
    //     begin = this._begin,
    //     change = this._change,
    //     duration = this._duration
    // }:TweenFuncParams) {
    //     // let t = this._time;
    //     if (t! > duration!) {
    //         this.isComplete = true;
    //         return this.finish;
    //     }
    //     return (
    //         // added (this._change) => (change || 0) to handle null -- TEST
    //         ((change || 0)*t!/duration! + begin!)
    //     );
    // }
    // QUADRATIC
    // easeInQuad({
    //     t = this._time || 0,
    //     begin = this._begin || 0,
    //     change = this._change || 0,
    //     duration = this._duration || 0
    // }:TweenFuncParams) {
    //     if (t! >= duration!) {
    //         console.log('marking easeInQuad as complete');
    //         this.isComplete = true;
    //         return this.finish;
    //     }
    //     // console.log(this);
    //     const nextT = t!/=duration!;
    //     const nextValue = ((change! || 0)*nextT*t! + begin!)
    //     // const newY = (this._change.y*newT*t + this.begin.y)

    //     return nextValue;
    // }
    // easeOutQuad({
    //     t = this._time || 0,
    //     begin = this._begin || 0,
    //     change = this._change || 0,
    //     duration = this._duration || 0
    // }:TweenFuncParams) {
    //     console.log(`t: ${t}, duration: ${duration!}`);
    //     if (t! >= duration!) {
    //         console.log('marking easeOutQuad as complete');
    //         this.isComplete = true;
    //         return this.finish;
    //     }
    //     const nextT = t!/=duration!;
    //     return -(change || 0) * nextT*(nextT-2) + begin!;
    // }
    // easeInOutQuad({
    //     t = this._time || 0,
    //     begin = this._begin || 0,
    //     change = this._change || 0,
    //     duration = this._duration || 0
    // }:TweenFuncParams) {
    //     // console.log(`t: ${t}, duration: ${duration}`);
    //     if (t! > duration!) { 
    //         this.isComplete = true;
    //         return this.finish;
    //     }
    //     let newT = (t!/=(duration!/2));
    //     if ((newT) < 1) return change!/2*t!*t! + begin!;
    //     --newT;
    //     return (-change!/2*(newT*(newT-2) - 1) + begin!);
    // }
    // CUBIC
    // easeInCubic({
    //     t = this._time || 0,
    //     begin = this._begin || 0,
    //     change = this._change || 0,
    //     duration = this._duration || 0
    // }:TweenFuncParams) {
    //     if (t! > duration!) {
    //         this.isComplete = true;
    //         return this.finish;
    //     }
    //     return change! * Math.pow((t!/duration!),3) + begin!;
    // }
    // easeOutCubic({
    //     t = this._time || 0,
    //     begin = this._begin || 0,
    //     change = this._change || 0,
    //     duration = this._duration || 0
    // }:TweenFuncParams) {
    //     if (t! > duration!) {
    //         this.isComplete = true;
    //         return this.finish;
    //     }
    //     return (change||0) * (Math.pow((t!/duration!-1),3) + 1) + begin!;
    // }
    // easeInOutCubic({
    //     t = this._time || 0,
    //     begin = this._begin || 0,
    //     change = this._change || 0,
    //     duration = this._duration || 0
    // }:TweenFuncParams) {
    //     if (t! > duration!) {
    //         this.isComplete = true;
    //         return this.finish;
    //     }
    //     let newT = (t!/=(duration!/2));
    //     if (newT < 1) {
    //         return ((change||0)/2*Math.pow(t!,3)+begin!);
    //     }
    //     return (change||0)/2*(Math.pow((t!-2),3)+2)+begin!;
    // }
    // QUARTIC
    // easeInQuart({
    //     t = this._time || 0,
    //     begin = this._begin || 0,
    //     change = this._change || 0,
    //     duration = this._duration || 0
    // }:TweenFuncParams) {
    //     if (t! > duration!) {
    //         this.isComplete = true;
    //         return this.finish;
    //     }
    //     return change! * Math.pow((t!/duration!),4) + begin!;
    // }
    // easeOutQuart({
    //     t = this._time || 0,
    //     begin = this._begin || 0,
    //     change = this._change || 0,
    //     duration = this._duration || 0
    // }:TweenFuncParams) {
    //     if (t! > duration!) {
    //         this.isComplete = true;
    //         return this.finish;
    //     }
    //     return -(change||0) * (Math.pow((t!/duration!-1),4) - 1) + begin!;
    // }
    // easeInOutQuart({
    //     t = this._time || 0,
    //     begin = this._begin || 0,
    //     change = this._change || 0,
    //     duration = this._duration || 0
    // }:TweenFuncParams) {
    //     if (t! > duration!) {
    //         this.isComplete = true;
    //         return this.finish;
    //     }
    //     let newT = (t!/=(duration!/2));
    //     if (newT < 1) return (change||0)/2*Math.pow(t!,4)+begin!;

    //     return ((-change!/2)*(Math.pow((t!-2),4)-2)+begin!);
    // }

    // QUINTIC
    // easeInQuint({
    //     t = this._time || 0,
    //     begin = this._begin || 0,
    //     change = this._change || 0,
    //     duration = this._duration || 0
    // }:TweenFuncParams) {
    //     if (t! > duration!) {
    //         this.isComplete = true;
    //         return this.finish;
    //     }
    //     return (change||0) * Math.pow((t!/duration!),5) + begin!;
    // }
    // easeOutQuint({
    //     t = this._time || 0,
    //     begin = this._begin || 0,
    //     change = this._change || 0,
    //     duration = this._duration || 0
    // }:TweenFuncParams) {
    //     if (t! > duration!) {
    //         this.isComplete = true;
    //         return this.finish;
    //     }
    //     return (change||0) * (Math.pow((t!/duration!-1),5) + 1) + begin!;
    // }
    // easeInOutQuint({
    //     t = this._time || 0,
    //     begin = this._begin || 0,
    //     change = this._change || 0,
    //     duration = this._duration || 0
    // }:TweenFuncParams) {
    //     if (t! > duration!) {
    //         this.isComplete = true;
    //         return this.finish;
    //     }
    //     let newT = (t!/=(duration!/2));
    //     if (newT < 1) {
    //         return ((change||0)/2*Math.pow(t!,5)+begin!);
    //     }
    //     return (change||0)/2*(Math.pow((t!-2),5)+2)+begin!;
    // }

    // SINUSOIDAL
    // easeInSine({
    //     t = this._time || 0,
    //     begin = this._begin || 0,
    //     change = this._change || 0,
    //     duration = this._duration || 0
    // }:TweenFuncParams) {
    //     if (t! > duration!) {
    //         this.isComplete = true;
    //         return this.finish;
    //     }
    //     return -change! * Math.cos(t!/duration! * (Math.PI/2)) + change! + begin!;
    // }
    // easeOutSine({
    //     t = this._time || 0,
    //     begin = this._begin || 0,
    //     change = this._change || 0,
    //     duration = this._duration || 0
    // }:TweenFuncParams) {
    //     if (t! > duration!) {
    //         this.isComplete = true;
    //         return this.finish; 
    //     }
    //     return (change||0) * Math.sin(t!/duration! * (Math.PI/2)) + begin!;
    // }
    // easeInOutSine({
    //     t = this._time || 0,
    //     begin = this._begin || 0,
    //     change = this._change || 0,
    //     duration = this._duration || 0
    // }:TweenFuncParams) {
    //     if (t! > duration!) {
    //         this.isComplete = true;
    //         return this.finish;
    //     }
    //     return change!/2 * (1 - Math.cos(Math.PI*t!/duration!)) + begin!;
    // }
    
    // EXPONENTIAL
    // easeInExpo({
    //     t = this._time || 0,
    //     begin = this._begin || 0,
    //     change = this._change || 0,
    //     duration = this._duration || 0
    // }:TweenFuncParams) {
    //     if (t! > duration!) {
    //         this.isComplete = true;
    //         return this.finish;
    //     }
    //     return change! * Math.pow(2, 10 * (t!/duration! - 1)) + begin!;
    // }
    // easeOutExpo({
    //     t = this._time || 0,
    //     begin = this._begin || 0,
    //     change = this._change || 0,
    //     duration = this._duration || 0
    // }:TweenFuncParams) {
    //     if (t! > duration!) {
    //         this.isComplete = true;
    //         return this.finish;
    //     }
    //     return (change||0) * (-Math.pow(2, -10 * t!/duration!) + 1) + begin!;
    // }
    // easeInOutExpo({
    //     t = this._time || 0,
    //     begin = this._begin || 0,
    //     change = this._change || 0,
    //     duration = this._duration || 0
    // }:TweenFuncParams) {
    //     if (t! > this._duration) {
    //         this.isComplete = true;
    //         return this.finish;
    //     }
    //     let newT = (t!/=(duration!/2));
    //     if (newT < 1) {(change||0)/2 * Math.pow(2, 10 * (t! - 1)) + begin! }
    //     --t!;
    //     return (this._change||0)/2 * (-Math.pow(2, -10 * t!) + 2) + begin!;
    // }
    
    // CIRCULAR
    // easeInCirc({
    //     t = this._time || 0,
    //     begin = this._begin || 0,
    //     change = this._change || 0,
    //     duration = this._duration || 0
    // }:TweenFuncParams) {
    //     if (t! > duration!) {
    //         this.isComplete = true;
    //         return this.finish;
    //     }
    //     let newT = (t!/=duration!);
    //     return -(change||0) * (Math.sqrt(1 - (newT)*t!) - 1) + begin!;
    // }
    // easeOutCirc({
    //     t = this._time || 0,
    //     begin = this._begin || 0,
    //     change = this._change || 0,
    //     duration = this._duration || 0
    // }:TweenFuncParams) {
    //     if (t! > duration!) {
    //         this.isComplete = true;
    //         return this.finish;
    //     }
    //     let newT = (t!/duration!-1);
    //     return (change||0) * Math.sqrt(1 - newT*newT) + begin!;
    // }
    // easeInOutCirc({
    //     t = this._time || 0,
    //     begin = this._begin || 0,
    //     change = this._change || 0,
    //     duration = this._duration || 0
    // }:TweenFuncParams) {
    //     if (t! > duration!) {
    //         this.isComplete = true;
    //         return this.finish;
    //     }
    //     let newT = (t!/duration!/2);
    //     // if (newT < 1) return change.x/2 * (Math.sqrt(1 - t!*t!) - 1) + begin;
    //     if (newT < 1) return change!/2 * (Math.sqrt(1 - t!*t!) - 1) + begin!;
    //     newT -= 2;
    //     return change!/2 * (Math.sqrt(1 - t!*t!) + 1) + begin!;
    // }
    // public static const selectTween = (tweenType:TweenType|string):Tween => {
    //     switch(tweenType) {
    //         case TweenType.LINEAR:
                // return new LinearTween();
    //         case TweenType.EASE_IN_QUAD:
                // return new EaseInQuadraticTween();
    //         case TweenType.EASE_OUT_QUAD:
                // return new EaseOutQuadraticTween();
    //         case TweenType.EASE_IN_OUT_QUAD:
                // return new EaseInOutQuadraticTween();
    //         case TweenType.EASE_IN_CUBIC:
                // return new EaseInCubicTween();
    //         case TweenType.EASE_OUT_CUBIC:
                // return new EaseOutCubicTween();
    //         case TweenType.EASE_IN_OUT_CUBIC:
                // return new EaseInOutCubic();
    //         case TweenType.EASE_IN_QUART:
                // return new EaseInQuadraticTween();
    //         case TweenType.EASE_OUT_QUART:
                // return new EaseOutQuadraticTween();
    //         case TweenType.EASE_IN_OUT_QUART:
                // return EaseInOutQuartic();
    //         case TweenType.EASE_IN_QUINT:
                // return new EaseInQuintic();
    //         case TweenType.EASE_OUT_QUINT:
                // return new EaseOutQuintic();
    //         case TweenType.EASE_IN_OUT_QUINT:
                // return new EaseInOutQuintic();
    //         case TweenType.EASE_IN_SINE:
                // return new EaseInSine();
    //         case TweenType.EASE_OUT_SINE:
                // return new EaseOutSine();
    //         case TweenType.EASE_IN_OUT_SINE:
                // return new EaseInOutSine();
    //         case TweenType.EASE_IN_EXPO:
                // return new EaseInExpo();
    //         case TweenType.EASE_OUT_EXPO:
                // return new EaseOutExpo();
    //         case TweenType.EASE_IN_OUT_EXPO:
                // return new EaseInOutExpo();
    //         case TweenType.EASE_IN_CIRC:
                // return new EaseInCircularTween();
    //         case TweenType.EASE_OUT_CIRC:
                // return new EaseOutCircularTween();
    //         case TweenType.EASE_IN_OUT_CIRC:
                // return new EaseInOutCircularTween();
    //         default:
    //             return null;
    //     }
    // }
}
export default Tween;



