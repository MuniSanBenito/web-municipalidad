'use client'

import { GEOSERVER_BASE_URL } from '@/web/lib/ide-config'
import { buildLegendUrl } from '@/web/lib/ide-wms'
import { IconChevronDown, IconChevronUp, IconMap2 } from '@tabler/icons-react'
import { useState } from 'react'
import { type LayerState } from './use-map-state'

interface LegendPanelProps {
  activeLayers: LayerState[]
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function LegendPanel({ activeLayers, open, onOpenChange }: LegendPanelProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(true)
  const collapsed = open !== undefined ? !open : internalCollapsed
  const setCollapsed = (next: boolean) => {
    if (open !== undefined) {
      onOpenChange?.(!next)
    } else {
      setInternalCollapsed(next)
    }
  }
  const hasLegend = activeLayers.length > 0

  return (
    <>
      {!collapsed && (
        <div
          className="absolute inset-0 z-[999] bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}
      <div
        className={`border-base-300 bg-base-100/95 absolute z-[1001] flex flex-col overflow-hidden border shadow-2xl backdrop-blur-md transition-all duration-300 ease-out md:right-4 md:bottom-4 md:max-h-[calc(50%-1rem)] md:rounded-2xl ${
          collapsed
            ? 'right-0 bottom-16 hidden h-12 rounded-tl-2xl md:flex md:w-auto'
            : 'right-0 bottom-0 left-0 max-h-[50vh] rounded-t-2xl md:right-4 md:bottom-4 md:w-72 md:rounded-2xl'
        } `}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="border-base-300 hover:bg-base-200/50 active:bg-base-200 flex items-center justify-between gap-2 border-b p-3 transition-colors"
          title={collapsed ? 'Expandir leyenda' : 'Colapsar leyenda'}
        >
          <div className="flex items-center gap-2">
            <IconMap2 size={20} className="text-primary" />
            {!collapsed && <span className="text-sm font-bold tracking-tight">Leyenda</span>}
          </div>
          <div className="flex items-center gap-2">
            {!collapsed && hasLegend && (
              <span className="badge badge-primary badge-sm">{activeLayers.length}</span>
            )}
            {collapsed ? (
              <IconChevronUp size={18} className="md:hidden" />
            ) : (
              <IconChevronDown size={18} className="md:hidden" />
            )}
            <IconChevronDown
              size={18}
              className={`hidden transition-transform duration-200 md:block ${collapsed ? '' : 'rotate-180'}`}
            />
          </div>
        </button>

        {!collapsed && (
          <div className="flex-1 overflow-y-auto overscroll-contain p-3">
            {!hasLegend && (
              <p className="text-base-content/50 py-6 text-center text-sm">
                Activá una capa para ver su leyenda.
              </p>
            )}
            <div className="space-y-4">
              {activeLayers.map((layer) => (
                <div key={layer.id} className="border-base-200 rounded-lg border p-2">
                  <h4 className="mb-2 text-sm font-semibold">{layer.title}</h4>
                  <img
                    src={buildLegendUrl(GEOSERVER_BASE_URL, layer.name, layer.defaultStyle || '')}
                    alt={`Leyenda ${layer.title}`}
                    className="border-base-200 max-w-full rounded border bg-white p-1"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
