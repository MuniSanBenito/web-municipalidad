'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Breadcrumb {
  href: string
  label: string
  isCurrent: boolean
}

// Helper function to capitalize and make segment names friendly
const formatSegment = (segment: string): string => {
  if (!segment) return ''
  // Replace hyphens with spaces and capitalize each word
  const words = segment.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  return words.join(' ')
}

// Mapping for specific path segments to friendly names
const segmentNameMapping: { [key:string]: string } = {
  transparencia: 'Transparencia',
  contabilidad: 'Contabilidad',
  'balances-mensuales': 'Balances Mensuales',
  autoridades: 'Autoridades',
  compras: 'Compras y Contrataciones',
  concursos: 'Concursos Públicos',
  'declaraciones-juradas': 'Declaraciones Juradas',
  organigrama: 'Organigrama Municipal',
  proveedores: 'Proveedores Municipales',
  // Add more mappings as needed
}

const getFriendlyName = (segment: string): string => {
  return segmentNameMapping[segment] || formatSegment(segment)
}

export function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter((segment) => segment !== '')

  const breadcrumbs: Breadcrumb[] = [
    { href: '/', label: 'Inicio', isCurrent: false },
  ]

  let currentPath = ''
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLastSegment = index === segments.length - 1
    breadcrumbs.push({
      href: currentPath,
      label: getFriendlyName(segment),
      isCurrent: isLastSegment,
    })
  })

  // Only render breadcrumbs if on a page other than home and there are segments
  if (pathname === '/' || segments.length === 0) {
    return null
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500 dark:text-gray-400">
      <ol className="flex flex-wrap items-center space-x-1.5 sm:space-x-2">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center">
            {index > 0 && (
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-300 dark:text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
            )}
            {crumb.isCurrent ? (
              <span className="font-medium text-gray-700 dark:text-gray-200" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="hover:text-gray-700 dark:hover:text-gray-200 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 rounded"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
