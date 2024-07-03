export class Rectangle {
    /**
     * Represents a Geo object.
     * @constructor
     * @param {Object} pos - The position of the Geo object.
     * @param {Object} size - The size of the Geo object.
     */
    constructor(center, size, attribs = {}) {
        this.pos = center
        this.size = size
        this.attribs = attribs
    }

    /**
     * Creates a new `Rect` object from a center point and size.
     *
     * @param {Array<number>} center - The center point of the rectangle.
     * @param {Array<number>} size - The size of the rectangle as an array of width and height.
     * @returns {Rect} A new `Rect` object.
     */
    static withCenter(center, size, attribs = {}) {
        const halfWidth = size[0] / 2
        const halfHeight = size[1] / 2
        const pos = [center[0] - halfWidth, center[1] - halfHeight]
        return new Rectangle(pos, size, attribs)
    }

    /**
     * Creates a rectangle with a specified center, size, inset, and attributes.
     *
     * @param {Array<number>} center - The center coordinates of the rectangle.
     * @param {Array<number>} size - The size of the rectangle (width and height).
     * @param {number} inset - The inset value for the rectangle (how much to shrink)
     * @param {Object} attribs - Additional attributes for the rectangle (optional).
     * @returns {Rectangle} The created rectangle object.
     */
    static withCenterAndInset(center, size, inset, attribs = {}) {
        const newSize = [size[0] - 2 * inset, size[1] - 2 * inset]
        const halfWidth = newSize[0] / 2
        const halfHeight = newSize[1] / 2
        const pos = [center[0] - halfWidth, center[1] - halfHeight]
        return new Rectangle(pos, newSize, attribs)
    }

    get pts() {
        const [x0, y0] = this.pos
        const [x1, y1] = this.max
        return [
            [x0, y0],
            [x1, y0],
            [x1, y1],
            [x0, y1],
        ]
    }

    /**
     * Returns the maximum coordinates of the shape.
     * @returns {number[]} An array containing the maximum coordinates [x, y].
     */
    get max() {
        return [this.pos[0] + this.size[0], this.pos[1] + this.size[1]]
    }
}
