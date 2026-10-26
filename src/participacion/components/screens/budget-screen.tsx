'use client'

import { staggerContainer, staggerItem } from '@/participacion/components/ui'
import type { BudgetOption } from '@/participacion/types'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface BudgetScreenProps {
  options: BudgetOption[]
  totalFichas?: number
  colorPrincipal: string
  onAllocate: (allocations: { option: BudgetOption; fichas: number }[]) => void
}

export function BudgetScreen({
  options,
  totalFichas = 10,
  onAllocate,
}: BudgetScreenProps) {
  const [allocations, setAllocations] = useState<Record<string, number>>({})

  const usedFichas = Object.values(allocations).reduce((sum, n) => sum + n, 0)
  const remaining = totalFichas - usedFichas

  const handleAllocate = (option: BudgetOption, delta: number) => {
    setAllocations((prev) => {
      const current = prev[option.id] ?? 0
      const nextVal = current + delta
      if (nextVal < 0) return prev
      if (usedFichas + delta > totalFichas) return prev
      return { ...prev, [option.id]: nextVal }
    })
  }

  useEffect(() => {
    const allocArray = options
      .map((o) => ({ option: o, fichas: allocations[o.id] ?? 0 }))
      .filter((a) => a.fichas > 0)
    onAllocate(allocArray)
  }, [allocations, options, onAllocate])

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
        Invertí en tu barrio
      </motion.h2>

      <motion.div variants={staggerItem} className="mb-3 flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="text-2xl">🪙</span>
          <motion.span
            key={remaining}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 12 }}
            className={`text-2xl font-extrabold ${remaining === 0 ? 'text-base-content/30' : 'text-primary'}`}
          >
            {remaining}
          </motion.span>
        </div>
        <span className="text-sm text-base-content/50">fichas restantes</span>
      </motion.div>

      <div className="grid w-full max-w-2xl grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3 sm:gap-3">
        {options.map((option) => {
          const count = allocations[option.id] ?? 0
          const isDisabled = remaining === 0 && count === 0

          return (
            <motion.div
              key={option.id}
              variants={staggerItem}
              className={`flex flex-col items-center gap-2 rounded-2xl border-2 border-base-200 bg-base-100 p-3 shadow-sm ${isDisabled ? 'opacity-40' : ''}`}
            >
              <span className="text-3xl sm:text-4xl">{option.emoji}</span>
              <span className="text-center text-xs font-bold text-base-content sm:text-sm">
                {option.nombre}
              </span>

              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => handleAllocate(option, -1)}
                  disabled={count === 0}
                  className="btn btn-circle btn-sm border-0 bg-base-200 text-base-content hover:bg-base-300"
                  aria-label="Restar ficha"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <path d="M5 12h14" />
                  </svg>
                </motion.button>

                <motion.span
                  key={count}
                  initial={{ scale: 1.4 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                  className={`min-w-[2ch] text-center text-lg font-extrabold ${count > 0 ? 'text-secondary' : 'text-base-content/20'}`}
                >
                  {count}
                </motion.span>

                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => handleAllocate(option, 1)}
                  disabled={isDisabled}
                  className="btn btn-circle btn-sm border-0 bg-primary text-primary-content"
                  aria-label="Sumar ficha"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
