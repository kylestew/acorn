import { Line } from './shapes/Line'
import { Rectangle } from './shapes/Rectangle'
import { Circle } from './shapes/Circle'
import { Polyline } from './shapes/Polyline'
import { Polygon } from './shapes/Polygon'
import { Quadratic } from './shapes/Quadratic'
import { Arc, Ellipse, Ray } from './shapes'
// import { random, randomPoint } from '../random'
// import { neg, sub, subN, mulN, normalize } from '../math/vectors'
// import { wrapSides, partition } from '../array'
// import { Bezier } from 'bezier-js'

/*
export function operation(shape) {
    if (shape instanceof Arc) {
    } else if (shape instanceof Circle) {
    } else if (shape instanceof Ellipse) {
    } else if (shape instanceof Line) {
    } else if (shape instanceof Polygon) {
    } else if (shape instanceof Polyline) {
    } else if (shape instanceof Quadratic) {
    } else if (shape instanceof Ray) {
    } else if (shape instanceof Rectangle) {
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`)
}
*/

/**
 * Computes the surface area of given `shape`.
 * For curves, lines, point clouds and rays the function returns 0.
 *
 * @param shape - shape to operate on
 */
export function area(shape) {
    if (shape instanceof Arc) {
    } else if (shape instanceof Circle) {
        return Math.PI * shape.r * shape.r
    } else if (shape instanceof Ellipse) {
        return Math.PI * shape.r[0] * shape.r[1]
    } else if (shape instanceof Line) {
        return 0
    } else if (shape instanceof Polygon) {
        let area = 0
        const n = shape.pts.length

        for (let i = 0; i < n; i++) {
            const [x1, y1] = shape.pts[i]
            const [x2, y2] = shape.pts[(i + 1) % n] // Ensure the last point connects to the first
            area += x1 * y2 - y1 * x2
        }

        return Math.abs(area) / 2
    } else if (shape instanceof Polyline) {
    } else if (shape instanceof Rectangle) {
        return shape.size[0] * shape.size[1]
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`)
}

/**
 * Converts given shape into an array of {@link Polygon}s, using provided `num` parameter
 * to determine the number of vertices for each polygon.
 *
 * @param shape
 * @param num
 */
export function asPolygon(shape, num) {
    if (shape instanceof Line || shape instanceof Polyline) {
        throw new Error(`Cannot convert ${shape.constructor.name} to Polygon`)
    }

    let pts = []
    if (shape instanceof Rectangle) {
        // for a rectangle I really just want to corner points
        pts = shape.points()
    } else {
        pts = asPoints(shape, num)
    }
    return new Polygon(pts, shape.attribs)
}

/**
 * Computes and returns bounding rect/box for the given shape.
 *
 * @param shape
 */
export function bounds(shape) {
    /* https://github.com/thi-ng/umbrella/blob/41bd769068da804eeace622ec7db50e4d48f1dc9/packages/geom/src/bounds.ts#L65 */
    if (shape instanceof Arc) {
    } else if (shape instanceof Circle) {
        return new Rectangle(subN(shape.pos, shape.r), mulN([2, 2], shape.r))
    } else if (shape instanceof Ellipse) {
        const [cx, cy] = shape.pos
        const [rx, ry] = shape.r

        const minX = cx - rx
        const minY = cy - ry
        const maxX = cx + rx
        const maxY = cy + ry

        return new Rectangle([minX, minY], [maxX - minX, maxY - minY])
    } else if (shape instanceof Line) {
    } else if (shape instanceof Polygon) {
        const pts = shape.pts

        let minX = pts[0][0]
        let minY = pts[0][1]
        let maxX = pts[0][0]
        let maxY = pts[0][1]

        for (let i = 1; i < pts.length; i++) {
            let x = pts[i][0]
            let y = pts[i][1]

            if (x < minX) minX = x
            if (y < minY) minY = y
            if (x > maxX) maxX = x
            if (y > maxY) maxY = y
        }

        return new Rectangle([minX, minY], [maxX - minX, maxY - minY])
    } else if (shape instanceof Polyline) {
    } else if (shape instanceof Quadratic) {
        const [start, ctrl, end] = shape.pts
        const bezier = new Bezier(start[0], start[1], ctrl[0], ctrl[1], end[0], end[1])
        return new Rectangle([bezier.bbox().x.min, bezier.bbox().y.min], [bezier.bbox().x.size, bezier.bbox().y.size])
    } else if (shape instanceof Rectangle) {
        return new Rectangle(shape.pos, shape.size)
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`)
}

