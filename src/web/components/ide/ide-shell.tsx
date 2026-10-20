'use client'

import { IconStack2 } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoLight from 'public/images/logo-header-claro.webp'
import LogoDark from 'public/images/logo-header-oscuro.webp'
import type { PropsWithChildren } from 'react'
import { twJoin } from 'tailwind-merge'
import { IdeLayersDrawerProvider, useIdeLayersDrawer } from './ide-layers-drawer-context'

function IdeHeader() {
  const pathname = usePathname() ?? ''
  const { open, toggle } = useIdeLayersDrawer()
  const showLayersButton = pathname === '/ide' || pathname.startsWith('/ide/')

  return (
    <header
      className={twJoin(
        'bg-primary dark:bg-neutral flex h-16 w-full shrink-0 items-center gap-3 px-3',
      )}
    >
      <Link
        href="/"
        className="flex shrink-0 items-center justify-center gap-2 duration-500 hover:scale-105 hover:opacity-80"
      >
        <img
          src={LogoDark.src}
          alt="San Benito Logo"
          className={twJoin('hidden dark:block', 'h-9 md:h-12')}
        />
        <img
          alt="San Benito Logo"
          src={LogoLight.src}
          className={twJoin('dark:hidden', 'h-9 md:h-12')}
        />
      </Link>
      <h1 className="text-base-content min-w-0 flex-1 truncate text-sm leading-tight font-semibold md:text-xl">
        <span className="md:hidden">Mapa de San Benito</span>
        <span className="hidden md:inline">Infraestructura de Datos Espaciales</span>
      </h1>
      {showLayersButton ? (
        <button
          type="button"
          onClick={toggle}
          className={twJoin(
            'btn btn-sm border-base-100/40 bg-base-100 text-primary h-10 min-h-10 shrink-0 gap-1.5 rounded-full border px-3 shadow-sm md:hidden',
            open ? 'ring-primary/30 ring-2' : '',
          )}
          title={open ? 'Cerrar capas' : 'Abrir capas'}
          aria-label={open ? 'Cerrar capas' : 'Abrir capas'}
          aria-expanded={open}
        >
          <IconStack2 size={18} />
          Capas
        </button>
      ) : null}
    </header>
  )
}

export function IdeShell({ children }: PropsWithChildren) {
  return (
    <IdeLayersDrawerProvider>
      <div className="flex h-dvh flex-col overflow-hidden">
        <IdeHeader />
        <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">{children}</div>
      </div>
    </IdeLayersDrawerProvider>
  )
}
