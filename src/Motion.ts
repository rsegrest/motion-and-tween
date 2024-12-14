// import Position from "./Position";

import ActionScriptTimer from "./ASTimer";
import Position from "./Position";
import { type TweenFuncParams } from "./Tween";

export interface MotionProps {
    obj:any;
    prop:string;
    begin:number;
    duration:number;
    useSeconds:boolean;
}
export class Motion {
    protected obj:any;
    protected prop:string;
    protected useSeconds:boolean;
    protected _begin:number;
    protected _duration:number;
    protected _listeners:any[];
    protected _time:number;
    protected _prevPos:any;
    protected _pos:any;
    protected _isLooping:boolean = false;
    protected _startTime:number;

    protected asTimer = new ActionScriptTimer();

    constructor({
        obj,
        prop,
        begin,
        duration,
        useSeconds,
    }:MotionProps) {
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
        this._startTime = ActionScriptTimer.getElapsedTime();
    }
    public getElapsedTime() {
        return ActionScriptTimer.getElapsedTime();
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
    protected fixTime() {
        if (this.useSeconds) {
            const startTime = this.getElapsedTime() - this._time * 1000;
            this._startTime = startTime;
        }
    }
    protected addListener(listener:any) {
        this._listeners.push(listener);
    }
    public fforward() {
        this._time = this._duration;
        this.fixTime();
    }
    public nextFrame() {
        if (this.useSeconds) {
            this.setTime((this.getElapsedTime() - this._startTime) / 1000);
        } else {
            this.setTime(this._time + 1)
        }
    }
    public prevFrame() {
        if (!this.useSeconds) {
            this.setTime(this._time - 1)
        }
    }
    
    public getPosition(t?:number):Position {
       // calculate and return position
       console.log('getPosition', t)
       return new Position(0,0);
    }
    setPosition(pos:Position) {
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
            if (this._isLooping) {
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
    public setIsLooping(b:boolean) {
        this._isLooping = b;
    }
    public getIsLooping() {
        return this._isLooping;
    }
    public setObj(obj:any) {
        this.obj = obj;
    }
    public getObj() {
        return this.obj;
    }
    public setProp(prop:any) {
        this.prop = prop;
    }
    public getProp() {
        return this.prop;
    }
    public setUseSeconds(b:boolean) {
        this.useSeconds = b;
    }
    public getUseSeconds() {
        return this.useSeconds;
    }
    // To be overridden -- could be abstract
    protected update(parameters?:TweenFuncParams|undefined) {
        console.log('update', parameters);
        const pos = this.getPosition(this._time);
        this.setPosition(pos);
    }
    
    protected removeListener(listener:any) {
        this._listeners = this._listeners.filter(l => l !== listener);
    }
    public toString() {
        return `Motion[obj=${JSON.stringify(this.obj)}, prop=${JSON.stringify(this.prop)},\
 begin=${this._begin}, duration=${this._duration}, useSeconds=${this.useSeconds}]`;
    }
}
export default Motion;