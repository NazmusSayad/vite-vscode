import path from 'path'
import { ConfigTypes } from './types.js'
import { readJSON, writeJSON } from './utils/json.js'
const vsCodePath = path.resolve('./.vscode/settings.json')

const getRightPath = (config: ConfigTypes) => {
  const autoComplete: ConfigTypes = {}
  const intellisense: ConfigTypes = {}

  for (let key in config) {
    const relativePath = path.relative('.', config[key])

    autoComplete[key] = '${folder}/' + relativePath
    intellisense[key] = '${workspaceFolder}/' + relativePath
  }

  return [autoComplete, intellisense]
}

export default (config: ConfigTypes) => {
  const [autoComplete, intellisense] = getRightPath(config)

  const settingsJson = readJSON(vsCodePath)
  settingsJson['path-autocomplete.pathMappings'] = autoComplete
  settingsJson['path-intellisense.pathMappings'] = intellisense

  const wrote = writeJSON(settingsJson, vsCodePath)
  wrote && console.log('VSCode settings updated...')
}
