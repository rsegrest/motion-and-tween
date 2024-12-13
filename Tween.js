class Tween extends Motion {
    constructor({
        obj,
        prop,
        func,
        funcName,
        begin,
        finish,
        duration,
        useSeconds
    }) {
        super({obj,prop,func,begin,finish,duration,useSeconds});
        this.begin = begin;
        this.change = null; // change;
        this.setFinish(finish);
        this.duration = duration;
        this.setFunc(func);
        this.isComplete = false;
    }
    continueTo(finish,duration) {
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
    getPosition(t) {
        if (!t) { t = this._time; }
        const returnValue = this.func(t,this.begin,this.change,this.duration);
        return returnValue;
    }
    setFunc(f) {
        this.funcName = f;
        if (typeof f === 'function') {
            this.func = f;
            return;
        }
        const sf = this.selectFunc(f);
        this.func = sf;
    }
    getFunc() {
        return this.func;
    }
    setChange(change) {
        this.change = change;
    }
    getChange() {
        return this.change;
    }
    setFinish(finish) {
        this.finish = finish;
        this.change = (this.finish - this.begin)
    }
    getFinish() {
        return (this.change + this.begin)
    }

    // LINEAR
    linear(
        // t,begin,change,duration
    ) {
        let t = this._time;
        if (t > this.duration) {
            this.isComplete = true;
            return this.finish;
        }
        return (
            (this.change*t/this.duration + this.begin)
        );
    }
    // QUADRATIC
    easeInQuad(
        // t,begin,change,duration
    ) {
        let t = this._time;
        if (t >= this.duration) {
            console.log('marking easeInQuad as complete');
            this.isComplete = true;
            return this.finish;
        }
        // console.log(this);
        const newT = t/=this.duration;
        const newValue = (this.change*newT*t + this.begin)
        // const newY = (this.change.y*newT*t + this.begin.y)

        return newValue;
    }
    easeOutQuad(
        // t,begin,change,duration
    ) {
        let t = this._time;
        console.log(`t: ${t}, duration: ${this.duration}`);
        if (t >= this.duration) {
            console.log('marking easeOutQuad as complete');
            this.isComplete = true;
            return this.finish;
        }
        const newT = t/=this.duration;
        return -this.change * newT*(newT-2) + this.begin;
    }
    easeInOutQuad(
        // t,begin,change,duration
    ) {
        let t = this._time;
        // console.log(`t: ${t}, duration: ${duration}`);
        if (t > this.duration) { 
            this.isComplete = true;
            return this.finish;
        }
        let newT = (t/=(this.duration/2));
        if ((newT) < 1) return this.change/2*t*t + this.begin;
        --newT;
        return (-this.change/2*(newT*(newT-2) - 1) + this.begin);
        
    }
    // CUBIC
    easeInCubic(
        // t,begin,change,duration
    ) {
        let t = this._time;
        if (t > this.duration) {
            this.isComplete = true;
            return this.finish;
        }
        return this.change * Math.pow((t/this.duration),3) + this.begin;
    }
    easeOutCubic(
        // t,begin,change,duration
    ) {
        let t = this._time;
        if (t > this.duration) {
            this.isComplete = true;
            return this.finish;
        }
        return this.change * (Math.pow((t/this.duration-1),3) + 1) + this.begin;
    }
    easeInOutCubic(
        // t,begin,change,duration
    ) {
        if (t > this.duration) {
            this.isComplete = true;
            return this.finish;
        }
        let newT = (t/=(this.duration/2));
        if (newT < 1) {
            return (this.change/2*Math.pow(t,3)+this.begin);
        }
        return this.change/2*(Math.pow((t-2),3)+2)+this.begin;
    }
    // QUARTIC
    easeInQuart(
        // t,begin,change,duration
    ) {
        if (t > this.duration) {
            this.isComplete = true;
            return this.finish;
        }
        return this.change * Math.pow((t/this.duration),4) + this.begin;
    }
    easeOutQuart(
        // t,begin,change,duration
    ) {
        if (t > this.duration) {
            this.isComplete = true;
            return this.finish;
        }
        return -this.change * (Math.pow((t/this.duration-1),4) - 1) + this.begin;
    }
    easeInOutQuart(
        // t,begin,change,duration
    ) {
        if (t > this.duration) {
            this.isComplete = true;
            return this.finish;
        }
        let newT = (t/=(this.duration/2));
        if (newT < 1) return this.change/2*Math.pow(t,4)+this.begin;

        return ((-this.change/2)*(Math.pow((t-2),4)-2)+this.begin);
    }

    // QUINTIC
    easeInQuint(
        // t,begin,change,duration
    ) {
        if (t > this.duration) {
            this.isComplete = true;
            return this.finish;
        }
        return this.change * Math.pow((t/this.duration),5) + this.begin;
    }
    easeOutQuint(
        // t,begin,change,duration
    ) {
        if (t > this.duration) {
            this.isComplete = true;
            return this.finish;
        }
        return this.change * (Math.pow((t/this.duration-1),5) + 1) + this.begin;
    }
    easeInOutQuint(
        // t,begin,change,duration
    ) {
        if (t > this.duration) {
            this.isComplete = true;
            return this.finish;
        }
        let newT = (t/=(this.duration/2));
        if (newT < 1) {
            return (this.change/2*Math.pow(t,5)+this.begin);
        }
        return this.change/2*(Math.pow((t-2),5)+2)+this.begin;
    }

    // SINUSOIDAL
    easeInSine(
        // t,begin,change,duration
    ) {
        if (t > this.duration) {
            this.isComplete = true;
            return this.finish;
        }
        return -this.change * Math.cos(t/this.duration * (Math.PI/2)) + this.change + this.begin;
    }
    easeOutSine(
        // t,begin,change,duration
    ) {
        if (t > this.duration) {
            this.isComplete = true;
            return this.finish; 
        }
        return this.change * Math.sin(t/this.duration * (Math.PI/2)) + this.begin;
    }
    easeInOutSine(
        // t,begin,change,duration
    ) {
        if (t > this.duration) {
            this.isComplete = true;
            return this.finish;
        }
        return this.change/2 * (1 - Math.cos(Math.PI*t/this.duration)) + this.begin;
    }
    
    // EXPONENTIAL
    easeInExpo(
        // t,begin,change,duration
    ) {
        if (t > this.duration) {
            this.isComplete = true;
            return this.finish;
        }
        return this.change * Math.pow(2, 10 * (t/this.duration - 1)) + this.begin;
    }
    easeOutExpo(
        // t,begin,change,duration
    ) {
        if (t > this.duration) {
            this.isComplete = true;
            return this.finish;
        }
        return this.change * (-Math.pow(2, -10 * t/this.duration) + 1) + this.begin;
    }
    easeInOutExpo(
        // t,begin,change,duration
    ) {
        if (t > duration) {
            this.isComplete = true;
            return this.finish;
        }
        let newT = (t/=(this.duration/2));
        if (newT < 1) {this.change/2 * Math.pow(2, 10 * (t - 1)) + this.begin }
        --t;
        return this.change/2 * (-Math.pow(2, -10 * t) + 2) + this.begin;
    }
    
    // CIRCULAR
    easeInCirc(
        // t,begin,change,duration
    ) {
        if (t > this.duration) {
            this.isComplete = true;
            return this.finish;
        }
        let newT = (t/=duration);
        return -this.change * (Math.sqrt(1 - (newT)*t) - 1) + this.begin;
    }
    easeOutCirc(
        // t,begin,change,duration
    ) {
        if (t > this.duration) {
            this.isComplete = true;
            return this.finish;
        }
        let newT = (t/this.duration-1);
        return this.change * Math.sqrt(1 - newT*newT) + this.begin;
    }
    easeInOutCirc(
        // t,begin,change,duration
    ) {
        if (t > this.duration) {
            this.isComplete = true;
            return this.finish;
        }
        let newT = (t/this.duration/2);
        if (newT < 1) return this.change.x/2 * (Math.sqrt(1 - t*t) - 1) + this.begin;
        newT -= 2;
        return this.change/2 * (Math.sqrt(1 - t*t) + 1) + this.begin;
    }
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
            case TweenTypes.EASE_IN_OUT_CIRC:
                return this.easeInOutCirc;
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

