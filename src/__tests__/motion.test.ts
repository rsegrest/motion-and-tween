import Motion from "../Motion";

describe("Motion", () => {
    it("should do some motion", () => {
        const props = {
            obj: {},
            prop: "blah",
            begin: 0,
            duration: 1,
            useSeconds: false,
        };
        const motion = new Motion(props);
        expect(motion).toBeInstanceOf(Motion);
        expect(motion.toString()).toBe(
            'Motion[obj={}, prop="blah", begin=0, duration=1, useSeconds=false]',
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
