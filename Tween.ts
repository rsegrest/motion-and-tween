import Motion from "./Motion";
import TweenTypes from "./TweenTypes";

class Tween extends Motion {
    private change:number|null;
    private isComplete:boolean;
    private funcName:string;
    private func:Function;
    private finish:number;
    constructor({
        obj,
        prop,
        func,
        // funcName,
        begin,
        finish,
        duration,
        useSeconds
    }) {
        super({obj,prop,begin,duration,useSeconds});
        this.change = null; // change;
        this.setFinish(finish);
        this.setFunc(func);
        this.isComplete = false;
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
        const returnValue = this.func(t,this._begin,this.change,this._duration);
        return returnValue;
    }
    setFunc(f:Function|string) {
        if (typeof f === 'function') {
            this.funcName = f.name;
            this.func = f;
            return;
        } else {
            this.funcName = f;
            const sf = this.selectFunc(f);
            this.func = sf as Function;
        }
    }
    getFunc() {
        return this.func;
    }
    setChange(change:number) {
        this.change = change;
    }
    getChange() {
        return this.change;
    }
    setFinish(finish:number) {
        this.finish = finish;
        this.change = (this.finish - this._begin)
    }
    getFinish() {
        return (this.change + this._begin)
    }

    // LINEAR
    linear(
        // t,begin,change,duration
    ) {
        let t = this._time;
        if (t > this._duration) {
            this.isComplete = true;
            return this.finish;
        }
        return (
            // added (this.change) => (this.change || 0) to handle null -- TEST
            ((this.change || 0)*t/this._duration + this._begin)
        );
    }
    // QUADRATIC
    easeInQuad(
        // t,begin,change,duration
    ) {
        let t = this._time;
        if (t >= this._duration) {
            console.log('marking easeInQuad as complete');
            this.isComplete = true;
            return this.finish;
        }
        // console.log(this);
        const newT = t/=this._duration;
        const newValue = ((this.change || 0)*newT*t + this._begin)
        // const newY = (this.change.y*newT*t + this.begin.y)

        return newValue;
    }
    easeOutQuad(
        // t,begin,change,duration
    ) {
        let t = this._time;
        console.log(`t: ${t}, duration: ${this._duration}`);
        if (t >= this._duration) {
            console.log('marking easeOutQuad as complete');
            this.isComplete = true;
            return this.finish;
        }
        const newT = t/=this._duration;
        return -(this.change || 0) * newT*(newT-2) + this._begin;
    }
    easeInOutQuad(
        // t,begin,change,duration
    ) {
        let t = this._time;
        // console.log(`t: ${t}, duration: ${duration}`);
        if (t > this._duration) { 
            this.isComplete = true;
            return this.finish;
        }
        let newT = (t/=(this._duration/2));
        if ((newT) < 1) return (this.change||0)/2*t*t + this._begin;
        --newT;
        return (-(this.change||0)/2*(newT*(newT-2) - 1) + this._begin);
        
    }
    // CUBIC
    easeInCubic(
        // t,begin,change,duration
    ) {
        let t = this._time;
        if (t > this._duration) {
            this.isComplete = true;
            return this.finish;
        }
        return (this.change||0) * Math.pow((t/this._duration),3) + this._begin;
    }
    easeOutCubic(
        // t,begin,change,duration
    ) {
        let t = this._time;
        if (t > this._duration) {
            this.isComplete = true;
            return this.finish;
        }
        return (this.change||0) * (Math.pow((t/this._duration-1),3) + 1) + this._begin;
    }
    easeInOutCubic(
        t:number
        // ,begin,change,duration
    ) {
        if (t > this._duration) {
            this.isComplete = true;
            return this.finish;
        }
        let newT = (t/=(this._duration/2));
        if (newT < 1) {
            return ((this.change||0)/2*Math.pow(t,3)+this._begin);
        }
        return (this.change||0)/2*(Math.pow((t-2),3)+2)+this._begin;
    }
    // QUARTIC
    easeInQuart(
        t:number,
        // ,begin,change,duration
    ) {
        if (t > this._duration) {
            this.isComplete = true;
            return this.finish;
        }
        return (this.change||0) * Math.pow((t/this._duration),4) + this._begin;
    }
    easeOutQuart(
        t:number
        // ,begin,change,duration
    ) {
        if (t > this._duration) {
            this.isComplete = true;
            return this.finish;
        }
        return -(this.change||0) * (Math.pow((t/this._duration-1),4) - 1) + this._begin;
    }
    easeInOutQuart(
        t:number
        // ,begin,change,duration
    ) {
        if (t > this._duration) {
            this.isComplete = true;
            return this.finish;
        }
        let newT = (t/=(this._duration/2));
        if (newT < 1) return (this.change||0)/2*Math.pow(t,4)+this._begin;

        return ((-(this.change||0)/2)*(Math.pow((t-2),4)-2)+this._begin);
    }

    // QUINTIC
    easeInQuint(
        t:number
        // ,begin,change,duration
    ) {
        if (t > this._duration) {
            this.isComplete = true;
            return this.finish;
        }
        return (this.change||0) * Math.pow((t/this._duration),5) + this._begin;
    }
    easeOutQuint(
        t:number
        // ,begin,change,duration
    ) {
        if (t > this._duration) {
            this.isComplete = true;
            return this.finish;
        }
        return (this.change||0) * (Math.pow((t/this._duration-1),5) + 1) + this._begin;
    }
    easeInOutQuint(
        t:number
        // ,begin,change,duration
    ) {
        if (t > this._duration) {
            this.isComplete = true;
            return this.finish;
        }
        let newT = (t/=(this._duration/2));
        if (newT < 1) {
            return ((this.change||0)/2*Math.pow(t,5)+this._begin);
        }
        return (this.change||0)/2*(Math.pow((t-2),5)+2)+this._begin;
    }

