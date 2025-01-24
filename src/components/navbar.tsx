'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50) // Cambia el estado si el scroll supera 50px
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'h-16 bg-primary shadow-md' : 'h-28 bg-primary'
      }`}
    >
      <div className="container mx-auto flex h-full items-center justify-between px-6">
        <Link href="/">
          <Image
            src="/images/Logo.png"
            alt="San Benito Logo"
            width={isScrolled ? 90 : 180}
            height={isScrolled ? 30 : 80}
            className="transition-transform duration-300 hover:scale-105 hover:opacity-80"
            priority
          />
        </Link>

        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/" className="hover:text-accent">
              Noticias
            </Link>
          </li>
          <li>
            <Link href="/nuestra-ciudad" className="hover:text-accent">
              Nuestra Ciudad
            </Link>
          </li>
          <li>
            <Link href="/transparencia" className="hover:text-accent">
              Transparencia
            </Link>
          </li>
          <li>
            <Link href="/hcd" className="hover:text-accent">
              HCD
            </Link>
          </li>
          <li>
            <Link href="/tramites" className="hover:text-accent">
              Trámites y Servicios
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
