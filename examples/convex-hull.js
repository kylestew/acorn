import { Circle, Polygon } from '../tools/geo'
import { scatter } from '../tools/geo'
import { convexHull } from '../tools/algos/convex-hull'
import { draw } from '../tools/draw'
import { animate } from '../tools/canvas-utils/animate'
import { chaikinCurve } from '../tools/algos/chaikin'

export function convexHullDemo(ctx, palette) {
    const { background, primary, secondary, accent, dark, neutral } = palette

    const circ = new Circle([0, 0], 0.75)

    function render(time) {
        ctx.clear(background)

        const pts = scatter(circ, 64)

        const hullPts = convexHull(pts)
        // const smoothPts = chaikinCurve(hullPts, 6, true)
        const poly = new Polygon(hullPts)

        draw(ctx, circ, { stroke: secondary + '66', weight: 0.01 })
        draw(ctx, poly, { fill: primary })
        draw(ctx, pts, { fill: accent })
    }
    animate(2, render)
}
