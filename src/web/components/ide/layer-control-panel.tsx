'use client'

import { CATEGORY_COLORS, CATEGORY_ORDER } from '@/web/lib/ide-config'
import {
  IconChevronDown,
  IconChevronRight,
  IconLoader2,
  IconMapPin,
  IconSearch,
  IconStack2,
  IconX,
} from '@tabler/icons-react'
import { useEffect, useMemo, useState } from 'react'
import { type LayerState } from './use-map-state'

interface LayerControlPanelProps {
  groupedLayers: Map<string, LayerState[]>
  activeLayers: LayerState[]
  loading: boolean
  error: string | null
  onToggle: (id: string) => void
  onOpacityChange: (id: string, opacity: number) => void
  onZoomToLayer: (id: string) => void
  onRetry?: () => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function LayerControlPanel({
  groupedLayers,
  activeLayers,
  loading,
  error,
  onToggle,
  onOpacityChange,
  onZoomToLayer,
  onRetry,
  open,
  onOpenChange,
}: LayerControlPanelProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false)
  const collapsed = open !== undefined ? !open : internalCollapsed
  const setCollapsed = (next: boolean) => {
    if (open !== undefined) {
      onOpenChange?.(!next)
    } else {
      setInternalCollapsed(next)
    }
  }
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (open !== undefined) return
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) setInternalCollapsed(true)
  }, [open])

  const toggleGroup = (category: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev)
      if (next.has(category)) {
        next.delete(category)
      } else {
        next.add(category)
      }
      return next
    })
  }

  const filteredGroups = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return groupedLayers

    const next = new Map<string, LayerState[]>()
    groupedLayers.forEach((layers, category) => {
      const filtered = layers.filter(
        (l) =>
          l.title.toLowerCase().includes(query) ||
          (l.abstract && l.abstract.toLowerCase().includes(query)),
      )
      if (filtered.length) next.set(category, filtered)
    })
    return next
  }, [groupedLayers, search])

  const categories = Array.from(filteredGroups.keys()).sort((a, b) => {
    const indexA = CATEGORY_ORDER.indexOf(a)
    const indexB = CATEGORY_ORDER.indexOf(b)
    if (indexA === -1 && indexB === -1) return a.localeCompare(b)
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    return indexA - indexB
  })

  return (
    <>
      {/* Mobile backdrop */}
      {!collapsed && (
        <div
          className="absolute inset-0 z-[999] bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      <div
        className={`border-base-300 bg-base-100/95 absolute right-0 bottom-0 left-0 z-[1000] flex max-h-[70vh] flex-col rounded-t-2xl border shadow-2xl backdrop-blur-md transition-all duration-300 ease-out md:top-4 md:right-auto md:bottom-auto md:left-4 md:max-h-[calc(100%-2rem)] md:rounded-2xl ${collapsed ? 'hidden h-14 md:flex md:h-auto md:w-14' : 'md:w-80'} `}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="border-base-300 hover:bg-base-200/50 active:bg-base-200 flex items-center justify-between gap-2 border-b p-3 transition-colors"
          title={collapsed ? 'Expandir panel de capas' : 'Colapsar panel de capas'}
        >
          <div className="flex items-center gap-2">
            <IconStack2 size={22} className="text-primary" />
            {!collapsed && <span className="text-sm font-bold tracking-tight">Capas</span>}
          </div>
          <div className="flex items-center gap-2">
            {!collapsed && loading && (
              <IconLoader2 size={18} className="text-primary animate-spin" />
            )}
            {!collapsed && !loading && (
              <span className="badge badge-primary badge-sm">{activeLayers.length}</span>
            )}
            {!collapsed && <IconX size={20} className="md:hidden" />}
            {!collapsed && <IconChevronDown size={18} className="hidden md:block" />}
          </div>
        </button>

        {!collapsed && (
          <div className="flex-1 overflow-y-auto overscroll-contain p-3">
            {/* Mobile drag handle */}
            <div className="mb-3 flex justify-center md:hidden">
              <div className="bg-base-300 h-1.5 w-12 rounded-full" />
            </div>

            {error && (
              <div className="alert alert-warning mb-3 p-2.5 text-sm">
                <svg
                  className="h-5 w-5 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span>{error}</span>
                {onRetry && (
                  <button onClick={onRetry} className="btn btn-ghost btn-xs ml-2">
                    Reintentar
                  </button>
                )}
              </div>
            )}

            <div className="relative mb-3">
              <IconSearch
                size={18}
                className="text-base-content/50 absolute top-1/2 left-3 -translate-y-1/2"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar capas..."
                className="input input-sm input-bordered w-full pl-9"
              />
            </div>

            {categories.length === 0 && !loading && (
              <p className="text-base-content/50 py-8 text-center text-sm">
                No hay capas disponibles.
              </p>
            )}

            {loading && categories.length === 0 && (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-base-200 mb-2 h-4 w-32 rounded" />
                    <div className="bg-base-200 h-12 w-full rounded-lg" />
                  </div>
                ))}
              </div>
            )}

            {categories.map((category) => {
              const layers = filteredGroups.get(category) || []
              const isGroupCollapsed = collapsedGroups.has(category)
              const activeCount = layers.filter((l) => l.visible).length
              return (
                <div key={category} className="mb-3">
                  <button
                    onClick={() => toggleGroup(category)}
                    className="hover:bg-base-200/70 active:bg-base-200 flex w-full items-center gap-2 rounded-lg p-2.5 text-sm font-semibold transition-colors"
                  >
                    <span
                      className={`ring-base-100 inline-block h-3 w-3 flex-shrink-0 rounded-full ring-2 ${
                        CATEGORY_COLORS[category] || 'bg-base-300'
                      }`}
                    />
                    {isGroupCollapsed ? (
                      <IconChevronRight size={16} className="text-base-content/50 flex-shrink-0" />
                    ) : (
                      <IconChevronDown size={16} className="text-base-content/50 flex-shrink-0" />
                    )}
                    <span className="truncate">{category}</span>
                    <span className="text-base-content/50 ml-auto flex-shrink-0 text-xs">
                      {activeCount > 0 ? (
                        <span className="badge badge-primary badge-xs gap-1">
                          {activeCount}/{layers.length}
                        </span>
                      ) : (
                        <span className="text-base-content/40">({layers.length})</span>
                      )}
                    </span>
                  </button>

                  {!isGroupCollapsed && (
                    <div className="mt-1.5 space-y-2 pl-2">
                      {layers.map((layer) => (
                        <div
                          key={layer.id}
                          className={`rounded-xl border p-2.5 transition-all duration-200 ${
                            layer.visible
                              ? 'border-primary/40 bg-primary/5 shadow-sm'
                              : 'border-base-200 hover:border-base-300'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <input
                              type="checkbox"
                              id={`layer-${layer.id}`}
                              checked={layer.visible}
                              onChange={() => onToggle(layer.id)}
                              className="checkbox checkbox-primary checkbox-sm mt-0.5 h-5 w-5"
                            />
                            <div className="min-w-0 flex-1">
                              <label
                                htmlFor={`layer-${layer.id}`}
                                className="block cursor-pointer text-sm leading-tight font-medium"
                                title={layer.abstract || layer.title}
                              >
                                {layer.title}
                              </label>
                              {layer.abstract && (
                                <p className="text-base-content/50 mt-0.5 line-clamp-2 text-xs">
                                  {layer.abstract}
                                </p>
                              )}
                              {layer.visible && (
                                <div className="mt-2.5">
                                  <div className="text-base-content/60 mb-1 flex items-center justify-between text-xs">
                                    <span>Opacidad</span>
                                    <span className="font-mono font-semibold">
                                      {Math.round((layer.opacity ?? 0.85) * 100)}%
                                    </span>
                                  </div>
                                  <input
                                    type="range"
                                    min={0}
                                    max={1}
                                    step={0.05}
                                    value={layer.opacity ?? 0.85}
                                    onChange={(e) =>
                                      onOpacityChange(layer.id, parseFloat(e.target.value))
                                    }
                                    className="range range-primary range-xs h-2"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                          {layer.visible && (
                            <div className="mt-2 flex justify-end">
                              <button
                                onClick={() => onZoomToLayer(layer.id)}
                                className="btn btn-ghost btn-xs gap-1 rounded-lg"
                                title="Zoom a la extensión de la capa"
                              >
                                <IconMapPin size={14} />
                                Zoom
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

            <div className="border-base-300 text-base-content/60 mt-3 flex items-center justify-between border-t pt-3 text-xs">
              <span>
                <span className="text-primary font-bold">{activeLayers.length}</span> capa
                {activeLayers.length === 1 ? '' : 's'} activa
                {activeLayers.length === 1 ? '' : 's'}
              </span>
              {activeLayers.length > 0 && (
                <button
                  onClick={() => activeLayers.forEach((l) => onToggle(l.id))}
                  className="btn btn-ghost btn-xs text-xs"
                >
                  Limpiar todo
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
