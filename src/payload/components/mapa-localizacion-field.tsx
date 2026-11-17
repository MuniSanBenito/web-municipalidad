'use client'

import { Button, FieldDescription, FieldError, FieldLabel, useField } from '@payloadcms/ui'
import type { PointFieldClientComponent } from 'payload'
import dynamic from 'next/dynamic'

const Mapa = dynamic(() => import('./mapa-localizacion').then((modulo) => modulo.MapaLocalizacion), {
  ssr: false,
  loading: () => <div className="mapa-localizacion__cargando">Cargando mapa…</div>,
})

function puntoDesdeValor(value: unknown): { lat: number; lng: number } | null {
  if (!Array.isArray(value) || value.length < 2) return null
  const lng = value[0]
  const lat = value[1]
  if (typeof lng !== 'number' || typeof lat !== 'number') return null
  if (!Number.isFinite(lng) || !Number.isFinite(lat)) return null
  return { lat, lng }
}

function redondear(valor: number): number {
  return Number(valor.toFixed(6))
}

export const MapaLocalizacionField: PointFieldClientComponent = ({
  field,
  path: pathFromProps,
  readOnly,
}) => {
  const { disabled, path, setValue, showError, value } = useField<unknown>({
    potentiallyStalePath: pathFromProps,
  })
  const punto = puntoDesdeValor(value)
  const bloqueado = Boolean(readOnly || disabled)

  const marcar = (lat: number, lng: number) => {
    if (bloqueado) return
    // Payload guarda el punto como [longitud, latitud].
    setValue([redondear(lng), redondear(lat)])
  }

  return (
    <div className="field-type mapa-localizacion">
      <style>{`
        .mapa-localizacion__lienzo,
        .mapa-localizacion__cargando {
          height: 360px;
          margin-top: 8px;
          overflow: hidden;
          border: 1px solid var(--theme-elevation-150);
          border-radius: 4px;
          background: var(--theme-elevation-50);
        }
        .mapa-localizacion__cargando {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mapa-localizacion__mapa {
          height: 100%;
          width: 100%;
          background: #e7e4da;
          cursor: crosshair;
        }
        .mapa-localizacion__lienzo .leaflet-container img,
        .mapa-localizacion__lienzo .leaflet-tile {
          max-width: none !important;
          max-height: none !important;
        }
        .mapa-localizacion__lienzo .leaflet-control-zoom {
          border: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
        }
        .mapa-localizacion__lienzo .leaflet-control-zoom a {
          width: 34px;
          height: 34px;
          line-height: 34px;
          display: block;
          text-align: center;
          text-decoration: none;
          color: #222;
          background: #fff;
          font-size: 20px;
          font-weight: 700;
        }
        .mapa-localizacion__lienzo .leaflet-control-zoom a:hover {
          background: #f4f4f4;
        }
        .mapa-localizacion__pin {
          background: transparent;
          border: 0;
        }
        .mapa-localizacion__punto {
          display: block;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: #076633;
          border: 2px solid #fff;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
        }
        .mapa-localizacion__estado {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          margin-top: 8px;
        }
        .mapa-localizacion__coords {
          margin: 0;
        }
      `}</style>
      <FieldLabel label={field.label} path={path} required={field.required} />
      <div className="mapa-localizacion__lienzo">
        <Mapa punto={punto} editable={!bloqueado} onMarcar={marcar} />
      </div>
      <div className="mapa-localizacion__estado">
        <p className="mapa-localizacion__coords">
          {punto
            ? `Latitud ${punto.lat.toFixed(6)} · Longitud ${punto.lng.toFixed(6)}`
            : 'Acercá con la rueda o con + y −, y hacé clic sobre el local.'}
        </p>
        {punto && !bloqueado && (
          <Button buttonStyle="secondary" size="small" type="button" onClick={() => setValue(null)}>
            Quitar punto
          </Button>
        )}
        {punto && (
          <a
            href={`https://www.google.com/maps?q=${punto.lat},${punto.lng}`}
            target="_blank"
            rel="noreferrer"
          >
            Ver en Google Maps
          </a>
        )}
      </div>
      <FieldError path={path} showError={showError} />
      <FieldDescription description={field.admin?.description} path={path} />
    </div>
  )
}
