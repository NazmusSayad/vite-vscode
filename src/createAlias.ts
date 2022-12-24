import fs from 'fs'
import path from 'path'

type UselessObj = { [index: string]: string }

export default (prefix: string, dir: string): UselessObj => {
  if (!fs.existsSync(dir)) return {}
  const aliasConfig: UselessObj = {}
  const childs = fs.readdirSync(dir)

  childs.forEach((key) => {
    const fullPath = path.join(dir, key)
    if (!fs.lstatSync(fullPath).isDirectory()) return
    aliasConfig[prefix + key] = fullPath
  })

  return aliasConfig
}
