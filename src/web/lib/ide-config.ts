export const GEOSERVER_BASE_URL =
  process.env.NEXT_PUBLIC_GEOSERVER_BASE_URL ?? 'https://geoserver.sanbenito.gob.ar/geoserver'
export const WMS_URL = `${GEOSERVER_BASE_URL}/wms`
export const OWS_URL = `${GEOSERVER_BASE_URL}/ows`
export const GEOSERVER_WORKSPACE = process.env.NEXT_PUBLIC_GEOSERVER_WORKSPACE ?? ''

export const MAP_CENTER = { lat: -31.77198, lng: -60.42374 }
export const MAP_ZOOM = 13

export interface IdeLayerConfig {
  name: string
  title: string
  category?: string
  abstract?: string
  visible?: boolean
  opacity?: number
  defaultStyle?: string
}

export const CATEGORY_ORDER = [
  'Base',
  'Urbano',
  'Catastro',
  'Obras',
  'Ambiente',
  'Municipio',
  'Otros',
]

export const CATEGORY_COLORS: Record<string, string> = {
  Base: 'bg-base-300',
  Urbano: 'bg-primary',
  Catastro: 'bg-secondary',
  Obras: 'bg-accent',
  Ambiente: 'bg-success',
  Municipio: 'bg-warning',
  Otros: 'bg-info',
}

export const CATEGORY_PATTERNS: Record<string, RegExp[]> = {
  Catastro: [/catastro/i],
  Urbano: [/planta/i, /urbana/i, /manzana/i, /lote/i, /parcela/i],
  Obras: [/obra/i, /red/i, /cloaca/i, /agua/i, /luz/i, /gas/i],
  Ambiente: [/ambiente/i, /verde/i, /arbol/i, /parque/i],
  Municipio: [/municipio/i, /ejido/i, /concesion/i],
}
