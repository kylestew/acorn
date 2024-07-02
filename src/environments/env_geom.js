/* === TYPES === */
// import {
//     // Arc,
//     // Circle,
//     // circle,
//     // // (Cubic)
//     // Ellipse,
//     // // (Group)
//     // Line,
//     // line,
//     // // Path
//     // Polygon,
//     // Polyline,
//     // Quadratic,
//     // Ray,
//     // Rectangle,
//     // rectangle,
// } from '../geo/shapes'

import { Line } from '../geo/shapes/Line'
import { Grid } from '../geo/extended/grid'

/* === OPS === */
// all ops take geo data as the first argument and are threadable
import {
    // area,
    // asPath, // convert shape to Path2D
    asPoints, // convert shape to its vertices
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

import { selectedPalette } from '../color/palettes'

export function installOnEnv(installFn) {
    installFn(Line, 'geo', 'geo/shapes/Line.js', 'Line([pt1, pt2], attribs={}) :: A line segment.')

    installFn(
        Grid,
        'geo',
        'geo/extended/grid.js',
        'Grid([pos], [size], rows, cols) :: A grid object with helper methods.'
    )

    installFn(
        asPoints,
        'geo.ops',
        'geo/ops.js',
        "asPoints(shape, num) :: Samples vertices from a given shape's boundary"
    )
    installFn(pointAt, 'geo.ops', 'geo/ops.js', 'pointAt(shape, t) :: Samples a point on the boundary of a shape')

    selectedPalette.name = 'palette'
    installFn(selectedPalette, 'assets', 'color/palettes.js')
}
