import { type LegendOptions } from '@/web/types/geoserver'
import { CATEGORY_ORDER, CATEGORY_PATTERNS, type IdeLayerConfig } from './ide-config'

export interface WmsLayer {
  name: string
  title: string
  abstract?: string
  category?: string
  bbox?: [number, number, number, number]
  styles: string[]
  defaultStyle?: string
}

export interface WmsCapabilities {
  version: string
  serviceTitle?: string
  abstract?: string
  layers: WmsLayer[]
}

export interface FeatureInfoResponse {
  type: 'FeatureCollection'
  features: Array<{
    type: 'Feature'
    id?: string
    geometry?: unknown
    properties: Record<string, unknown>
  }>
  totalFeatures?: number
}

export async function fetchWmsCapabilities(
  baseUrl: string,
  version = '1.3.0',
): Promise<WmsCapabilities> {
  const url = new URL(`${baseUrl}/ows`)
  url.searchParams.set('service', 'WMS')
  url.searchParams.set('version', version)
  url.searchParams.set('request', 'GetCapabilities')

  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error(`GetCapabilities falló: ${response.status} ${response.statusText}`)
  }

  const text = await response.text()
  return parseCapabilities(text)
}

export function parseCapabilities(xmlText: string): WmsCapabilities {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xmlText, 'application/xml')

  const parseError = doc.querySelector('parsererror')
  if (parseError) {
    throw new Error('No se pudo parsear la respuesta de GetCapabilities')
  }

  const rootLayer = doc.querySelector('Capability > Layer')
  if (!rootLayer) {
    throw new Error('No se encontró el nodo Capability/Layer en GetCapabilities')
  }

  const layers: WmsLayer[] = []

  const walk = (layerEl: Element, parentCategory?: string) => {
    const name = getText(layerEl, 'Name')
    const title = getText(layerEl, 'Title') || name
    const abstract = getText(layerEl, 'Abstract') || undefined
    const keywords = extractKeywords(layerEl)
    const category = resolveCategory(keywords, name, title, parentCategory, CATEGORY_PATTERNS)

    const styles = Array.from(layerEl.querySelectorAll(':scope > Style')).map((style) =>
      getText(style, 'Name'),
    )

    const bbox = extractBoundingBox(layerEl)

    if (name) {
      layers.push({
        name,
        title,
        abstract,
        category,
        bbox,
        styles: styles.length > 0 ? styles : [''],
        defaultStyle: styles[0] || '',
      })
    }

    Array.from(layerEl.children)
      .filter((child) => child.tagName === 'Layer')
      .forEach((child) => walk(child, category))
  }

  walk(rootLayer)

  return {
    version: getAttr(doc.querySelector('WMS_Capabilities, WMT_MS_Capabilities'), 'version') || '1.3.0',
    serviceTitle: getText(doc.querySelector('Service'), 'Title') || undefined,
    abstract: getText(doc.querySelector('Service'), 'Abstract') || undefined,
    layers,
  }
}

function getText(parent: Element | null, selector: string): string {
  if (!parent) return ''
  const el = parent.querySelector(`:scope > ${selector}`)
  return el?.textContent?.trim() || ''
}

function getAttr(el: Element | null, attr: string): string {
  return el?.getAttribute(attr) || ''
}

function isGlobalBbox(west: number, south: number, east: number, north: number): boolean {
  return (
    Math.abs(west - (-180)) < 0.001 &&
    Math.abs(east - 180) < 0.001 &&
    Math.abs(south - (-90)) < 0.001 &&
    Math.abs(north - 90) < 0.001
  )
}

function extractBoundingBox(layerEl: Element): [number, number, number, number] | undefined {
  const exBboxEl = layerEl.querySelector(':scope > EX_GeographicBoundingBox')
  if (exBboxEl) {
    const west = parseFloat(getText(exBboxEl, 'westBoundLongitude'))
    const east = parseFloat(getText(exBboxEl, 'eastBoundLongitude'))
    const south = parseFloat(getText(exBboxEl, 'southBoundLatitude'))
    const north = parseFloat(getText(exBboxEl, 'northBoundLatitude'))
    if ([west, south, east, north].every(isFinite) && !isGlobalBbox(west, south, east, north)) {
      return [west, south, east, north]
    }
  }

  const bboxEl =
    layerEl.querySelector(':scope > BoundingBox[CRS="CRS:84"]') ||
    layerEl.querySelector(':scope > BoundingBox[CRS="EPSG:4326"]') ||
    layerEl.querySelector(':scope > BoundingBox')

  if (!bboxEl) return undefined

  if (bboxEl.tagName === 'BoundingBox') {
    const minx = parseFloat(bboxEl.getAttribute('minx') || '0')
    const miny = parseFloat(bboxEl.getAttribute('miny') || '0')
    const maxx = parseFloat(bboxEl.getAttribute('maxx') || '0')
    const maxy = parseFloat(bboxEl.getAttribute('maxy') || '0')
    if (![minx, miny, maxx, maxy].every(isFinite)) return undefined

    const crs = bboxEl.getAttribute('CRS') || ''
    let west: number, south: number, east: number, north: number

    if (crs === 'EPSG:4326') {
      west = miny
      south = minx
      east = maxy
      north = maxx
    } else {
      west = minx
      south = miny
      east = maxx
      north = maxy
    }

    if (isGlobalBbox(west, south, east, north)) return undefined
    return [west, south, east, north]
  }

  return undefined
}

