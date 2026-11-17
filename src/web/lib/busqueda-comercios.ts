type TitularBusqueda = {
  id?: string | null
  nombre?: string | null
  apellido?: string | null
}

type ActividadBusqueda = string | { id?: string | null; nombre?: string | null }

export type ComercioBusqueda = {
  nombre?: string | null
  titulares?: (string | TitularBusqueda)[] | null
  actividades?: ActividadBusqueda[] | null
}

export function normalizarBusqueda(valor: string) {
  return valor
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .trim()
}

function nombresTitular(titular: string | TitularBusqueda): string[] {
  if (typeof titular === 'string') return []
  return [titular.apellido, titular.nombre].flatMap((parte) => (parte ? [parte] : []))
}

export function idsDeTitulares(titulares: ComercioBusqueda['titulares']): string[] {
  if (!Array.isArray(titulares)) return []
  return titulares.flatMap((titular) => {
    if (typeof titular === 'string') return [titular]
    return titular && 'id' in titular && typeof titular.id === 'string' ? [titular.id] : []
  })
}

export function textoTitulares(titulares: ComercioBusqueda['titulares']): string {
  if (!Array.isArray(titulares)) return ''
  return titulares.flatMap(nombresTitular).join(' ')
}

function tieneActividad(comercio: ComercioBusqueda, actividadId: string) {
  if (!Array.isArray(comercio.actividades)) return false
  return comercio.actividades.some((actividad) =>
    typeof actividad === 'string' ? actividad === actividadId : actividad?.id === actividadId,
  )
}

export function comercioCoincide(
  comercio: ComercioBusqueda,
  busqueda: string,
  actividadId: string,
) {
  if (actividadId && !tieneActividad(comercio, actividadId)) return false

  const palabras = normalizarBusqueda(busqueda).split(/\s+/).filter(Boolean)
  if (palabras.length === 0) return true

  const texto = normalizarBusqueda([comercio.nombre ?? '', textoTitulares(comercio.titulares)].join(' '))
  return palabras.every((palabra) => texto.includes(palabra))
}

export function nombresActividades(actividades: ComercioBusqueda['actividades']): string[] {
  if (!Array.isArray(actividades)) return []
  return actividades.flatMap((actividad) =>
    typeof actividad === 'object' && actividad?.nombre ? [actividad.nombre] : [],
  )
}

export function etiquetaTitulares(titulares: ComercioBusqueda['titulares']): string {
  if (!Array.isArray(titulares)) return ''
  const nombres = titulares.flatMap((titular) => {
    if (typeof titular === 'string') return []
    const persona = [titular.apellido, titular.nombre].filter(Boolean).join(', ')
    return persona ? [persona] : []
  })
  return nombres.slice(0, 2).join(' · ')
}
