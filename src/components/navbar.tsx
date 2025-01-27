'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { twJoin } from 'tailwind-merge'

const NAV_LINKS: { href: string; label: string }[] = [
  {
    href: '/',
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
    href: '/hcd',
    label: 'HCD',
  },
  {
    href: '/tramites',
    label: 'Tramites',
  },
]

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
      className={twJoin(
        'bg-primary sticky top-0 left-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'h-16 shadow-md' : 'h-28',
      )}
    >
      <div className="container mx-auto flex h-full items-center justify-between px-6">
        <Link href="/">
          <Image
            src="/images/Logo.png"
            alt="San Benito Logo"
            width={isScrolled ? 90 : 180}
            height={isScrolled ? 30 : 80}
            className="transition-all duration-300 hover:scale-105 hover:opacity-80"
            priority
          />
        </Link>

        <ul className="menu menu-horizontal px-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-black">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
