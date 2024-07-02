import { createCanvas } from '../canvas-utils/canvas-util'

// import { selectedPalette } from './color/palettes'

export function installFunctionToEnv(fn, docs = undefined) {
    if (typeof fn !== 'function') {
        console.warn(`Attempted to install non-function: ${fn}`)
        return
    }
    window[fn.name] = fn

    if (!Array.isArray(window.doc_keys)) {
        window.doc_keys = []
    }
    window.doc_keys.push(fn.name)

    fn.docs = docs || fn.docs || 'No documentation available.'
}

export function installModuleToEnv(module) {
    Object.keys(module).forEach((key) => installFunctionToEnv(module[key]))
}

export function displayEnv() {
    console.log('Installed Environment:')
    window.doc_keys.forEach((key) => {
        if (window.hasOwnProperty(key)) {
            const fn = window[key]
            console.log(`${fn.name}: ${fn.docs}`)
        }
    })
}

export function env(type, params) {
    const { width, height, range } = params
    const ctx = createCanvas(width, height)
    ctx.setRange(range[0], range[1])

    console.log('ENV', type, width, height, range, ctx)

    const myDraw = ctx.draw
    Object.defineProperty(myDraw, 'name', { value: 'draw' })
    installFunctionToEnv(myDraw, 'Draws objects to the canvas.')

    const myClear = ctx.clear
    Object.defineProperty(myClear, 'name', { value: 'clear' })
    installFunctionToEnv(myClear, 'Clears the canvas.')

    // window.palette = selectedPalette
}