/**
 * Returns copy of given shape centered around optionally provided point `p`
 * (default: shape centroid).
 *
 * @param shape
 * @param p
 */
export function center(shape, p) {
    if (p === undefined) {
        p = [0, 0]
    }

    if (shape instanceof Arc) {
    } else if (shape instanceof Circle) {
    } else if (shape instanceof Ellipse) {
    } else if (shape instanceof Line) {
    } else if (shape instanceof Polygon) {
        const c = centroid(shape)
        return translate(shape, sub(p, c))
    } else if (shape instanceof Polyline) {
    } else if (shape instanceof Quadratic) {
    } else if (shape instanceof Ray) {
    } else if (shape instanceof Rectangle) {
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`)
}

/**
 * Rotates a shape around its centroid by a given angle.
 * @param {Array} shape - The shape to be rotated.
 * @param {number} theta - The angle of rotation in radians.
 * @returns {Array} - The rotated shape.
 */
export function centerRotate(shape, theta) {
    const cent = centroid(shape)
    return translate(rotate(translate(shape, neg(cent)), theta), cent)
}

/**
 * Finds the closest point on a shape to a given point.
 *
 * @param {Shape} shape - The shape to find the closest point on.
 * @param {Point} pt - The point to find the closest point to.
 * @returns {Point} The closest point on the shape to the given point.
 * @throws {Error} If the method is not implemented for the given shape.
 */
export function closestPoint(shape, pt) {
    if (shape instanceof Arc) {
    } else if (shape instanceof Circle) {
    } else if (shape instanceof Ellipse) {
    } else if (shape instanceof Line) {
        // Compute the closest point on the line
        const [lineStart, lineEnd] = shape.pts
        const A = pt[0] - lineStart[0]
        const B = pt[1] - lineStart[1]
        const C = lineEnd[0] - lineStart[0]
        const D = lineEnd[1] - lineStart[1]

        const dot = A * C + B * D
        const len_sq = C * C + D * D
        const param = len_sq !== 0 ? dot / len_sq : -1

        let closest
        if (param < 0) {
            closest = lineStart
        } else if (param > 1) {
            closest = lineEnd
        } else {
            closest = [lineStart[0] + param * C, lineStart[1] + param * D]
        }

        return closest
    } else if (shape instanceof Polygon) {
    } else if (shape instanceof Polyline) {
    } else if (shape instanceof Quadratic) {
    } else if (shape instanceof Ray) {
    } else if (shape instanceof Rectangle) {
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`)
}

/**
 * Extracts the edges of given shape's boundary and returns them as an iterable
 * of vector pairs.
 *
 * @param shape
 */
export function edges(shape) {
    if (shape instanceof Arc) {
    } else if (shape instanceof Circle) {
    } else if (shape instanceof Ellipse) {
    } else if (shape instanceof Line) {
    } else if (shape instanceof Polygon) {
    } else if (shape instanceof Polyline) {
    } else if (shape instanceof Rectangle) {
        return partition(wrapSides(asPoints(shape), 0, 1), 2, 1)
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`)
}

// export function fitIntoBounds(geo) {
//     throw new Error(`Method not implemented on ${geo.constructor.name}`)
// }

/**
 * Calculates the normal vector at a given point on a shape.
 * @param {Shape} shape - The shape to calculate the normal vector for.
 * @param {number} t - The parameter value representing the point on the shape.
 * @returns {number[]} The normal vector at the given point on the shape.
 * @throws {Error} If the method is not implemented for the given shape.
 */
export function normalAt(shape, t) {
    if (shape instanceof Arc) {
    } else if (shape instanceof Circle) {
    } else if (shape instanceof Ellipse) {
    } else if (shape instanceof Line) {
    } else if (shape instanceof Polygon) {
    } else if (shape instanceof Polyline) {
    } else if (shape instanceof Quadratic) {
        const [start, ctrl, end] = shape.pts
        const bezier = new Bezier(start[0], start[1], ctrl[0], ctrl[1], end[0], end[1])
        const norm = bezier.normal(t)
        return [norm.x, norm.y]
    } else if (shape instanceof Ray) {
    } else if (shape instanceof Rectangle) {
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`)
}

