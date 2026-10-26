import { getCampaignResults } from '@/participacion/actions'
import { getGameMetadata } from '@/participacion/engine/game-registry'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const data = await getCampaignResults(slug)
  return {
    title: data ? `Resultados | ${data.campana.nombre}` : 'Resultados',
    robots: { index: false, follow: false },
  }
}

export default async function ResultadosPorCampanaPage({ params }: PageProps) {
  const { slug } = await params
  const data = await getCampaignResults(slug)

  if (!data || data.campana.resultadosPublicos === false) {
    notFound()
  }

  const { campana, resultados } = data
  const actividades = ['deportes', 'arboles', 'plaza', 'presupuesto', 'quiz', 'caza-tesoro'] as const

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 pb-16">
      <div className="mx-auto max-w-2xl px-4 pt-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-base-content sm:text-3xl">
            Resultados de <span className="text-secondary">{campana.nombre}</span>
          </h1>
          <p className="mt-1 text-sm text-base-content/50">{campana.barrio}</p>
        </div>

        {resultados.length === 0 ? (
          <div className="mb-8 rounded-2xl border-2 border-dashed border-primary/20 bg-base-100 p-10 text-center shadow-sm">
            <p className="text-lg font-semibold text-base-content/60">Todavía no hay resultados</p>
            <p className="mt-2 text-sm text-base-content/40">
              Completá la experiencia en{' '}
              <a href={`/participacion/${slug}`} className="font-bold text-primary underline">
                /participacion/{slug}
              </a>{' '}
              para ser el primero.
            </p>
          </div>
        ) : (
          actividades.map((actividad) => {
            const items = resultados
              .filter((r) => r.actividad === actividad)
              .sort((a, b) => (b.votos ?? 0) - (a.votos ?? 0))
            if (items.length === 0) return null
            const total = items.reduce((s, r) => s + (r.votos ?? 0), 0)
            const meta = getGameMetadata(actividad)

            return (
              <div key={actividad} className="mb-6 rounded-2xl bg-base-100 p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-base-content">
                  <span className="text-secondary">{meta.icon}</span>
                  {meta.title}
                </h2>
                <div className="space-y-3">
                  {items.map((r) => {
                    const pct = total > 0 ? Math.round(((r.votos ?? 0) / total) * 100) : 0
                    return (
                      <div key={r.id} className="flex items-center gap-3">
                        <span className="w-28 shrink-0 truncate text-sm font-semibold text-base-content">
                          {r.opcionNombre}
                        </span>
                        <div className="relative h-7 flex-1 overflow-hidden rounded-full bg-base-200">
                          <div
                            className="flex h-full items-center rounded-full bg-primary transition-all"
                            style={{ width: `${Math.max(pct, 6)}%` }}
                          />
                        </div>
                        <span className="w-10 shrink-0 text-right text-sm font-bold text-secondary">
                          {pct}%
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })
        )}

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href={`/participacion/${slug}`}
            className="btn btn-md w-full rounded-2xl border-2 border-primary bg-base-100 font-bold text-primary shadow-sm hover:bg-primary/5 sm:w-auto sm:min-w-[200px]"
          >
            Participar de nuevo
          </a>
        </div>

        <div className="mt-10 rounded-2xl bg-primary p-6 text-center text-primary-content shadow-md">
          <p className="text-lg font-extrabold">Tu opinión construye el futuro</p>
          <p className="mt-1 text-sm opacity-80">Municipio + Vecinos = Un mejor barrio para todos</p>
        </div>
      </div>
    </div>
  )
}
