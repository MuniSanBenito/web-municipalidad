'use client'

import { bounceIn, buttonTap, staggerContainer, staggerItem } from '@/participacion/components/ui'
import { useConfetti } from '@/participacion/hooks'
import { IconChartBar, IconConfetti, IconRefresh } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

const WARM_COLORS = ['#5A7A3E', '#D98A4E', '#F4B840', '#7AC2D4']

interface CelebrationScreenProps {
  elapsedSeconds: number
  activitiesCompleted: number
  onFinish: () => void
  onRestart: () => void
}

export function CelebrationScreen({
  elapsedSeconds,
  activitiesCompleted,
  onFinish,
  onRestart,
}: CelebrationScreenProps) {
  const { celebration } = useConfetti()

  useEffect(() => {
    const timer = setTimeout(() => celebration(WARM_COLORS), 200)
    return () => clearTimeout(timer)
  }, [celebration])

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
      <motion.div
        variants={bounceIn}
        className="mb-4 flex h-28 w-28 items-center justify-center rounded-[2rem] bg-accent/20 text-accent sm:h-32 sm:w-32"
      >
        <IconConfetti size={64} strokeWidth={1.5} />
      </motion.div>

      <motion.h2
        variants={staggerItem}
        className="max-w-md text-2xl font-bold text-base-content sm:text-4xl"
      >
        ¡Gracias por ayudarnos a imaginar un mejor barrio!
      </motion.h2>

      <motion.div variants={staggerItem} className="mt-6 flex gap-3">
        <div className="flex flex-col items-center rounded-2xl bg-base-200 px-5 py-3">
          <span className="text-2xl font-extrabold text-secondary">
            {activitiesCompleted}
          </span>
          <span className="text-xs text-base-content/60">Actividades</span>
        </div>
        <div className="flex flex-col items-center rounded-2xl bg-base-200 px-5 py-3">
          <span className="text-2xl font-extrabold text-secondary">
            {timeStr}
          </span>
          <span className="text-xs text-base-content/60">Tiempo</span>
        </div>
      </motion.div>

      <motion.div variants={staggerItem} className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <motion.button
          {...buttonTap}
          onClick={onFinish}
          className="btn btn-lg min-w-[220px] gap-2 rounded-2xl border-none bg-primary text-lg font-semibold text-primary-content shadow-md hover:shadow-lg"
        >
          <IconChartBar size={22} />
          Ver estadísticas
        </motion.button>
        <motion.button
          {...buttonTap}
          onClick={onRestart}
          className="btn btn-lg min-w-[220px] gap-2 rounded-2xl border-2 border-base-300 bg-base-100 text-lg font-semibold text-base-content shadow-sm hover:bg-base-200"
        >
          <IconRefresh size={22} />
          Completar otra vez
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
