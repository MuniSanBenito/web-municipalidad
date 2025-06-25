'use client'
import { MapaColectivos } from '@/web/components/mapa-colectivos'
import { useState } from 'react'

const LINEAS_COLECTIVOS = ['4', '20', '22', 'AM'] as const
export type LineasColectivos = (typeof LINEAS_COLECTIVOS)[number]

export function LineasColectivos() {
  const [lineaSeleccionada, setLineaSeleccionada] = useState<LineasColectivos>('4')

  return (
    <>
      <div className="mt-4">
        <label className="block text-lg font-semibold">Selecciona una línea de colectivo:</label>
        <select
          value={lineaSeleccionada}
          onChange={(e) => setLineaSeleccionada(e.target.value as LineasColectivos)}
          className="rounded-md border p-2"
        >
          {LINEAS_COLECTIVOS.map((linea) => (
            <option key={linea} value={linea}>
              Línea {linea}
            </option>
          ))}
        </select>
      </div>

      {/* Mapa con la línea seleccionada */}
      <div className="mt-6">
        <MapaColectivos lineaSeleccionada={lineaSeleccionada} />
      </div>
    </>
  )
}
