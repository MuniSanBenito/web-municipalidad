'use client'

import { MAP_CENTER, MAP_ZOOM } from '@/web/lib/ide-config'
import {
  IconClick,
  IconCurrentLocation,
  IconMap2,
  IconMapPin,
  IconMinus,
  IconPlus,
  IconStack2,
} from '@tabler/icons-react'
import { useMap } from 'react-leaflet'
import { toast } from 'sonner'

interface MapFloatingControlsProps {
  queryMode: boolean
  onToggleQueryMode: () => void
  onToggleLayers?: () => void
  onToggleLegend?: () => void
  layersOpen?: boolean
  legendOpen?: boolean
}

export function MapFloatingControls({
  queryMode,
  onToggleQueryMode,
  onToggleLayers,
  onToggleLegend,
  layersOpen,
  legendOpen,
}: MapFloatingControlsProps) {
  const map = useMap()

  const centerSanBenito = () => {
    map.flyTo([MAP_CENTER.lat, MAP_CENTER.lng], MAP_ZOOM, { duration: 1.5 })
  }

  const locateUser = () => {
    if (!('geolocation' in navigator)) {
      toast.error('La geolocalización no está disponible en este dispositivo.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        map.flyTo([position.coords.latitude, position.coords.longitude], 16, { duration: 1.5 })
      },
      () => {
        toast.error('No se pudo obtener tu ubicación. Verificá los permisos.')
      },
    )
  }

  return (
    <div
      className="pointer-events-none absolute top-20 left-3 z-[1003] flex flex-col gap-2 md:top-6 md:left-6"
      aria-label="Controles del mapa"
    >
      <button
        onClick={onToggleQueryMode}
        className={`btn btn-circle btn-sm md:btn-md pointer-events-auto shadow-lg backdrop-blur ${
          queryMode ? 'btn-primary' : 'btn-ghost bg-base-100/95'
        }`}
        title={queryMode ? 'Desactivar modo consulta' : 'Activar modo consulta'}
        aria-pressed={queryMode}
      >
        <IconClick size={18} />
      </button>

      <button
        onClick={() => map.zoomIn()}
        className="btn btn-circle btn-sm bg-base-100/95 md:btn-md pointer-events-auto shadow-lg backdrop-blur"
        title="Acercar"
      >
        <IconPlus size={18} />
      </button>

      <button
        onClick={() => map.zoomOut()}
        className="btn btn-circle btn-sm bg-base-100/95 md:btn-md pointer-events-auto shadow-lg backdrop-blur"
        title="Alejar"
      >
        <IconMinus size={18} />
      </button>

      <button
        onClick={onToggleLayers}
        className={`btn btn-circle btn-sm md:btn-md pointer-events-auto shadow-lg backdrop-blur md:hidden ${
          layersOpen ? 'btn-primary' : 'btn-ghost bg-base-100/95'
        }`}
        title={layersOpen ? 'Cerrar capas' : 'Abrir capas'}
      >
        <IconStack2 size={18} />
      </button>

      <button
        onClick={onToggleLegend}
        className={`btn btn-circle btn-sm md:btn-md pointer-events-auto shadow-lg backdrop-blur md:hidden ${
          legendOpen ? 'btn-primary' : 'btn-ghost bg-base-100/95'
        }`}
        title={legendOpen ? 'Cerrar leyenda' : 'Abrir leyenda'}
      >
        <IconMap2 size={18} />
      </button>

      <button
        onClick={centerSanBenito}
        className="btn btn-circle btn-sm bg-base-100/95 md:btn-md pointer-events-auto shadow-lg backdrop-blur"
        title="Centrar en San Benito"
      >
        <IconMapPin size={18} />
      </button>

      <button
        onClick={locateUser}
        className="btn btn-circle btn-sm bg-base-100/95 md:btn-md pointer-events-auto shadow-lg backdrop-blur"
        title="Mi ubicación"
      >
        <IconCurrentLocation size={18} />
      </button>
    </div>
  )
}
