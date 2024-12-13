class Motion {
    constructor({
        obj,
        prop,
        begin,
        duration,
        useSeconds,
    }) {
        this.obj = obj;
        this.prop = prop;
        this.begin = begin;
        this.duration = duration;
        this.useSeconds = useSeconds;
        this._listeners = [];
        this.addListener(this);
        this.start();
        this._time = 0;
        this._prevPos = null;
        this._pos = begin;
    }
    start() {
        this.rewind();
        this.addListener(this);
        // this.broadcastMessage('onMotionStarted', this, this._pos);
    }
    stop() {
        this.removeListener(this);
        // this.broadcastMessage('onMotionStopped', this, this._pos);
    }
    resume() {
        this.fixTime();
        this.addListener(this);
        // this.broadcastMessage('onMotionResumed', this, this._pos);
    }
    rewind(t) {
        this._time = !t ? 1 : t;
        this.fixTime();
    }
    fforward() {
        this._time = this._duration;
        this.fixTime();
    }
    nextFrame() {
        // if (this.useSeconds) {
        //     this.setTime ((this.getTimer() - this.startTime) / 1000);
        // } else {
        this.setTime(this._time + 1)
        // }
    }
    prevFrame() {
        if (!this.useSeconds) {
            this.setTime(this._time - 1)
        }
    }
    /* onEnterFrame() {
        this.nextFrame();
    } */
    toString() {
        return `Motion[obj=${this.obj}, prop=${this.prop}, begin=${this.begin}, duration=${this.duration}, useSeconds=${this.useSeconds}]`;
    }
    getPosition(t) {
        // calculate and return position
    }
    setPosition(pos) {
        this._prevPos = this._pos;
        this.obj[this.prop] = this._pos = pos;
        // this.broadcastMessage('onMotionChanged', this, this._pos);
    }
    getPrevPos() {
        return this._prevPos;
    }
    setTime(t) {
        this.prevTime = this._time;
        if (t > this.duration) {
            if (this._looping) {
                this.rewind(t-this._duration);
                // this.broadcastMessage('onMotionLooped', this, this._pos);
            } else {
                this.stop();
                // this.broadcastMessage('onMotionFinished', this, this._pos);
            }
        } else if (t < 0) {
            this.rewind();
        } else {
            this._time = t;
        }
        this.update();
    }
    getTime() {
        return this._time;
    }
    setBegin(b) {
        this._begin = b;
    }
    getBegin() {
        return this._begin;
    }
    setDuration(d) {
        this._duration = (d == null || d <= 0) ? 10000000 : d;
    }
    getDuration() {
        return this._duration;
    }
    setLooping(b) {
        this._looping = b;
    }
    getLooping() {
        return this._looping;
    }
    setObj(obj) {
        this.obj = obj;
    }
    getObj() {
        return this.obj;
    }
    setProp(prop) {
        this.prop = prop;
    }
    getProp() {
        return this.prop;
    }
    setUseSeconds(b) {
        this.useSeconds = b;
    }
    getUseSeconds() {
        return this.useSeconds;
    }
    // "private" methods:
    fixTime() {
        // console.log('TBD')
        // if (this.useSeconds) {
        //     this.startTime = this.getTimer() - this._time * 1000;
        // }
    }
    update() {
        const pos = this.getPosition(this._time);
        // console.log('update', pos)
        this.setPosition(pos);
    }
    
    addListener(listener) {
        this._listeners.push(listener);
    }
    removeListener(listener) {
        this._listeners = this._listeners.filter(l => l !== listener);
    }
}