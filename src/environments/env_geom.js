/* === SHAPES === */
import { Line } from '../geo/shapes/Line'
import { Rectangle } from '../geo/shapes/Rectangle'
import { Circle } from '../geo/shapes/Circle'
import { Polyline } from '../geo/shapes/Polyline'
import { Polygon } from '../geo/shapes/Polygon'
import { Grid } from '../geo/extended/grid'

/* === OPS === */
// all ops take geo data as the first argument and are threadable
import {
    // area,
    // asPath, // convert shape to Path2D
    // asPolygon, // convert shape to polygon(s)
    // // asPolyline - convert shape to polyline(s)
    // bounds,
    // center, // center shape around origin or point
    // centerRotate, // center shape around origin point
    // centroid, // computer shape centroid
    // closestPoint, // find closest point on shape boundary
    // edges, // extract edges
    // // fitIntoBounds() - rescale/reposition shapes into a destination boundary
    // intersects, // pairwise shape intersection (various types)
    // normalAt,
    // offset, // shape/path offsetting
    pointAt, // compute point on shape boundary at parametric position
    // pointInside, // check if point inside shape
    // resample, // resample/convert shape
    // rotate,
    // scale, // scale shape
    // scatter,
    // splitAt, // split shape/boundary at parametric position
    // tangentAt, // compute tangent at parametric position
    // // transform() - apply transformation matrix
    // translate,
    // withAttribs, // shallow copy of given shape with new attribs assigned
} from '../geo/ops'
import { asPoints } from '../geo/ops/asPoints'

export function installOnEnv(installFn) {
    installFn(Line, 'geo', 'geo/shapes/Line.js', 'Line([pt1, pt2], attribs={}) :: A line segment.')
    installFn(Rectangle, 'geo', 'geo/shapes/Rectangle.js', 'Rectangle(pos, size, attribs={}) :: A rectangle.')
    installFn(Circle, 'geo', 'geo/shapes/Circle.js', 'Circle(center, r, attribs={}) :: A circle.')
    installFn(Polyline, 'geo', 'geo/shapes/Polyline.js', 'Polyline(pts, attribs={}) :: A polyline (open polygon).')
    installFn(Polygon, 'geo', 'geo/shapes/Polygon.js', 'Polygon(pts, attribs={}) :: A closed polygon.')

    installFn(
        Grid,
        'geo',
        'geo/extended/grid.js',
        'Grid([pos], [size], rows, cols) :: A grid object with helper methods.'
    )

    installFn(
        asPoints,
        'geo.ops',
        'geo/ops/asPoints.js',
        "asPoints(shape, num) :: Samples vertices from a given shape's boundary"
    )
    installFn(pointAt, 'geo.ops', 'geo/ops.js', 'pointAt(shape, t) :: Samples a point on the boundary of a shape')
}
