'use client'

import { bounceIn, buttonTap, staggerContainer, staggerItem } from '@/participacion/components/ui'
import { motion } from 'framer-motion'

interface WelcomeScreenProps {
  onStart: () => void
  colorPrincipal: string
  barrio: string
}

export function WelcomeScreen({ onStart, colorPrincipal, barrio }: WelcomeScreenProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex h-full w-full flex-col items-center justify-center text-center"
    >
      <motion.div variants={bounceIn} className="mb-6 text-7xl sm:text-8xl">
        🏘️
      </motion.div>

      <motion.h1
        variants={staggerItem}
        className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-base-content sm:text-5xl"
      >
        Imaginemos juntos
        <br />
        <span style={{ color: colorPrincipal }}>nuestro barrio</span>
      </motion.h1>

      <motion.p
        variants={staggerItem}
        className="mt-4 max-w-md text-base text-base-content/60 sm:text-lg"
      >
        Tu opinión nos ayuda a construir un mejor San Benito.
      </motion.p>

      <motion.div variants={staggerItem} className="mt-2">
        <span className="badge badge-lg border-0 bg-base-200 font-medium text-base-content/70">
          📍 {barrio}
        </span>
      </motion.div>

      <motion.div variants={staggerItem} className="mt-8">
        <motion.button
          {...buttonTap}
          onClick={onStart}
          className="btn btn-lg min-w-[220px] rounded-2xl border-none text-lg font-semibold text-white shadow-xl"
          style={{ backgroundColor: colorPrincipal }}
        >
          Comenzar
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.button>
      </motion.div>

      <motion.p
        variants={staggerItem}
        className="mt-6 text-xs text-base-content/40"
      >
        ⏱️ Toma solo 2-4 minutos
      </motion.p>
    </motion.div>
  )
}
