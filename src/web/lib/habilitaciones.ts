import type { Ciudadano } from '@/payload-types'

export function ciudadanoTieneModuloHabilitaciones(
  ciudadano: Pick<Ciudadano, 'permisos'> | { permisos?: string[] | null },
): boolean {
  return Boolean(ciudadano.permisos?.includes('HABILITACIONES'))
}

export function relationId(value: unknown): string | null {
  if (!value) return null
  if (typeof value === 'string') return value
  if (typeof value === 'number') return String(value)
  if (typeof value === 'object' && value !== null && 'id' in value) {
    const id = (value as { id: unknown }).id
    return id == null ? null : String(id)
  }
  return null
}

export function esTitularDelComercio(titulares: unknown, ciudadanoId: string): boolean {
  if (!Array.isArray(titulares)) return false
  return titulares.some((t) => relationId(t) === ciudadanoId)
}

export function comercioEstaCerrado(fechaBaja?: string | null): boolean {
  if (!fechaBaja) return false
  return new Date(fechaBaja) <= new Date()
}

export function comercioEstaVencido(fechaVencimiento?: string | null): boolean {
  if (!fechaVencimiento) return false
  return new Date(fechaVencimiento) < new Date()
}

/** localizacion de Payload es [longitud, latitud]. */
export function coordenadasComercio(localizacion: unknown): { lat: number; lng: number } | null {
  if (!Array.isArray(localizacion) || localizacion.length < 2) return null
  const lng = localizacion[0]
  const lat = localizacion[1]
  if (typeof lat !== 'number' || typeof lng !== 'number') return null
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null
  return { lat, lng }
}

export function comercioEstaVigente(opts: {
  fechaBaja?: string | null
  fechaVencimiento?: string | null
}): boolean {
  return !comercioEstaCerrado(opts.fechaBaja) && !comercioEstaVencido(opts.fechaVencimiento)
}
