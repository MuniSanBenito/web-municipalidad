import { hrefListado } from '@/web/lib/busqueda-comercios'
import Link from 'next/link'

type Props = {
  page: number
  totalPages: number
  q: string
  actividad: string
}

function paginasVisibles(actual: number, total: number) {
  const inicio = Math.max(1, actual - 2)
  const fin = Math.min(total, actual + 2)
  return Array.from({ length: fin - inicio + 1 }, (_, indice) => inicio + indice)
}

export function PaginacionComercios({ page, totalPages, q, actividad }: Props) {
  if (totalPages <= 1) return null

  const visibles = paginasVisibles(page, totalPages)
  const muestraPrimera = visibles[0] > 1
  const muestraUltima = visibles[visibles.length - 1] < totalPages

  return (
    <nav
      aria-label="Páginas de comercios"
      className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-base-content/60 text-sm">
        Página {page} de {totalPages}
      </p>
      <div className="join">
        {page > 1 && (
          <Link href={hrefListado(q, actividad, page - 1)} className="join-item btn btn-sm">
            Anterior
          </Link>
        )}
        {muestraPrimera && (
          <Link href={hrefListado(q, actividad, 1)} className="join-item btn btn-sm">
            1
          </Link>
        )}
        {muestraPrimera && visibles[0] > 2 && (
          <span className="join-item btn btn-sm btn-disabled">…</span>
        )}
        {visibles.map((numero) => (
          <Link
            key={numero}
            href={hrefListado(q, actividad, numero)}
            aria-current={numero === page ? 'page' : undefined}
            className={`join-item btn btn-sm ${numero === page ? 'btn-active' : ''}`}
          >
            {numero}
          </Link>
        ))}
        {muestraUltima && visibles[visibles.length - 1] < totalPages - 1 && (
          <span className="join-item btn btn-sm btn-disabled">…</span>
        )}
        {muestraUltima && (
          <Link href={hrefListado(q, actividad, totalPages)} className="join-item btn btn-sm">
            {totalPages}
          </Link>
        )}
        {page < totalPages && (
          <Link href={hrefListado(q, actividad, page + 1)} className="join-item btn btn-sm">
            Siguiente
          </Link>
        )}
      </div>
    </nav>
  )
}
