import { installFunctionOnEnv } from '../environments'

import { chaikinCurve } from './chaikin'

const ext = {
    chaikinCurve: () => {
        installFunctionOnEnv(chaikinCurve, 'ext', 'extended/chaikin.js', {
            header: 'chaikinCurve(points, iterations, closed = false)',
            body: 'Generates a Chaikin curve based on the given points and number of iterations.',
        })
    },
}

export { ext }
