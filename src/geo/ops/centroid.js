import { Line } from '../shapes/Line'
import { Rectangle } from '../shapes/Rectangle'
import { Circle } from '../shapes/Circle'
import { Polyline } from '../shapes/Polyline'
import { Polygon } from '../shapes/Polygon'
import { Arc, Ellipse } from '../shapes'

/**
 * Computes centroid (center point) of given shape
 *
 * @param shape
 */
export function centroid(shape) {
    if (shape instanceof Arc) {
    } else if (shape instanceof Circle || shape instanceof Ellipse) {
        return shape.pos
    } else if (shape instanceof Line) {
        return pointAt(shape, 0.5)
    } else if (shape instanceof Polygon) {
        const pts = shape.pts

        let xSum = 0
        let ySum = 0
        let areaSum = 0
        const n = pts.length

        for (let i = 0; i < n; i++) {
            const [x1, y1] = pts[i]
            const [x2, y2] = pts[(i + 1) % n] // Ensure the last point connects to the first
            const crossProduct = x1 * y2 - x2 * y1
            xSum += (x1 + x2) * crossProduct
            ySum += (y1 + y2) * crossProduct
            areaSum += crossProduct
        }

        const area = areaSum / 2
        const centroidX = xSum / (6 * area)
        const centroidY = ySum / (6 * area)

        return [centroidX, centroidY]
    } else if (shape instanceof Polyline) {
    } else if (shape instanceof Rectangle) {
        return [shape.pos[0] + shape.size[0] / 2, shape.pos[1] + shape.size[1] / 2]
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`)
}
