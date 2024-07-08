window.meta = {
    title: 'Hypnotic Squares',
    description: '',
    refLink: 'https://generativeartistry.com/tutorials/hypnotic-squares/',
}

env('sketch-2d', { width: 900, height: 900, range: [-1, 1] })
const palette = getPalette()

// create a grid
const grid = new Grid([-1, -1], [2, 2], 8, 8)

// generate a list off offsets for each smallest square
const cellSize = grid.cellSize
const randomizedOffsets = full(grid.cellCount, () => randomOffset(cellSize[0] / 4.0, cellSize[1] / 4.0))

// lerp squares from grid rect towards center point
const squareCount = 5
const smallSquarePct = 0.45
const squares = zip(grid.rects(), randomizedOffsets).map(([rect, randOffset]) =>
    // stack of squares in each grid cell
    linspace(0, 1, squareCount).map((pct) => {
        const size = mapRange(pct, 0, 1, 0, cellSize[0] * smallSquarePct)
        const trx = lerpPt([0, 0], randOffset, pct)
        // rect inset by size and translated by lerped offset
        // const newRect = translate(offset(rect, -size), trx)
        const newRect = offset(rect, -size)
        if (pct > 0.8) {
            return withAttribs(newRect, { stroke: palette.secondary, weight: 0.01 })
        } else {
            return withAttribs(newRect, { stroke: palette.primary, weight: 0.01 })
        }
    })
)

dbg(squares.length)

clear(palette.background)
draw(squares, { stroke: palette.primary, weight: 0.01 })
