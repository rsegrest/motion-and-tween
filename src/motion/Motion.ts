import RealWorldTimer from "../timing/RealWorldTimer.js";
import type {
    TweenAlgorithmParams,
    TweenAtTimeParams,
    TweenForDurationParams,
} from "../tween/Tween.js";

export interface MotionProps {
    obj: any;
    propertyToChange: string;
    beginValue?: number;
    actionDuration?: number;
    valueChange?: number | null;
}
export class Motion {
    protected obj: any;
    protected propertyToChange: string;
    protected _beginValue: number;
    protected _actionDuration: number;
    protected _currentTime: number = 0;
    protected _isLooping: boolean = false;
    protected _isPlaying: boolean = true;
    protected _valueChange: number;

    constructor({
        obj,
        propertyToChange,
        beginValue,
        actionDuration,
        valueChange,
    }: MotionProps) {
        this.obj = obj;
        this.propertyToChange = propertyToChange;
        this._beginValue = beginValue ?? 0;
        this._actionDuration = actionDuration ?? 0;
        this._valueChange = valueChange ?? 0;
    }
    public getElapsedTime() {
        return RealWorldTimer.getElapsedTime();
    }
    public start() {
        this.rewind();
        this._isPlaying = true;
    }
    public stop() {
        this._isPlaying = false;
    }
    public resume() {
        this._isPlaying = true;
    }
    public getIsPlaying() {
        return this._isPlaying;
    }
    public rewind(t: number = 0) {
        this.moveToTime(t, null);
    }
    public nextFrame() {
        this.setTime(this._currentTime + 1);
    }
    public prevFrame() {
        this.setTime(this._currentTime - 1);
    }
    public setTime(t: number) {
        this.moveToTime(t, null);
    }
    public getTime() {
        return this._currentTime;
    }
    public setBegin(b: number) {
        this._beginValue = b;
    }
    public getBegin() {
        return this._beginValue;
    }
    public setActionDuration(d: number) {
        this._actionDuration = d === null || d <= 0 ? 10000000 : d;
    }
    public getActionDuration() {
        return this._actionDuration;
    }
    public setIsLooping(b: boolean) {
        this._isLooping = b;
    }
    public getIsLooping() {
        return this._isLooping;
    }
    public setObj(obj: any) {
        this.obj = obj;
    }
    public getObj(): typeof this.obj {
        return this.obj;
    }
    public setProp(prop: any) {
        this.propertyToChange = prop;
    }
    public getProp() {
        return this.propertyToChange;
    }
    public expandParams(
        params:
            | null
            | undefined
            | TweenAtTimeParams
            | TweenForDurationParams = null,
    ): Required<TweenAlgorithmParams> {
        const requestedTime = params && "t" in params ? params.t : null;
        const requestedDuration =
            params && "actionDuration" in params ? params.actionDuration : null;
        return {
            lastT: this._currentTime,
            nextT: requestedTime ?? this._currentTime + 1,
            beginValue: params?.beginValue ?? this._beginValue,
            valueChange: params?.valueChange ?? this._valueChange,
            actionDuration: requestedDuration ?? this._actionDuration,
        };
    }
    // Without a time, update() advances one frame while playing; with a time, it seeks there even when stopped.
    public update(
        params: TweenAtTimeParams | undefined | null = null,
    ): typeof this.obj {
        const requestedTime = params?.t;
        if (requestedTime !== null && requestedTime !== undefined) {
            this.moveToTime(requestedTime, params ?? null);
        } else if (this._isPlaying) {
            this.moveToTime(this._currentTime + 1, params ?? null);
        }
        return this.obj;
    }
    protected moveToTime(t: number, overrides: TweenAtTimeParams | null) {
        if (t > this._actionDuration && !this._isLooping) {
            this.stop();
        }
        this._currentTime = this.resolveTime(t);
        this.renderCurrentTime(overrides);
    }
    protected resolveTime(t: number): number {
        if (t < 0) return 0;
        if (t <= this._actionDuration) return t;
        if (!this._isLooping) return this._actionDuration;
        return this._actionDuration > 0 ? t % this._actionDuration : 0;
    }
    // Override to apply the value for the current time to the target object.
    protected renderCurrentTime(_overrides: TweenAtTimeParams | null): void {}

    public toString() {
        return `Motion[obj=${JSON.stringify(this.obj)}, prop=${JSON.stringify(this.propertyToChange)},\
 _beginValue=${this._beginValue}, _duration=${this._actionDuration}]`;
    }
}
export default Motion;
