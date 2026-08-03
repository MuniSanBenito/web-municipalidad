'use client'

import { useLegend, type LegendLayer } from '@/web/hooks/useLegend'
import { GEOSERVER_WORKSPACE } from '@/web/lib/ide-config'
import { IconChevronDown, IconGripVertical, IconMap2, IconX } from '@tabler/icons-react'
import { useEffect, useMemo, useRef, useState } from 'react'

export interface MapLegendProps {
  geoserverUrl: string
  workspace?: string
  layerName?: string
  style?: string
  activeLayers?: LegendLayer[]
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function MapLegend({
  geoserverUrl,
  workspace = GEOSERVER_WORKSPACE,
  layerName,
  style,
  activeLayers,
  open,
  onOpenChange,
}: MapLegendProps) {
  const layers = useMemo<LegendLayer[]>(
    () =>
      activeLayers?.map((layer) => ({ ...layer, workspace: layer.workspace ?? workspace })) ??
      (layerName ? [{ id: layerName, title: layerName, layerName, workspace, style }] : []),
    [activeLayers, layerName, style, workspace],
  )
  const [internalOpen, setInternalOpen] = useState(false)
  const isOpen = open ?? internalOpen
  const { states, markLoaded, markError } = useLegend(layers, geoserverUrl, undefined, isOpen)

  const [position, setPosition] = useState<{ x: number; y: number }>()
  const panelRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; y: number; left: number; top: number } | undefined>(undefined)

  const setOpen = (next: boolean) => {
    if (open === undefined) setInternalOpen(next)
    onOpenChange?.(next)
  }

  useEffect(() => {
    if (!isOpen) setPosition(undefined)
  }, [isOpen])

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia('(max-width: 768px)').matches) return
    const rect = panelRef.current?.getBoundingClientRect()
    if (!rect) return
    drag.current = { x: event.clientX, y: event.clientY, left: rect.left, top: rect.top }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return
    setPosition({
      x: drag.current.left + event.clientX - drag.current.x,
      y: drag.current.top + event.clientY - drag.current.y,
    })
  }

  const handlePointerUp = () => {
    drag.current = undefined
  }

  const panelStyle = position
    ? { left: position.x, top: position.y, right: 'auto', bottom: 'auto' }
    : undefined

  return (
    <>
      {isOpen && (
        <div
          className="absolute inset-0 z-[999] bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <section
        ref={panelRef}
        style={panelStyle}
        className={`bg-base-100/95 border-base-300 absolute z-[1001] flex max-h-[50vh] flex-col overflow-hidden border shadow-2xl backdrop-blur-md ${
          isOpen
            ? 'right-0 bottom-0 left-0 rounded-t-2xl md:right-4 md:bottom-4 md:left-auto md:w-80 md:rounded-2xl'
            : 'right-0 bottom-16 hidden h-12 rounded-tl-2xl md:right-4 md:bottom-4 md:left-auto md:flex md:w-auto'
        }`}
        aria-label="Leyenda del mapa"
      >
        <header className="border-base-300 flex items-center gap-2 border-b p-3">
          <div
            className="hidden cursor-grab touch-none active:cursor-grabbing md:block"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            title="Arrastrar leyenda"
            aria-label="Arrastrar leyenda"
          >
            <IconGripVertical size={16} className="text-base-content/40" />
          </div>
          <IconMap2 size={20} className="text-primary" />
          <span className="text-sm font-bold">Leyenda</span>
          <span className="badge badge-primary badge-sm ml-auto">{layers.length}</span>
          {isOpen && (
            <button
              onClick={() => setOpen(false)}
              className="btn btn-ghost btn-xs btn-square"
              aria-label="Ocultar leyenda"
            >
              <IconX size={16} />
            </button>
          )}
          <button
            onClick={() => setOpen(!isOpen)}
            className="btn btn-ghost btn-xs btn-square"
            aria-label={isOpen ? 'Colapsar leyenda' : 'Mostrar leyenda'}
          >
            <IconChevronDown className={isOpen ? 'rotate-180' : ''} size={18} />
          </button>
        </header>

        {isOpen && (
          <div className="space-y-4 overflow-y-auto p-3">
            {layers.length === 0 && (
              <p className="text-base-content/60 py-5 text-center text-sm">
                Activá una capa para ver su leyenda.
              </p>
            )}
            {layers.map((layer) => {
              const state = states[layer.id]
              return (
                <article key={layer.id} className="border-base-200 rounded-lg border p-2">
                  <h3 className="mb-2 text-sm font-semibold">{layer.title}</h3>
                  {!state || state.status === 'loading' ? (
                    <div className="relative min-h-16">
                      <div className="animate-pulse space-y-2">
                        <div className="bg-base-200 h-3 w-3/4 rounded" />
                        <div className="bg-base-200 h-12 w-full rounded" />
                      </div>
                      {state && (
                        <img
                          src={state.url}
                          alt={`Leyenda ${layer.title}`}
                          className="border-base-200 absolute top-0 left-0 max-w-full rounded border bg-white p-1"
                          onLoad={() => markLoaded(layer.id, state.url)}
                          onError={() => markError(layer.id, state.url)}
                        />
                      )}
                    </div>
                  ) : state.status === 'error' ? (
                    <p className="text-base-content/60 text-sm">No hay leyenda disponible.</p>
                  ) : (
                    <img
                      src={state.url}
                      alt={`Leyenda ${layer.title}`}
                      className="border-base-200 max-w-full rounded border bg-white p-1"
                      onLoad={() => markLoaded(layer.id, state.url)}
                      onError={() => markError(layer.id, state.url)}
                    />
                  )}
                </article>
              )
            })}
          </div>
        )}
      </section>
    </>
  )
}
