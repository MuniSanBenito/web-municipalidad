'use client'

import { FeatureInfoContent } from './feature-info-content'
import { type FeatureInfoState } from './use-map-state'

interface FeatureInfoPanelProps {
  featureInfo: FeatureInfoState | null
}

export function FeatureInfoPanel({ featureInfo }: FeatureInfoPanelProps) {
  return (
    <div className="min-w-[220px] max-w-[320px]">
      <FeatureInfoContent featureInfo={featureInfo} />
    </div>
  )
}
