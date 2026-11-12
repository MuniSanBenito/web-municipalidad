'use client'

import { buttonTap, staggerContainer, staggerItem } from '@/participacion/components/ui'
import type { Prize, SpinResult } from '@/participacion/types'
import { AnimatePresence, animate, motion, useAnimationControls, useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const WHEEL = 340
const R = WHEEL / 2
const BULBS = 24
const FULL_TURNS = 7
const SPIN_SECONDS = 5.5

type WonPrize = { id: string; nombre: string; emoji: string | null; imagenUrl: string | null }

interface RouletteScreenProps {
  prizes: Prize[]
  colors: string[]
  onSpin: () => Promise<SpinResult>
  onResult: (prize: WonPrize | null) => void
}

function polar(angleDeg: number, r: number, c = R) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: c + r * Math.sin(rad), y: c - r * Math.cos(rad) }
}

function segmentPath(startDeg: number, endDeg: number) {
  const start = polar(startDeg, R)
  const end = polar(endDeg, R)
  const largeArc = endDeg - startDeg > 180 ? 1 : 0
  return `M ${R} ${R} L ${start.x} ${start.y} A ${R} ${R} 0 ${largeArc} 1 ${end.x} ${end.y} Z`
}

function segmentColor(colors: string[], i: number, total: number) {
  // Evita que el primer y el último segmento (que son vecinos) queden del mismo color
  if (i === total - 1 && total > 1 && (total - 1) % colors.length === 0) {
    return colors[1 % colors.length]
  }
  return colors[i % colors.length]
}

function toWonPrize(prizes: Prize[], id: string, nombre: string): WonPrize {
  const prize = prizes.find((p) => p.id === id)
  const imagen = prize?.imagen && typeof prize.imagen === 'object' ? prize.imagen : null
  return { id, nombre, emoji: prize?.emoji ?? null, imagenUrl: imagen?.url ?? null }
}

function vibrate(ms: number) {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(ms)
}

