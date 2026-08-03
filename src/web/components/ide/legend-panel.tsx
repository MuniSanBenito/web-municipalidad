'use client'

import { MapLegend } from '@/web/components/map/MapLegend'
import { type LegendLayer } from '@/web/hooks/useLegend'
import { GEOSERVER_BASE_URL, GEOSERVER_WORKSPACE } from '@/web/lib/ide-config'
import { type LayerState } from './use-map-state'

interface LegendPanelProps {
  activeLayers: LayerState[]
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

/** Adaptador fino para conservar la integración actual del visor. */
export function LegendPanel({ activeLayers, open, onOpenChange }: LegendPanelProps) {
  const layers: LegendLayer[] = activeLayers.map((layer) => ({
    id: layer.id,
    title: layer.title,
    layerName: layer.name,
    style: layer.defaultStyle || '',
  }))

  return (
    <MapLegend
      geoserverUrl={GEOSERVER_BASE_URL}
      workspace={GEOSERVER_WORKSPACE}
      activeLayers={layers}
      open={open}
      onOpenChange={onOpenChange}
    />
  )
}
