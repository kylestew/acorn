const meta = {
    title: 'Palettes',
    description: 'View currently selected palette',
    refLink: '',
}

const { ctx } = env('sketch-2d', { width: 900, height: 900, range: [-1, 1] })
const palette = getPalette()

const colorNames = Object.keys(palette)
const grid = new Grid([-1, -1], [2, 2], 1, colorNames.length)

grid.cells().forEach(({ index, rect, center }) => {
    const col = colorUtil(palette[colorNames[index]])
    draw(rect, { fill: col.toHex() })

    ctx.save()
    ctx.translate(center[0] + 0.03, center[1] - 0.8)
    ctx.rotate(Math.PI / 2)
    ctx.scale(1, -1)
    ctx.font = '0.1px Monaco'
    ctx.fillStyle = col.luminance() > 128 ? 'black' : 'white'
    ctx.fillText(col.toHex(), 0, 0)
    ctx.fillText(colorNames[index], 1.0, 0)
    ctx.restore()
})
