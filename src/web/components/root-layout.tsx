'use client'
import type { Ciudadano } from '@/payload-types'
import { ThemeToggle } from '@/web/components/theme-toggle'
import { AccessibilityControls } from '@/web/components/ui/AccessibilityControls'
import { Footer } from '@/web/components/ui/Footer'
import { IconLogout, IconMenu2, IconUser } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import LogoLight from 'public/images/logo-header-claro.webp'
import LogoDark from 'public/images/logo-header-oscuro.webp'
import type { PropsWithChildren } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { twJoin } from 'tailwind-merge'
import { ThemeInitScript } from './ThemeInitScript' // Importa el nuevo script de inicialización de tema

const NAV_LINKS: { href: string; label: string }[] = [
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
  initialCiudadano: Ciudadano | null
}

export function RootLayout({ children, initialCiudadano }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = useMemo(() => pathname === '/', [pathname])

  const [isScrolled, setIsScrolled] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [ciudadano, setCiudadano] = useState<Ciudadano | null>(initialCiudadano)

  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById('my-drawer') as HTMLInputElement
    if (drawerCheckbox) {
      drawerCheckbox.checked = false
      setIsDrawerOpen(false)
    }
  }

  // Función para verificar el estado de autenticación
  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/ciudadanos/me', {
        method: 'GET',
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        setCiudadano(data.user)
      } else {
        setCiudadano(null)
      }
    } catch (error) {
      console.error('Error checking auth status:', error)
      setCiudadano(null)
    }
  }

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await fetch('/api/ciudadanos/logout', {
        method: 'POST',
        credentials: 'include',
      })
      setCiudadano(null)
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  useEffect(() => {
    // Verificar el estado de autenticación al cargar
    if (initialCiudadano !== ciudadano) {
      setCiudadano(initialCiudadano)
    }

    // Escuchar eventos de autenticación
    const handleAuthChange = () => {
      checkAuthStatus()
    }

    // Agregar listeners para cambios de autenticación
    window.addEventListener('authStateChanged', handleAuthChange)
    window.addEventListener('focus', handleAuthChange)

    // Cleanup
    return () => {
      window.removeEventListener('authStateChanged', handleAuthChange)
      window.removeEventListener('focus', handleAuthChange)
    }
  }, [initialCiudadano, ciudadano])

  useEffect(() => {
    const scrollListener = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', scrollListener)
    return () => window.removeEventListener('scroll', scrollListener)
  }, [])

  return (
    <>
      <ThemeInitScript />
      <AccessibilityControls />
      <input
        type="checkbox"
        id="my-drawer"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={(e) => setIsDrawerOpen(e.target.checked)}
      />
      <div className="drawer-content">
        {/* Page content here */}
        <header
          className={twJoin(
            'bg-primary dark:bg-neutral fixed top-0 left-0 z-50 mb-2 flex w-screen items-center justify-between px-8 shadow-sm transition-all duration-100',
            isScrolled ? 'h-24' : 'h-32',
          )}
        >
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
            {ciudadano ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                  <IconUser size={20} />
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <Link href="/perfil">
                      <IconUser size={16} />
                      Mi perfil
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>
                      <IconLogout size={16} />
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link href="/login" className="btn btn-primary">
                Iniciar sesion
              </Link>
            )}
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
        <Footer />
      </div>
      <aside className="drawer-side z-50">
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
          <div className="flex w-full flex-col items-center justify-end gap-4">
            <Link href="/login" className="btn btn-neutral">
              Iniciar sesion
            </Link>
            <span className="self-center">
              <ThemeToggle />
            </span>
          </div>
        </nav>
      </aside>
    </>
  )
}
