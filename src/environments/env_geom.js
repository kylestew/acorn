/* === SHAPES === */
import { Line } from '../geo/shapes/Line'
import { Rectangle } from '../geo/shapes/Rectangle'
import { Circle } from '../geo/shapes/Circle'
import { Polyline } from '../geo/shapes/Polyline'
import { Polygon } from '../geo/shapes/Polygon'
// extended
import { Grid } from '../geo/extended/grid'
import { Sprite } from '../geo/extended/sprite'

/* === OPS === */
//  area,
// asPolygon, // convert shape to polygon(s)
// // asPolyline - convert shape to polyline(s)
// bounds,
// center, // center shape around origin or point
// centerRotate, // center shape around origin point
// closestPoint, // find closest point on shape boundary
// edges, // extract edges
// // fitIntoBounds() - rescale/reposition shapes into a destination boundary
// normalAt,
// pointInside, // check if point inside shape
// resample, // resample/convert shape
// rotate,
// scale, // scale shape
// splitAt, // split shape/boundary at parametric position
// tangentAt, // compute tangent at parametric position
// // transform() - apply transformation matrix
// translate,
import { asPath } from '../geo/ops/asPath'
import { asPoints } from '../geo/ops/asPoints'
import { centroid } from '../geo/ops/centroid'
import { intersects } from '../geo/ops/intersects'
import { offset } from '../geo/ops/offset'
import { pointAt } from '../geo/ops/pointAt'
import { scatter } from '../geo/ops/scatter'
import { withAttribs } from '../geo/ops/withAttribs'

export function installOnEnv(installFn) {
    // shapes
    installFn(Line, 'geo', 'geo/shapes/Line.js', {
        header: 'Line([pt1, pt2], attribs={})',
        body: 'A line segment.',
    })
    installFn(Rectangle, 'geo', 'geo/shapes/Rectangle.js', {
        header: 'Rectangle(pos, size, attribs={})',
        body: 'A rectangle.',
    })
    installFn(Circle, 'geo', 'geo/shapes/Circle.js', { header: 'Circle(center, r, attribs={})', body: 'A circle.' })
    installFn(Polyline, 'geo', 'geo/shapes/Polyline.js', {
        header: 'Polyline(pts, attribs={})',
        body: 'A polyline (open polygon).',
    })
    installFn(Polygon, 'geo', 'geo/shapes/Polygon.js', {
        header: 'Polygon(pts, attribs={})',
        body: 'A closed polygon.',
    })

    // extended
    installFn(Grid, 'geo', 'geo/extended/grid.js', {
        header: 'Grid([pos], [size], rows, cols)',
        body: 'A grid object with helper methods.',
    })
    installFn(Sprite, 'geo', 'geo/extended/sprite.js', {
        header: 'async Sprite.create(src)',
        body: 'Creates a new sprite object from an image source (loads async).',
    })

    // ops
    installFn(asPath, 'geo.ops', 'geo/ops/asPath.js', {
        header: 'asPath(shape)',
        body: 'Converts a geometric object to a Path2D object.',
    })
    installFn(asPoints, 'geo.ops', 'geo/ops/asPoints.js', {
        header: 'asPoints(shape, num)',
        body: "Samples vertices from a given shape's boundary",
    })
    installFn(centroid, 'geo.ops', 'geo/ops/centroid.js', {
        header: 'centroid(shape)',
        body: 'Computes centroid (center point) of given shape',
    })
    installFn(intersects, 'geo.ops', 'geo/ops/intersects.js', {
        header: 'intersects(a, b)',
        body: 'Pairwise shape intersection (various types)',
    })
    installFn(offset, 'geo.ops', 'geo/ops/offset.js', {
        header: 'offset(shape, dist)',
        body: 'Computes an offset shape (as in "path offsetting") of given shape and offset distance `dist`.',
    })
    installFn(pointAt, 'geo.ops', 'geo/ops/pointAt.js', {
        header: 'pointAt(shape, t)',
        body: 'Samples a point on the boundary of a shape',
    })
    installFn(scatter, 'geo.ops', 'geo/ops/scatter.js', {
        header: 'scatter(shape, num)',
        body: 'Produces `num` random points in the given shape.',
    })
    installFn(withAttribs, 'geo.ops', 'geo/ops/withAttribs.js', {
        header: 'withAttribs(shape, attribs)',
        body: 'Shallow copy of given shape with new attribs assigned',
    })
}