/**
 * Returns true if point `pt` is inside the given shape.
 *
 * @param shape
 * @param pt
 */
export function pointInside(shape, pt) {
    if (shape instanceof Arc) {
    } else if (shape instanceof Circle) {
        const [x, y] = pt
        const [cx, cy] = shape.pos
        const r = shape.r

        return (x - cx) ** 2 + (y - cy) ** 2 <= r ** 2
    } else if (shape instanceof Ellipse) {
        const [x, y] = pt
        const [cx, cy] = shape.pos
        const [rx, ry] = shape.r

        // Check if the point lies within the ellipse using the standard ellipse equation
        return (x - cx) ** 2 / rx ** 2 + (y - cy) ** 2 / ry ** 2 <= 1
    } else if (shape instanceof Line) {
    } else if (shape instanceof Polygon) {
        // raycasting algorithm
        const [x, y] = pt
        const pts = shape.pts

        var inside = false
        for (var i = 0, j = pts.length - 1; i < pts.length; j = i++) {
            var xi = pts[i][0],
                yi = pts[i][1]
            var xj = pts[j][0],
                yj = pts[j][1]

            var intersect = yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
            if (intersect) inside = !inside
        }
        return inside
    } else if (shape instanceof Polyline) {
    } else if (shape instanceof Rectangle) {
        const [x, y] = pt
        const [x0, y0] = shape.pos
        const [x1, y1] = shape.max

        return x >= x0 && x <= x1 && y >= y0 && y <= y1
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`)
}

/**
 * Resamples given 2D shape with given options and returns result as polygon (if
 * closed) or polyline (if open).
 *
 * @param shape
 * @param num
 */
export function resample(shape, num) {
    if (shape instanceof Arc) {
        const { pos, r, start, end } = shape
        const [cx, cy] = pos
        const delta = (end - start) / (num - 1)
        let pts = []
        for (let i = 0; i < num; i++) {
            const angle = start + i * delta
            pts.push([r * Math.cos(angle) + cx, r * Math.sin(angle) + cy])
        }
        return new Polyline(pts, shape.attribs)
    } else if (shape instanceof Circle) {
        const pos = shape.pos
        const r = shape.r
        const delta = (Math.PI * 2.0) / num
        let pts = []
        for (let i = 0; i < num; i++) {
            pts.push([r * Math.cos(i * delta) + pos[0], r * Math.sin(i * delta) + pos[1]])
        }
        return new Polyline(pts, shape.attribs)
    } else if (shape instanceof Ellipse) {
    } else if (shape instanceof Line) {
        let pts = []
        for (let i = 0; i < num; i++) {
            const t = i / (num - 1)
            pts.push(pointAt(shape, t))
        }
        return new Polyline(pts, shape.attribs)
    } else if (shape instanceof Polygon) {
    } else if (shape instanceof Polyline) {
    } else if (shape instanceof Rectangle) {
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`)
}

/**
 * Rotates given 2D shape by `theta` (in radians).
 *
 * @param shape
 * @param theta
 */
