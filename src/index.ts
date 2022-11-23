import fs from 'fs'
import path from 'path'

const deepEqual = (x: any, y: any): boolean => {
  const ok = Object.keys
  const tx = typeof x
  const ty = typeof y

  return x && y && tx === 'object' && tx === ty
    ? ok(x).length === ok(y).length &&
        ok(x).every((key) => deepEqual(x[key], y[key]))
    : x === y
}

const readFile = (path: string): {} | any => {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf-8'))
  } catch {
    return {}
  }
}

const writeFile = (filePath: string, data: {} | any): void => {
  const { dir } = path.parse(filePath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir)

  const dataStr = JSON.stringify(data, null, '\t')
  fs.writeFileSync(filePath, dataStr)
}

const writeAlias = (alias: {} | any): void => {
  const cwd = process.cwd()
  const settingsPath = path.join(cwd, './.vscode/settings.json')
  const jsConfPath = path.join(cwd, './jsconfig.json')
  const settings = readFile(settingsPath)
  const jsConf = readFile(jsConfPath)

  const newSettings = { ...settings }
  const newJsConf = { ...jsConf }

  newSettings['path-autocomplete.pathMappings'] ??= {}
  newSettings['path-intellisense.pathMappings'] ??= {}
  newJsConf.compilerOptions ??= {}
  newJsConf.compilerOptions.module ??= 'es6'
  newJsConf.compilerOptions.baseUrl ??= './'
  newJsConf.compilerOptions.paths ??= {}

  for (let key in alias) {
    const relativePath = path.relative(cwd, alias[key])

    newSettings['path-autocomplete.pathMappings'][key] =
      '${folder}/' + relativePath

    newSettings['path-intellisense.pathMappings'][key] =
      '${workspaceFolder}/' + relativePath

    newJsConf.compilerOptions.paths[key + '/*'] = ['./' + relativePath + '/*']
  }

  if (!deepEqual(settings, newSettings)) {
    writeFile(settingsPath, newSettings)
    console.log('VSCode path settings updated...')
  }

  if (!deepEqual(jsConf, newJsConf)) {
    writeFile(jsConfPath, newJsConf)
    console.log('JSConfig path options updated...')
  }
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
