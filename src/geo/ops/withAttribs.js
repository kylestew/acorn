import { Line } from '../shapes/Line'
import { Rectangle } from '../shapes/Rectangle'
import { Circle } from '../shapes/Circle'
import { Polyline } from '../shapes/Polyline'
import { Polygon } from '../shapes/Polygon'
import { Arc, Ellipse } from '../shapes'

/**
 * Creates a new shape object with the specified attributes.
 * @param {Shape} shape - The shape object to apply attributes to.
 * @param {Object} attribs - The attributes to apply to the shape.
 * @returns {Shape} - The new shape object with the applied attributes.
 * @throws {Error} - If the method is not implemented on the given shape object.
 */
export function withAttribs(shape, attribs) {
    if (shape instanceof Arc) {
    } else if (shape instanceof Circle) {
        return new Circle(shape.pos, shape.r, attribs)
    } else if (shape instanceof Ellipse) {
    } else if (shape instanceof Line) {
        return new Line(shape.pts, attribs)
    } else if (shape instanceof Polygon) {
        return new Polygon(shape.pts, attribs)
    } else if (shape instanceof Polyline) {
    } else if (shape instanceof Rectangle) {
        return new Rectangle(shape.pos, shape.size, attribs)
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`)
}
