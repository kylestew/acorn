const meta = {
    title: 'Distributions',
    description: '',
    refLink: '',
}

env('sketch-2d', { width: 900, height: 900, range: [-1, 1] })
const palette = getPalette()

import { offset } from '../tools/geo'
import { Grid } from '../tools/geo/extended'
import { zip } from '../tools/array'
import { draw } from '../tools/draw'
import {
    remapToRect, //
    uniform1D,
    uniform2D,
    gaussian1D,
    gaussian2D,
    pareto1D,
    pareto2D,
} from '../tools/random/distros'

export function distributions(ctx, palette) {
    let { background, primary, secondary, accent, dark, neutral } = palette

    const grid = new Grid([-1, -1], [2, 2], 3, 2)
    const rects = grid.rects().map((r) => offset(r, -0.02))

    const sampleCount = 25000
    const color = primary + 'AA'

    // 1) UNIFORM
    draw(ctx, remapToRect(uniform2D(sampleCount), rects[0]), { fill: color, weight: 0.002 })

    // 2) GAUSSIAN
    draw(ctx, remapToRect(gaussian2D(sampleCount, [0.5, 0.5], [0.1, 0.1]), rects[1]), { fill: color, weight: 0.002 })

    // 3) PARETO
    draw(ctx, remapToRect(pareto2D(sampleCount, [0.01, 0.01], [1.0, 1.0]), rects[2], true), {
        fill: color,
        weight: 0.002,
    })

    // 4) [Gaussian, Uniform]
    let pts = zip(gaussian1D(sampleCount, 0.5, 0.1), uniform1D(sampleCount))
    draw(ctx, remapToRect(pts, rects[3], true), { fill: color, weight: 0.002 })

    // 5) [Pareto, Uniform]
    pts = zip(pareto1D(sampleCount, 0.01, 0.1), uniform1D(sampleCount))
    draw(ctx, remapToRect(pts, rects[4], true), { fill: color, weight: 0.002 })

    // 6) [Gauss, Pareto]
    pts = zip(gaussian1D(sampleCount, 0.5, 0.1), pareto1D(sampleCount, 0.01, 0.1))
    draw(ctx, remapToRect(pts, rects[5], true), { fill: color, weight: 0.002 })
}
