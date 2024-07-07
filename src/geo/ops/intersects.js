import { Line } from '../shapes/Line'
import { Rectangle } from '../shapes/Rectangle'
import { Circle } from '../shapes/Circle'
import { Polyline } from '../shapes/Polyline'
import { Polygon } from '../shapes/Polygon'
import { Arc, Ellipse } from '../shapes'

import { circleLineIntersection, rayLineIntersection, lineLineIntersection } from '../math'
import { dist } from '../math/vectors'

/**
 * Performs intersection tests on given 2 shapes and returns the intersection point(s) or a boolean for simple overlap checks.
 *
 * @param {Object} a - The first shape.
 * @param {Object} b - The second shape.
 * @returns {boolean|Array|null} - Returns a boolean for circle-circle intersection, an array with the intersection point for ray-line intersection, or null if no intersection.
 */
export function intersects(a, b) {
    if (a instanceof Circle && b instanceof Circle) {
        return dist(a.pos, b.pos) < a.r + b.r
    } else if (a instanceof Circle && b instanceof Line) {
        return circleLineIntersection(a, b)
    } else if (a instanceof Line && b instanceof Circle) {
        return circleLineIntersection(b, a)
    } else if (a instanceof Line && b instanceof Line) {
        return lineLineIntersection(a, b)
    } else if (a instanceof Ray && b instanceof Line) {
        return rayLineIntersection(a, b)
    }
    throw new Error(`Method not implemented for shapes: ${a.constructor.name} and ${b.constructor.name}`)
}
