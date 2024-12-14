import ActionScriptTimer from "../ASTimer";
import * as jest from "jest";

describe("Timer", () => {
    it("should test the timer", () => {
        const timer = new ActionScriptTimer();
        expect(timer).toBeInstanceOf(ActionScriptTimer);
        // jest.advanceTimersByTime(1000);
        // expect(ActionScriptTimer.getElapsedTime()).toBe(1000);
    });
});
