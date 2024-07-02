export class Line {
    /**
     * Represents a line segment in a geometric space.
     *
     * @constructor
     * @param {Array<number>|Array<number[]>} pt1 - The starting point of the line segment or an array containing both points.
     * @param {Array<number>|Object} [pt2] - The ending point of the line segment or attributes.
     * @param {Object} [attribs={}] - Optional attributes for the line.
     */
    constructor(pt1, pt2, attribs = {}) {
        if (Array.isArray(pt1) && Array.isArray(pt2)) {
            // If pt1 and pt2 are both arrays, they are the points
            this.pts = [pt1, pt2]
            this.attribs = attribs
        } else if (Array.isArray(pt1) && pt1.length === 2 && Array.isArray(pt1[0]) && Array.isArray(pt1[1])) {
            // If pt1 is an array containing two points
            this.pts = pt1
            this.attribs = pt2 || {}
        } else {
            throw new Error('Invalid arguments for Line constructor')
        }

        // Validate points
        this.pts.forEach((pt) => {
            if (!Array.isArray(pt) || pt.length !== 2 || !pt.every(Number.isFinite)) {
                throw new Error('Points must be arrays of two finite numbers')
            }
        })
    }

    /**
     * Creates a new Line object with the specified center, angle, size, and attributes.
     * @param {Array<number>} center - The coordinates of the midpoint of the line.
     * @param {number} angle - The angle of rotation for the line (radians).
     * @param {number} length - The length of the line.
     * @param {Object} [attribs={}] - Additional attributes
     * @returns {Line} A new Line object.
     */
    static withCenter(center, angle, length, attribs = {}) {
        if (!Array.isArray(center) || center.length !== 2 || !center.every(Number.isFinite)) {
            throw new Error('Center must be an array of two finite numbers')
        }
        if (typeof angle !== 'number' || typeof length !== 'number') {
            throw new Error('Angle and length must be numbers')
        }

        const [cx, cy] = center
        const halfLength = length / 2

        // Calculate the start and end points of the line
        const startX = cx - halfLength * Math.cos(angle)
        const startY = cy - halfLength * Math.sin(angle)
        const endX = cx + halfLength * Math.cos(angle)
        const endY = cy + halfLength * Math.sin(angle)

        const start = [startX, startY]
        const end = [endX, endY]

        return new Line(start, end, attribs)
    }

    get length() {
        const [startX, startY] = this.pts[0]
        const [endX, endY] = this.pts[1]
        const dx = endX - startX
        const dy = endY - startY
        return Math.sqrt(dx * dx + dy * dy)
    }

    get centerPt() {
        const [startX, startY] = this.pts[0]
        const [endX, endY] = this.pts[1]
        return [(startX + endX) / 2, (startY + endY) / 2]
    }

    get angle() {
        const [startX, startY] = this.pts[0]
        const [endX, endY] = this.pts[1]
        return Math.atan2(endY - startY, endX - startX)
    }
}
