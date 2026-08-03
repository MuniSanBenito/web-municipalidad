'use client'

import { GEOSERVER_BASE_URL, GEOSERVER_WORKSPACE } from '@/web/lib/ide-config'
import { buildCqlEqualsFilter, fetchWfsAttributes, type WfsAttributeData } from '@/web/lib/ide-wms'
import { IconFilter, IconLoader2, IconX } from '@tabler/icons-react'
import { useEffect, useMemo, useState } from 'react'
import { type LayerState } from './use-map-state'

interface LayerFilterControlProps {
  layer: LayerState
  cqlFilter?: string
  onApply: (filter: string | undefined) => void
}

export function LayerFilterControl({ layer, cqlFilter, onApply }: LayerFilterControlProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [attributes, setAttributes] = useState<WfsAttributeData | null>(null)
  const [field, setField] = useState('')
  const [value, setValue] = useState('')

  const values = useMemo(
    () => (field ? (attributes?.values[field] ?? []) : []),
    [attributes, field],
  )

  useEffect(() => {
    if (!open || attributes) return
    let cancelled = false
    setLoading(true)
    setError(null)
    fetchWfsAttributes(GEOSERVER_BASE_URL, {
      workspace: GEOSERVER_WORKSPACE,
      layerName: layer.name,
    })
      .then((data) => {
        if (cancelled) return
        setAttributes(data)
        setField(data.fields[0] ?? '')
      })
      .catch(() => {
        if (!cancelled) setError('No se pudieron leer los campos desde WFS.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [attributes, layer.name, open])

  const handleApply = () => {
    if (field && value) onApply(buildCqlEqualsFilter(field, value))
  }

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`btn btn-ghost btn-xs gap-1 ${cqlFilter ? 'text-primary' : ''}`}
        aria-expanded={open}
      >
        <IconFilter size={14} />
        {cqlFilter ? 'Filtro activo' : 'Filtrar'}
      </button>

      {open && (
        <div className="border-base-200 bg-base-200/40 mt-2 space-y-2 rounded-lg border p-2">
          {loading && (
            <div className="text-base-content/60 flex items-center gap-2 text-xs">
              <IconLoader2 size={14} className="animate-spin" />
              Leyendo campos y valores desde WFS...
            </div>
          )}
          {error && <p className="text-error text-xs">{error}</p>}
          {attributes && attributes.fields.length === 0 && (
            <p className="text-base-content/60 text-xs">La capa no tiene atributos disponibles.</p>
          )}
          {attributes && attributes.fields.length > 0 && (
            <>
              <select
                value={field}
                onChange={(event) => {
                  setField(event.target.value)
                  setValue('')
                }}
                className="select select-bordered select-xs w-full"
                aria-label={`Campo para filtrar ${layer.title}`}
              >
                {attributes.fields.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <select
                value={value}
                onChange={(event) => setValue(event.target.value)}
                className="select select-bordered select-xs w-full"
                aria-label={`Valor para filtrar ${layer.title}`}
              >
                <option value="">Seleccionar valor...</option>
                {values.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <div className="flex justify-end gap-1">
                <button
                  type="button"
                  onClick={handleApply}
                  disabled={!field || !value}
                  className="btn btn-primary btn-xs"
                >
                  Aplicar
                </button>
                {cqlFilter && (
                  <button
                    type="button"
                    onClick={() => onApply(undefined)}
                    className="btn btn-ghost btn-xs gap-1"
                  >
                    <IconX size={12} /> Quitar
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
