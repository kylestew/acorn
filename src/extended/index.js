import { installFunctionOnEnv } from '../environments'

import { chaikinCurve } from './chaikin'
import { Sprite } from './sprite'

export const ext = {
    chaikinCurve: () => {
        installFunctionOnEnv(chaikinCurve, 'ext', 'extended/chaikin.js', {
            header: 'chaikinCurve(points, iterations, closed = false)',
            body: 'Generates a Chaikin curve based on the given points and number of iterations.',
        })
    },
    sprite: () => {
        installFunctionOnEnv(Sprite, 'geo', 'geo/extended/sprite.js', {
            header: 'async Sprite.create(src)',
            body: 'Creates a new sprite object from an image source (loads async).',
        })
    },
}
