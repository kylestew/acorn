import { Rectangle, Circle } from '../tools/geo'
import { withAttribs, asPath } from '../tools/geo'
import { Grid } from '../tools/geo/extended'
import { mulN } from '../tools/math/vectors'
import { lines, checkers, dotGrid } from '../tools/assets/pattern_fills'
import { pickRandom } from '../tools/random'
import { draw } from '../tools/draw'
import { animate } from '../tools/canvas-utils'

export function fillsDemo(ctx, palette) {
    let { background, primary, secondary, accent, dark, neutral } = palette
    let colors = [primary, secondary, accent, dark, neutral]

    const fillFns = [
        (shape) => lines(shape, pickRandom([6, 12, 24]), Math.PI / pickRandom([4.0, -4.0, 2.0, 1.0]), colors),
        (shape) => checkers(shape, pickRandom([6, 12, 18]), pickRandom([6, 12, 18]), colors),
        (shape) => dotGrid(shape, pickRandom([6, 12, 18, 24]), pickRandom([1.0, 0.9, 0.75, 0.5]), colors),
    ]

    // const circ = new Circle([0.2, 0.3], 0.5)
    // draw(ctx, lines(circ, 12, Math.PI / 4, colors))
    // draw(ctx, lines(circ, 12, 0, colors))
    // draw(ctx, circ)

    // TODO fill this damn circle with good lines

    let fillIdx = 0
    new Grid([-0.95, -0.95], [1.9, 1.9], 2, 2).cells().forEach(({ center, size }) => {
        let shape
        if (Math.random() > 0.5) {
            shape = Rectangle.withCenter(center, mulN(size, 0.9))
        } else {
            shape = new Circle(center, size[0] * 0.5 * 0.9)
        }

        ctx.save()
        ctx.clip(asPath(shape))

        // draw fill
        draw(ctx, fillFns[fillIdx++ % fillFns.length](shape))

        ctx.restore()

        // draw border (original shape)
        draw(ctx, shape)
    })
}
