import { createCanvas } from '../canvas-utils/canvas-util'

export function installFunctionOnEnv(fn, namespace = undefined, path = undefined, docs = undefined) {
    // don't clobber existing methods
    if (!window.hasOwnProperty(fn.name)) {
        window[fn.name] = fn
    } else {
        console.error('Environment already has a function named', fn.name)
        return
    }

    if (!Array.isArray(window.doc_keys)) {
        window.doc_keys = []
    }
    window.doc_keys.push(fn.name)

    if (!Array.isArray(fn)) {
        fn.namespace = namespace || fn.namespace || 'void'
        fn.path = path || fn.path || '/'
        fn.docs = docs || fn.docs || 'No documentation available.'
    }
}
export function installModuleOnEnv(module, namespace, path) {
    Object.keys(module).forEach((key) => installFunctionOnEnv(module[key], namespace, path))
}

import { getPalette } from '../color/palettes'
import { colorUtil } from '../color/colorUtil'

import { installOnEnv as installOnEnv_Geom } from './env_geom'
import { installEnvInfo } from './docs'

export function env(type, params) {
    // TODO: support other `type`s

    const { width, height, range } = params
    const ctx = createCanvas(width, height)
    ctx.setRange(range[0], range[1])

    // make a note of environment for debug
    const envInfo = {
        type,
        ...params,
        ctx,
    }

    // install some methods and variables on environment
    const myDraw = ctx.draw
    Object.defineProperty(myDraw, 'name', { value: 'draw' })
    installFunctionOnEnv(myDraw, 'draw', 'draw/index.js', {
        header: 'draw(geo, attribs = {})',
        body: 'Draws objects to the canvas.',
    })

    const myClear = ctx.clear
    Object.defineProperty(myClear, 'name', { value: 'clear' })
    installFunctionOnEnv(myClear, 'draw', 'draw/index.js', { header: 'clear()', body: 'Clears the canvas.' })

    const clip = (...params) => ctx.clip(...params)
    installFunctionOnEnv(
        clip,
        'draw',
        'https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip',
        {
            header: 'clip()',
            body: 'Turns the current or given path into the current clipping region. The previous clipping region, if any, is intersected with the current or given path to create the new clipping region.',
        }
    )

    const save = () => ctx.save()
    installFunctionOnEnv(
        save,
        'draw',
        'https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save',
        {
            header: 'save()',
            body: 'Saves the entire state of the canvas by pushing the current state onto a stack.',
        }
    )

    const restore = () => ctx.restore()
    installFunctionOnEnv(
        restore,
        'draw',
        'https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore',
        {
            header: 'restore()',
            body: 'Restores the most recently saved canvas state by popping the top entry in the drawing state stack.',
        }
    )

    // geometry objects and ops
    installOnEnv_Geom(installFunctionOnEnv)

    // color utilities
    installFunctionOnEnv(colorUtil, 'color', 'color/colorUtil.js')
    installFunctionOnEnv(getPalette, 'assets', 'color/palettes.js')

    // environment info modal
    installEnvInfo(envInfo)

    return envInfo
}
