export { env, displayEnv } from './environments/index'
import { installModuleOnEnv } from './environments/index'

/* === STANDARD LIBRARY ===*/
import * as mathLib from './math'
installModuleOnEnv(mathLib, 'std.math', 'math/index.js')

import * as arrayLib from './array'
installModuleOnEnv(arrayLib, 'std.array', 'array/index.js')

import * as randomLib from './random'
installModuleOnEnv(randomLib, 'std.random', 'random/index.js')