export function RouletteScreen({ prizes, colors, onSpin, onResult }: RouletteScreenProps) {
  const rotation = useMotionValue(0)
  const pointer = useAnimationControls()
  const lastSegment = useRef(-1)

  const [spinning, setSpinning] = useState(false)
  const [won, setWon] = useState<WonPrize | null>(null)
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null)
  const [showReveal, setShowReveal] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  const palette = [...colors, '#C8553D', '#8E6CB8']
  const segment = prizes.length > 0 ? 360 / prizes.length : 360
  const finished = won !== null || message !== null

  useEffect(() => {
    const interval = window.setInterval(() => setTick((t) => t + 1), spinning ? 90 : 450)
    return () => window.clearInterval(interval)
  }, [spinning])

  function finish(prize: WonPrize, index: number) {
    setSpinning(false)
    setWon(prize)
    setWinnerIndex(index >= 0 ? index : null)
    setShowReveal(true)
    vibrate(120)
    onResult(prize)
  }

  async function handleSpin() {
    if (spinning || finished || prizes.length === 0) return
    setSpinning(true)

    const result = await onSpin()

    if (!result.success) {
      setSpinning(false)
      setMessage(result.agotado ? 'Se agotaron los premios. ¡Gracias por participar!' : result.error)
      onResult(null)
      return
    }

    const index = prizes.findIndex((p) => p.id === result.prize.id)
    const target = index >= 0 ? (index + 0.5) * segment : Math.random() * 360
    const jitter = index >= 0 ? (Math.random() - 0.5) * segment * 0.55 : 0
    const current = rotation.get()
    const finalRotation = current - (current % 360) + FULL_TURNS * 360 + (360 - target) + jitter
    const prize = toWonPrize(prizes, result.prize.id, result.prize.nombre)

    if (result.repetido) {
      rotation.set(finalRotation)
      finish(prize, index)
      return
    }

    animate(rotation, finalRotation, {
      duration: SPIN_SECONDS,
      ease: [0.12, 0.8, 0.16, 1],
      onUpdate: (value) => {
        const segmentUnderPointer = Math.floor((((value % 360) + 360) % 360) / segment)
        if (segmentUnderPointer !== lastSegment.current) {
          lastSegment.current = segmentUnderPointer
          pointer.start({ rotate: [-28, 0], transition: { duration: 0.22, ease: 'easeOut' } })
          vibrate(4)
        }
      },
      onComplete: () => finish(prize, index),
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
        className="mb-1 bg-gradient-to-r from-[#D98A4E] via-[#F4B840] to-[#D98A4E] bg-clip-text text-center text-2xl font-black uppercase tracking-wide text-transparent sm:text-3xl"
      >
        Ruleta de premios
      </motion.h2>
      <motion.p variants={staggerItem} className="mb-5 text-sm text-base-content/50">
        {finished ? '¡Ya giraste la ruleta!' : 'Tocá el centro o el botón para girar'}
      </motion.p>

      {prizes.length === 0 ? (
        <motion.p variants={staggerItem} className="text-center text-base-content/60">
          Todavía no hay premios cargados para esta campaña.
        </motion.p>
      ) : (
        <motion.div
          variants={staggerItem}
          className="relative aspect-square w-[min(84vw,380px)] select-none"
        >
          <div
            className="absolute inset-[-8%] rounded-full opacity-60 blur-3xl"
            style={{ background: `radial-gradient(circle, ${colors[2] ?? '#F4B840'}88 0%, transparent 65%)` }}
          />

          <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full drop-shadow-2xl">
            <defs>
              <linearGradient id="rim" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFF1B8" />
                <stop offset="30%" stopColor="#E9B949" />
                <stop offset="55%" stopColor="#B7791F" />
                <stop offset="80%" stopColor="#F6D77A" />
                <stop offset="100%" stopColor="#9C6614" />
              </linearGradient>
              <radialGradient id="bulb-on">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="45%" stopColor="#FFF4C2" />
                <stop offset="100%" stopColor="#F4B840" />
              </radialGradient>
            </defs>
            <circle cx={200} cy={200} r={198} fill="url(#rim)" />
            <circle cx={200} cy={200} r={186} fill="#3B2A12" opacity={0.35} />
            <circle cx={200} cy={200} r={182} fill="url(#rim)" />
            {Array.from({ length: BULBS }).map((_, i) => {
              const p = polar((360 / BULBS) * i, 190, 200)
              const lit = won ? tick % 2 === 0 : (i + tick) % (spinning ? 3 : 2) === 0
              return (
                <g key={i}>
                  {lit && <circle cx={p.x} cy={p.y} r={8} fill="#FFF4C2" opacity={0.45} />}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={4.2}
                    fill={lit ? 'url(#bulb-on)' : '#8A5A12'}
                    stroke="#5C3A08"
                    strokeWidth={0.8}
                  />
                </g>
              )
            })}
          </svg>

          <motion.div className="absolute inset-[7.5%] rounded-full" style={{ rotate: rotation }}>
            <svg viewBox={`0 0 ${WHEEL} ${WHEEL}`} className="h-full w-full overflow-visible">
              <defs>
                <radialGradient id="seg-shine" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.35} />
                  <stop offset="55%" stopColor="#FFFFFF" stopOpacity={0.06} />
                  <stop offset="100%" stopColor="#000000" stopOpacity={0.22} />
                </radialGradient>
                <filter id="emoji-shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.3" />
                </filter>
              </defs>

              {prizes.map((prize, i) =>
                prizes.length === 1 ? (
                  <circle key={prize.id} cx={R} cy={R} r={R} fill={palette[0]} />
                ) : (
                  <path
                    key={prize.id}
                    d={segmentPath(i * segment, (i + 1) * segment)}
                    fill={segmentColor(palette, i, prizes.length)}
                  />
                ),
              )}

              <circle cx={R} cy={R} r={R} fill="url(#seg-shine)" pointerEvents="none" />

              {prizes.map((prize, i) => {
                const start = i * segment
                const mid = start + segment / 2
                const emojiPos = polar(mid, R * 0.7)
                const namePos = polar(mid, R * 0.45)
                const nombre = prize.nombre.length > 12 ? `${prize.nombre.slice(0, 11)}…` : prize.nombre
                return (
                  <g key={prize.id}>
                    <g transform={`rotate(${mid} ${emojiPos.x} ${emojiPos.y})`} filter="url(#emoji-shadow)">
                      <text x={emojiPos.x} y={emojiPos.y} textAnchor="middle" dominantBaseline="central" fontSize={36}>
                        {prize.emoji ?? '🎁'}
                      </text>
                    </g>
                    <g transform={`rotate(${mid} ${namePos.x} ${namePos.y})`}>
                      <text
                        x={namePos.x}
                        y={namePos.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={15}
                        fontWeight={900}
                        letterSpacing={0.5}
                        fill="white"
                        stroke="rgba(0,0,0,0.28)"
                        strokeWidth={3}
                        paintOrder="stroke"
                        style={{ textTransform: 'uppercase' }}
                      >
                        {nombre}
                      </text>
                    </g>
                  </g>
                )
              })}

              {winnerIndex !== null &&
                prizes.length > 1 &&
                prizes.map((prize, i) =>
                  i === winnerIndex ? null : (
                    <motion.path
                      key={`dim-${prize.id}`}
                      d={segmentPath(i * segment, (i + 1) * segment)}
                      fill="#000000"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.45 }}
                      transition={{ duration: 0.5 }}
                    />
                  ),
                )}

              {prizes.length > 1 &&
                prizes.map((_, i) => {
                  const edge = polar(i * segment, R)
                  return (
                    <g key={`sep-${i}`}>
                      <line x1={R} y1={R} x2={edge.x} y2={edge.y} stroke="#F6D77A" strokeWidth={3} />
                      <circle cx={edge.x} cy={edge.y} r={4} fill="#FFF1B8" stroke="#9C6614" strokeWidth={1} />
                    </g>
                  )
                })}

              {winnerIndex !== null && prizes.length > 1 && (
                <motion.path
                  d={segmentPath(winnerIndex * segment, (winnerIndex + 1) * segment)}
                  fill="none"
                  stroke="#FFF4C2"
                  strokeWidth={6}
                  strokeLinejoin="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              )}
            </svg>
          </motion.div>

          <motion.button
            type="button"
            onClick={handleSpin}
            disabled={spinning || finished}
            aria-label="Girar la ruleta"
            whileHover={!spinning && !finished ? { scale: 1.06 } : undefined}
            whileTap={!spinning && !finished ? { scale: 0.92 } : undefined}
            className="absolute left-1/2 top-1/2 z-10 flex h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-[#FFF1B8] shadow-[0_6px_18px_rgba(0,0,0,0.35),inset_0_-6px_10px_rgba(0,0,0,0.25),inset_0_6px_10px_rgba(255,255,255,0.5)]"
            style={{ background: 'radial-gradient(circle at 35% 30%, #FFF4C2 0%, #F4B840 40%, #B7791F 100%)' }}
          >
            <span className="text-[0.7rem] font-black uppercase tracking-wider text-[#5C3A08] sm:text-sm">
              {spinning ? '···' : finished ? '★' : 'Girar'}
            </span>
          </motion.button>

          <motion.div
            animate={pointer}
            className="absolute left-1/2 top-[-3%] z-20 -ml-[5.5%] w-[11%]"
            style={{ transformOrigin: '50% 18%' }}
          >
            <svg viewBox="0 0 44 60" className="w-full drop-shadow-lg">
              <defs>
                <linearGradient id="pointer-gold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFF1B8" />
                  <stop offset="50%" stopColor="#E9B949" />
                  <stop offset="100%" stopColor="#9C6614" />
                </linearGradient>
              </defs>
              <path d="M22 58 L4 16 A18 18 0 1 1 40 16 Z" fill="url(#pointer-gold)" stroke="#5C3A08" strokeWidth={1.5} />
              <circle cx={22} cy={16} r={7} fill="#C8553D" stroke="#FFF1B8" strokeWidth={2} />
              <circle cx={20} cy={14} r={2} fill="#FFFFFF" opacity={0.8} />
            </svg>
          </motion.div>
        </motion.div>
      )}

      {prizes.length > 0 && !finished && (
        <motion.button
          variants={staggerItem}
          {...buttonTap}
          onClick={handleSpin}
          disabled={spinning}
          className="relative mt-7 w-full max-w-xs overflow-hidden rounded-2xl px-8 py-4 text-lg font-black uppercase tracking-wider text-[#5C3A08] shadow-[0_8px_20px_rgba(183,121,31,0.45)] disabled:opacity-70"
          style={{ background: 'linear-gradient(180deg, #FFE38A 0%, #F4B840 50%, #D9952A 100%)' }}
        >
          {!spinning && (
            <motion.span
              className="absolute inset-y-0 w-1/3 -skew-x-12 bg-white/40"
              initial={{ x: '-150%' }}
              animate={{ x: '400%' }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
            />
          )}
          <span className="relative">{spinning ? 'Girando…' : '¡Girar la ruleta!'}</span>
        </motion.button>
      )}

      {won && !showReveal && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setShowReveal(true)}
          className="mt-6 flex items-center gap-2 rounded-2xl bg-base-100 px-5 py-3 font-bold text-base-content shadow-md"
        >
          <span className="text-2xl">{won.emoji ?? '🎁'}</span>
          Tu premio: {won.nombre}
        </motion.button>
      )}

      {message && (
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 rounded-2xl bg-base-100 px-6 py-4 text-center font-medium text-base-content/70 shadow"
        >
          {message}
        </motion.p>
      )}

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {won && showReveal && <PrizeReveal prize={won} onClose={() => setShowReveal(false)} />}
          </AnimatePresence>,
          document.body,
        )}
    </motion.div>
  )
}

