'use client'

import { IconStack2 } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoLight from 'public/images/logo-header-claro.webp'
import LogoDark from 'public/images/logo-header-oscuro.webp'
import type { PropsWithChildren } from 'react'
import { twJoin } from 'tailwind-merge'
import { IdeLayersDrawerProvider, useIdeLayersDrawer } from './ide-layers-drawer-context'

const VISOR_PATH = '/ide/'

function IdeHeader() {
  const pathname = usePathname() ?? ''
  const { open, toggle } = useIdeLayersDrawer()
  const showLayersButton = pathname === VISOR_PATH || pathname.startsWith(`${VISOR_PATH}/`)

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
          className={twJoin('hidden dark:block', 'h-12')}
        />
        <img alt="San Benito Logo" src={LogoLight.src} className={twJoin('dark:hidden', 'h-12')} />
      </Link>
      <h1 className="text-base-content min-w-0 flex-1 text-sm leading-tight font-semibold md:text-xl">
        Infraestuctura de Datos Espaciales
      </h1>
      {showLayersButton ? (
        <button
          type="button"
          onClick={toggle}
          className={twJoin(
            'btn btn-ghost btn-square shrink-0 md:hidden',
            open ? 'btn-active' : '',
          )}
          title={open ? 'Cerrar capas' : 'Abrir capas'}
          aria-label={open ? 'Cerrar capas' : 'Abrir capas'}
          aria-expanded={open}
        >
          <IconStack2 size={22} />
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
