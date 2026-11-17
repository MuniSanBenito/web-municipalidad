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

function esLatitudDeLaZona(valor: number) {
  return valor <= -22 && valor >= -40
}

function esLongitudDeLaZona(valor: number) {
  return valor <= -53 && valor >= -66
}

/** El campo guarda [longitud, latitud]. Algunos registros viejos quedaron al revés. */
export function coordenadasComercio(localizacion: unknown): { lat: number; lng: number } | null {
  if (!Array.isArray(localizacion) || localizacion.length < 2) return null
  const primero = localizacion[0]
  const segundo = localizacion[1]
  if (typeof primero !== 'number' || typeof segundo !== 'number') return null
  if (!Number.isFinite(primero) || !Number.isFinite(segundo)) return null

  const invertido = esLatitudDeLaZona(primero) && esLongitudDeLaZona(segundo)
  const lng = invertido ? segundo : primero
  const lat = invertido ? primero : segundo
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null
  return { lat, lng }
}

export function comercioEstaEnSanBenito(coords: { lat: number; lng: number }) {
  return coords.lat <= -31.65 && coords.lat >= -31.95 && coords.lng <= -60.25 && coords.lng >= -60.7
}

export function comercioEstaVigente(opts: {
  fechaBaja?: string | null
  fechaVencimiento?: string | null
}): boolean {
  return !comercioEstaCerrado(opts.fechaBaja) && !comercioEstaVencido(opts.fechaVencimiento)
}
