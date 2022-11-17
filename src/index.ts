import fs from 'fs'
import path from 'path'

const readFile = (path: string): {} | any => {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf-8'))
  } catch {
    return {}
  }
}

const writeFile = (path: string, data: {} | any): void => {
  const dataStr = JSON.stringify(data, null, '\t')
  fs.writeFileSync(path, dataStr)
}

const writeAlias = (alias: {} | any): void => {
  const cwd = process.cwd()
  const settingsPath = path.join(cwd, './.vscode/settings.json')
  const jsConfPath = path.join(cwd, './jsconfig.json')
  const settings = readFile(settingsPath)
  const jsConf = readFile(jsConfPath)

  settings['path-autocomplete.pathMappings'] ??= {}
  settings['path-intellisense.pathMappings'] ??= {}
  jsConf.compilerOptions ??= {}
  jsConf.compilerOptions.module ??= 'es6'
  jsConf.compilerOptions.baseUrl ??= './'
  jsConf.compilerOptions.paths ??= {}

  for (let key in alias) {
    const relativePath = path.relative(cwd, alias[key])

    settings['path-autocomplete.pathMappings'][key] =
      '${folder}/' + relativePath

    settings['path-intellisense.pathMappings'][key] =
      '${workspaceFolder}/' + relativePath

    jsConf.compilerOptions.paths[key + '/*'] = ['./' + relativePath + '/*']
  }

  writeFile(settingsPath, settings)
  writeFile(jsConfPath, jsConf)
}

export default () => {
  return {
    name: 'Vite VSCode',

    config: (config: any) => {
      const alias = config?.resolve?.alias

      if (alias) {
        writeAlias(alias)
      }
    },
  }
}
