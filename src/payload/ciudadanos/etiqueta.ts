import type { CollectionBeforeChangeHook } from 'payload'

type DatosNombre = {
  nombre?: string | null
  apellido?: string | null
  dni?: string | null
}

function texto(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

export function etiquetaCiudadano(datos: DatosNombre): string {
  const apellido = texto(datos.apellido)
  const nombre = texto(datos.nombre)
  const dni = texto(datos.dni)
  const persona = [apellido, nombre].filter(Boolean).join(', ')
  const documento = dni ? `DNI ${dni}` : ''
  return [persona, documento].filter(Boolean).join(' · ')
}

function leer(
  data: Record<string, unknown>,
  original: DatosNombre | undefined,
  key: keyof DatosNombre,
): string | null | undefined {
  if (Object.prototype.hasOwnProperty.call(data, key)) {
    const value = data[key]
    if (typeof value === 'string' || value == null) return value
    return undefined
  }
  return original?.[key]
}

export const completarNombreCiudadano: CollectionBeforeChangeHook = ({ data, originalDoc }) => {
  if (!data || typeof data !== 'object') return data

  const anterior = originalDoc as (DatosNombre & { nombreCompleto?: string | null }) | undefined
  const etiqueta = etiquetaCiudadano({
    nombre: leer(data, anterior, 'nombre'),
    apellido: leer(data, anterior, 'apellido'),
    dni: leer(data, anterior, 'dni'),
  })

  if (etiqueta) {
    data.nombreCompleto = etiqueta
  } else if (!texto(data.nombreCompleto) && texto(anterior?.nombreCompleto)) {
    data.nombreCompleto = texto(anterior?.nombreCompleto)
  }

  return data
}
