'use client'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect, useMemo, useRef } from 'react'
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet'

const CENTRO_SAN_BENITO: [number, number] = [-31.781, -60.431]

type Punto = {
  lat: number
  lng: number
}

type Props = {
  punto: Punto | null
  editable: boolean
  onMarcar: (lat: number, lng: number) => void
}

function AjustarTamano() {
  const map = useMap()

  useEffect(() => {
    const ajustar = () => map.invalidateSize()
    const primero = window.setTimeout(ajustar, 0)
    const segundo = window.setTimeout(ajustar, 300)
    window.addEventListener('resize', ajustar)
    return () => {
      window.clearTimeout(primero)
      window.clearTimeout(segundo)
      window.removeEventListener('resize', ajustar)
    }
  }, [map])

  return null
}

function SeguirPunto({ punto }: { punto: Punto | null }) {
  const map = useMap()
  const yaCentro = useRef(false)

  useEffect(() => {
    if (!punto || yaCentro.current) return
    yaCentro.current = true
    map.setView([punto.lat, punto.lng], 16)
  }, [map, punto])

  return null
}

function Clic({
  editable,
  onMarcar,
}: {
  editable: boolean
  onMarcar: (lat: number, lng: number) => void
}) {
  const clicPendiente = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (clicPendiente.current) window.clearTimeout(clicPendiente.current)
    },
    [],
  )

  useMapEvents({
    click(event) {
      if (!editable) return
      const origen = event.originalEvent.target
      if (origen instanceof Element && origen.closest('.leaflet-control')) return

      if (clicPendiente.current) window.clearTimeout(clicPendiente.current)
      const { lat, lng } = event.latlng
      clicPendiente.current = window.setTimeout(() => {
        clicPendiente.current = null
        onMarcar(lat, lng)
      }, 250)
    },
    dblclick() {
      if (!clicPendiente.current) return
      window.clearTimeout(clicPendiente.current)
      clicPendiente.current = null
    },
  })
  return null
}

export function MapaLocalizacion({ punto, editable, onMarcar }: Props) {
  const icono = useMemo(
    () =>
      L.divIcon({
        className: 'mapa-localizacion__pin',
        html: '<span class="mapa-localizacion__punto"></span>',
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      }),
    [],
  )

  return (
    <MapContainer
      center={punto ? [punto.lat, punto.lng] : CENTRO_SAN_BENITO}
      zoom={punto ? 16 : 14}
      scrollWheelZoom
      doubleClickZoom
      zoomControl
      className="mapa-localizacion__mapa"
    >
      <TileLayer
        attribution="© Instituto Geográfico Nacional"
        url="https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{y}.png"
        tms
        maxZoom={18}
        maxNativeZoom={18}
      />
      <AjustarTamano />
      <SeguirPunto punto={punto} />
      <Clic editable={editable} onMarcar={onMarcar} />
      {punto && (
        <Marker
          position={[punto.lat, punto.lng]}
          icon={icono}
          draggable={editable}
          eventHandlers={{
            dragend: (event) => {
              const marcador = event.target as L.Marker
              const coords = marcador.getLatLng()
              onMarcar(coords.lat, coords.lng)
            },
          }}
        />
      )}
    </MapContainer>
  )
}
