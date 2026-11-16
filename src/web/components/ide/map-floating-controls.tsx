'use client'

import { MAP_CENTER, MAP_ZOOM } from '@/web/lib/ide-config'
import {
  IconClick,
  IconCurrentLocation,
  IconMap,
  IconMap2,
  IconMapPin,
  IconMinus,
  IconPlus,
} from '@tabler/icons-react'
import type { PointerEvent, ReactNode } from 'react'
import { useMap } from 'react-leaflet'
import { toast } from 'sonner'

interface MapFloatingControlsProps {
  queryMode: boolean
  onToggleQueryMode: () => void
  onToggleLegend?: () => void
  onToggleBaseLayers?: () => void
  legendOpen?: boolean
  baseLayersOpen?: boolean
  concealed?: boolean
}

function stopMapGesture(event: PointerEvent<HTMLElement>) {
  event.stopPropagation()
}

export function MapFloatingControls({
  queryMode,
  onToggleQueryMode,
  onToggleLegend,
  onToggleBaseLayers,
  legendOpen,
  baseLayersOpen,
  concealed,
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
    <>
      <div
        className={`border-base-300 bg-base-100/95 absolute top-3 right-3 z-[1003] flex-col overflow-hidden rounded-2xl border shadow-lg backdrop-blur-md md:hidden ${
          concealed ? 'hidden' : 'flex'
        }`}
        onPointerDown={stopMapGesture}
      >
        <ZoomButton label="Acercar" onClick={() => map.zoomIn()}>
          <IconPlus size={20} />
        </ZoomButton>
        <ZoomButton label="Alejar" onClick={() => map.zoomOut()}>
          <IconMinus size={20} />
        </ZoomButton>
        <ZoomButton label="Centrar en San Benito" onClick={centerSanBenito}>
          <IconMapPin size={20} />
        </ZoomButton>
      </div>

      <div
        className={`pointer-events-none absolute inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[1003] md:hidden ${
          concealed ? 'hidden' : ''
        }`}
        onPointerDown={stopMapGesture}
      >
        <div className="border-base-300 bg-base-100/95 pointer-events-auto grid grid-cols-4 rounded-2xl border p-1 shadow-xl backdrop-blur-md">
          <DockButton label="Mapa" pressed={baseLayersOpen} onClick={onToggleBaseLayers}>
            <IconMap size={22} />
          </DockButton>
          <DockButton label="Consultar" pressed={queryMode} onClick={onToggleQueryMode}>
            <IconClick size={22} />
          </DockButton>
          <DockButton label="Leyenda" pressed={legendOpen} onClick={onToggleLegend}>
            <IconMap2 size={22} />
          </DockButton>
          <DockButton label="Ubicación" onClick={locateUser}>
            <IconCurrentLocation size={22} />
          </DockButton>
        </div>
      </div>

      <div
        className="pointer-events-none absolute top-6 right-6 z-[1003] hidden flex-col gap-2 md:flex"
        aria-label="Controles del mapa"
        onPointerDown={stopMapGesture}
      >
        <StackButton label="Mapas base" pressed={baseLayersOpen} onClick={onToggleBaseLayers}>
          <IconMap size={18} />
        </StackButton>
        <StackButton
          label={queryMode ? 'Desactivar modo consulta' : 'Activar modo consulta'}
          pressed={queryMode}
          onClick={onToggleQueryMode}
        >
          <IconClick size={18} />
        </StackButton>
        <StackButton label="Acercar" onClick={() => map.zoomIn()}>
          <IconPlus size={18} />
        </StackButton>
        <StackButton label="Alejar" onClick={() => map.zoomOut()}>
          <IconMinus size={18} />
        </StackButton>
        <StackButton
          label={legendOpen ? 'Cerrar leyenda' : 'Abrir leyenda'}
          pressed={legendOpen}
          onClick={onToggleLegend}
        >
          <IconMap2 size={18} />
        </StackButton>
        <StackButton label="Centrar en San Benito" onClick={centerSanBenito}>
          <IconMapPin size={18} />
        </StackButton>
        <StackButton label="Mi ubicación" onClick={locateUser}>
          <IconCurrentLocation size={18} />
        </StackButton>
      </div>
    </>
  )
}

function ZoomButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border-base-300 text-base-content active:bg-base-200 flex h-11 w-11 items-center justify-center border-b last:border-b-0"
      title={label}
      aria-label={label}
    >
      {children}
    </button>
  )
}

function DockButton({
  label,
  pressed,
  onClick,
  children,
}: {
  label: string
  pressed?: boolean
  onClick?: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 text-[11px] leading-none font-semibold ${
        pressed ? 'bg-primary text-primary-content' : 'text-base-content/80 active:bg-base-200'
      }`}
      title={label}
      aria-label={label}
      aria-pressed={pressed}
    >
      {children}
      {label}
    </button>
  )
}

function StackButton({
  label,
  pressed,
  onClick,
  children,
}: {
  label: string
  pressed?: boolean
  onClick?: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn btn-circle md:btn-md pointer-events-auto shadow-lg backdrop-blur ${
        pressed ? 'btn-primary' : 'btn-ghost bg-base-100/95'
      }`}
      title={label}
      aria-label={label}
      aria-pressed={pressed}
    >
      {children}
    </button>
  )
}
