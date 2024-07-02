export { env, displayEnv } from './environments/index'
import { installModuleOnEnv } from './environments/index'

/* === STANDARD LIBRARY ===*/
import * as randomLib from './random'
installModuleOnEnv(randomLib, 'std.random')
