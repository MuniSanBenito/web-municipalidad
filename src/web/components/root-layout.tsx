'use client'
import type { Ciudadano } from '@/payload-types'
import { ThemeToggle } from '@/web/components/theme-toggle'
import { AccessibilityControls } from '@/web/components/ui/AccessibilityControls'
import { Footer } from '@/web/components/ui/Footer'
import { IconMenu2, IconUser, IconMessageChatbot, IconX } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoLight from 'public/images/logo-header-claro.webp'
import LogoDark from 'public/images/logo-header-oscuro.webp'
import type { PropsWithChildren } from 'react'
import { useEffect, useMemo, useState } from 'react' // Keep existing hooks
import { twJoin } from 'tailwind-merge'
import { LogoutButton } from './logout-button'
import { ThemeInitScript } from './ThemeInitScript'

// Import Chatbot related components
import ActionProvider from '@/components/chatbot/ActionProvider'
import chatbotConfig from '@/components/chatbot/config'
import MessageParser from '@/components/chatbot/MessageParser'
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css' // Default styling
import '@/components/chatbot/chatbot-styles.css' // Custom improved styling

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

interface Props extends PropsWithChildren {
  ciudadano: Ciudadano | null
}

export function RootLayout({ children, ciudadano }: Props) {
  const pathname = usePathname()
  const isHome = useMemo(() => pathname === '/', [pathname])
  const [isScrolled, setIsScrolled] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false) // State for chatbot visibility
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById('my-drawer') as HTMLInputElement
    if (drawerCheckbox) {
      drawerCheckbox.checked = false
      setIsDrawerOpen(false)
    }
  }

  useEffect(() => {
    const scrollListener = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', scrollListener)
    return () => window.removeEventListener('scroll', scrollListener)
  }, [])

  const toggleChatbot = () => setShowChatbot((prev) => !prev)

  return (
    <>
      {/* <ThemeInitScript /> */}
      <AccessibilityControls />
      <input
        type="checkbox"
        id="my-drawer"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={(e) => setIsDrawerOpen(e.target.checked)}
      />
      <div className="drawer-content">
        <header
          // ... (existing header attributes)
          className={twJoin(
            'bg-primary dark:bg-neutral fixed top-0 left-0 z-50 mb-2 flex w-screen items-center justify-between px-2 shadow-sm transition-all duration-100 sm:px-8',
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
                    className="btn btn-ghost btn-primary dark:btn-neutral btn-lg text-primary-content dark:text-base-content"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center gap-2">
            {ciudadano ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                  <IconUser size={20} />
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow"
                >
                  <li>
                    <Link href="/perfil">
                      <IconUser size={16} />
                      Mi perfil
                    </Link>
                  </li>
                  <li>
                    <LogoutButton className=" " />
                  </li>
                </ul>
              </div>
            ) : (
              <Link href="/login" className="btn-xs sm:btn-md btn btn-primary">
                Iniciar sesion
              </Link>
            )}
            <label
              htmlFor="my-drawer"
              className="drawer-button btn btn-ghost btn-primary btn-square dark:btn-neutral dark:text-base-content text-primary-content lg:hidden"
            >
              <IconMenu2 />
            </label>
          </div>
        </header>
        <main className={twJoin('min-h-svh', isHome ? null : isScrolled ? 'pt-24' : 'pt-32')}>
          {children}
        </main>

        {/* Chatbot Container */}
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000 }}>
          {showChatbot && (
            <div
              className="chatbot-container"
              style={{
                width: '380px',
                height: '600px',
                boxShadow: '0 12px 40px rgba(7, 102, 51, 0.25), 0 0 0 2px #b6c544',
                borderRadius: '20px',
                overflow: 'hidden',
                marginBottom: '16px',
                animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                background: '#ffffff',
              }}
            >
              <Chatbot
                config={chatbotConfig}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
              />
            </div>
          )}
          <button
            onClick={toggleChatbot}
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              border: '3px solid #076633',
              background: '#b6c544',
              color: '#076633',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(182, 197, 68, 0.4)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              marginLeft: 'auto',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1) translateY(-2px) rotate(5deg)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(182, 197, 68, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateY(0) rotate(0deg)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(182, 197, 68, 0.4)';
            }}
            aria-label={showChatbot ? 'Cerrar chat' : 'Abrir chat'}
          >
            {showChatbot ? (
              <IconX size={32} strokeWidth={2.5} />
            ) : (
              <>
                <IconMessageChatbot size={32} strokeWidth={2.5} />
                {/* Indicador de notificación */}
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#076633',
                  border: '2px solid #b6c544',
                  animation: 'pulse 2s ease-in-out infinite',
                }} />
              </>
            )}
          </button>
        </div>
        <Footer />
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
                  className="btn btn-ghost btn-primary dark:btn-neutral btn-lg text-primary-content dark:text-base-content w-fit"
                  onClick={closeDrawer}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex w-full flex-col items-center justify-end gap-4">
            {ciudadano ? (
              <div className="dropdown dropdown-top dropdown-center">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                  <IconUser size={20} />
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content bg-base-100 rounded-box z-1 mb-2 w-52 p-2 shadow"
                >
                  <li>
                    <Link href="/perfil" onClick={closeDrawer}>
                      <IconUser size={16} />
                      Mi perfil
                    </Link>
                  </li>
                  <li>
                    <LogoutButton className=" " />
                  </li>
                </ul>
              </div>
            ) : (
              <Link href="/login" className="btn btn-neutral">
                Iniciar sesion
              </Link>
            )}
            <span className="self-center">
              <ThemeToggle />
            </span>
          </div>
        </nav>
      </aside>
    </>
  )
}
