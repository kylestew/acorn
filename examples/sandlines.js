window.meta = {
    title: 'Sandlines',
    description: '',
    refLink: 'https://inconvergent.net/2017/grains-of-sand',
}

env('sketch-2d', { width: 900, height: 900, range: [-1, 1] })
const palette = getPalette()

function sand(shape, grainCount, fuzziness, distributionFn = () => random()) {
    function fuzzyShape() {
        if (shape instanceof Circle) {
            return new Circle(add(shape.pos, randomOffset(fuzziness)), shape.r)
        } else if (shape instanceof Line) {
            return new Line([add(shape.pts[0], randomOffset(fuzziness)), add(shape.pts[1], randomOffset(fuzziness))])
        } else if (shape instanceof Quadratic) {
            // TODO: make fuzzy
            return shape
        } else if (shape instanceof Rectangle) {
            // TODO: pointAt doesn't exist on rectangle
        }
    }

    return full(grainCount, () => pointAt(fuzzyShape(), distributionFn()))
}

clear(palette.background)

// circle
const circ = new Circle([0, 0], 0.6)
let grains = sand(circ, 4096, 0.004)
draw(grains, { fill: palette.primary + '99', weight: 0.001 })

// line
const line = new Line([-0.5, -0.5], [0.5, 0.5])
// grains = sand(line, 4096, 0.004, () => Math.random())
grains = sand(line, 4096, 0.004, () => gaussian(0.5, 0.3))
draw(grains, { fill: palette.secondary + '99', weight: 0.001 })

// // curves
// const tick = 9.0
// let pts = [
//     [-0.75, -0.75],
//     [1.0, -0.5],
//     [0.75, 0.75],
// ]
// const curve0 = new Quadratic(pts)
// grains = sand(curve0, 4096, 0.004)
// draw(grains, { fill: accent + '99', weight: 0.001 })
