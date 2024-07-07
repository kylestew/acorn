import { Line } from '../shapes/Line'
import { Rectangle } from '../shapes/Rectangle'
import { Circle } from '../shapes/Circle'
import { Polyline } from '../shapes/Polyline'
import { Polygon } from '../shapes/Polygon'
import { Arc, Ellipse } from '../shapes'

/**
 * Converts a geometric object to a Path2D object.
 *
 * @param shape
 *
 * @returns {Path2D} - The converted Path2D object.
 * @throws {Error} - If the conversion method is not implemented for the given geometric object.
 */
export function asPath(shape) {
    if (Array.isArray(shape)) {
        let paths = new Path2D()
        for (let element of shape) {
            paths.addPath(asPath(element))
        }
        return paths
    }

    let path = new Path2D()
    const typeName = shape.constructor.name

    switch (typeName) {
        case 'Arc': {
            const [x, y] = shape.pos
            path.arc(x, y, shape.r, shape.start, shape.end, shape.clockwise)
            break
        }

        case 'Circle': {
            const [x, y] = shape.pos
            path.arc(x, y, shape.r, 0, Math.PI * 2)
            break
        }

        case 'Ellipse':
            const [x, y] = shape.pos
            const [radX, radY] = shape.r
            path.ellipse(x, y, radX, radY, 0, 0, 2.0 * Math.PI)
            break

        case 'Polyline':
            shape.pts.forEach((pt, idx) => {
                let x, y
                if (Array.isArray(pt)) {
                    ;[x, y] = pt
                } else {
                    ;({ x, y } = pt)
                }
                if (idx === 0) {
                    path.moveTo(x, y)
                } else {
                    path.lineTo(x, y)
                }
            })
            break

        case 'Line':
            path.moveTo(shape.pts[0][0], shape.pts[0][1])
            path.lineTo(shape.pts[1][0], shape.pts[1][1])
            break

        case 'Polygon':
            shape.pts.forEach((pt, idx) => {
                const [x, y] = pt
                if (idx === 0) {
                    path.moveTo(x, y)
                } else {
                    path.lineTo(x, y)
                }
            })
            path.closePath()
            break

        case 'Quadratic':
            const [start, ctrl, dest] = shape.pts
            path.moveTo(start[0], start[1])
            path.quadraticCurveTo(ctrl[0], ctrl[1], dest[0], dest[1])
            break

        case 'Ray': {
            const [x, y] = shape.pos
            const [dx, dy] = shape.dir
            // Calculate a point far along the direction to simulate the "infinite" ray
            const length = 1000 // You can adjust this length as needed
            const endX = x + dx * length
            const endY = y + dy * length
            path.moveTo(x, y)
            path.lineTo(endX, endY)
            break
        }

        case 'Rectangle':
            path.rect(shape.pos[0], shape.pos[1], shape.size[0], shape.size[1])
            break

        default:
            throw new Error(`Method not implemented on ${typeName}`)
    }
    return path
}
