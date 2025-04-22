'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { twJoin } from 'tailwind-merge'
import { ThemeToggle } from './theme-toggle'

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
  // {
  //   href: '/hcd',
  //   label: 'HCD',
  // },
  {
    href: '/tramites',
    label: 'Tramites',
  },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <div className="drawer">
      <input
        id="navbar-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={toggleDrawer}
      />

      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <header
          className={twJoin(
            'navbar bg-primary fixed top-0 left-0 z-50 w-full shadow-md transition-all duration-300',
            isScrolled ? 'h-16' : 'h-28',
          )}
        >
          <div className="container mx-auto flex h-full items-center justify-between px-6">
            {/* Logo */}
            <Link href="/">
              <Image
                src="/images/logo.webp"
                alt="San Benito Logo"
                width={isScrolled ? 90 : 180}
                height={isScrolled ? 30 : 80}
                className="transition-all duration-300 hover:scale-105 hover:opacity-80"
                priority
              />
            </Link>

            {/* Menú para pantallas grandes */}
            <div className="hidden lg:flex lg:flex-1 lg:justify-start lg:pl-20">
              <ul className="menu menu-horizontal space-x-6 px-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-xl font-semibold hover:text-black">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Botón del drawer - Solo visible en móvil */}
            <div className="flex-none align-bottom lg:hidden">
              <label
                htmlFor="navbar-drawer"
                aria-label="open sidebar"
                className="btn btn-circle swap swap-rotate"
              >
                {/* Icono hamburguesa */}
                <svg
                  className={`h-6 w-6 fill-current ${isDrawerOpen ? 'hidden' : 'block'}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* Icono cerrar */}
                <svg
                  className={`h-6 w-6 fill-current ${isDrawerOpen ? 'block' : 'hidden'}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </label>
            </div>

            <label className="swap swap-rotate h-6 w-6 justify-self-end">
              <ThemeToggle />
            </label>
          </div>
        </header>
      </div>

      {/* Drawer lateral */}
      <div className="drawer-side top-28 z-40">
        <label
          htmlFor="navbar-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={toggleDrawer}
        ></label>
        <ul className="menu bg-accent min-h-full w-80 p-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-xl font-semibold hover:text-black"
                onClick={toggleDrawer}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
