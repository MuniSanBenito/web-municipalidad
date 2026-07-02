'use client'

import { GEOSERVER_BASE_URL, WMS_URL } from '@/web/lib/ide-config'
import { buildGetFeatureInfoUrl, type FeatureInfoResponse } from '@/web/lib/ide-wms'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo } from 'react'
import {
    MapContainer,
    Popup,
    TileLayer,
    WMSTileLayer,
    useMap,
    useMapEvents,
} from 'react-leaflet'
import { FeatureInfoPanel } from './feature-info-panel'
import { LayerControlPanel } from './layer-control-panel'
import { LegendPanel } from './legend-panel'
import { useMapState } from './use-map-state'

const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

function MapEventHandler({
  onClick,
  onMoveEnd,
  onZoomEnd,
}: {
  onClick: (e: L.LeafletMouseEvent) => void
  onMoveEnd?: (center: { lat: number; lng: number }) => void
  onZoomEnd?: (zoom: number) => void
}) {
  useMapEvents({
    click: (e) => onClick(e as L.LeafletMouseEvent),
    moveend: (e) => onMoveEnd?.({ lat: e.target.getCenter().lat, lng: e.target.getCenter().lng }),
    zoomend: (e) => onZoomEnd?.(e.target.getZoom()),
  })
  return null
}

function FitToBounds({ bounds }: { bounds?: [number, number, number, number] }) {
  const map = useMap()
  useEffect(() => {
    if (bounds) {
      map.flyToBounds(
        [
          [bounds[1], bounds[0]],
          [bounds[3], bounds[2]],
        ],
        { padding: [50, 50], maxZoom: 18 },
      )
    }
  }, [bounds, map])
  return null
}

export function IdeMap() {
  const {
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
  } = useMapState()

  const handleMapClick = async (e: L.LeafletMouseEvent) => {
    const map = e.target as L.Map
    const visibleNames = activeLayers.map((l) => l.name)
    if (visibleNames.length === 0) {
      closeFeatureInfo()
      return
    }

    const container = map.getContainer()
    const mapSize = container.getBoundingClientRect()
    const containerPoint = map.latLngToContainerPoint(e.latlng)
    const bounds = map.getBounds()

    startFeatureInfo(e.latlng.lat, e.latlng.lng)

    try {
      const url = buildGetFeatureInfoUrl(GEOSERVER_BASE_URL, {
        layers: visibleNames,
        point: { x: containerPoint.x, y: containerPoint.y },
        mapSize: { width: mapSize.width, height: mapSize.height },
        mapBounds: {
          south: bounds.getSouth(),
          west: bounds.getWest(),
          north: bounds.getNorth(),
          east: bounds.getEast(),
        },
      })

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`GetFeatureInfo falló: ${response.status}`)
      }
      const data = (await response.json()) as FeatureInfoResponse
      setFeatureInfoSuccess(data)
    } catch (err) {
      setFeatureInfoError(err instanceof Error ? err.message : 'Error desconocido')
    }
  }

  const popupPosition = useMemo(() => {
    if (!featureInfo) return null
    return [featureInfo.lat, featureInfo.lng] as [number, number]
  }, [featureInfo])

  return (
    <div className="relative h-[calc(100vh-80px)] min-h-[400px] w-full overflow-hidden rounded-xl border border-base-300 shadow-lg md:h-[calc(100vh-120px)] md:min-h-[600px] md:rounded-2xl">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        scrollWheelZoom={true}
        className="h-full w-full"
        style={{ zIndex: 0 }}
      >
        <TileLayer
          attribution={OSM_ATTRIBUTION}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={22}
          maxNativeZoom={19}
        />

        {activeLayers.map((layer) => (
          <WMSTileLayer
            key={layer.id}
            url={WMS_URL}
            layers={layer.name}
            format="image/png"
            transparent={true}
            version="1.3.0"
            opacity={layer.opacity ?? 0.85}
            styles={layer.defaultStyle || ''}
            crossOrigin={true}
            maxZoom={22}
            maxNativeZoom={20}
          />
        ))}

        <MapEventHandler
          onClick={handleMapClick}
          onMoveEnd={setCenter}
          onZoomEnd={setZoom}
        />
        <FitToBounds bounds={fitTo} />

        {popupPosition && (
          <Popup
            position={popupPosition}
            eventHandlers={{
              popupclose: closeFeatureInfo,
            }}
            className="ide-popup"
          >
            <FeatureInfoPanel featureInfo={featureInfo} />
          </Popup>
        )}
      </MapContainer>

      <LayerControlPanel
        groupedLayers={groupedLayers}
        activeLayers={activeLayers}
        loading={loadingLayers}
        error={capabilitiesError}
        onToggle={toggleLayer}
        onOpacityChange={setLayerOpacity}
        onZoomToLayer={fitToLayer}
      />

      <LegendPanel activeLayers={activeLayers} />
    </div>
  )
}
