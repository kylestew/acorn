export class Arc {
    /**
     * Creates an Arc object
     *
     * @constructor
     * @param {Object} pos - The position of the object.
     * @param {number} r - The radius of the object.
     * @param {number} start - The starting angle of the object.
     * @param {number} end - The ending angle of the object.
     * @param {boolean} [clockwise=false] - Indicates whether the object is drawn in a clockwise direction.
     */
    constructor(pos, r, start, end, clockwise = false, attribs = {}) {
        this.pos = pos
        this.r = r
        this.start = start
        this.end = end
        this.clockwise = clockwise
        this.attribs = attribs
    }

    /**
     * Calculates the length of the arc
     *
     * @returns {number} The length of the arc
     */
    arcLength() {
        let deltaAngle = this.end - this.start

        // Normalize deltaAngle to be within the range [0, 2 * Math.PI]
        if (deltaAngle < 0) {
            deltaAngle += 2 * Math.PI
        }

        // If the arc is drawn in a clockwise direction, adjust the deltaAngle
        if (this.clockwise) {
            deltaAngle = 2 * Math.PI - deltaAngle
        }

        // Calculate the arc length
        return this.r * deltaAngle
    }
}

export class Ellipse {
    /**
     * Creates an Ellipse object
     *
     * @constructor
     * @param {[x, y]} pos - The position of the ellipse.
     * @param {[r1, r2]} r - The radius of the ellipse.
     */
    constructor(pos, r, attribs = {}) {
        this.pos = pos
        this.r = r
        this.attribs = attribs
    }
}

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

export class Ray {
    /**
     * Represents a shape object.
     * @constructor
     * @param {Vec} pos - The position of the shape.
     * @param {Vec} dir - The direction of the shape.
     * @param {Object} [attribs={}] - Additional attributes of the shape.
     */
    constructor(pos, dir, attribs = {}) {
        this.pos = pos
        this.dir = dir
        this.attribs = attribs
    }
}
