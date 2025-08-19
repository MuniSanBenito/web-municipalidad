'use client'

import {
  IconAccessible,
  IconChevronLeft,
  IconChevronRight,
  IconRefresh,
  IconZoomIn,
  IconZoomOut,
} from '@tabler/icons-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { ThemeToggle } from '../theme-toggle'

export function AccessibilityControls() {
  const { setTheme } = useTheme()
  const [fontSize, setFontSize] = useState(1)
  const [isOpen, setIsOpen] = useState(false)

  // Estado para la posición vertical del panel (en px)
  const NAVBAR_HEIGHT = 130 // altura del navbar en px (ajustar si es necesario)
  const PANEL_HEIGHT = 320 // altura estimada del panel (ajustar si es necesario)
  const [panelTop, setPanelTop] = useState(200) // valor seguro para SSR
  const [dragging, setDragging] = useState(false)
  const [dragStartY, setDragStartY] = useState(0)
  const [panelStartTop, setPanelStartTop] = useState(0)
  // Estado para animación de rebote
  const [bounce, setBounce] = useState(false)
  // Altura del viewport y preferencia de movimiento reducido
  const [viewportHeight, setViewportHeight] = useState<number | null>(null)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    // Medidas iniciales de viewport
    const vh = window.innerHeight
    setViewportHeight(vh)

    // Preferencias de movimiento reducido
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const onMqChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
    // Compatibilidad amplia para Safari
    if (typeof mq.addEventListener === 'function') mq.addEventListener('change', onMqChange)
    else if (typeof mq.addListener === 'function') mq.addListener(onMqChange)

    // Restaurar tamaño de fuente
    try {
      const savedFont = localStorage.getItem('a11y-font-size')
      if (savedFont) {
        const f = Number(savedFont)
        if (!Number.isNaN(f)) setFontSize(Math.min(1.5, Math.max(0.8, f)))
      }
    } catch {}

    // Restaurar posición del panel o centrar
    try {
      const savedTop = localStorage.getItem('a11y-panel-top')
      const minTop = NAVBAR_HEIGHT
      const maxTop = Math.max(NAVBAR_HEIGHT, vh - 120)
      if (savedTop) {
        const t = Number(savedTop)
        if (!Number.isNaN(t)) setPanelTop(Math.max(minTop, Math.min(maxTop, t)))
        else setPanelTop(vh / 2 - PANEL_HEIGHT / 2)
      } else {
        setPanelTop(vh / 2 - PANEL_HEIGHT / 2)
      }
    } catch {
      setPanelTop(vh / 2 - PANEL_HEIGHT / 2)
    }

    return () => {
      if (typeof mq.removeEventListener === 'function') mq.removeEventListener('change', onMqChange)
      else if (typeof mq.removeListener === 'function') mq.removeListener(onMqChange)
    }
  }, [])

  // Eventos de drag (mouse y touch)
  useEffect(() => {
    if (!dragging) return
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
      let newTop = panelStartTop + (clientY - dragStartY)
      // Limitar el movimiento para que no se meta debajo del navbar ni salga de la ventana
      const vh = viewportHeight ?? window.innerHeight
      newTop = Math.max(NAVBAR_HEIGHT, Math.min(vh - 120, newTop))
      setPanelTop(newTop)
    }
    const handleUp = () => {
      setDragging(false)
      if (!reduceMotion) setBounce(true) // activa el rebote si no hay motion reducido
    }
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('touchmove', handleMove)
    window.addEventListener('mouseup', handleUp)
    window.addEventListener('touchend', handleUp)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('mouseup', handleUp)
      window.removeEventListener('touchend', handleUp)
    }
  }, [dragging, dragStartY, panelStartTop, viewportHeight, reduceMotion])

  // Al terminar la animación de rebote, la desactiva
  useEffect(() => {
    if (!bounce) return
    const timeout = setTimeout(() => setBounce(false), 400)
    return () => clearTimeout(timeout)
  }, [bounce])

  // Persistencia de tamaño de fuente y posición del panel
  useEffect(() => {
    try {
      localStorage.setItem('a11y-font-size', String(fontSize))
    } catch {}
  }, [fontSize])

  useEffect(() => {
    try {
      localStorage.setItem('a11y-panel-top', String(panelTop))
    } catch {}
  }, [panelTop])

  // Ajuste en cambios de tamaño de ventana
  useEffect(() => {
    const onResize = () => {
      const vh = window.innerHeight
      setViewportHeight(vh)
      setPanelTop((prev) => {
        const min = NAVBAR_HEIGHT
        const max = Math.max(NAVBAR_HEIGHT, vh - 120)
        return Math.max(min, Math.min(max, prev))
      })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    setDragging(true)
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    setDragStartY(clientY)
    setPanelStartTop(panelTop)
  }

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 0.1, 1.5))
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 0.1, 0.8))

  const handleReset = () => {
    // Restablecer tamaño de fuente
    setFontSize(1)
    // Recentrar panel
    const vh = viewportHeight ?? window.innerHeight
    setPanelTop(vh / 2 - PANEL_HEIGHT / 2)
    // Persistencia
    try {
      localStorage.removeItem('a11y-font-size')
      localStorage.removeItem('a11y-panel-top')
    } catch {}
  }

  const onHandleKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 50 : 10
    let delta = 0
    if (e.key === 'ArrowUp') delta = -step
    else if (e.key === 'ArrowDown') delta = step
    else if (e.key === 'PageUp') delta = -100
    else if (e.key === 'PageDown') delta = 100
    if (delta !== 0) {
      e.preventDefault()
      const vh = viewportHeight ?? window.innerHeight
      const min = NAVBAR_HEIGHT
      const max = Math.max(NAVBAR_HEIGHT, vh - 120)
      setPanelTop((prev) => Math.max(min, Math.min(max, prev + delta)))
    }
  }

  const currentDate = new Date()
  const day = currentDate.getDate()
  const month = currentDate.toLocaleString('es-AR', { month: 'short' }).toUpperCase()

  return (
    <>
      {/* Botón de toggle SOLO para móviles */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-primary-content ring-base-300/20 fixed top-1/2 right-0 z-50 flex h-12 w-6 -translate-y-1/2 items-center justify-center rounded-l-lg shadow-[0_0_15px_rgba(0,0,0,0.2)] ring-1 md:hidden"
          aria-label="Mostrar opciones de accesibilidad"
          aria-expanded={isOpen}
        >
          <IconChevronLeft size={20} />
        </button>
      )}

      <aside
        className={`bg-base-100/95 ring-base-300/20 fixed right-0 z-50 rounded-l-lg ring-1 backdrop-blur-sm transition-transform duration-300 ${(isOpen ? 'translate-x-0 scale-100 shadow-[0_0_20px_rgba(0,0,0,0.15)]' : 'translate-x-full scale-95 shadow-[0_0_8px_rgba(0,0,0,0.07)]') + ' md:translate-x-0 md:scale-100 md:shadow-[0_0_20px_rgba(0,0,0,0.15)]'} ${bounce ? 'animate-bounce-panel' : ''}`}
        style={{
          top: panelTop,
          /* transform controlado por clases, no inline */
        }}
        onAnimationEnd={() => setBounce(false)}
      >
        {/* Handle para mover el panel */}
        <div
          className="flex w-full cursor-grab items-center justify-center py-1 select-none active:cursor-grabbing"
          style={{ touchAction: 'none' }}
          onMouseDown={startDrag}
          onTouchStart={startDrag}
          aria-label="Mover panel de accesibilidad"
          tabIndex={0}
          role="slider"
          aria-orientation="vertical"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={(() => {
            const vh = viewportHeight ?? (typeof window !== 'undefined' ? window.innerHeight : 800)
            const min = NAVBAR_HEIGHT
            const max = Math.max(NAVBAR_HEIGHT, vh - 120)
            if (max === min) return 50
            return Math.round(((panelTop - min) / (max - min)) * 100)
          })()}
          onKeyDown={onHandleKeyDown}
        >
          <span className="bg-base-300 flex h-2 w-8 items-center justify-center rounded-full">
            <svg width="24" height="8">
              <rect x="4" y="3" width="16" height="2" rx="1" fill="#888" />
            </svg>
          </span>
        </div>
        {/* Botón de cerrar dentro del panel SOLO en mobile */}
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="bg-primary text-primary-content ring-base-300/20 absolute top-1/2 left-0 z-50 flex h-12 w-6 -translate-x-full -translate-y-1/2 items-center justify-center rounded-l-lg shadow-[0_0_15px_rgba(0,0,0,0.2)] ring-1 md:hidden"
            aria-label="Cerrar opciones de accesibilidad"
            aria-expanded={isOpen}
          >
            <IconChevronRight size={20} />
          </button>
        )}

        <ul className="m-0 mt-2 flex list-none flex-col items-center gap-4 p-4">
          {/* Fecha */}
          <li className="text-center font-semibold">
            <span className="text-xl">{day}</span>
            <br />
            {month}
          </li>

          {/* Tema oscuro/claro */}
          <li>
            <ThemeToggle />
          </li>

          {/* Control de tamaño de texto */}
          <li>
            <button
              onClick={increaseFontSize}
              className="btn btn-circle btn-sm"
              aria-label="Aumentar tamaño de texto"
              title="Aumentar tamaño de texto"
            >
              <IconZoomIn size={24} />
            </button>
          </li>
          <li>
            <button
              onClick={decreaseFontSize}
              className="btn btn-circle btn-sm"
              aria-label="Reducir tamaño de texto"
              title="Reducir tamaño de texto"
            >
              <IconZoomOut size={24} />
            </button>
          </li>

          {/* Restablecer ajustes */}
          <li>
            <button
              onClick={handleReset}
              className="btn btn-circle btn-sm"
              aria-label="Restablecer ajustes"
              title="Restablecer ajustes"
            >
              <IconRefresh size={24} />
            </button>
          </li>

          {/* Accesibilidad */}
          <li>
            <button
              onClick={() => setTheme('high-contrast')}
              className="btn btn-circle btn-sm"
              aria-label="Modo alto contraste"
              title="Modo alto contraste"
            >
              <IconAccessible size={24} />
            </button>
          </li>
        </ul>
      </aside>
      {/* Anuncio discreto para lectores de pantalla sobre cambios de tamaño de fuente */}
      <div aria-live="polite" role="status" className="sr-only">
        Tamaño de fuente: {Math.round(fontSize * 100)}%
      </div>
      <style jsx global>{`
        :root {
          font-size: ${fontSize}rem;
        }
        @keyframes bounce-panel {
          0% {
            transform: scale(1) translateX(0);
          }
          20% {
            transform: scale(1.03) translateY(-10px) translateX(0);
          }
          40% {
            transform: scale(0.97) translateY(6px) translateX(0);
          }
          60% {
            transform: scale(1.01) translateY(-4px) translateX(0);
          }
          100% {
            transform: scale(1) translateY(0) translateX(0);
          }
        }
        .animate-bounce-panel {
          animation: bounce-panel 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-bounce-panel {
            animation: none !important;
          }
        }
      `}</style>
    </>
  )
}
