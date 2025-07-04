'use client'
<<<<<<< HEAD
// Keep existing imports
import { ThemeToggle } from '@/components/theme-toggle'
import { IconMenu2, IconMessageChatbot, IconX } from '@tabler/icons-react' // Added IconMessageChatbot and IconX
=======
import { ThemeToggle } from '@/web/components/theme-toggle'
import { ThemeInitScript } from './ThemeInitScript' // Importa el nuevo script de inicialización de tema
import { AccessibilityControls } from '@/web/components/ui/AccessibilityControls'
import { Footer } from '@/web/components/ui/Footer'
import { IconMenu2 } from '@tabler/icons-react'
>>>>>>> cf53397837656140fd53beb68fab016c8cc19ee2
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoLight from 'public/images/logo-header-claro.webp'
import LogoDark from 'public/images/logo-header-oscuro.webp'
import type { PropsWithChildren } from 'react'
import { useEffect, useMemo, useState } from 'react' // Keep existing hooks
import { twJoin } from 'tailwind-merge'

// Import Chatbot related components
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css' // Default styling
import chatbotConfig from '@/components/chatbot/config'
import MessageParser from '@/components/chatbot/MessageParser'
import ActionProvider from '@/components/chatbot/ActionProvider'

// Styles for react-chatbot-kit to blend better (can be moved to a CSS file)
// We'll add a custom class to the chatbot container for specific overrides if needed.
// For now, rely on its default styles and our config.tsx customStyles.

const NAV_LINKS: { href: string; label: string }[] = [
  // ... (existing nav links)
  {
    href: '/noticias',
    label: 'Noticias',
  },
  {
    href: '/nuestra-ciudad',
    label: 'Nuestra Ciudad',
  },
  {
    href: '/transparencia',
    label: 'Transparencia',
  },
  {
    href: '/tramites',
    label: 'Tramites',
  },
] as const

export function RootLayout({ children }: PropsWithChildren) {
  const pathname = usePathname()
  const isHome = useMemo(() => pathname === '/', [pathname])
  const [isScrolled, setIsScrolled] = useState(false)
<<<<<<< HEAD
  const [showChatbot, setShowChatbot] = useState(false) // State for chatbot visibility
=======
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById('my-drawer') as HTMLInputElement
    if (drawerCheckbox) {
      drawerCheckbox.checked = false
      setIsDrawerOpen(false)
    }
  }
>>>>>>> cf53397837656140fd53beb68fab016c8cc19ee2

  useEffect(() => {
    const scrollListener = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', scrollListener)
    return () => window.removeEventListener('scroll', scrollListener)
  }, [])

  const toggleChatbot = () => setShowChatbot((prev) => !prev);

  return (
    <>
      <ThemeInitScript />
      <AccessibilityControls />
      <input type="checkbox" id="my-drawer" className="drawer-toggle" checked={isDrawerOpen} onChange={(e) => setIsDrawerOpen(e.target.checked)} />
      <div className="drawer-content">
        <header
          // ... (existing header attributes)
          className={twJoin(
            'bg-primary dark:bg-neutral fixed top-0 left-0 z-50 mb-2 flex w-screen items-center justify-between px-8 shadow-sm transition-all duration-100',
            isScrolled ? 'h-24' : 'h-32',
          )}
        >
          {/* ... (existing header content) */}
          <div className="flex items-center justify-center gap-2">
            <Link href="/" className="transition-all duration-500 hover:scale-105 hover:opacity-80">
              <img
                src={LogoDark.src}
                alt="San Benito Logo"
                className={twJoin('hidden dark:block', isScrolled ? 'h-12' : 'h-20')}
              />
              <img
                alt="San Benito Logo"
                src={LogoLight.src}
                className={twJoin('dark:hidden', isScrolled ? 'h-12' : 'h-20')}
              />
            </Link>
            <ul className="menu menu-horizontal hidden items-center gap-2 lg:flex">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="btn btn-ghost btn-primary dark:btn-neutral btn-lg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ThemeToggle className="lg:swap hidden" />
            <label
              htmlFor="my-drawer"
              className="drawer-button btn btn-ghost btn-primary btn-square dark:btn-neutral lg:hidden"
            >
              <IconMenu2 />
            </label>
          </div>
        </header>
        <main className={twJoin('min-h-svh', isHome ? null : isScrolled ? 'pt-24' : 'pt-32')}>
          {children}
        </main>
<<<<<<< HEAD

        {/* Chatbot Container */}
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
          {showChatbot && (
            <div className="chatbot-container" style={{ boxShadow: '0 5px 15px rgba(0,0,0,0.2)', borderRadius: '10px', overflow: 'hidden' }}>
              <Chatbot
                config={chatbotConfig}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
              />
            </div>
          )}
          <button
            onClick={toggleChatbot}
            className="btn btn-circle btn-primary shadow-lg"
            style={{ marginTop: '10px', width: '60px', height: '60px' }}
            aria-label={showChatbot ? 'Cerrar chat' : 'Abrir chat'}
          >
            {showChatbot ? <IconX size={32} /> : <IconMessageChatbot size={32} />}
          </button>
        </div>
=======
        <Footer />
>>>>>>> cf53397837656140fd53beb68fab016c8cc19ee2
      </div>
      <aside className="drawer-side z-50">
        {/* ... (existing aside content) */}
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <nav className="bg-base-200 flex min-h-screen flex-col items-start justify-between py-5">
          <ul className="menu menu-vertical">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="btn btn-ghost btn-primary dark:btn-neutral btn-lg w-fit"
                  onClick={closeDrawer}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <span className="self-center">
            <ThemeToggle />
          </span>
        </nav>
      </aside>
    </>
  )
}
