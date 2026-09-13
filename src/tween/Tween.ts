import Motion, { MotionProps } from "../motion/Motion.js";

export interface TweenChangeProps extends MotionProps {
    valueChange?: number | undefined;
}
export interface TweenFinishProps extends MotionProps {
    finishValue?: number | undefined;
}
export type TweenProps = TweenChangeProps | TweenFinishProps;
export interface TweenAlgorithmParams {
    nextT: number;
    lastT?: number;
    beginValue: number;
    valueChange: number;
    actionDuration: number;
}
export interface TweenAtTimeParams {
    t: number | null | undefined;
    beginValue?: number | null | undefined;
    valueChange?: number | null | undefined;
}
export interface TweenForDurationParams {
    beginValue?: number | null | undefined;
    valueChange?: number | null | undefined;
    actionDuration: number | null | undefined;
}

export class Tween extends Motion {
    protected isComplete: boolean = false;
    protected funcName: string;
    protected _finishValue: number = 0;

    constructor(params: TweenProps, funcName: string) {
        super(params);
        const hasValueChange =
            "valueChange" in params && params.valueChange != null;
        if (!hasValueChange && "finishValue" in params && params.finishValue != null) {
            this.setFinish(params.finishValue);
        } else {
            this._finishValue = this.calcFinish();
        }
        this.funcName = funcName;
    }
    protected renderCurrentTime(overrides: TweenAtTimeParams | null): void {
        const params = this.expandParams({ ...overrides, t: this._currentTime });
        this.isComplete = params.nextT >= params.actionDuration;
        this.obj[this.propertyToChange] = this.calculateValue(params);
    }
    // Clamping to the endpoints guarantees exact begin/finish values, which some easing formulas only approximate.
    protected calculateValue(params: TweenAlgorithmParams): number {
        if (params.nextT <= 0) return params.beginValue;
        if (params.nextT >= params.actionDuration) {
            return params.beginValue + params.valueChange;
        }
        return this.tweenAlgorithm(params);
    }
    // override
    tweenAlgorithm(_params: TweenAlgorithmParams): number {
        return 0;
    }
    continueTo(finish: number, interimDuration?: number) {
        this.setBegin(this.getPosition());
        this.setFinish(finish);
        if (interimDuration) {
            this.setActionDuration(interimDuration);
        }
        this.start();
    }
    yoyo() {
        this.continueTo(this.getBegin(), this.getActionDuration());
    }
    getPosition(t?: number): number {
        const params = this.expandParams({ t: t ?? this._currentTime });
        return this.calculateValue(params);
    }

    setChange(change: number) {
        this._valueChange = change;
    }
    getChange() {
        return this._valueChange;
    }
    setFinish(finish: number) {
        this._finishValue = finish;
        this._valueChange = this._finishValue - this._beginValue;
    }
    calcFinish() {
        return this._valueChange + this._beginValue;
    }

    toString() {
        return `Tween[${super.toString()}, funcName: ${this.funcName}, _valueChange: ${this._valueChange}, _finishValue: ${this._finishValue}, isComplete: ${this.isComplete}]`;
    }
}
export default Tween;
