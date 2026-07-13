import { readFileSync } from 'fs'
import { resolve } from 'path'

import { nomencladorArca } from '../src/data/nomenclador-arca'

// Cargar .env ANTES de importar Payload (los imports estáticos se hoistean)
const envPath = resolve(process.cwd(), '.env')
console.log('Buscando .env en:', envPath)
try {
  const envContent = readFileSync(envPath, 'utf-8')

  // Detectar BOM
  const firstChars = envContent.slice(0, 3)
  console.log('Primeros 3 chars:', JSON.stringify(firstChars), 'codes:', [...firstChars].map((c) => c.charCodeAt(0)))

  // Debug: mostrar todas las keys del .env
  for (const line of envContent.split(/\r?\n/)) {
    if (line.trim() && !line.startsWith('#')) {
      const eqIdx = line.indexOf('=')
      if (eqIdx > 0) {
        const key = line.slice(0, eqIdx).trim()
        const val = line.slice(eqIdx + 1).trim()
        console.log(`  key="${key}" valLen=${val.length}`)
      }
    }
  }

  for (const line of envContent.split(/\r?\n/)) {
    const match = line.match(/^([^#=]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      const value = match[2].trim().replace(/^["']|["']$/g, '')
      if (!process.env[key]) process.env[key] = value
    }
  }
} catch {
  console.warn('.env no encontrado, usando variables de entorno existentes')
}

console.log('PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET ? `OK (len=${process.env.PAYLOAD_SECRET.length})` : 'VACÍO')
console.log('DATABASE_URI:', process.env.DATABASE_URI ? `OK (len=${process.env.DATABASE_URI.length})` : 'VACÍO')

// Fallback: generar un secret temporal si está vacío (solo para el seed)
if (!process.env.PAYLOAD_SECRET) {
  process.env.PAYLOAD_SECRET = 'seed-temp-secret-' + Date.now()
  console.warn('PAYLOAD_SECRET estaba vacío, usando temporal para el seed')
}

// Dynamic import para que .env ya esté cargado cuando Payload evalúe el config
const { getPayload } = await import('payload')
const { default: config } = await import('@payload-config')

async function seed() {
  try {
    const payload = await getPayload({ config })

    // Obtener rubros existentes para evitar duplicados
    const { docs: existentes } = await payload.find({
      collection: 'rubros-comercios',
      pagination: false,
      limit: 0,
    })

    const codigosExistentes = new Set(existentes.map((r: any) => r.codigo))

    let creados = 0
    let omitidos = 0

    for (const rubro of nomencladorArca) {
      if (codigosExistentes.has(rubro.codigo)) {
        omitidos++
        continue
      }

      await payload.create({
        collection: 'rubros-comercios',
        data: {
          codigo: rubro.codigo,
          nombre: rubro.nombre,
          categoria: rubro.categoria,
          subcategoria: rubro.subcategoria,
        },
      })
      creados++
    }

    console.log(`Seed completado: ${creados} rubros creados, ${omitidos} omitidos (ya existían)`)
  } catch (error) {
    console.error('Error en seed:', error)
  }
}

await seed()
