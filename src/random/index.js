/**
 * Generates a random number between the specified minimum and maximum values.
 * If only one argument is provided, it is assumed to be the maximum value and the minimum value is set to 0.
 *
 * @param {number} [min=0] - The minimum value (inclusive). Defaults to 0 if not provided.
 * @param {number} [max=1] - The maximum value (exclusive). Defaults to 1 if not provided.
 * @returns {number} - A random number between min and max.
 */
function random(min = 0, max = 1) {
    if (arguments.length === 1) {
        // assume the user passed in a max value
        max = min
        min = 0
    }
    // Return a random number between min and max
    return Math.random() * (max - min) + min
}
random.docs = {
    header: 'random(min = 0, max = 1)',
    body: 'Returns a random float between `min` and `max`.',
}
export { random }

/**
 * Generates a random integer between the specified minimum and maximum values.
 * The minimum value is inclusive, while the maximum value is exclusive.
 *
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (exclusive).
 * @returns {number} The random integer generated.
 */
function randomInt(min, max) {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) // The maximum is exclusive and the minimum is inclusive
}
randomInt.docs = {
    header: 'randomInt(min, max)',
    body: 'Returns a random integer between `min` and `max`.',
}
export { randomInt }

/**
 * Generates a random boolean value.
 * @returns {boolean} A random boolean value.
 */
function randomBool(probability = 0.5) {
    return Math.random() < probability
}
randomBool.docs = {
    header: 'randomBool(probability = 0.5)',
    body: 'Returns a random boolean value.',
}
export { randomBool }

/**
 * Picks a random unique element or elements from an array.
 *
 * @param {Array} arr - The array to pick elements from.
 * @param {number} [num=1] - The number of elements to pick. Defaults to 1 if not provided.
 * @returns {Array} - An array containing the randomly picked unique element(s).
 */
function pickRandom(arr, num = 1) {
    if (arr.length === 0) {
        throw new Error('Array is empty')
    }
    if (num > arr.length) {
        throw new Error('Number of elements to pick exceeds array length')
    }
    const pickedElements = []
    const availableIndices = Array.from(Array(arr.length).keys()) // Create an array of indices from 0 to arr.length - 1
    for (let i = 0; i < num; i++) {
        const randomIndex = Math.floor(Math.random() * availableIndices.length)
        const pickedIndex = availableIndices.splice(randomIndex, 1)[0] // Remove the picked index from availableIndices and get its value
        pickedElements.push(arr[pickedIndex])
    }

    if (num === 1) {
        return pickedElements[0]
    }
    return pickedElements
}
pickRandom.docs = {
    header: 'pickRandom(arr, num = 1)',
    body: 'Returns a random number of elements from given array.',
}
export { pickRandom }

/**
 * Generates a random point within a specified range.
 *
 * @param {Array<number>} [min=[0, 0]] - The minimum values for x and y coordinates.
 * @param {Array<number>} [max=[1, 1]] - The maximum values for x and y coordinates.
 * @returns {Array<number>} The randomly generated point as an array of [x, y] coordinates.
 */
function randomPoint(min = [0, 0], max = [1, 1]) {
    if (arguments.length === 1) {
        // assume the user passed in a max value
        max = min
        min = [0, 0] // Set min to the origin if only one argument is provided
    }

    // Return a random point where each component is calculated separately
    const x = Math.random() * (max[0] - min[0]) + min[0]
    const y = Math.random() * (max[1] - min[1]) + min[1]
    return [x, y]
}
randomPoint.docs = {
    header: 'randomPoint(min = [0, 0], max = [1, 1])',
    body: 'Returns a random point within the specified range.',
}
export { randomPoint }

/**
 * Generates a random offset within the specified range.
 *
 * @param {number} maxX - The maximum value for the X-axis.
 * @param {number} [maxY=maxX] - The maximum value for the Y-axis. If not provided, it defaults to the value of maxX.
 * @returns {number[]} An array containing the random X and Y offsets.
 */
function randomOffset(maxX, maxY) {
    if (arguments.length === 1) {
        maxY = maxX
    }
    return [random(-maxX, maxX), random(-maxY, maxY)]
}
randomOffset.docs = {
    header: 'randomOffset(maxX, maxY = maxX)',
    body: 'Generates a random offset within the specified range.',
}
export { randomOffset }

/**
 * Generates a random element from a target array based on an array of weights.
 *
 * @param {Array<any>} targetArray - The array of elements to pick from.
 * @param {Array<number>} weights - The array of weights.
 * @returns {any} - The selected element from the target array.
 * @throws {Error} - If the lengths of the target array and weights array do not match.
 */
function weightedRandom(targetArray, weights) {
    if (targetArray.length !== weights.length) {
        throw new Error('Target array and weights array must have the same length')
    }

    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)
    const randomValue = Math.random() * totalWeight
    let cumulativeWeight = 0

    for (let i = 0; i < weights.length; i++) {
        cumulativeWeight += weights[i]
        if (randomValue < cumulativeWeight) {
            return targetArray[i]
        }
    }

    throw new Error('Unable to determine weighted random index')
}
weightedRandom.docs = {
    header: 'weightedRandom(targetArray, weights)',
    body: 'Generates a random element from a target array based on an array of weights.',
}
export { weightedRandom }

// Function to generate a normally distributed random number
function boxMullerTransform() {
    let u = 0,
        v = 0
    while (u === 0) u = Math.random() // Converting [0,1) to (0,1)
    while (v === 0) v = Math.random()
    let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
    return z
}

/**
 * Calculates a random number from a Gaussian distribution.
 *
 * @param {number} mean - The mean value of the distribution.
 * @param {number} stdDev - The standard deviation of the distribution.
 * @returns {number} The random number from the Gaussian distribution.
 */
function gaussian(mean, stdDev) {
    return mean + stdDev * boxMullerTransform()
}
gaussian.docs = {
    header: 'gaussian(mean, stdDev)',
    body: 'Calculates a random number from a Gaussian distribution.',
}
export { gaussian }

/**
 * Generates a random number following the Pareto distribution.
 * @param {number} xm - The minimum possible value (scale parameter).
 * @param {number} alpha - The shape parameter.
 * @returns {number} - A random number following the Pareto distribution.
 */
function pareto(xm, alpha) {
    const uniformRandom = Math.random() // Generates a uniform random number between 0 and 1
    return xm / Math.pow(uniformRandom, 1 / alpha)
}
pareto.docs = {
    header: 'pareto(xm, alpha)',
    body: 'Generates a random number following the Pareto distribution.',
}
export { pareto }
