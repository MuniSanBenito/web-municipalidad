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

  // Montar el componente solo del lado del cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 0.1, 1.5))
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 0.1, 0.8))

  const currentDate = new Date()
  const day = currentDate.getDate()
  const month = currentDate.toLocaleString('es-AR', { month: 'short' }).toUpperCase()

  return (
    <>
      {/* Botón de toggle para móviles */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-primary-content fixed top-1/2 right-0 z-50 flex h-12 w-6 -translate-y-1/2 items-center justify-center rounded-l-lg shadow-lg md:hidden"
        aria-label="Mostrar opciones de accesibilidad"
        aria-expanded={isOpen}
      >
        {isOpen ? <IconChevronRight size={20} /> : <IconChevronLeft size={20} />}
      </button>

      <aside
        className={`bg-base-100 fixed top-1/2 right-0 z-50 -translate-y-1/2 rounded-l-lg shadow-lg transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}
      >
        <ul className="m-0 flex list-none flex-col items-center gap-4 p-4">
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
      `}</style>
    </>
  )
}
