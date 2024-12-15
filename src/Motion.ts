// import Position from "./Position";

import ActionScriptTimer from "./ASTimer";
import Position from "./Position";
import { TweenForDurationParams, type TweenAtTimeParams } from "./tween/Tween";

export interface MotionProps {
    obj:any;
    propertyToChange:string;
    beginValue?:number;
    actionDuration?:number;
    useSeconds?:boolean;
    valueChange?:number|null;
}
export class Motion {
    protected obj:any;
    protected propertyToChange:string;
    protected useSeconds:boolean;
    protected _beginValue:number;
    protected _actionDuration:number;
    protected _listeners:any[];
    protected _currentTime:number;
    protected _prevPos:any;
    protected _pos:any;
    protected _isLooping:boolean = false;
    protected _startTime:number;
    protected _valueChange:number|null = null;

    protected asTimer = new ActionScriptTimer();

    constructor({
        obj,
        propertyToChange,
        beginValue,
        actionDuration,
        useSeconds,
        valueChange,
    }:MotionProps) {
        this.obj = obj;
        this.propertyToChange = propertyToChange;
        this._beginValue = beginValue;
        this._actionDuration = actionDuration;
        this.useSeconds = useSeconds;
        this._listeners = [];
        this.addListener(this);
        this.start();
        this._currentTime = 0;
        this._prevPos = null;
        this._pos = beginValue;
        this._startTime = ActionScriptTimer.getElapsedTime();
        this._valueChange = valueChange;
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
    public rewind(t:number = this._currentTime) {
        this._currentTime = !t ? 1 : t;
        this.fixTime();
    }
    protected fixTime() {
        if (this.useSeconds) {
            const startTime = this.getElapsedTime() - this._currentTime * 1000;
            this._startTime = startTime;
        }
    }
    protected addListener(listener:any) {
        this._listeners.push(listener);
    }
    
    public fforward() {
        throw('not yet implemented')
        // this._currentTime = this._actionDuration;
        // this.fixTime();
    }
    public nextFrame() {
        if (this.useSeconds) {
            this.setTime((this.getElapsedTime() - this._startTime) / 1000);
        } else {
            this.setTime(this._currentTime + 1)
        }
    }
    public prevFrame() {
        if (!this.useSeconds) {
            this.setTime(this._currentTime - 1)
        }
    }
    
    public getPosition(t?:number):Position {
        throw('not yet implemented -- use update')
        // calculate and return position
        //    console.log('getPosition', t)
        //    return new Position(0,0);
    }
    setPosition(pos:Position) {
        this._prevPos = this._pos;
        this.obj[this.propertyToChange] = this._pos = pos;
        // this.broadcastMessage('onMotionChanged', this, this._pos);
    }
    getPrevPos() {
        return this._prevPos;
    }
    setTime(t:number) {
        // const prevTime = this._time;
        if (t > this._actionDuration) {
            if (this._isLooping) {
                this.rewind(t-this._actionDuration);
                // this.broadcastMessage('onMotionLooped', this, this._pos);
            } else {
                this.stop();
                // this.broadcastMessage('onMotionFinished', this, this._pos);
            }
        } else if (t < 0) {
            this.rewind();
        } else {
            this._currentTime = t;
        }
        this.update();
    }
    public getTime() {
        return this._currentTime;
    }
    public setBegin(b:number) {
        this._beginValue = b;
    }
    public getBegin() {
        return this._beginValue;
    }
    public setDuration(d:number) {
        this._actionDuration = (d === null || d <= 0) ? 10000000 : d;
    }
    public getDuration() {
        return this._actionDuration;
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
    public getObj():typeof this.obj {
        return this.obj;
    }
    public setProp(prop:any) {
        this.propertyToChange = prop;
    }
    public getProp() {
        return this.propertyToChange;
    }
    public setParams(
        params:null|undefined|TweenAtTimeParams|TweenForDurationParams = null,
    ):{
        lastT:number,
        nextT:number,
        beginValue:number,
        valueChange:number,
        actionDuration:number,
    } {
        let lastT, nextT, beginValue, valueChange, actionDuration;
        if (params) {
            if (params.beginValue) beginValue = params.beginValue;
            if (params.valueChange) valueChange = params.valueChange;
        }
        lastT = this._currentTime;
        if (!params) {
            lastT = this._currentTime;
            nextT = this._currentTime + 1;
            beginValue = this._beginValue;
            valueChange = this._valueChange;
            actionDuration = this._actionDuration;
        } else {
            if (params.hasOwnProperty('t')) {
                nextT = (params as TweenAtTimeParams).t;
            }
            if (!beginValue) {
                beginValue = this._beginValue;
            }
            if (!valueChange) {
                valueChange = this._valueChange;
            }
            if (!actionDuration) {
                actionDuration = this._actionDuration;
            }
        }
        return { lastT, nextT, beginValue, valueChange, actionDuration };
    }
    // Override this method
    protected update(
        params:TweenAtTimeParams|undefined|null=null,
    ):(typeof this.obj) {
        if (params) {
            this._currentTime = params.t;
        } else {
            this._currentTime += 1;
        }
        return this.obj;
    }
    protected removeListener(listener:any) {
        this._listeners = this._listeners.filter(l => l !== listener);
    }
    public toString() {
        return `Motion[obj=${JSON.stringify(this.obj)}, prop=${JSON.stringify(this.propertyToChange)},\
 _beginValue=${this._beginValue}, _duration=${this._actionDuration}, useSeconds=${this.useSeconds}]`;
    }
}
export default Motion;