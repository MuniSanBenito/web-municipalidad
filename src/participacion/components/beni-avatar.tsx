'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface BeniAvatarProps {
  message?: string
  size?: number
  className?: string
}

export function BeniAvatar({ message, size = 64, className }: BeniAvatarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.1 }}
      className={`flex flex-col items-center ${className}`}
    >
      {message && (
        <div className="relative mb-2.5 max-w-[260px] rounded-2xl bg-secondary/10 px-4 py-2.5 text-center text-sm font-semibold text-secondary shadow-sm border border-secondary/10">
          {message}
          <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-secondary/10 border-b border-r border-secondary/10" />
        </div>
      )}
      <Image
        src="/beni-gaucho.webp"
        alt="Beni, asistente virtual de la Municipalidad de San Benito"
        width={size}
        height={size}
        className="rounded-full border-2 border-secondary/20 shadow-md object-cover"
      />
    </motion.div>
  )
}
