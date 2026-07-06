'use client'

import { checkmarkPop, staggerContainer, staggerItem } from '@/participacion/components/ui'
import type { PlazaElement } from '@/participacion/types'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

interface PlazaScreenProps {
  elements: PlazaElement[]
  colorPrincipal: string
  onComplete: (selectedIds: string[]) => void
}

export function PlazaScreen({ elements, colorPrincipal, onComplete }: PlazaScreenProps) {
  const [selected, setSelected] = useState<string[]>([])
  const MAX = 3

  function toggle(el: PlazaElement) {
    setSelected((prev) => {
      if (prev.includes(el.id)) return prev.filter((id) => id !== el.id)
      if (prev.length >= MAX) return prev
      return [...prev, el.id]
    })
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
        Diseñá tu plaza
      </motion.h2>

      <motion.div variants={staggerItem} className="mb-4 flex items-center gap-2">
        <span className="text-sm text-base-content/50">Elegí hasta {MAX} elementos</span>
        <motion.span
          key={selected.length}
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 12 }}
          className="badge badge-md border-0 font-bold text-white"
          style={{ backgroundColor: colorPrincipal }}
        >
          {selected.length}/{MAX}
        </motion.span>
      </motion.div>

      <motion.div
        variants={staggerItem}
        className="mb-4 flex min-h-[80px] w-full max-w-md flex-wrap items-center justify-center gap-2 rounded-3xl border-2 border-base-200 bg-gradient-to-br from-green-100 to-green-200 p-4"
      >
        {selected.length === 0 ? (
          <span className="text-sm text-base-content/40">Tu plaza está vacía — elegí elementos abajo</span>
        ) : (
          elements
            .filter((el) => selected.includes(el.id))
            .map((el) => (
              <motion.div
                key={el.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="flex items-center gap-1.5 rounded-2xl bg-white/90 px-3 py-2 shadow-md"
              >
                <span className="text-2xl">{el.emoji}</span>
                <span className="text-xs font-semibold text-base-content">{el.nombre}</span>
              </motion.div>
            ))
        )}
      </motion.div>

      <div className="grid w-full max-w-2xl grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3">
        {elements.map((el) => {
          const isSelected = selected.includes(el.id)
          const isDisabled = !isSelected && selected.length >= MAX

          return (
            <motion.button
              key={el.id}
              variants={staggerItem}
              whileHover={!isDisabled ? { y: -4, scale: 1.03 } : undefined}
              whileTap={!isDisabled ? { scale: 0.95 } : undefined}
              onClick={() => toggle(el)}
              disabled={isDisabled}
              className="relative flex flex-col items-center gap-1.5 rounded-2xl border-2 p-3 shadow-sm transition-all"
              style={{
                borderColor: isSelected ? colorPrincipal : 'transparent',
                backgroundColor: isSelected ? `${colorPrincipal}15` : isDisabled ? 'rgba(0,0,0,0.02)' : 'white',
                opacity: isDisabled ? 0.4 : 1,
              }}
            >
              <span className="text-3xl sm:text-4xl">{el.emoji}</span>
              <span className="text-center text-xs font-medium text-base-content sm:text-sm">
                {el.nombre}
              </span>

              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    variants={checkmarkPop}
                    initial="hidden"
                    animate="visible"
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full text-white shadow-lg"
                    style={{ backgroundColor: colorPrincipal }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </div>

      {selected.length > 0 && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onComplete(selected)}
          className="btn btn-md mt-4 min-w-[160px] rounded-2xl border-none text-white shadow-lg"
          style={{ backgroundColor: colorPrincipal }}
        >
          ¡Listo! ({selected.length}/{MAX})
        </motion.button>
      )}
    </motion.div>
  )
}
