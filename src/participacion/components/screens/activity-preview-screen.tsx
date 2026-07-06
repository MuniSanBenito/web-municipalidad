'use client'

import { staggerContainer, staggerItem } from '@/participacion/components/ui'
import type { ActiveSteps } from '@/participacion/types'
import { motion } from 'framer-motion'

interface ActivityPreviewScreenProps {
  activeSteps: ActiveSteps
  colorPrincipal: string
  onComplete: () => void
}

const ACTIVITIES = [
  { id: 'deportes', emoji: '⚽', title: 'Deportes', desc: '¿Con qué deporte se identifica tu barrio?' },
  { id: 'arboles', emoji: '🌳', title: 'Árboles', desc: '¿Qué árboles te gustaría ver?' },
  { id: 'plaza', emoji: '🏞️', title: 'Plaza', desc: 'Diseñá tu plaza ideal' },
  { id: 'presupuesto', emoji: '🏘️', title: 'Mi barrio ideal', desc: 'Invertí en tu barrio' },
] as const

export function ActivityPreviewScreen({
  activeSteps,
  colorPrincipal,
  onComplete,
}: ActivityPreviewScreenProps) {
  const activities = ACTIVITIES.filter((a) => {
    if (a.id === 'deportes') return activeSteps.sports
    if (a.id === 'arboles') return activeSteps.trees
    if (a.id === 'plaza') return activeSteps.plaza
    if (a.id === 'presupuesto') return activeSteps.budget
    return false
  })

  function handleCardClick() {
    onComplete()
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex h-full w-full flex-col items-center justify-center"
    >
      <motion.h2
        variants={staggerItem}
        className="mb-2 text-center text-2xl font-bold text-base-content sm:text-3xl"
      >
        Elegí una actividad
      </motion.h2>
      <motion.p
        variants={staggerItem}
        className="mb-6 text-center text-sm text-base-content/60 sm:text-base"
      >
        Vamos a hacer todas juntas, pero elegí por dónde empezar
      </motion.p>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
        {activities.map((activity) => (
          <motion.button
            key={activity.id}
            variants={staggerItem}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCardClick}
            className="group flex items-center gap-4 rounded-3xl border border-base-300 bg-base-100 p-5 text-left shadow-md transition-colors hover:shadow-xl"
          >
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-4xl transition-transform group-hover:scale-110"
              style={{ backgroundColor: `${colorPrincipal}20` }}
            >
              {activity.emoji}
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-base-content">{activity.title}</h3>
              <p className="truncate text-sm text-base-content/60">{activity.desc}</p>
            </div>
            <svg
              className="ml-auto shrink-0 text-base-content/30 transition-transform group-hover:translate-x-1"
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
