import fs from 'fs'
import path from 'path'
import deepEqual from './deepEqual.js'

export const readJSON = (path: string) => {
  if (!fs.existsSync(path)) return {}
  const jsonData = fs.readFileSync(path, 'utf-8').trim()
  if (!jsonData) return {}
  return JSON.parse(jsonData)
}

export const writeJSON = (data: { [index: string]: any }, filePath: string) => {
  if (fs.existsSync(filePath) && deepEqual(readJSON(filePath), data)) {
    return false
  }

  const dirPath = path.parse(filePath).dir

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }

  fs.writeFileSync(filePath, JSON.stringify(data))
  return true
}