export function rotate(shape, theta) {
    if (Array.isArray(shape) && shape.length == 2) {
        const [x, y] = shape
        return [x * Math.cos(theta) - y * Math.sin(theta), x * Math.sin(theta) + y * Math.cos(theta)]
    } else if (shape instanceof Arc) {
    } else if (shape instanceof Circle) {
        const pt = shape.pos
        const newCenter = [
            pt[0] * Math.cos(theta) - pt[1] * Math.sin(theta),
            pt[0] * Math.sin(theta) + pt[1] * Math.cos(theta),
        ]
        return new Circle(newCenter, shape.r, shape.attribs)
    } else if (shape instanceof Ellipse) {
    } else if (shape instanceof Line) {
        // Rotating both endpoints of the line
        const [start, end] = shape.pts
        const newStart = [
            start[0] * Math.cos(theta) - start[1] * Math.sin(theta),
            start[0] * Math.sin(theta) + start[1] * Math.cos(theta),
        ]
        const newEnd = [
            end[0] * Math.cos(theta) - end[1] * Math.sin(theta),
            end[0] * Math.sin(theta) + end[1] * Math.cos(theta),
        ]
        return new Line(newStart, newEnd, shape.attribs)
    } else if (shape instanceof Polygon) {
        // rotate all points and make new polygon
        const newPts = shape.pts.map((pt) => [
            pt[0] * Math.cos(theta) - pt[1] * Math.sin(theta),
            pt[0] * Math.sin(theta) + pt[1] * Math.cos(theta),
        ])
        return new Polygon(newPts, shape.attribs)
    } else if (shape instanceof Polyline) {
    } else if (shape instanceof Rectangle) {
        // For a rectangle, rotate its corner points
        return rotate(new Polygon(asPoints(shape), shape.attribs), theta)
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`)
}

/**
 * Scales given shape uniformly or non-uniformly by given `factor`.
 *
 * @remarks
 * Scaling non-uniformly might result in different result types, e.g.
 * {@link Circle} => {@link Ellipse}.
 *
 * @param shape
 * @param factor - single number or [sx, sy] vector
 */
export function scale(shape, factor) {
    if (Array.isArray(factor)) {
        if (factor.length !== 2) {
            throw new Error('Factor must be a single number or a 2D vector [sx, sy]')
        }
    } else if (typeof factor !== 'number') {
        throw new Error('Factor must be a single number or a 2D vector [sx, sy]')
    }

    if (shape instanceof Arc) {
    } else if (shape instanceof Circle) {
        let sx, sy
        if (Array.isArray(factor)) {
            ;[sx, sy] = factor
        } else {
            sx = sy = factor
        }

        if (sx === sy) {
            // Uniform scaling
            const newRadius = shape.r * sx
            return new Circle(shape.pos, newRadius, shape.attribs)
        } else {
            // Non-uniform scaling
            const newRadii = [shape.r * sx, shape.r * sy]
            return new Ellipse(shape.pos, newRadii, 0, shape.attribs)
        }
    } else if (shape instanceof Ellipse) {
    } else if (shape instanceof Line) {
    } else if (shape instanceof Polygon) {
        let sx, sy
        if (Array.isArray(factor)) {
            ;[sx, sy] = factor
        } else {
            sx = sy = factor
        }

        const cent = centroid(shape)
        const scaledPoints = shape.pts.map(([x, y]) => [cent[0] + (x - cent[0]) * sx, cent[1] + (y - cent[1]) * sy])
        return new Polygon(scaledPoints, shape.attribs)
    } else if (shape instanceof Polyline) {
        let sx, sy
        if (Array.isArray(factor)) {
            ;[sx, sy] = factor
        } else {
            sx = sy = factor
        }

        const scaledPoints = shape.pts.map(([x, y]) => [x * sx, y * sy])
        return new Polyline(scaledPoints, shape.attribs)
    } else if (shape instanceof Rectangle) {
    } else if (shape instanceof Ray) {
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`)
}

/**
 * Splits given shape in 2 parts at normalized parametric position `t`.
 *
 * @param shape
 * @param t
 */
export function splitAt(shape, t) {
    if (shape instanceof Arc) {
    } else if (shape instanceof Circle) {
    } else if (shape instanceof Ellipse) {
    } else if (shape instanceof Line) {
        const [a, b] = asPoints(shape)
        const splitPt = pointAt(shape, t)
        return [new Line(a, splitPt, shape.attribs), new Line(splitPt, b, shape.attribs)]
    } else if (shape instanceof Polygon) {
    } else if (shape instanceof Polyline) {
    } else if (shape instanceof Rectangle) {
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`)
}

/**
 * Computes tangent on shape/boundary at normalized parametric position `t`.
 *
 * @param shape
 * @param t
 */
export function tangentAt(shape, t) {
    if (shape instanceof Arc) {
    } else if (shape instanceof Circle) {
        // circle: (_, t) => cossin(TAU * t + HALF_PI),
    } else if (shape instanceof Ellipse) {
    } else if (shape instanceof Line) {
        const [a, b] = shape.pts
        return normalize(sub(b, a))
    } else if (shape instanceof Polygon) {
    } else if (shape instanceof Polyline) {
    } else if (shape instanceof Quadratic) {
        const [start, ctrl, end] = shape.pts
        const bezier = new Bezier(start[0], start[1], ctrl[0], ctrl[1], end[0], end[1])
        const deriv = bezier.derivative(t)
        return [deriv.x, deriv.y]
    } else if (shape instanceof Ray) {
    } else if (shape instanceof Rectangle) {
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`)
}

// + transform() - apply transformation matrix