function extractKeywords(layerEl: Element): string[] {
  const keywordList = layerEl.querySelector(':scope > KeywordList')
  if (!keywordList) return []
  return Array.from(keywordList.querySelectorAll(':scope > Keyword'))
    .map((el) => el.textContent?.trim() || '')
    .filter((kw) => /^categoria:\s*/i.test(kw))
}

function resolveCategory(
  keywords: string[],
  name: string,
  title: string,
  parent: string | undefined,
  patterns: Record<string, RegExp[]>,
): string {
  // 1. Keyword GeoServer — categoria:<Nombre>
  for (const kw of keywords) {
    const m = kw.match(/^categoria:\s*(.+)$/i)
    if (m && CATEGORY_ORDER.includes(m[1])) return m[1]
  }
  // 2. Herencia estructural del padre
  if (parent && parent !== 'Root') return parent
  // 3. Heurística por patrones
  for (const [cat, pats] of Object.entries(patterns)) {
    if (pats.some((p) => p.test(name) || p.test(title))) return cat
  }
  // 4. Fallback
  return 'Otros'
}

function deriveCategory(name: string, title: string, parent?: string): string {
  return resolveCategory([], name, title, parent, CATEGORY_PATTERNS)
}

export function mergeWithDefaults(
  discovered: WmsLayer[],
  defaults: IdeLayerConfig[],
): IdeLayerConfig[] {
  const defaultMap = new Map(defaults.map((d) => [d.name, d]))

  const merged = discovered.map((layer) => {
    const def = defaultMap.get(layer.name)
    return {
      name: layer.name,
      title: def?.title || layer.title,
      category: layer.category || def?.category || 'Otros',
      abstract: layer.abstract || def?.abstract,
      visible: def?.visible ?? false,
      opacity: def?.opacity ?? 0.85,
      defaultStyle: layer.defaultStyle || def?.defaultStyle,
    }
  })

  const discoveredNames = new Set(discovered.map((d) => d.name))
  const fallback = defaults
    .filter((d) => !discoveredNames.has(d.name))
    .map((d) => ({ ...d, opacity: d.opacity ?? 0.85, visible: d.visible ?? false }))

  return [...merged, ...fallback]
}

export function buildGetFeatureInfoUrl(
  baseUrl: string,
  params: {
    layers: string[]
    point: { x: number; y: number }
    mapSize: { width: number; height: number }
    mapBounds: { south: number; west: number; north: number; east: number }
  },
): string {
  const { layers, point, mapSize, mapBounds } = params

  const url = new URL(`${baseUrl}/wms`)
  url.searchParams.set('SERVICE', 'WMS')
  url.searchParams.set('VERSION', '1.3.0')
  url.searchParams.set('REQUEST', 'GetFeatureInfo')
  url.searchParams.set('LAYERS', layers.join(','))
  url.searchParams.set('QUERY_LAYERS', layers.join(','))
  url.searchParams.set('STYLES', '')
  url.searchParams.set('CRS', 'EPSG:4326')
  url.searchParams.set('BBOX', `${mapBounds.south},${mapBounds.west},${mapBounds.north},${mapBounds.east}`)
  url.searchParams.set('WIDTH', String(mapSize.width))
  url.searchParams.set('HEIGHT', String(mapSize.height))
  url.searchParams.set('I', String(Math.round(point.x)))
  url.searchParams.set('J', String(Math.round(point.y)))
  url.searchParams.set('INFO_FORMAT', 'application/json')
  url.searchParams.set('FEATURE_COUNT', '10')

  return url.toString()
}

export const LEGEND_OPTIONS_DEFAULT: Required<LegendOptions> = {
  fontName: 'Arial',
  fontSize: 12,
  fontColor: '0x333333',
  bgColor: '0xFFFFFF',
  dpi: 180,
  forceLabels: true,
}

export function buildLegendUrl(
  baseUrl: string,
  params: { workspace?: string; layerName: string; style?: string },
  options?: LegendOptions,
): string {
  const url = new URL(`${baseUrl}/wms`)
  url.searchParams.set('REQUEST', 'GetLegendGraphic')
  url.searchParams.set('VERSION', '1.0.0')
  url.searchParams.set('FORMAT', 'image/png')

  const layer = params.layerName.includes(':')
    ? params.layerName
    : params.workspace
      ? `${params.workspace}:${params.layerName}`
      : params.layerName
  url.searchParams.set('LAYER', layer)

  if (params.style) url.searchParams.set('STYLE', params.style)

  const legendOptions: Required<LegendOptions> = {
    fontName: options?.fontName ?? LEGEND_OPTIONS_DEFAULT.fontName,
    fontSize: options?.fontSize ?? LEGEND_OPTIONS_DEFAULT.fontSize,
    fontColor: options?.fontColor ?? LEGEND_OPTIONS_DEFAULT.fontColor,
    bgColor: options?.bgColor ?? LEGEND_OPTIONS_DEFAULT.bgColor,
    dpi: options?.dpi ?? LEGEND_OPTIONS_DEFAULT.dpi,
    forceLabels: options?.forceLabels ?? LEGEND_OPTIONS_DEFAULT.forceLabels,
  }
  url.searchParams.set(
    'LEGEND_OPTIONS',
    [
      `fontName:${legendOptions.fontName}`,
      `fontSize:${legendOptions.fontSize}`,
      `fontColor:${legendOptions.fontColor}`,
      `bgColor:${legendOptions.bgColor}`,
      `dpi:${legendOptions.dpi}`,
      `forceLabels:${legendOptions.forceLabels ? 'on' : 'off'}`,
    ].join(';'),
  )

  return url.toString()
}
