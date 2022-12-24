import fs from 'fs'
import deepEqual from './deepEqual.js'

export const readJSON = (path: string) => {
  if (!fs.existsSync(path)) return {}
  const jsonData = fs.readFileSync(path, 'utf-8').trim()
  if (!jsonData) return {}
  return JSON.parse(jsonData)
}

export const writeJSON = (data: { [index: string]: any }, path: string) => {
  if (fs.existsSync(path) && deepEqual(readJSON(path), data)) return false
  fs.writeFileSync(path, JSON.stringify(data))
  return true
}
