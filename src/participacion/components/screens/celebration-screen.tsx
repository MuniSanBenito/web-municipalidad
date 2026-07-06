'use client'

import { bounceIn, buttonTap, staggerContainer, staggerItem } from '@/participacion/components/ui'
import { useConfetti } from '@/participacion/hooks'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

interface CelebrationScreenProps {
  elapsedSeconds: number
  activitiesCompleted: number
  colorPrincipal: string
  onFinish: () => void
  onRestart: () => void
}

export function CelebrationScreen({
  elapsedSeconds,
  activitiesCompleted,
  colorPrincipal,
  onFinish,
  onRestart,
}: CelebrationScreenProps) {
  const { celebration } = useConfetti()

  useEffect(() => {
    const timer = setTimeout(() => celebration([colorPrincipal, '#3b82f6', '#f59e0b', '#ef4444']), 200)
    return () => clearTimeout(timer)
  }, [celebration, colorPrincipal])

  const minutes = Math.floor(elapsedSeconds / 60)
  const seconds = elapsedSeconds % 60
  const timeStr = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex h-full w-full flex-col items-center justify-center text-center"
    >
      <motion.div variants={bounceIn} className="mb-4 text-7xl sm:text-8xl">
        🎉
      </motion.div>

      <motion.h2
        variants={staggerItem}
        className="max-w-md text-2xl font-extrabold text-base-content sm:text-4xl"
      >
        ¡Gracias por ayudarnos a imaginar un mejor barrio!
      </motion.h2>

      <motion.div variants={staggerItem} className="mt-6 flex gap-3">
        <div className="flex flex-col items-center rounded-2xl bg-base-200 px-5 py-3">
          <span className="text-2xl font-extrabold" style={{ color: colorPrincipal }}>
            {activitiesCompleted}
          </span>
          <span className="text-xs text-base-content/60">Actividades</span>
        </div>
        <div className="flex flex-col items-center rounded-2xl bg-base-200 px-5 py-3">
          <span className="text-2xl font-extrabold" style={{ color: colorPrincipal }}>
            {timeStr}
          </span>
          <span className="text-xs text-base-content/60">Tiempo</span>
        </div>
      </motion.div>

      <motion.div variants={staggerItem} className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <motion.button
          {...buttonTap}
          onClick={onFinish}
          className="btn btn-lg min-w-[220px] rounded-2xl border-none text-lg font-semibold text-white shadow-xl"
          style={{ backgroundColor: colorPrincipal }}
        >
          📊 Ver estadísticas
        </motion.button>
        <motion.button
          {...buttonTap}
          onClick={onRestart}
          className="btn btn-lg min-w-[220px] rounded-2xl border-2 border-base-300 bg-base-100 text-lg font-semibold text-base-content shadow-md"
        >
          🔄 Completar otra vez
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
