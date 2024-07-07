/**
 * Calculates the intersection points of a circle and a line segment.
 *
 * @param {Object} circle - The circle.
 * @param {Object} line - The line segment.
 * @returns {Array|null} - The intersection points [[x1, y1], [x2, y2]] or null if no intersection.
 */
export function circleLineIntersection(circle, line) {
    const [cx, cy] = circle.pos
    const { r } = circle
    const [x1, y1] = line.pts[0]
    const [x2, y2] = line.pts[1]

    // Calculate line segment vector
    const dx = x2 - x1
    const dy = y2 - y1

    // Calculate the coefficients of the quadratic equation
    const A = dx * dx + dy * dy
    const B = 2 * (dx * (x1 - cx) + dy * (y1 - cy))
    const C = (x1 - cx) * (x1 - cx) + (y1 - cy) * (y1 - cy) - r * r

    // Calculate the discriminant
    const discriminant = B * B - 4 * A * C

    const intersections = []

    if (discriminant >= 0) {
        // Calculate the parameter t for the intersections
        const t1 = (-B + Math.sqrt(discriminant)) / (2 * A)
        const t2 = (-B - Math.sqrt(discriminant)) / (2 * A)

        // Check if the intersections are within the line segment
        if (t1 >= 0 && t1 <= 1) {
            intersections.push([x1 + t1 * dx, y1 + t1 * dy])
        }
        if (t2 >= 0 && t2 <= 1) {
            intersections.push([x1 + t2 * dx, y1 + t2 * dy])
        }
    }

    // Check if the line originates inside the circle
    const distStartToCenter = Math.sqrt((x1 - cx) * (x1 - cx) + (y1 - cy) * (y1 - cy))
    if (distStartToCenter < r) {
        // If the start point of the line is inside the circle, consider it an intersection
        intersections.push([x1, y1])
    }

    return intersections.length > 0 ? intersections : null
}

/**
 * Calculates the intersection points of a ray and a line segment.
 *
 * @param {Object} ray - The ray.
 * @param {Object} line - The line segment.
 * @returns {Array|null} - The intersection point [x, y] or null if no intersection.
 */
export function rayLineIntersection(ray, line) {
    const [rx, ry] = ray.pos
    const [rdx, rdy] = ray.dir
    const [x1, y1] = line.pts[0]
    const [x2, y2] = line.pts[1]

    // Calculate the denominator
    const denom = rdx * (y1 - y2) - rdy * (x1 - x2)
    if (denom === 0) {
        return null // Lines are parallel or coincident
    }

    // Calculate the numerators for the parameters t and u
    const tNumer = (rx - x1) * (y1 - y2) - (ry - y1) * (x1 - x2)
    const uNumer = (rx - x1) * rdy - (ry - y1) * rdx

    // Calculate the parameters t and u
    const t = tNumer / denom
    const u = -uNumer / denom

    // Check if the intersection is within the ray and line segment
    if (t >= 0 && u >= 0 && u <= 1) {
        // Calculate the intersection point
        const intersectionX = rx + t * rdx
        const intersectionY = ry + t * rdy
        return [intersectionX, intersectionY]
    }

    // No valid intersection
    return null
}

/**
 * Calculates the intersection point of two line segments.
 *
 * @param {Object} line1 - The first line segment.
 * @param {Object} line2 - The second line segment.
 * @returns {Array|null} - The intersection point [x, y] or null if no intersection.
 */
export function lineLineIntersection(line1, line2) {
    const [x1, y1] = line1.pts[0]
    const [x2, y2] = line1.pts[1]
    const [x3, y3] = line2.pts[0]
    const [x4, y4] = line2.pts[1]

    // Calculate the denominator
    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
    if (denom === 0) {
        return null // Lines are parallel or coincident
    }

    // Calculate the numerators for the parameters t and u
    const tNumer = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)
    const uNumer = (x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)

    // Calculate the parameters t and u
    const t = tNumer / denom
    const u = uNumer / denom

    // Check if the intersection is within the line segments
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        // Calculate the intersection point
        const intersectionX = x1 + t * (x2 - x1)
        const intersectionY = y1 + t * (y2 - y1)
        return [intersectionX, intersectionY]
    }

    // No valid intersection
    return null
}
