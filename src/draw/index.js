import { Circle } from '../geo/shapes/Circle'
import { Sprite } from '../extended/sprite'
import { asPath } from '../geo/ops/asPath'

export function draw(ctx, geo, attribs = {}) {
    // if an array, run draw on each element
    if (Array.isArray(geo)) {
        // if an array of two numbers, assume it's a point and draw as a circle
        if (geo.length === 2 && typeof geo[0] === 'number' && typeof geo[1] === 'number') {
            const rad = attribs.weight || 0.01
            draw(ctx, new Circle(geo, rad), attribs)
            return
        }

        geo.forEach((g) => draw(ctx, g, attribs))
        return
    } else if ('x' in geo && 'y' in geo) {
        // treat as point object
        const { x, y } = geo
        const rad = geo.weight || 0.01
        draw(ctx, new Circle([x, y], rad), attribs)
        return
    }

    // Sprites render internally
    if (geo instanceof Sprite) {
        geo.draw(ctx)
        return
    }

    // NORMAL DRAWING COMMANDS
    ctx.save()

    // clear styles
    ctx.fillStyle = 'none'
    ctx.strokeStyle = 'none'

    // apply styles from drawing attribs
    let hasStroke = false
    let hasFill = false
    if (attribs.fill && attribs.fill !== 'none') {
        ctx.fillStyle = attribs.fill
        hasFill = true
    }
    if (attribs.stroke) {
        ctx.strokeStyle = attribs.stroke
        hasStroke = true
    }
    if (attribs.weight) {
        ctx.lineWidth = attribs.weight
    }
    if (attribs.lineCap) {
        ctx.lineCap = attribs.lineCap
    }
    if (attribs.lineJoin) {
        ctx.lineJoin = attribs.lineJoin
    }
    if (attribs.lineDash) {
        ctx.setLineDash(attribs.lineDash)
    }

    // apply styles from geo attribs (they override)
    if (geo.attribs !== undefined) {
        if (geo.attribs.fill && geo.attribs.fill !== 'none') {
            ctx.fillStyle = geo.attribs.fill
            hasFill = true
        }
        if (geo.attribs.stroke) {
            ctx.strokeStyle = geo.attribs.stroke
            hasStroke = true
        }
        if (geo.attribs.weight) {
            ctx.lineWidth = geo.attribs.weight
        }
        if (geo.attribs.lineCap) {
            ctx.lineCap = geo.attribs.lineCap
        }
        if (geo.attribs.lineJoin) {
            ctx.lineJoin = geo.attribs.lineJoin
        }
        if (geo.attribs.lineDash) {
            ctx.setLineDash(geo.attribs.lineDash)
        }
    }

    // perform drawing
    if (hasFill) {
        ctx.fill(asPath(geo))
    }
    if (hasStroke) {
        ctx.stroke(asPath(geo))
    }

    if (!(hasFill || hasStroke)) {
        // default for debug
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 0.01

        ctx.stroke(asPath(geo))
    }

    ctx.restore()
}
