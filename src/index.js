/* === TYPES === */
export {
    Arc,
    Circle,
    circle,
    // (Cubic)
    Ellipse,
    // (Group)
    Line,
    line,
    // Path
    Polygon,
    Polyline,
    Quadratic,
    Ray,
    Rectangle,
    rectangle,
} from './geo/shapes'
export { Grid } from './geo/extended/grid'

/* === OPS === */
// all ops take geo data as the first argument and are threadable
export {
    area,
    asPath, // convert shape to Path2D
    asPoints, // convert shape to its vertices
    asPolygon, // convert shape to polygon(s)
    // asPolyline - convert shape to polyline(s)
    bounds,
    center, // center shape around origin or point
    centerRotate, // center shape around origin point
    centroid, // computer shape centroid
    closestPoint, // find closest point on shape boundary
    edges, // extract edges
    // fitIntoBounds() - rescale/reposition shapes into a destination boundary
    intersects, // pairwise shape intersection (various types)
    normalAt,
    offset, // shape/path offsetting
    pointAt, // compute point on shape boundary at parametric position
    pointInside, // check if point inside shape
    resample, // resample/convert shape
    rotate,
    scale, // scale shape
    scatter,
    splitAt, // split shape/boundary at parametric position
    tangentAt, // compute tangent at parametric position
    // transform() - apply transformation matrix
    translate,
    withAttribs, // shallow copy of given shape with new attribs assigned
} from './geo/ops'

export { random, randomInt, randomBool, pickRandom } from './random'

import { selectedPalette } from './color/palettes'
// acorn.env('sketch-2d', { width: 800, height: 800, range: [-1, 1] })
import { createCanvas } from './canvas-utils/canvas-util'

export function env(type, params) {
    const { width, height, range } = params
    const ctx = createCanvas(width, height)
    ctx.setRange(range[0], range[1])

    console.log('ENV', type, width, height, range, ctx)
    window.draw = ctx.draw
    window.clear = ctx.clear

    window.palette = selectedPalette
}
