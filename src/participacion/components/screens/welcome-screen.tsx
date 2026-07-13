'use client'

import { BeniAvatar } from '@/participacion/components/beni-avatar'
import { bounceIn, buttonTap, staggerContainer, staggerItem } from '@/participacion/components/ui'
import { IconHomeHeart, IconMapPin } from '@tabler/icons-react'
import { motion } from 'framer-motion'

interface WelcomeScreenProps {
  onStart: () => void
  barrio: string
}

export function WelcomeScreen({ onStart, barrio }: WelcomeScreenProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex h-full w-full flex-col items-center justify-center text-center"
    >
      <BeniAvatar
        message="¡Hola! Soy Beni, te acompaño en tu participación."
        size={64}
      />

      <motion.div
        variants={bounceIn}
        className="mb-6 mt-4 flex h-28 w-28 items-center justify-center rounded-[2rem] bg-secondary/10 text-secondary sm:h-32 sm:w-32"
      >
        <IconHomeHeart size={64} strokeWidth={1.5} />
      </motion.div>

      <motion.h1
        variants={staggerItem}
        className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-base-content sm:text-5xl"
      >
        Imaginemos juntos
        <br />
        <span className="text-secondary">nuestro barrio</span>
      </motion.h1>

      <motion.p
        variants={staggerItem}
        className="mt-4 max-w-md text-base text-base-content/60 sm:text-lg"
      >
        Tu opinión nos ayuda a construir un mejor San Benito.
      </motion.p>

      <motion.div variants={staggerItem} className="mt-3">
        <span className="badge badge-lg gap-1.5 border-0 bg-base-200 font-medium text-base-content/70">
          <IconMapPin size={16} className="text-secondary" />
          {barrio}
        </span>
      </motion.div>

      <motion.div variants={staggerItem} className="mt-8">
        <motion.button
          {...buttonTap}
          onClick={onStart}
          className="btn btn-lg min-w-[220px] rounded-2xl border-none bg-primary text-lg font-semibold text-primary-content shadow-md hover:shadow-lg"
        >
          Comenzar
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.button>
      </motion.div>

      <motion.p
        variants={staggerItem}
        className="mt-5 text-xs text-base-content/40"
      >
        Toma solo 2-4 minutos
      </motion.p>
    </motion.div>
  )
}
