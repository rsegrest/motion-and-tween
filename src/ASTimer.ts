export class ActionScriptTimer {
    private static startTime:number = Date.now();

    constructor() {}

    public static getElapsedTime() {
        return Date.now() - ActionScriptTimer.startTime;
    }
    public toString() {
        return `ActionScriptTimer[${ActionScriptTimer.getElapsedTime()}]`;
    }
}
export default ActionScriptTimer;