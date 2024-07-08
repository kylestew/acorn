export { env } from './environments/index'
export { dbg } from './environments/debug'
export { ext } from './extended/index'

import { installModuleOnEnv } from './environments/index'

/* === STANDARD LIBRARY ===*/
import * as mathLib from './math'
installModuleOnEnv(mathLib, 'std.math', 'math/index.js')

import * as vectorsLib from './math/vectors'
installModuleOnEnv(vectorsLib, 'std.vectors', 'math/vectors.js')

import * as arrayLib from './array'
installModuleOnEnv(arrayLib, 'std.array', 'array/index.js')

import * as randomLib from './random'
installModuleOnEnv(randomLib, 'std.random', 'random/index.js')

import * as noiseLib from './random/noise'
installModuleOnEnv(noiseLib, 'std.noise', 'random/noise.js')
