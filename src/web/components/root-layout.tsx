'use client'
import { ThemeToggle } from '@/components/theme-toggle'
import { IconMenu2 } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoLight from 'public/images/logo-header-claro.webp'
import LogoDark from 'public/images/logo-header-oscuro.webp'
import type { PropsWithChildren } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { twJoin } from 'tailwind-merge'

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

export function RootLayout({ children }: PropsWithChildren) {
  const pathname = usePathname()
  const isHome = useMemo(() => pathname === '/', [pathname])

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const scrollListener = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', scrollListener)
    return () => window.removeEventListener('scroll', scrollListener)
  }, [])

  return (
    <>
      <div className="drawer-content pb-10">
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
