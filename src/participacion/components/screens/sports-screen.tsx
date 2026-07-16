'use client'

import { checkmarkPop, staggerContainer, staggerItem } from '@/participacion/components/ui'
import type { Sport } from '@/participacion/types'
import {
    IconBallAmericanFootball,
    IconBallFootball,
    IconBallVolleyball,
    IconBarbell,
    IconBike,
    IconCards,
    IconDiscGolf,
    IconGolf,
    IconHorse,
    IconMusic,
    IconPlayFootball,
    IconPlayVolleyball,
    IconPool,
    IconRun,
    IconStretching,
    IconSwimming,
} from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ComponentType, CSSProperties } from 'react'
import { useState } from 'react'

interface IconProps {
  size?: number
  style?: CSSProperties
}

const SPORT_ICONS: Record<string, ComponentType<IconProps>> = {
  'ball-football': IconBallFootball,
  'ball-american-football': IconBallAmericanFootball,
  'ball-volleyball': IconBallVolleyball,
  barbell: IconBarbell,
  bike: IconBike,
  cards: IconCards,
  'disc-golf': IconDiscGolf,
  golf: IconGolf,
  horse: IconHorse,
  music: IconMusic,
  'play-football': IconPlayFootball,
  'play-volleyball': IconPlayVolleyball,
  pool: IconPool,
  run: IconRun,
  stretching: IconStretching,
  swimming: IconSwimming,
}

interface SportsScreenProps {
  sports: Sport[]
  colorPrincipal: string
  onSelect: (sport: Sport) => void
}

export function SportsScreen({ sports, colorPrincipal, onSelect }: SportsScreenProps) {
  const [selected, setSelected] = useState<string | null>(null)

  function handleSelect(sport: Sport) {
    if (selected) return
    setSelected(sport.id)
    onSelect(sport)
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex h-full w-full flex-col items-center"
    >
      <motion.h2
        variants={staggerItem}
        className="mb-1 text-center text-xl font-bold text-base-content sm:text-2xl"
      >
        ¿Con qué deporte se identifica tu barrio?
      </motion.h2>
      <motion.p variants={staggerItem} className="mb-4 text-sm text-base-content/50">
        Elegí uno
      </motion.p>

      <div className="grid w-full max-w-2xl grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3">
        {sports.map((sport) => {
          const isSelected = selected === sport.id
          const isDisabled = selected !== null && !isSelected

          return (
            <motion.button
              key={sport.id}
              variants={staggerItem}
              whileHover={!isDisabled ? { y: -4, scale: 1.03 } : undefined}
              whileTap={!isDisabled ? { scale: 0.95 } : undefined}
              onClick={() => handleSelect(sport)}
              disabled={isDisabled}
              className={`relative flex flex-col items-center gap-2 rounded-2xl border-2 p-3 shadow-sm transition-all sm:p-4 ${
                isSelected ? 'border-primary bg-primary/10' : 'border-transparent bg-base-100'
              } ${isDisabled ? 'opacity-40' : 'hover:shadow-md'}`}
            >
              {(() => {
                const Icon = sport.icono ? SPORT_ICONS[sport.icono] : undefined
                if (Icon) {
                  return <Icon size={40} style={{ color: colorPrincipal }} />
                }
                return <span className="text-3xl sm:text-4xl">{sport.emoji}</span>
              })()}
              <span className="text-center text-xs font-medium text-base-content sm:text-sm">
                {sport.nombre}
              </span>

              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    variants={checkmarkPop}
                    initial="hidden"
                    animate="visible"
                    className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white shadow-lg"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
