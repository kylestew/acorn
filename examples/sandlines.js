import { Circle, Line, Quadratic } from '../tools/geo'
import { gaussian } from '../tools/random'
import { draw } from '../tools/draw'

import { sand } from '../tools/draw/sand'

/* https://inconvergent.net/2017/grains-of-sand/ */
export function sandLines(ctx, palette) {
    let { background, primary, secondary, accent, dark, neutral } = palette

    // circle
    const circ = new Circle([0, 0], 0.6)
    let grains = sand(circ, 4096, 0.004)
    draw(ctx, grains, { fill: primary + '99', weight: 0.001 })

    // line
    const line = new Line([-0.5, -0.5], [0.5, 0.5])
    // const grains = sand(line, 4096, 0.004, () => Math.random())
    grains = sand(line, 4096, 0.004, () => gaussian(0.5, 0.3))
    draw(ctx, grains, { fill: secondary + '99', weight: 0.001 })

    // curves
    const tick = 9.0
    let pts = [
        [-0.75, -0.75],
        [1.0, -0.5],
        [0.75, 0.75],
    ]
    const curve0 = new Quadratic(pts)
    grains = sand(curve0, 4096, 0.004)
    draw(ctx, grains, { fill: accent + '99', weight: 0.001 })

    // squares?

    // const circ = new Circle([0, 0], 0.85)
    // const walker1 = new CircleWalker(circ)
    // const walker2 = new CircleWalker(circ)
    // const walker3 = new CircleWalker(circ)

    // const zOffset = Date.now() / 100
    // function render(time) {
    //     const line1 = walker1.walk(time, 0.01, zOffset + 0.123, 1)
    //     const line2 = walker2.walk(time, 0.02, zOffset + 123.42, -1)
    //     const line3 = walker3.walk(time, 0.1, zOffset + 6.1, 1)

    //     const grainCount = 2048 * 2
    //     const lineEndOffset = 0.002
    //     const grains1 = sandLine(line1, grainCount, lineEndOffset)
    //     const grains2 = sandLine(line2, grainCount, lineEndOffset)
    //     const grains3 = sandLine(line3, grainCount, lineEndOffset)

    //     draw(ctx, grains2, { fill: secondary + '16', weight: 0.0005 })
    //     draw(ctx, grains3, { fill: accent + '16', weight: 0.0005 })
    // }
    // animate(60, render)
}
