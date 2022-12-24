import { ConfigTypes } from './types.js'
import writeTSJSConfig from './writeTSJSConfig.js'
import writeVSCode from './writeVSCode.js'

export default ({ jsconfig = true } = {}) => {
  return {
    name: 'Vite VSCode',

    config: (config: any) => {
      const alias: ConfigTypes = config?.resolve?.alias
      if (!alias || alias.toString() !== '[object Object]') return

      writeVSCode(alias)
      writeTSJSConfig(alias, jsconfig)
    },
  }
}

export { default as createAlias } from './createAlias.js'
