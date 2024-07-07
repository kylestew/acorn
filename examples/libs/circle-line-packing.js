class CircleLinePacking {
    constructor(obstacles = []) {
        this.obstacles = obstacles
        this.packed = []
    }

    attemptPlacement(shape, stepSize, maxSize) {
        let targetShape = shape
        let placedShape = undefined
        while ([...this.obstacles, ...this.packed].every((otherShape) => !intersects(targetShape, otherShape))) {
            placedShape = targetShape

            if (targetShape instanceof Circle) {
                if (targetShape.r >= maxSize) {
                    break
                }
                targetShape = new Circle(targetShape.pos, targetShape.r + stepSize)
            } else if (targetShape instanceof Line) {
                const length = targetShape.length
                if (length >= maxSize) {
                    break
                }
                // make a new line with the same angle and center point but extended by stepSize
                targetShape = Line.withCenter(targetShape.centerPt, targetShape.angle, length + stepSize)
            }
        }
        if (placedShape !== undefined) {
            this.packed.push(placedShape)
            return placedShape
        }
        return undefined
    }
}
