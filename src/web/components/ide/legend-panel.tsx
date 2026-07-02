'use client'

import { GEOSERVER_BASE_URL } from '@/web/lib/ide-config'
import { buildLegendUrl } from '@/web/lib/ide-wms'
import { IconChevronDown, IconChevronUp, IconMap2 } from '@tabler/icons-react'
import { useState } from 'react'
import { type LayerState } from './use-map-state'

interface LegendPanelProps {
  activeLayers: LayerState[]
}

export function LegendPanel({ activeLayers }: LegendPanelProps) {
  const [collapsed, setCollapsed] = useState(true)
  const hasLegend = activeLayers.length > 0

  return (
    <div
      className={`
        absolute z-[1001] flex flex-col overflow-hidden border border-base-300 bg-base-100/95 shadow-2xl backdrop-blur-md transition-all duration-300 ease-out
        bottom-16 right-0 max-h-[35vh] rounded-tl-2xl
        md:bottom-4 md:right-4 md:max-h-[calc(50%-1rem)] md:rounded-2xl
        ${collapsed ? 'h-12 md:w-auto' : 'md:w-72'}
      `}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-between gap-2 border-b border-base-300 p-3 transition-colors hover:bg-base-200/50 active:bg-base-200"
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
        <div className="flex-1 overflow-y-auto p-3 overscroll-contain">
          {!hasLegend && (
            <p className="py-6 text-center text-sm text-base-content/50">
              Activá una capa para ver su leyenda.
            </p>
          )}
          <div className="space-y-4">
            {activeLayers.map((layer) => (
              <div key={layer.id} className="rounded-lg border border-base-200 p-2">
                <h4 className="mb-2 text-sm font-semibold">{layer.title}</h4>
                <img
                  src={buildLegendUrl(GEOSERVER_BASE_URL, layer.name, layer.defaultStyle || '')}
                  alt={`Leyenda ${layer.title}`}
                  className="max-w-full rounded border border-base-200 bg-white p-1"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
