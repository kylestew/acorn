/**
 * Maps a value from one range to another range.
 *
 * @param {number} value - The value to be mapped.
 * @param {number} low1 - The lower bound of the input range.
 * @param {number} high1 - The upper bound of the input range.
 * @param {number} low2 - The lower bound of the output range.
 * @param {number} high2 - The upper bound of the output range.
 * @returns {number} The mapped value.
 */
function mapRange(value, low1, high1, low2, high2) {
    // Calculate the ratio of the difference between the value and low1
    // to the total range (high1 - low1)
    let ratio = (value - low1) / (high1 - low1)

    // Apply the ratio to the new range (high2 - low2) and add the low2
    // to scale and shift the value appropriately
    return ratio * (high2 - low2) + low2
}
mapRange.docs = 'mapRange(value, low1, high1, low2, high2) :: Maps a value from one range to another.'
export { mapRange }

// /**
//  * Maps a point [x, y] from one range to another range.
//  *
//  * @param {Array<number>} point - The point [x, y] to be mapped.
//  * @param {Array<number>} inputRangeX - The lower and upper bounds of the input range for x.
//  * @param {Array<number>} inputRangeY - The lower and upper bounds of the input range for y.
//  * @param {Array<number>} outputRangeX - The lower and upper bounds of the output range for x.
//  * @param {Array<number>} outputRangeY - The lower and upper bounds of the output range for y.
//  * @returns {Array<number>} The mapped point [x, y].
//  */
// export function mapRange2D(point, inputRangeX, inputRangeY, outputRangeX, outputRangeY) {
//     const [x, y] = point
//     const [low1X, high1X] = inputRangeX
//     const [low1Y, high1Y] = inputRangeY
//     const [low2X, high2X] = outputRangeX
//     const [low2Y, high2Y] = outputRangeY

//     const ratioX = (x - low1X) / (high1X - low1X)
//     const ratioY = (y - low1Y) / (high1Y - low1Y)

//     const mappedX = ratioX * (high2X - low2X) + low2X
//     const mappedY = ratioY * (high2Y - low2Y) + low2Y

//     return [mappedX, mappedY]
// }

// export function lerp(a, b, t) {
//     return a + (b - a) * t
// }

/**
 * === MATH UTILS ===
 *
 * mapRange - maps a value from one range to another
 * lerpPt - linearly interpolates between two points
 * clamp - clamps a value between a minimum and maximum
 */

/**
 * Linearly interpolates between two points.
 *
 * @param {number[]} pt1 - The first point.
 * @param {number[]} pt2 - The second point.
 * @param {number} pct - The interpolation percentage (between 0 and 1).
 * @returns {number[]} The interpolated point.
 */
function lerpPt(pt1, pt2, pct) {
    return [pt1[0] + (pt2[0] - pt1[0]) * pct, pt1[1] + (pt2[1] - pt1[1]) * pct]
}
lerpPt.docs = 'lerpPt(pt1, pt2, pct) :: Linearly interpolates between two points.'
export { lerpPt }

// /**
//  * Calculates the midpoint between two points.
//  *
//  * @param {number[]} pt1 - The first point, represented as an array of two numbers.
//  * @param {number[]} pt2 - The second point, represented as an array of two numbers.
//  * @returns {number[]} The midpoint between pt1 and pt2, represented as an array of two numbers.
//  */
// export function midPt(pt1, pt2) {
//     return [(pt1[0] + pt2[0]) / 2, (pt1[1] + pt2[1]) / 2]
// }

// /**
//  * Clamps a value between a minimum and maximum.
//  *
//  * @param {number} value - The value to be clamped.
//  * @param {number} min - The minimum value.
//  * @param {number} max - The maximum value.
//  * @returns {number} The clamped value.
//  */
// export function clamp(value, min = 0, max = 1) {
//     return Math.min(Math.max(value, min), max)
// }