function PrizeReveal({ prize, onClose }: { prize: WonPrize; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-6 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-sm overflow-hidden rounded-[2rem] bg-base-100 px-8 pb-8 pt-10 text-center shadow-2xl"
        initial={{ scale: 0.6, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#D98A4E] via-[#F4B840] to-[#7AC2D4]" />

        <p className="text-xs font-bold uppercase tracking-[0.3em] text-base-content/50">¡Felicitaciones!</p>
        <h3 className="mt-1 bg-gradient-to-r from-[#D98A4E] via-[#F4B840] to-[#D98A4E] bg-clip-text text-4xl font-black text-transparent">
          ¡Ganaste!
        </h3>

        <div className="relative mx-auto my-6 flex h-44 w-44 items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'repeating-conic-gradient(from 0deg, rgba(244,184,64,0.55) 0deg 12deg, transparent 12deg 24deg)',
              maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="relative flex h-28 w-28 items-center justify-center rounded-full bg-base-100 shadow-[0_0_0_6px_#F6D77A,0_10px_30px_rgba(183,121,31,0.4)]"
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.15 }}
          >
            {prize.imagenUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={prize.imagenUrl} alt={prize.nombre} className="h-full w-full rounded-full object-cover" />
            ) : (
              <motion.span
                className="text-6xl"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                {prize.emoji ?? '🎁'}
              </motion.span>
            )}
          </motion.div>
        </div>

        <p className="text-3xl font-black text-base-content">{prize.nombre}</p>
        <p className="mt-2 text-sm text-base-content/60">Acercate al stand para retirar tu premio</p>

        <motion.button
          {...buttonTap}
          onClick={onClose}
          className="mt-6 w-full rounded-2xl py-3.5 text-lg font-black uppercase tracking-wider text-[#5C3A08] shadow-[0_8px_20px_rgba(183,121,31,0.4)]"
          style={{ background: 'linear-gradient(180deg, #FFE38A 0%, #F4B840 50%, #D9952A 100%)' }}
        >
          ¡Genial!
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
