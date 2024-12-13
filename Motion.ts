export class Motion {
    protected obj:any;
    protected prop:any;
    protected _begin:any;
    protected _duration:number;
    protected useSeconds:boolean;
    protected _listeners:any[];
    protected _time:number;
    protected _prevPos:any;
    protected _pos:any;
    protected _looping:boolean = false;

    constructor({
        obj,
        prop,
        begin,
        duration,
        useSeconds,
    }) {
        this.obj = obj;
        this.prop = prop;
        this._begin = begin;
        this._duration = duration;
        this.useSeconds = useSeconds;
        this._listeners = [];
        this.addListener(this);
        this.start();
        this._time = 0;
        this._prevPos = null;
        this._pos = begin;
    }
    public start() {
        this.rewind();
        this.addListener(this);
        // this.broadcastMessage('onMotionStarted', this, this._pos);
    }
    public stop() {
        this.removeListener(this);
        // this.broadcastMessage('onMotionStopped', this, this._pos);
    }
    public resume() {
        this.fixTime();
        this.addListener(this);
        // this.broadcastMessage('onMotionResumed', this, this._pos);
    }
    public rewind(t:number = this._time) {
        this._time = !t ? 1 : t;
        this.fixTime();
    }
    public fforward() {
        this._time = this._duration;
        this.fixTime();
    }
    public nextFrame() {
        // if (this.useSeconds) {
        //     this.setTime ((this.getTimer() - this.startTime) / 1000);
        // } else {
        this.setTime(this._time + 1)
        // }
    }
    public prevFrame() {
        if (!this.useSeconds) {
            this.setTime(this._time - 1)
        }
    }
    /* onEnterFrame() {
        this.nextFrame();
    } */
   public getPosition(t) {
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
    setTime(t:number) {
        // const prevTime = this._time;
        if (t > this._duration) {
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
    public getTime() {
        return this._time;
    }
    public setBegin(b:number) {
        this._begin = b;
    }
    public getBegin() {
        return this._begin;
    }
    public setDuration(d:number) {
        this._duration = (d === null || d <= 0) ? 10000000 : d;
    }
    public getDuration() {
        return this._duration;
    }
    public setLooping(b:boolean) {
        this._looping = b;
    }
    public getLooping() {
        return this._looping;
    }
    public setObj(obj:any) {
        this.obj = obj;
    }
    public getObj() {
        return this.obj;
    }
    public setProp(prop) {
        this.prop = prop;
    }
    public getProp() {
        return this.prop;
    }
    public setUseSeconds(b) {
        this.useSeconds = b;
    }
    public getUseSeconds() {
        return this.useSeconds;
    }
    // "private" methods:
    protected fixTime() {
    // console.log('TBD')
    // if (this.useSeconds) {
        //     this.startTime = this.getTimer() - this._time * 1000;
        // }
    }
    protected update() {
        const pos = this.getPosition(this._time);
        // console.log('update', pos)
        this.setPosition(pos);
    }
    
    protected addListener(listener:any) {
        this._listeners.push(listener);
    }
    protected removeListener(listener:any) {
        this._listeners = this._listeners.filter(l => l !== listener);
    }
    public toString() {
        return `Motion[obj=${this.obj}, prop=${this.prop}, begin=${this._begin}, duration=${this._duration}, useSeconds=${this.useSeconds}]`;
    }
}
export default Motion;