import fs from 'fs'
import path from 'path'
import { ConfigTypes } from './types'
import { readJSON, writeJSON } from './utils/json.js'
const jsConfigPath = path.resolve('./jsconfig.json')
const tsConfigPath = path.resolve('./tsconfig.json')

const getRightData = (base: string, config: ConfigTypes) => {
  const newConfig: { [index: string]: [string] } = {}

  for (let key in config) {
    const _relative = path.relative(base || '.', config[key])
    const relative = base ? _relative : './' + _relative

    newConfig[key] = [relative]
    newConfig[key + '/*'] = [relative + '/*']
  }

  return newConfig
}

const writeConfig = (label: string, path: string, config: ConfigTypes) => {
  const fileData = readJSON(path)
  const finalData = getRightData(fileData?.compilerOptions?.baseUrl, config)

  fileData.compilerOptions ??= {}
  fileData.compilerOptions.paths = finalData

  const wrote = writeJSON(fileData, path)
  wrote && console.log(label + ' config updated...')
  return fileData
}

export default (config: ConfigTypes) => {
  if (fs.existsSync(tsConfigPath)) {
    const data = writeConfig('TSConfig', tsConfigPath, config)

    if (data.compilerOptions?.allowJs) return
  }

  writeConfig('JSConfig', jsConfigPath, config)
}
