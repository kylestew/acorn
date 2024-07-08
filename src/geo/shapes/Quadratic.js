export class Quadratic {
    /**
     * Represents a quadratic curve.
     *
     * @constructor
     * @param {Array|Array[]} a - The starting point of the curve (or all points of the curve).
     * @param {Array|Object} b - The control point of the curve.
     * @param {Array|Object} c - The ending point of the curve
     * @param {Object} [attribs={}] - Optional attributes for the curve.
     */
    constructor(a, b, c, attribs = {}) {
        if (Array.isArray(a) && Array.isArray(b) && Array.isArray(c)) {
            this.pts = [a, b, c]
            this.attribs = attribs
        } else if (
            Array.isArray(a) &&
            a.length === 3 &&
            Array.isArray(a[0]) &&
            Array.isArray(a[1]) &&
            Array.isArray(a[2])
        ) {
            this.pts = a
            this.attribs = b || {}
        } else {
            throw new Error('Invalid arguments for Line constructor')
        }
    }
}
