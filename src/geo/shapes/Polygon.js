export class Polygon {
    /**
     * Construct a Polygon object
     *
     * @constructor
     * @param {Array} pts - The points of the Polygon object.
     */
    constructor(pts, attribs = {}) {
        this.pts = pts
        this.attribs = attribs
    }
}
