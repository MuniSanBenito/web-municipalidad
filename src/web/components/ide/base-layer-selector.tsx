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

export function BaseLayerSelector({
  activeBaseLayer,
  onSelect,
  open,
  onClose,
}: BaseLayerSelectorProps) {
  if (!open) return null

  return (
    <>
      <div className="absolute inset-0 z-[1002] bg-black/25 md:bg-transparent" onClick={onClose} />

      <div className="border-base-300 bg-base-100/95 absolute inset-x-3 bottom-24 z-[1005] overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-md md:inset-x-auto md:top-6 md:right-20 md:bottom-auto md:left-auto md:w-[220px]">
        <div className="border-base-300 border-b px-3 py-2.5">
          <span className="text-sm font-bold">Mapas base</span>
        </div>

        <ul className="grid grid-cols-2 gap-1 p-2 md:flex md:flex-col md:gap-0 md:p-0">
          {BASE_LAYERS.map((layer) => (
            <li key={layer.id}>
              <button
                onClick={() => {
                  onSelect(layer.id)
                  onClose()
                }}
                className={`flex w-full flex-col items-stretch gap-2 rounded-xl px-2 py-2 text-left transition-colors md:flex-row md:items-center md:gap-3 md:rounded-none md:px-3 md:py-2 ${
                  layer.id === activeBaseLayer
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-base-200/60'
                }`}
              >
                <img
                  src={layer.thumbnail}
                  alt=""
                  className="border-base-300 h-16 w-full rounded-lg border object-cover md:h-9 md:w-9 md:flex-shrink-0"
                  loading="lazy"
                />
                <span className="flex items-center gap-2 text-sm font-medium">
                  {layer.label}
                  {layer.id === activeBaseLayer && (
                    <span className="bg-primary ml-auto h-2.5 w-2.5 flex-shrink-0 rounded-full" />
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
