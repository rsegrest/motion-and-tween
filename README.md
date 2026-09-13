# motion-and-tween

Frame-based motion and easing tweens for any numeric property of any JavaScript object. Tested with p5.js animation.

- Written in TypeScript, ships with type declarations
- Published as **ES modules only** (use `import`, not `require`)

Includes these easing algorithms:

* Linear
* Quadratic
* Cubic
* Quartic
* Quintic
* Exponential
* Circular
* Sinusoidal

All (except linear) have `EaseIn`, `EaseOut`, and `EaseInOut` variants.

## Install

```sh
npm install motion-and-tween
```

## Usage

```ts
import { QuadraticTween } from "motion-and-tween/tween";

const ball = { x: 0, y: 100 };

const slide = new QuadraticTween.EaseInOut({
  obj: ball,
  propertyToChange: "x",
  beginValue: 0,
  finishValue: 400,   // or valueChange: 400
  actionDuration: 60, // in frames
});

// In your draw loop (for example p5's draw()):
slide.update();           // advances one frame and sets ball.x
circle(ball.x, ball.y, 20);
```

### Controlling playback

| Method | Effect |
| --- | --- |
| `update()` | Advance one frame (does nothing while stopped) and return the target object |
| `update({ t })` | Jump to frame `t` (works even while stopped) |
| `nextFrame()` / `prevFrame()` | Step one frame forward or back |
| `setTime(t)` / `rewind(t = 0)` | Jump to a frame |
| `stop()` / `resume()` / `start()` | Pause, continue, or restart from frame 0 |
| `setIsLooping(true)` | Wrap back to the beginning instead of stopping at the end |
| `continueTo(finish, duration?)` | Start a new tween from the current value to `finish` |
| `yoyo()` | Tween from the current value back to the begin value |

A tween that is not looping stops at its last frame, with the property set exactly to the finish value.

Subpath imports are available for `motion-and-tween/tween`, `/motion`, `/timing`, and `/location`. The root import exposes them as the `Tween`, `Motion`, `Timing`, and `Location` namespaces.

## Background

This library was inspired by the 2002 book "Programming Macromedia Flash MX" by Robert Penner, which is the book that inspired me to move from doing graphic design to learning Software Engineering.

That book's code was in ActionScript 1.0, which is now a dead computer language, so I updated it to support modern ES Scripts.

## Development

```sh
npm install
npm test       # type-checks, builds, and runs the Jest tests
npm run build  # compiles to dist/
```

## Feedback

Bug reports and ideas are welcome at https://github.com/rsegrest/motion-and-tween/issues.
