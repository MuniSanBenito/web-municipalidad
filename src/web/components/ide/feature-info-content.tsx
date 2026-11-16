'use client'

import { IconAlertTriangle, IconLoader2, IconMapPin } from '@tabler/icons-react'
import { type FeatureInfoState } from './use-map-state'

interface FeatureInfoContentProps {
  featureInfo: FeatureInfoState | null
}

const HIDDEN_PROPERTY = /^(geom|geometry|the_geom|wkb_geometry|bbox)$/i

function isVisibleProperty(key: string, value: unknown): boolean {
  if (value === null || value === undefined || value === '') return false
  if (typeof value === 'object') return false
  return !HIDDEN_PROPERTY.test(key)
}

function featureHeading(id: string | undefined, index: number): string {
  if (!id) return `Elemento ${index + 1}`
  const dot = id.lastIndexOf('.')
  if (dot <= 0) return `Elemento ${index + 1}`
  const qualified = id.slice(0, dot)
  const name = qualified.includes(':') ? qualified.slice(qualified.lastIndexOf(':') + 1) : qualified
  const label = name.replace(/[_-]+/g, ' ').trim()
  return label || `Elemento ${index + 1}`
}

export function FeatureInfoContent({ featureInfo }: FeatureInfoContentProps) {
  if (!featureInfo) return null

  const { loading, data, error } = featureInfo

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center gap-2">
        <IconMapPin size={18} className="text-primary" />
        <h3 className="text-sm font-bold">Información del lugar</h3>
      </div>

      {loading && (
        <div className="bg-base-200/50 text-base-content/70 flex items-center gap-2 rounded-lg p-3 text-sm">
          <IconLoader2 size={18} className="text-primary animate-spin" />
          <span>Consultando...</span>
        </div>
      )}

      {error && (
        <div className="border-warning/30 bg-warning/10 flex items-start gap-2 rounded-lg border p-3 text-xs">
          <IconAlertTriangle size={18} className="text-warning mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && data && (
        <>
          {data.features.length === 0 ? (
            <p className="bg-base-200/50 text-base-content/60 rounded-lg p-3 text-sm">
              No se encontraron elementos en este punto.
            </p>
          ) : (
            <div className="max-h-[300px] space-y-3 overflow-y-auto overscroll-contain">
              {data.features.map((feature, index) => (
                <div
                  key={feature.id || `feature-${index}`}
                  className="border-base-200 bg-base-100 rounded-xl border p-3 shadow-sm"
                >
                  <h4 className="text-primary mb-2 flex items-center gap-1.5 text-xs font-bold">
                    <span className="bg-primary inline-block h-2 w-2 rounded-full" />
                    {featureHeading(feature.id, index)}
                  </h4>
                  <dl className="space-y-1.5">
                    {Object.entries(feature.properties)
                      .filter(([key, value]) => isVisibleProperty(key, value))
                      .map(([key, value]) => (
                        <div key={key} className="flex items-start justify-between gap-3 text-xs">
                          <dt className="text-base-content/70 shrink-0">{key}</dt>
                          <dd className="min-w-0 text-right font-semibold break-words">
                            {String(value)}
                          </dd>
                        </div>
                      ))}
                  </dl>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
