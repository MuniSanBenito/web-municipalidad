import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function parseEnvValue(raw: string): string {
  let value = raw.trim()

  if (value.startsWith('"') || value.startsWith("'")) {
    const quote = value[0]
    const endQuote = value.indexOf(quote, 1)
    if (endQuote !== -1) {
      return value.slice(1, endQuote)
    }
  }

  const commentIndex = value.indexOf(' #')
  if (commentIndex !== -1) {
    value = value.slice(0, commentIndex)
  }

  return value.trim()
}

function loadEnvFile(filePath: string) {
  if (!fs.existsSync(filePath)) return

  for (const line of fs.readFileSync(filePath, 'utf-8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith(';')) continue

    const eq = trimmed.indexOf('=')
    if (eq === -1) continue

    const key = trimmed.slice(0, eq).trim()
    const value = parseEnvValue(trimmed.slice(eq + 1))

    if (process.env[key] === undefined) {
      process.env[key] = value
    }
  }
}

loadEnvFile(path.resolve(__dirname, '../.env'))
