'use client'

import {
  GEOSERVER_BASE_URL,
  MAP_CENTER,
  MAP_ZOOM,
  type IdeLayerConfig,
} from '@/web/lib/ide-config'
import {
  fetchWmsCapabilities,
  mergeWithDefaults,
  type FeatureInfoResponse,
  type WmsLayer,
} from '@/web/lib/ide-wms'
import { useCallback, useEffect, useMemo, useState } from 'react'

export interface LayerState extends IdeLayerConfig {
  id: string
  loading: boolean
  error: boolean
}

export interface MapState {
  center: { lat: number; lng: number }
  zoom: number
  layers: LayerState[]
  loadingLayers: boolean
  capabilitiesError: string | null
  fitTo?: [number, number, number, number]
}

export interface FeatureInfoState {
  lat: number
  lng: number
  loading: boolean
  data: FeatureInfoResponse | null
  error: string | null
}

export function useMapState() {
  const [center, setCenter] = useState(MAP_CENTER)
  const [zoom, setZoom] = useState(MAP_ZOOM)
  const [layers, setLayers] = useState<LayerState[]>([])
  const [loadingLayers, setLoadingLayers] = useState(true)
  const [capabilitiesError, setCapabilitiesError] = useState<string | null>(null)
  const [discoveredCapabilities, setDiscoveredCapabilities] = useState<WmsLayer[]>([])
  const [fitTo, setFitTo] = useState<[number, number, number, number] | undefined>(undefined)
  const [featureInfo, setFeatureInfo] = useState<FeatureInfoState | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadCapabilities() {
      try {
        const capabilities = await fetchWmsCapabilities(GEOSERVER_BASE_URL)
        if (cancelled) return

        setDiscoveredCapabilities(capabilities.layers)
        const merged = mergeWithDefaults(capabilities.layers, [])
        const withState = merged.map((l) => ({
          ...l,
          id: l.name,
          loading: false,
          error: false,
        }))

        setLayers((prev) => {
          const prevMap = new Map(prev.map((p) => [p.name, p]))
          return withState.map((l) => {
            const existing = prevMap.get(l.name)
            if (existing) {
              return { ...l, visible: existing.visible, opacity: existing.opacity }
            }
            return l
          })
        })
        setCapabilitiesError(null)
      } catch (error) {
        if (cancelled) return
        setCapabilitiesError(
          error instanceof Error ? error.message : 'Error desconocido cargando capacidades',
        )
      } finally {
        if (!cancelled) setLoadingLayers(false)
      }
    }

    loadCapabilities()
    return () => {
      cancelled = true
    }
  }, [])

  const toggleLayer = useCallback((id: string) => {
    setLayers((prev) => prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l)))
  }, [])

  const setLayerOpacity = useCallback((id: string, opacity: number) => {
    setLayers((prev) => prev.map((l) => (l.id === id ? { ...l, opacity } : l)))
  }, [])

  const fitToLayer = useCallback(
    (id: string) => {
      const bbox = discoveredCapabilities.find((l) => l.name === id)?.bbox
      if (bbox) {
        setFitTo([...bbox])
      } else {
        setFitTo([MAP_CENTER.lng - 0.05, MAP_CENTER.lat - 0.05, MAP_CENTER.lng + 0.05, MAP_CENTER.lat + 0.05])
      }
    },
    [discoveredCapabilities],
  )

  const activeLayers = useMemo(() => layers.filter((l) => l.visible), [layers])

  const groupedLayers = useMemo(() => {
    const groups = new Map<string, LayerState[]>()
    for (const layer of layers) {
      const category = layer.category || 'Otros'
      const list = groups.get(category) || []
      list.push(layer)
      groups.set(category, list)
    }
    return groups
  }, [layers])

  const startFeatureInfo = useCallback((lat: number, lng: number) => {
    setFeatureInfo({ lat, lng, loading: true, data: null, error: null })
  }, [])

  const setFeatureInfoSuccess = useCallback((data: FeatureInfoResponse) => {
    setFeatureInfo((prev) =>
      prev ? { ...prev, loading: false, data, error: null } : null,
    )
  }, [])

  const setFeatureInfoError = useCallback((error: string) => {
    setFeatureInfo((prev) => (prev ? { ...prev, loading: false, error } : null))
  }, [])

  const closeFeatureInfo = useCallback(() => {
    setFeatureInfo(null)
  }, [])

  return {
    center,
    zoom,
    layers,
    groupedLayers,
    activeLayers,
    loadingLayers,
    capabilitiesError,
    fitTo,
    featureInfo,
    setCenter,
    setZoom,
    toggleLayer,
    setLayerOpacity,
    fitToLayer,
    startFeatureInfo,
    setFeatureInfoSuccess,
    setFeatureInfoError,
    closeFeatureInfo,
  }
}
