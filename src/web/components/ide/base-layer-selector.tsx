'use client'

export interface BaseLayerDef {
  id: string
  label: string
  thumbnail: string
  url: string
  tms?: boolean
  attribution?: string
  maxNativeZoom?: number
}

export const BASE_LAYERS: BaseLayerDef[] = [
  {
    id: 'argenmap',
    label: 'Argenmap',
    thumbnail:
      'https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/0/0/0.png',
    url: 'https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{y}.png',
    tms: true,
    maxNativeZoom: 18,
  },
  {
    id: 'argenmap_gris',
    label: 'Argenmap gris',
    thumbnail:
      'https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/mapabase_gris@EPSG%3A3857@png/0/0/0.png',
    url: 'https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/mapabase_gris@EPSG%3A3857@png/{z}/{x}/{y}.png',
    tms: true,
    maxNativeZoom: 18,
  },
  {
    id: 'esri_imagery',
    label: 'Satelital Esri',
    thumbnail:
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/1/0/0',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    maxNativeZoom: 19,
  },
  {
    id: 'openstreetmap',
    label: 'OpenStreetMap',
    thumbnail: 'https://tile.openstreetmap.org/1/0/0.png',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxNativeZoom: 19,
  },
]

interface BaseLayerSelectorProps {
  activeBaseLayer: string
  onSelect: (id: string) => void
  open: boolean
  onClose: () => void
}

export function BaseLayerSelector({ activeBaseLayer, onSelect, open, onClose }: BaseLayerSelectorProps) {
  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[1001]"
        onClick={onClose}
      />

      {/* Dropdown panel positioned to the left of the controls bar */}
      <div className="absolute right-3 top-20 z-[1002] w-[200px] overflow-hidden rounded-xl border border-base-300 bg-base-100/95 shadow-2xl backdrop-blur-md md:right-6 md:top-6">
        <div className="border-b border-base-300 px-3 py-2">
          <span className="text-sm font-bold">Mapas base</span>
        </div>

        <ul>
          {BASE_LAYERS.map((layer) => (
            <li key={layer.id}>
              <button
                onClick={() => {
                  onSelect(layer.id)
                  onClose()
                }}
                className={`flex w-full items-center gap-3 px-3 py-2 text-left transition-colors ${
                  layer.id === activeBaseLayer
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-base-200/60'
                }`}
              >
                <img
                  src={layer.thumbnail}
                  alt={layer.label}
                  className="h-9 w-9 flex-shrink-0 rounded-md border border-base-300 object-cover"
                  loading="lazy"
                />
                <span className="text-sm font-medium">{layer.label}</span>
                {layer.id === activeBaseLayer && (
                  <span className="ml-auto h-2.5 w-2.5 flex-shrink-0 rounded-full bg-primary" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}