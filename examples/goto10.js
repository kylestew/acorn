const meta = {
    title: 'Goto 10',
    description: 'Classic creative coding example',
    refLink: 'https://10print.org/',
}

env('sketch-2d', { width: 900, height: 900, range: [-1, 1] })
const palette = getPalette()

// likelihood of a backslash instead of a forward one
const probability = 0.333

// generate grid cells
const cellCount = 12
const grid = new Grid([-1, -1], [2, 2], cellCount, cellCount)

// for each grid cell, randomly pick a diagonal line across it (forward or backward)
const lines = grid.rects().map((rect) => {
    let [a, b, c, d] = asPoints(rect)
    const pts = randomBool(probability) ? [a, c] : [b, d]
    return new Line(pts)
})

clear(palette.background)
draw(lines, { stroke: palette.primary, lineCap: 'round', weight: 0.03 })
