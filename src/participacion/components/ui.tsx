'use client'

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import type { PropsWithChildren } from 'react'

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, x: -60, transition: { duration: 0.25 } },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
}

export const bounceIn: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 400, damping: 15 } },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
}

export const checkmarkPop: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 500, damping: 12, delay: 0.1 } },
}

export const buttonTap = { whileTap: { scale: 0.95 }, whileHover: { scale: 1.02 } }

interface StepLayoutProps {
  stepKey: string
  showProgress?: boolean
  progress?: number
  stepIndex?: number
  totalSteps?: number
  onBack?: () => void
  canGoBack?: boolean
}

export function StepLayout({
  stepKey, showProgress = true, progress = 0, stepIndex = 0, totalSteps = 7, onBack, canGoBack = true, children,
}: PropsWithChildren<StepLayoutProps>) {
  return (
    <motion.div key={stepKey} variants={slideLeft} initial="hidden" animate="visible" exit="exit" className="flex h-full w-full flex-col">
      {showProgress && (
        <div className="flex items-center gap-3 px-4 pt-4 sm:px-6">
          {canGoBack && onBack && (
            <button onClick={onBack} className="btn btn-circle btn-ghost btn-sm shrink-0" aria-label="Volver">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}
          <div className="flex-1">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-medium text-base-content/60">Paso {stepIndex} de {totalSteps - 1}</span>
              <span className="text-xs font-medium text-base-content/40">{progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-base-300">
              <motion.div className="h-full rounded-full bg-primary" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} />
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-4 sm:px-6">
        <div className="flex w-full max-w-[900px] flex-1 flex-col items-center justify-center">{children}</div>
      </div>
    </motion.div>
  )
}

interface ContinueButtonProps {
  onClick: () => void
  label?: string
  color?: string
}

export function ContinueButton({ onClick, label = 'Continuar', color, children }: PropsWithChildren<ContinueButtonProps>) {
  return (
    <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }} className="mt-4">
      <motion.button
        {...buttonTap}
        onClick={onClick}
        className="btn btn-lg w-full max-w-xs rounded-2xl border-none text-white shadow-lg sm:w-auto sm:min-w-[200px]"
        style={color ? { backgroundColor: color } : undefined}
      >
        {children ?? label}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </motion.button>
    </motion.div>
  )
}
