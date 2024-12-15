import Motion, { MotionProps } from "../Motion";

describe("Motion", () => {
    it("should do some motion", () => {
        const props:MotionProps = {
            obj: {},
            propertyToChange: "blah",
            beginValue: 0,
            actionDuration: 1,
            useSeconds: false,
        };
        const motion = new Motion(props);
        expect(motion).toBeInstanceOf(Motion);
        expect(motion.toString()).toBe(
            'Motion[obj={}, prop="blah", _beginValue=0, _duration=1, useSeconds=false]',
        );
    });
    // start

    // rewind
    // stop
    // resume
    // fixTime
    // update
    // addListener
    // fforward
    // nextFrame
    // prevFrame
    // getPosition
    // getPrevPos
    // setTime
    // getTime
    // setBegin
    // getBegin
    // setDuration
    // getDuration
    // setLooping
    // getLooping
    // setObj
    // getObj
    // setProp
    // getProp
    // setUseSeconds
    // getUseSeconds
    // update
    // removeListener

    // onEnterFrame() ???
});
