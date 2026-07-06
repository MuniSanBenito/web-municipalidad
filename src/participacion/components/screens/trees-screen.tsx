'use client'

import { checkmarkPop, staggerContainer, staggerItem } from '@/participacion/components/ui'
import type { Tree } from '@/participacion/types'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface TreesScreenProps {
  trees: Tree[]
  colorPrincipal: string
  maxSelections?: number
  onSelect: (trees: Tree[]) => void
}

export function TreesScreen({ trees, colorPrincipal, maxSelections = 3, onSelect }: TreesScreenProps) {
  const [selected, setSelected] = useState<string[]>([])

  function toggle(tree: Tree) {
    setSelected((prev) => {
      if (prev.includes(tree.id)) return prev.filter((id) => id !== tree.id)
      if (prev.length >= maxSelections) return prev
      return [...prev, tree.id]
    })
  }

  useEffect(() => {
    const selectedTrees = trees.filter((t) => selected.includes(t.id))
    onSelect(selectedTrees)
  }, [selected, trees, onSelect])

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
        ¿Qué árboles te gustaría ver en tu barrio?
      </motion.h2>

      <motion.div variants={staggerItem} className="mb-4 flex items-center gap-2">
        <span className="text-sm text-base-content/50">Elegí hasta {maxSelections}</span>
        <motion.span
          key={selected.length}
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 12 }}
          className="badge badge-md border-0 font-bold text-white"
          style={{ backgroundColor: colorPrincipal }}
        >
          {selected.length}/{maxSelections}
        </motion.span>
      </motion.div>

      <div className="grid w-full max-w-2xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
        {trees.map((tree) => {
          const isSelected = selected.includes(tree.id)
          const isDisabled = !isSelected && selected.length >= maxSelections

          return (
            <motion.button
              key={tree.id}
              variants={staggerItem}
              whileHover={!isDisabled ? { y: -4 } : undefined}
              whileTap={!isDisabled ? { scale: 0.95 } : undefined}
              onClick={() => toggle(tree)}
              disabled={isDisabled}
              className="relative flex flex-col items-center gap-1.5 rounded-2xl border-2 p-3 shadow-sm transition-all"
              style={{
                borderColor: isSelected ? '#22c55e' : 'transparent',
                backgroundColor: isSelected ? 'rgba(34,197,94,0.1)' : isDisabled ? 'rgba(0,0,0,0.02)' : 'white',
                opacity: isDisabled ? 0.4 : 1,
              }}
            >
              <span className="text-4xl sm:text-5xl">{tree.emoji}</span>
              <span className="text-center text-xs font-bold text-base-content sm:text-sm">
                {tree.nombre}
              </span>
              <span className="line-clamp-2 text-center text-[10px] text-base-content/50 sm:text-xs">
                {tree.caracteristicas}
              </span>

              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    variants={checkmarkPop}
                    initial="hidden"
                    animate="visible"
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white shadow-lg"
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
    </motion.div>
  )
}
