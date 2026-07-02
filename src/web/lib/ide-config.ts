export const GEOSERVER_BASE_URL =
  process.env.NEXT_PUBLIC_GEOSERVER_BASE_URL ?? 'https://geoserver.sanbenito.gob.ar/geoserver'
export const WMS_URL = `${GEOSERVER_BASE_URL}/wms`
export const OWS_URL = `${GEOSERVER_BASE_URL}/ows`

export const MAP_CENTER = { lat: -31.78, lng: -60.52 }
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

export const CATEGORY_ORDER = ['Base', 'Urbano', 'Catastro', 'Obras', 'Ambiente', 'Otros']

export const CATEGORY_COLORS: Record<string, string> = {
  Base: 'bg-base-300',
  Urbano: 'bg-primary',
  Catastro: 'bg-secondary',
  Obras: 'bg-accent',
  Ambiente: 'bg-success',
  Otros: 'bg-info',
}
