window.meta = {
    title: 'Distributions',
    description: '',
    refLink: '',
}

export function remapToRect(pts, rect, clip = false) {
    const [x0, y0] = rect.pos
    const [x1, y1] = rect.max
    return pts
        .map(([x, y]) => {
            const remappedX = mapRange(x, 0, 1, x0, x1)
            const remappedY = mapRange(y, 0, 1, y0, y1)
            if (clip) {
                if (remappedX < x0 || remappedX > x1 || remappedY < y0 || remappedY > y1) {
                    return null // Drop the item
                } else {
                    return [remappedX, remappedY]
                }
            } else {
                return [remappedX, remappedY] // Just pass the value
            }
        })
        .filter((item) => item !== null) // Filter out dropped items
}

function uniform1D(count) {
    return full(count, () => random(0, 1))
}
function uniform2D(count) {
    return full(count, () => [random(0, 1), random(0, 1)])
}

function gaussian1D(count, center, stdDev) {
    return full(count, () => gaussian(center, stdDev))
}
function gaussian2D(count, center, stdDev) {
    return full(count, () => [gaussian(center[0], stdDev[0]), gaussian(center[1], stdDev[1])])
}

function pareto1D(count, xm, alpha) {
    return full(count, () => pareto(xm, alpha))
}
function pareto2D(count, xm, alpha) {
    return full(count, () => [pareto(xm[0], alpha[0]), pareto(xm[1], alpha[1])])
}

function noise2D(count, noiseScale, zOffset, noiseFloor) {
    const placed = []
    while (placed.length < count) {
        // get a uniform random point in the space
        const [x, y] = uniform2D(1)[0]

        // put through noise function to determine probability of placement
        const probability = mapRange(simplex3(x * noiseScale[0], y * noiseScale[1], zOffset), -1, 1, noiseFloor, 1)

        // re-roll with probability to see if we actually place the point
        if (randomBool(probability)) {
            placed.push([x, y])
        }
    }
    return placed
}

env('sketch-2d', { width: 900, height: 900, range: [-1, 1] })
const palette = getPalette()

// export function distributions(ctx, palette) {
const grid = new Grid([-1, -1], [2, 2], 3, 2)
const rects = grid.rects().map((r) => offset(r, -0.02))

const sampleCount = 25_000
const color = palette.primary + 'AA'
const attrs = { fill: color, weight: 0.002 }

// 1) UNIFORM 2D
draw(remapToRect(uniform2D(sampleCount), rects[0]), attrs)

// 2) GAUSSIAN 2D
draw(remapToRect(gaussian2D(sampleCount, [0.5, 0.5], [0.1, 0.1]), rects[1]), attrs)

// 3) PARETO 2D (clipped)
draw(remapToRect(pareto2D(sampleCount, [0.01, 0.01], [1.0, 1.0]), rects[2], true), attrs)

// 4) [Gaussian, Uniform]
let pts = zip(gaussian1D(sampleCount, 0.5, 0.1), uniform1D(sampleCount))
draw(remapToRect(pts, rects[3], false), attrs)

// 5) [Gauss, Pareto]
pts = zip(gaussian1D(sampleCount, 0.5, 0.1), pareto1D(sampleCount, 0.01, 0.1))
draw(remapToRect(pts, rects[4], false), attrs)

// 6) NOISE 2D
const zOffset = Date.now()
const noiseScale = [1.4, 1.8]
const noiseFloor = -0.5
pts = noise2D(sampleCount, noiseScale, zOffset, noiseFloor)
draw(remapToRect(pts, rects[5]), attrs)
