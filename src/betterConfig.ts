import fs from 'fs'
import path from 'path'

export const groupedOutput = ({
  assets: assetsDir = 'assets',
  static: staticDir = 'static',
} = {}) => {
  return {
    assetFileNames: (file: { name: string }) => {
      const ext = file.name.split('.').at(-1)
      const outputFolder = ext === 'css' || ext === 'js' ? '' : assetsDir + '/'
      return `${staticDir}/${outputFolder}[name]-[hash][extname]`
    },
    entryFileNames: `${staticDir}/[name]-[hash].js`,
    chunkFileNames: `${staticDir}/chunk-[name]-[hash].js`,
  }
}

export const cssModule = () => {
  return {
    generateScopedName:
      process.env.NODE_ENV === 'production'
        ? '[hash:base64]'
        : '[local]___[name]--[hash:base64:5]',
  }
}

export const aliases = (prefix: string, dir: string): UselessObj => {
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

type UselessObj = { [index: string]: string }
