'use client'

import {
  IconAccessible,
  IconChevronLeft,
  IconChevronRight,
  IconMoon,
  IconSun,
  IconZoomIn,
  IconZoomOut,
} from '@tabler/icons-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function AccessibilityControls() {
  const { theme, setTheme } = useTheme()
  const [fontSize, setFontSize] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Estado para la posición vertical del panel (en px)
  const NAVBAR_HEIGHT = 130 // altura del navbar en px (ajustar si es necesario)
  const PANEL_HEIGHT = 320 // altura estimada del panel (ajustar si es necesario)
  const [panelTop, setPanelTop] = useState(200) // valor seguro para SSR
  const [dragging, setDragging] = useState(false)
  const [dragStartY, setDragStartY] = useState(0)
  const [panelStartTop, setPanelStartTop] = useState(0)
  // Estado para animación de rebote
  const [bounce, setBounce] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Solo en cliente: centra el panel verticalmente usando la altura estimada
    setPanelTop(window.innerHeight / 2 - PANEL_HEIGHT / 2)
  }, [])

  // Eventos de drag (mouse y touch)
  useEffect(() => {
    if (!dragging) return
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
      let newTop = panelStartTop + (clientY - dragStartY)
      // Limitar el movimiento para que no se meta debajo del navbar ni salga de la ventana
      newTop = Math.max(NAVBAR_HEIGHT, Math.min(window.innerHeight - 120, newTop))
      setPanelTop(newTop)
    }
    const handleUp = () => {
      setDragging(false)
      setBounce(true) // activa el rebote
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
  }, [dragging, dragStartY, panelStartTop])

  // Al terminar la animación de rebote, la desactiva
  useEffect(() => {
    if (!bounce) return
    const timeout = setTimeout(() => setBounce(false), 400)
    return () => clearTimeout(timeout)
  }, [bounce])

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    setDragging(true)
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    setDragStartY(clientY)
    setPanelStartTop(panelTop)
  }

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 0.1, 1.5))
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 0.1, 0.8))

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
          /* quitamos translateY(-50%) */ transform: `${isOpen ? 'translateX(0)' : 'translateX(100%)'}${' md:translateX(0)'}`,
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
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="btn btn-circle btn-sm"
              aria-label="Cambiar tema"
            >
              {mounted && (theme === 'light' ? <IconMoon size={24} /> : <IconSun size={24} />)}
            </button>
          </li>

          {/* Control de tamaño de texto */}
          <li>
            <button
              onClick={increaseFontSize}
              className="btn btn-circle btn-sm"
              aria-label="Aumentar tamaño de texto"
            >
              <IconZoomIn size={24} />
            </button>
          </li>
          <li>
            <button
              onClick={decreaseFontSize}
              className="btn btn-circle btn-sm"
              aria-label="Reducir tamaño de texto"
            >
              <IconZoomOut size={24} />
            </button>
          </li>

          {/* Accesibilidad */}
          <li>
            <button
              onClick={() => setTheme('high-contrast')}
              className="btn btn-circle btn-sm"
              aria-label="Modo alto contraste"
            >
              <IconAccessible size={24} />
            </button>
          </li>
        </ul>
      </aside>
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
      `}</style>
    </>
  )
}
