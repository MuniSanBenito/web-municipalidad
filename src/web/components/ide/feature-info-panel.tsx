'use client'

import { IconAlertTriangle, IconLoader2, IconMapPin } from '@tabler/icons-react'
import { type FeatureInfoState } from './use-map-state'

interface FeatureInfoPanelProps {
  featureInfo: FeatureInfoState | null
}

export function FeatureInfoPanel({ featureInfo }: FeatureInfoPanelProps) {
  if (!featureInfo) return null

  const { loading, data, error } = featureInfo

  return (
    <div className="min-w-[220px] max-w-[320px]">
      <div className="mb-2 flex items-center gap-2">
        <IconMapPin size={18} className="text-primary" />
        <h3 className="text-sm font-bold">Información del lugar</h3>
      </div>

      {loading && (
        <div className="flex items-center gap-2 rounded-lg bg-base-200/50 p-3 text-sm text-base-content/70">
          <IconLoader2 size={18} className="animate-spin text-primary" />
          <span>Consultando...</span>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-warning/30 bg-warning/10 p-3 text-xs">
          <IconAlertTriangle size={18} className="mt-0.5 flex-shrink-0 text-warning" />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && data && (
        <>
          {data.features.length === 0 ? (
            <p className="rounded-lg bg-base-200/50 p-3 text-sm text-base-content/60">
              No se encontraron elementos en este punto.
            </p>
          ) : (
            <div className="max-h-[300px] space-y-3 overflow-y-auto overscroll-contain">
              {data.features.map((feature, index) => (
                <div
                  key={feature.id || `feature-${index}`}
                  className="rounded-xl border border-base-200 bg-base-100 p-3 shadow-sm"
                >
                  <h4 className="mb-2 flex items-center gap-1.5 text-xs font-bold text-primary">
                    <span className="inline-block h-2 w-2 rounded-full bg-primary" />
                    {feature.id || `Elemento ${index + 1}`}
                  </h4>
                  <dl className="space-y-1.5">
                    {Object.entries(feature.properties)
                      .filter(([, value]) => value !== null && value !== undefined && value !== '')
                      .map(([key, value]) => (
                        <div key={key} className="flex justify-between gap-2 text-xs">
                          <dt className="text-base-content/70">{key}</dt>
                          <dd className="max-w-[160px] truncate font-semibold">
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
