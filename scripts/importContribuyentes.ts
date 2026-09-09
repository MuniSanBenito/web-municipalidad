import config from '@payload-config'
import { XMLParser } from 'fast-xml-parser'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'
import './loadEnv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DEFAULT_FILE = path.resolve(__dirname, '../contribuyentes_conmail')
const BATCH_SIZE = 200
const SENTINEL_DATES = new Set(['1900-01-01', '9999-12-31'])
const INVALID_STRINGS = new Set(['(Binary/Image)', '-', ''])

type ContribuyenteData = {
  numero_contribuyente: number
  nombre?: string | null
  domicilio?: string | null
  codigo_postal?: number | null
  tipo_documento?: number | null
  numero_documento?: string | null
  categoria?: number | null
  cuit?: string | null
  habilitado_web?: boolean | null
  clave_web?: string | null
  email?: string | null
  dcc?: number | null
  domicilio_altura?: string | null
  domicilio_calle_secundaria?: string | null
  domicilio_torre?: string | null
  domicilio_piso?: string | null
  domicilio_depto?: string | null
  sexo?: number | null
  nacionalidad?: string | null
  cba?: number | null
  cbu?: string | null
  fecha_alta?: string | null
  fecha_nacimiento?: string | null
  email_secundario?: string | null
  telefono_web?: string | null
  telefono_secundario?: string | null
  dfi?: number | null
}

function parseArgs() {
  const args = process.argv.slice(2)
  let file = DEFAULT_FILE
  let forceUpdate = false

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--file' && args[i + 1]) {
      file = path.resolve(args[i + 1])
      i++
    } else if (args[i] === '--force-update') {
      forceUpdate = true
    }
  }

  return { file, forceUpdate }
}

function cleanString(value: unknown): string | null {
  if (value === null || value === undefined) return null
  const str = String(value).trim()
  if (INVALID_STRINGS.has(str)) return null
  return str
}

function cleanEmail(value: unknown): string | null {
  const str = cleanString(value)
  if (!str) return null
  return str.toLowerCase().replace(/-+$/, '')
}

function cleanNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null
  const num = Number(value)
  return Number.isFinite(num) ? num : null
}

function cleanDate(value: unknown): string | null {
  if (value === null || value === undefined || value === '') return null
  const dateStr = String(value).split('T')[0]
  if (SENTINEL_DATES.has(dateStr)) return null
  return dateStr
}

function cleanBoolean(value: unknown): boolean | null {
  const num = cleanNumber(value)
  if (num === null) return null
  return num === 1
}

function getCellValue(cell: Record<string, unknown>): unknown {
  const data = cell.Data as Record<string, unknown> | undefined
  if (!data) return null

  const type = data['@_ss:Type'] ?? data['@_Type']
  const rawValue = data['#text'] ?? data

  if (type === 'Number' || type === 'DateTime') {
    return rawValue
  }

  return rawValue
}

function parseRow(cells: unknown[]): ContribuyenteData | null {
  const values = cells.map((cell) => getCellValue(cell as Record<string, unknown>))

  const numeroContribuyente = cleanNumber(values[0])
  if (numeroContribuyente === null) return null

  return {
    numero_contribuyente: numeroContribuyente,
    nombre: cleanString(values[1]),
    domicilio: cleanString(values[2]),
    codigo_postal: cleanNumber(values[3]),
    tipo_documento: cleanNumber(values[4]),
    numero_documento: cleanString(values[5]) ?? (values[5] != null ? String(values[5]) : null),
    categoria: cleanNumber(values[6]),
    cuit: cleanString(values[7]) ?? (values[7] != null ? String(values[7]) : null),
    habilitado_web: cleanBoolean(values[8]),
    clave_web: cleanString(values[9]),
    email: cleanEmail(values[10]),
    dcc: cleanNumber(values[11]),
    domicilio_altura: cleanString(values[12]) ?? (values[12] != null ? String(values[12]) : null),
    domicilio_calle_secundaria: cleanString(values[13]),
    domicilio_torre: cleanString(values[14]),
    domicilio_piso: cleanString(values[15]),
    domicilio_depto: cleanString(values[16]),
    sexo: cleanNumber(values[17]),
    nacionalidad: cleanString(values[18]),
    cba: cleanNumber(values[19]),
    cbu: cleanString(values[20]),
    fecha_alta: cleanDate(values[21]),
    fecha_nacimiento: cleanDate(values[22]),
    email_secundario: cleanEmail(values[23]),
    telefono_web: cleanString(values[24]),
    telefono_secundario: cleanString(values[25]),
    dfi: cleanNumber(values[26]),
  }
}

