'use client'

import { IconX } from '@tabler/icons-react'
import { FeatureInfoContent } from './feature-info-content'
import { type FeatureInfoState } from './use-map-state'

interface FeatureInfoSheetProps {
  featureInfo: FeatureInfoState
  onClose: () => void
}

export function FeatureInfoSheet({ featureInfo, onClose }: FeatureInfoSheetProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[1003] md:hidden">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative max-h-[60vh] rounded-t-2xl border-t border-base-300 bg-base-100/95 p-4 shadow-2xl backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between">
          <div className="h-1.5 w-12 rounded-full bg-base-300" />
          <button
            onClick={onClose}
            className="btn btn-circle btn-ghost btn-xs"
            aria-label="Cerrar información"
          >
            <IconX size={18} />
          </button>
        </div>
        <div className="max-h-[calc(60vh-4rem)] overflow-y-auto overscroll-contain">
          <FeatureInfoContent featureInfo={featureInfo} />
        </div>
      </div>
    </div>
  )
}
