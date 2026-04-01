'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

type Rubro = {
  id: string
  nombre: string
}

type Props = {
  rubros: Rubro[]
}

export function FiltroRubros({ rubros }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const rubroActual = searchParams?.get('rubro') ?? ''

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams?.toString() ?? '')
    if (value) {
      params.set('rubro', value)
    } else {
      params.delete('rubro')
    }
    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false })
    })
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <label htmlFor="filtro-rubro" className="font-semibold whitespace-nowrap">
        Filtrar por rubro:
      </label>
      <select
        id="filtro-rubro"
        value={rubroActual}
        onChange={(e) => handleChange(e.target.value)}
        className="select select-bordered w-full max-w-xs"
        disabled={isPending}
      >
        <option value="">Todos los rubros</option>
        {rubros.map((rubro) => (
          <option key={rubro.id} value={rubro.id}>
            {rubro.nombre}
          </option>
        ))}
      </select>
      {isPending && <span className="loading loading-spinner loading-sm" />}
    </div>
  )
}
