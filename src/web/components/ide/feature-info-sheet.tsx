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
    <div className="fixed inset-0 z-[1100] md:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div className="border-base-300 bg-base-100 absolute inset-x-0 bottom-0 max-h-[70vh] rounded-t-3xl border-t px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-2xl">
        <div className="relative mb-3 flex h-8 items-center justify-end">
          <div className="bg-base-300 absolute top-1 left-1/2 h-1.5 w-10 -translate-x-1/2 rounded-full" />
          <button
            onClick={onClose}
            className="btn btn-circle btn-ghost btn-sm"
            aria-label="Cerrar información"
          >
            <IconX size={18} />
          </button>
        </div>
        <div className="max-h-[calc(70vh-5rem)] overflow-y-auto overscroll-contain">
          <FeatureInfoContent featureInfo={featureInfo} />
        </div>
      </div>
    </div>
  )
}
