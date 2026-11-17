'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'

type Actividad = {
  id: string
  nombre: string
}

type Props = {
  actividades: Actividad[]
}

export function FiltrosComercios({ actividades }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const actividadActual = searchParams?.get('actividad') ?? ''
  const qActual = searchParams?.get('q') ?? ''
  const [q, setQ] = useState(qActual)

  useEffect(() => {
    setQ(qActual)
  }, [qActual])

  function navegar(siguienteQ: string, actividad: string) {
    const params = new URLSearchParams(searchParams?.toString() ?? '')
    params.delete('rubro')
    const texto = siguienteQ.trim()
    if (texto) params.set('q', texto)
    else params.delete('q')
    if (actividad) params.set('actividad', actividad)
    else params.delete('actividad')

    const query = params.toString()
    startTransition(() => {
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
    })
  }

  useEffect(() => {
    if (q.trim() === qActual) return
    const id = window.setTimeout(() => navegar(q, actividadActual), 350)
    return () => window.clearTimeout(id)
    // navegar lee los params vigentes; el debounce solo depende del texto y la actividad elegida.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, qActual, actividadActual])

  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_16rem]">
      <div className="flex min-w-0 flex-col gap-1">
        <label htmlFor="buscar-comercio" className="text-sm font-medium">
          Buscar
        </label>
        <input
          id="buscar-comercio"
          type="search"
          value={q}
          onChange={(event) => setQ(event.target.value)}
          placeholder="Nombre de fantasía o titular"
          className="input input-bordered w-full"
          enterKeyHint="search"
        />
      </div>
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex items-center gap-2">
          <label htmlFor="filtro-actividad" className="text-sm font-medium">
            Actividad
          </label>
          {isPending && <span className="loading loading-spinner loading-xs" />}
        </div>
        <select
          id="filtro-actividad"
          value={actividadActual}
          onChange={(event) => navegar(q, event.target.value)}
          className="select select-bordered w-full"
          disabled={isPending}
        >
          <option value="">Todas las actividades</option>
          {actividades.map((actividad) => (
            <option key={actividad.id} value={actividad.id}>
              {actividad.nombre}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
