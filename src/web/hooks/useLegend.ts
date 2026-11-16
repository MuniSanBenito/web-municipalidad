'use client'

import { buildLegendUrl } from '@/web/lib/ide-wms'
import { useEffect, useMemo, useState } from 'react'
import { type LegendOptions } from '../types/geoserver'

export interface LegendLayer {
  id: string
  title: string
  layerName: string
  workspace?: string
  style?: string
}

export interface LegendState {
  id: string
  url: string
  status: 'loading' | 'loaded' | 'error'
}

const cache = new Set<string>()

const defaultOptions: LegendOptions = {
  fontName: 'Arial',
  fontSize: 10,
  fontColor: '0x333333',
  bgColor: '0xFFFFFF',
  dpi: 96,
  forceLabels: true,
}

export function useLegend(
  layers: LegendLayer[],
  geoserverUrl: string,
  options: LegendOptions = defaultOptions,
  enabled = true,
) {
  const urls = useMemo(
    () =>
      (enabled ? layers : []).map((layer) => ({
        id: layer.id,
        url: buildLegendUrl(
          geoserverUrl,
          {
            workspace: layer.workspace,
            layerName: layer.layerName,
            style: layer.style,
          },
          options,
        ),
      })),
    [enabled, geoserverUrl, layers, options],
  )

  const [states, setStates] = useState<Record<string, LegendState>>({})

  useEffect(() => {
    setStates((previous) => {
      const next: Record<string, LegendState> = {}
      for (const item of urls) {
        next[item.id] = {
          id: item.id,
          url: item.url,
          status: cache.has(item.url) ? 'loaded' : 'loading',
        }
      }
      return next
    })
  }, [urls])

  const markLoaded = (id: string, url: string) => {
    cache.add(url)
    setStates((previous) => ({
      ...previous,
      [id]: { id, url, status: 'loaded' },
    }))
  }

  const markError = (id: string, url: string) => {
    setStates((previous) => ({
      ...previous,
      [id]: { id, url, status: 'error' },
    }))
  }

  return { states, markLoaded, markError }
}
