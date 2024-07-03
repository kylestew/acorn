export class Circle {
    /**
     * Creates a Circle shape
     *
     * @constructor
     * @param {Object} center - The position of the Circle.
     * @param {number} r - The radius of the Circle.
     */
    constructor(center, r, attribs = {}) {
        this.pos = center
        this.r = r
        this.attribs = attribs
    }
}