    // SINUSOIDAL
    easeInSine(
        t:number
        // ,begin,change,duration
    ) {
        if (t > this._duration) {
            this.isComplete = true;
            return this.finish;
        }
        return -(this.change||0) * Math.cos(t/this._duration * (Math.PI/2)) + (this.change||0) + this._begin;
    }
    easeOutSine(
        t:number
        // ,begin,change,duration
    ) {
        if (t > this._duration) {
            this.isComplete = true;
            return this.finish; 
        }
        return (this.change||0) * Math.sin(t/this._duration * (Math.PI/2)) + this._begin;
    }
    easeInOutSine(
        t:number
        // ,begin,change,duration
    ) {
        if (t > this._duration) {
            this.isComplete = true;
            return this.finish;
        }
        return (this.change||0)/2 * (1 - Math.cos(Math.PI*t/this._duration)) + this._begin;
    }
    
    // EXPONENTIAL
    easeInExpo(
        t:number
        // ,begin,change,duration
    ) {
        if (t > this._duration) {
            this.isComplete = true;
            return this.finish;
        }
        return (this.change||0) * Math.pow(2, 10 * (t/this._duration - 1)) + this._begin;
    }
    easeOutExpo(
        t:number
        // begin,change,duration
    ) {
        if (t > this._duration) {
            this.isComplete = true;
            return this.finish;
        }
        return (this.change||0) * (-Math.pow(2, -10 * t/this._duration) + 1) + this._begin;
    }
    easeInOutExpo(
        t:number
        // t,begin,change,duration
    ) {
        if (t > this._duration) {
            this.isComplete = true;
            return this.finish;
        }
        let newT = (t/=(this._duration/2));
        if (newT < 1) {(this.change||0)/2 * Math.pow(2, 10 * (t - 1)) + this._begin }
        --t;
        return (this.change||0)/2 * (-Math.pow(2, -10 * t) + 2) + this._begin;
    }
    
    // CIRCULAR
    easeInCirc(
        t:number
        // ,begin,change,duration
    ) {
        if (t > this._duration) {
            this.isComplete = true;
            return this.finish;
        }
        let newT = (t/=this._duration);
        return -(this.change||0) * (Math.sqrt(1 - (newT)*t) - 1) + this._begin;
    }
    easeOutCirc(
        t:number
        // ,begin,change,duration
    ) {
        if (t > this._duration) {
            this.isComplete = true;
            return this.finish;
        }
        let newT = (t/this._duration-1);
        return (this.change||0) * Math.sqrt(1 - newT*newT) + this._begin;
    }
    // easeInOutCirc(
    //     t:number
    //     // ,begin,change,duration
    // ) {
        // if (t > this._duration) {
        //     this.isComplete = true;
        //     return this.finish;
        // }
        // let newT = (t/this._duration/2);
        // if (newT < 1) return this.change.x/2 * (Math.sqrt(1 - t*t) - 1) + this.begin;
        // newT -= 2;
        // return this.change/2 * (Math.sqrt(1 - t*t) + 1) + this.begin;
    // }
    selectFunc(tweenType) {
        // console.log(tweenType);
        // console.log(TweenType.EASE_OUT_QUAD);
        switch(tweenType) {
            case TweenTypes.LINEAR:
                return this.linear;
            case TweenTypes.EASE_IN_QUAD:
                return this.easeInQuad;
            case TweenTypes.EASE_OUT_QUAD:
                return this.easeOutQuad;
            case TweenTypes.EASE_IN_OUT_QUAD:
                return this.easeInOutQuad;
            case TweenTypes.EASE_IN_CUBIC:
                return this.easeInCubic;
            case TweenTypes.EASE_OUT_CUBIC:
                return this.easeOutCubic;
            case TweenTypes.EASE_IN_OUT_CUBIC:
                return this.easeInOutCubic;
            case TweenTypes.EASE_IN_QUART:
                return this.easeInQuart;
            case TweenTypes.EASE_OUT_QUART:
                return this.easeOutQuart;
            case TweenTypes.EASE_IN_OUT_QUART:
                return this.easeInOutQuart;
            case TweenTypes.EASE_IN_QUINT:
                return this.easeInQuint;
            case TweenTypes.EASE_OUT_QUINT:
                return this.easeOutQuint;
            case TweenTypes.EASE_IN_OUT_QUINT:
                return this.easeInOutQuint;
            case TweenTypes.EASE_IN_SINE:
                return this.easeInSine;
            case TweenTypes.EASE_OUT_SINE:
                return this.easeOutSine;
            case TweenTypes.EASE_IN_OUT_SINE:
                return this.easeInOutSine;
            case TweenTypes.EASE_IN_EXPO:
                return this.easeInExpo;
            case TweenTypes.EASE_OUT_EXPO:
                return this.easeOutExpo;
            case TweenTypes.EASE_IN_OUT_EXPO:
                return this.easeInOutExpo;
            case TweenTypes.EASE_IN_CIRC:
                return this.easeInCirc;
            case TweenTypes.EASE_OUT_CIRC:
                return this.easeOutCirc;
            // case TweenTypes.EASE_IN_OUT_CIRC:
            //     return this.easeInOutCirc;
            default:
                return null;
        }
    }
}
// export default Tween;


    // add(tween) {
    //     this._tweens.push(tween);
    // }
    
    // remove(tween) {
    //     const i = this._tweens.indexOf(tween);
    
    //     if (i !== -1) {
    //     this._tweens.splice(i, 1);
    //     }
    // }
    
    // update(time, preserve) {
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