function parseSpreadsheet(filePath: string): ContribuyenteData[] {
  const xml = fs.readFileSync(filePath, 'utf-8')

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    removeNSPrefix: true,
    isArray: (name) => ['Row', 'Cell'].includes(name),
  })

  const parsed = parser.parse(xml)
  const rows = parsed?.Workbook?.Worksheet?.Table?.Row ?? []

  const contribuyentes: ContribuyenteData[] = []

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i] as { Cell?: unknown[] }
    const cells = Array.isArray(row.Cell) ? row.Cell : row.Cell ? [row.Cell] : []
    const data = parseRow(cells)
    if (data) {
      contribuyentes.push(data)
    }
  }

  return contribuyentes
}

async function importContribuyentes() {
  const { file, forceUpdate } = parseArgs()

  if (!fs.existsSync(file)) {
    console.error(`Archivo no encontrado: ${file}`)
    process.exit(1)
  }

  console.log(`Leyendo archivo: ${file}`)
  const contribuyentes = parseSpreadsheet(file)
  console.log(`Registros parseados: ${contribuyentes.length}`)

  if (!process.env.PAYLOAD_SECRET) {
    console.error(
      'PAYLOAD_SECRET no está definido. Verificá que exista el archivo .env en la raíz del proyecto.',
    )
    process.exit(1)
  }

  if (!process.env.DATABASE_URI?.startsWith('mongodb')) {
    console.error(
      'DATABASE_URI no es válida. Debe empezar con mongodb:// o mongodb+srv://. Verificá tu archivo .env.',
    )
    process.exit(1)
  }

  const payload = await getPayload({ config })

  let inserted = 0
  let skipped = 0
  let updated = 0
  let errors = 0

  for (let i = 0; i < contribuyentes.length; i += BATCH_SIZE) {
    const batch = contribuyentes.slice(i, i + BATCH_SIZE)

    for (const data of batch) {
      try {
        const existing = await payload.find({
          collection: 'contribuyentes',
          where: {
            numero_contribuyente: { equals: data.numero_contribuyente },
          },
          limit: 1,
        })

        if (existing.totalDocs > 0) {
          if (forceUpdate) {
            await payload.update({
              collection: 'contribuyentes',
              id: existing.docs[0].id,
              data,
            })
            updated++
          } else {
            skipped++
          }
          continue
        }

        await payload.create({
          collection: 'contribuyentes',
          data,
        })
        inserted++
      } catch (error) {
        errors++
        console.error(`Error en contribuyente ${data.numero_contribuyente}:`, error)
      }
    }

    const processed = Math.min(i + BATCH_SIZE, contribuyentes.length)
    console.log(`Progreso: ${processed}/${contribuyentes.length}`)
  }

  console.log('\n--- Resumen ---')
  console.log(`Insertados: ${inserted}`)
  console.log(`Omitidos (ya existían): ${skipped}`)
  if (forceUpdate) console.log(`Actualizados: ${updated}`)
  console.log(`Errores: ${errors}`)

  process.exit(errors > 0 ? 1 : 0)
}

importContribuyentes().catch((error) => {
  console.error('Error fatal:', error)
  process.exit(1)
})
