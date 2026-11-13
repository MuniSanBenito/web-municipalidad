'use client'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect, useMemo } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

export type ComercioEnMapa = {
  id: string
  nombre: string
  direccion: string
  rubro: string | null
  lat: number
  lng: number
}

const CENTRO_SAN_BENITO: [number, number] = [-31.781, -60.431]

type Props = {
  comercios: ComercioEnMapa[]
}

function Encuadrar({ puntos }: { puntos: [number, number][] }) {
  const map = useMap()

  useEffect(() => {
    const encuadrar = () => {
      map.invalidateSize()
      if (puntos.length === 0) {
        map.setView(CENTRO_SAN_BENITO, 14)
        return
      }
      if (puntos.length === 1) {
        map.setView(puntos[0], 16)
        return
      }
      map.fitBounds(puntos, { padding: [36, 36], maxZoom: 16 })
    }

    const id = window.setTimeout(encuadrar, 0)
    return () => window.clearTimeout(id)
  }, [map, puntos])

  return null
}

export function MapaComercios({ comercios }: Props) {
  const icono = useMemo(
    () =>
      L.divIcon({
        className: 'mapa-comercio-pin',
        html: '<span class="mapa-comercio-pin__punto"></span>',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
        popupAnchor: [0, -12],
      }),
    [],
  )

  const puntos = useMemo(
    () => comercios.map((comercio) => [comercio.lat, comercio.lng] as [number, number]),
    [comercios],
  )

  return (
    <div
      className="mapa-comercios relative z-0 h-80 overflow-hidden rounded-lg md:h-[28rem]"
      role="region"
      aria-label="Mapa de comercios habilitados"
    >
      <style>{`
        .mapa-comercios .leaflet-container {
          height: 100%;
          width: 100%;
          background: #e7e4da;
          font-family: inherit;
        }
        .mapa-comercios .leaflet-container img {
          max-width: none !important;
          max-height: none !important;
        }
        .mapa-comercio-pin {
          background: transparent;
          border: 0;
        }
        .mapa-comercio-pin__punto {
          display: block;
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          background: #076633;
          border: 2px solid #fff;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
        }
      `}</style>
      <MapContainer
        center={CENTRO_SAN_BENITO}
        zoom={14}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution="© Instituto Geográfico Nacional"
          url="https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{y}.png"
          tms
          maxZoom={18}
          maxNativeZoom={18}
        />
        <Encuadrar puntos={puntos} />
        {comercios.map((comercio) => (
          <Marker key={comercio.id} position={[comercio.lat, comercio.lng]} icon={icono}>
            <Popup>
              <div className="space-y-1">
                <p className="font-semibold">{comercio.nombre}</p>
                {comercio.rubro && <p className="text-xs">{comercio.rubro}</p>}
                <p className="text-xs">{comercio.direccion}</p>
                <a
                  href={`/tramites/habilitaciones/comercios-habilitados/${comercio.id}`}
                  className="text-xs font-medium underline"
                >
                  Ver ficha
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
