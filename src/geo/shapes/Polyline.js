export class Polyline {
    /**
     * Construct a Polyline object
     *
     * @constructor
     * @param {Array} pts - The points of the Polyline object.
     */
    constructor(pts, attribs = {}) {
        this.pts = pts
        this.attribs = attribs
    }
}
