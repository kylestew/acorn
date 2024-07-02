import { createCanvas } from '../canvas-utils/canvas-util'

export function installFunctionOnEnv(fn, namespace = undefined, docs = undefined) {
    if (typeof fn !== 'function') {
        console.warn(`Attempted to install non-function: ${fn}`)
        return
    }

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

    fn.namespace = namespace || fn.namespace || 'void'
    fn.docs = docs || fn.docs || 'No documentation available.'
}
export function installModuleOnEnv(module, namespace) {
    Object.keys(module).forEach((key) => installFunctionOnEnv(module[key], namespace))
}

export function displayEnv() {
    console.log('Installed Environment:')
    window.doc_keys.forEach((key) => {
        if (window.hasOwnProperty(key)) {
            const fn = window[key]
            console.log(`[${fn.namespace}] ${fn.name}: ${fn.docs}`)
        }
    })
}

// import { selectedPalette } from './color/palettes'
import { installOnEnv as installOnEnv_Geom } from './env_geom'

export function env(type, params) {
    const { width, height, range } = params
    const ctx = createCanvas(width, height)
    ctx.setRange(range[0], range[1])

    console.log('ENV', type, width, height, range, ctx)

    // install some methods and variables on environment
    const myDraw = ctx.draw
    Object.defineProperty(myDraw, 'name', { value: 'draw' })
    installFunctionOnEnv(myDraw, 'draw', 'Draws objects to the canvas.')

    const myClear = ctx.clear
    Object.defineProperty(myClear, 'name', { value: 'clear' })
    installFunctionOnEnv(myClear, 'draw', 'Clears the canvas.')

    installOnEnv_Geom(installFunctionOnEnv)

    // window.palette = selectedPalette
}
