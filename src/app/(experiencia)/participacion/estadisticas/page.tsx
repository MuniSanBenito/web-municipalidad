import { getGameMetadata } from '@/participacion/engine/game-registry'
import config from '@/payload.config'
import { IconChartBar, IconRefresh } from '@tabler/icons-react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'

export const metadata: Metadata = {
  title: 'Resultados en vivo | Participación ciudadana',
  description: 'Resultados en tiempo real de la participación ciudadana',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

const WARM_COLORS = ['#5A7A3E', '#D98A4E', '#F4B840', '#7AC2D4', '#6D5D52', '#A9C4A6', '#C85A54', '#B8A27A', '#9CAE6A']

const BUDGET_EMOJIS: Record<string, string> = {
  Calles: '🛣️', Veredas: '🚶', Iluminación: '💡', Seguridad: '🚨',
  Plazas: '🏞️', Árboles: '🌳', Deportes: '⚽', Cultura: '🎭',
  Educación: '📚', Limpieza: '🧹', Salud: '🏥', Ambiente: '🌱',
}

export default async function EstadisticasPage() {
  const payload = await getPayload({ config })

  const resultadosRes = await payload.find({
    collection: 'resultados-campana',
    limit: 500,
    sort: '-votos',
    depth: 1,
  })

  const todos = resultadosRes.docs

  const deportes = todos.filter((r) => r.actividad === 'deportes').sort((a, b) => (b.votos ?? 0) - (a.votos ?? 0))
  const arboles = todos.filter((r) => r.actividad === 'arboles').sort((a, b) => (b.votos ?? 0) - (a.votos ?? 0))
  const plaza = todos.filter((r) => r.actividad === 'plaza').sort((a, b) => (b.votos ?? 0) - (a.votos ?? 0))
  const presupuesto = todos.filter((r) => r.actividad === 'presupuesto').sort((a, b) => (b.votos ?? 0) - (a.votos ?? 0))

  const totalDeportes = deportes.reduce((s, r) => s + (r.votos ?? 0), 0)
  const totalArboles = arboles.reduce((s, r) => s + (r.votos ?? 0), 0)
  const totalPlaza = plaza.reduce((s, r) => s + (r.votos ?? 0), 0)
  const totalPresupuesto = presupuesto.reduce((s, r) => s + (r.votos ?? 0), 0)
  const totalVotos = totalDeportes + totalArboles + totalPlaza + totalPresupuesto

  const vecinos = totalDeportes
  const actividadesConDatos = [deportes.length > 0, arboles.length > 0, plaza.length > 0, presupuesto.length > 0].filter(Boolean).length

  const tieneData = todos.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 pb-16">
      <div className="mx-auto max-w-2xl px-4 pt-8">

        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
            <IconChartBar size={36} strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-base-content sm:text-3xl">
            Resultados en vivo
          </h1>
          <p className="mt-1 text-sm text-base-content/50">para todos</p>
        </div>

        {!tieneData && (
          <div className="mb-8 rounded-2xl border-2 border-dashed border-primary/20 bg-base-100 p-10 text-center shadow-sm">
            <p className="text-lg font-semibold text-base-content/60">Todavía no hay resultados</p>
            <p className="mt-2 text-sm text-base-content/40">
              Completá la experiencia en{' '}
              <a href="/participacion" className="font-bold text-primary underline">
                /participacion
              </a>{' '}
              para generar datos.
            </p>
          </div>
        )}

        {tieneData && (
          <>
            <div className="mb-8 grid grid-cols-2 gap-3">
              <div className="flex flex-col items-center rounded-2xl bg-base-100 p-5 shadow-sm">
                <span className="text-3xl font-extrabold text-primary">{vecinos}</span>
                <span className="mt-1 text-center text-xs font-semibold text-base-content/60">
                  Vecinos participaron
                </span>
              </div>
              <div className="flex flex-col items-center rounded-2xl bg-base-100 p-5 shadow-sm">
                <span className="text-3xl font-extrabold text-secondary">{actividadesConDatos}</span>
                <span className="mt-1 text-center text-xs font-semibold text-base-content/60">
                  Actividades respondidas
                </span>
              </div>
            </div>

            {deportes.length > 0 && (
              <div className="mb-6 rounded-2xl bg-base-100 p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-base-content">
                  <span className="text-secondary">{getGameMetadata('deportes').icon}</span> Deportes más votados
                </h2>
                <div className="space-y-3">
                  {deportes.map((r, i) => {
                    const pct = totalDeportes > 0 ? Math.round(((r.votos ?? 0) / totalDeportes) * 100) : 0
                    const color = WARM_COLORS[i % WARM_COLORS.length]
                    return (
                      <div key={r.id} className="flex items-center gap-3">
                        <span className="w-28 shrink-0 truncate text-sm font-semibold text-base-content">
                          {r.opcionNombre}
                        </span>
                        <div className="relative h-7 flex-1 overflow-hidden rounded-full bg-base-200">
                          <div
                            className="flex h-full items-center rounded-full transition-all"
                            style={{ width: `${Math.max(pct, 6)}%`, backgroundColor: color }}
                          />
                        </div>
                        <span className="w-10 shrink-0 text-right text-sm font-bold" style={{ color }}>
                          {pct}%
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {arboles.length > 0 && (
              <div className="mb-6 rounded-2xl bg-base-100 p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-base-content">
                  <span className="text-secondary">{getGameMetadata('arboles').icon}</span> Árboles favoritos
                </h2>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {arboles.slice(0, 8).map((r) => {
                    const pct = totalArboles > 0 ? Math.round(((r.votos ?? 0) / totalArboles) * 100) : 0
                    return (
                      <div key={r.id} className="flex flex-col items-center gap-2 rounded-2xl bg-primary/10 p-3">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-primary shadow-sm">
                          {getGameMetadata('arboles').icon}
                        </div>
                        <span className="text-center text-xs font-bold text-base-content leading-tight">
                          {r.opcionNombre}
                        </span>
                        <span className="text-sm font-extrabold text-primary">{pct}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {plaza.length > 0 && (
              <div className="mb-6 rounded-2xl bg-base-100 p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-base-content">
                  <span className="text-secondary">{getGameMetadata('plaza').icon}</span> Elementos para la plaza
                </h2>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {plaza.slice(0, 8).map((r) => {
                    const pct = totalPlaza > 0 ? Math.round(((r.votos ?? 0) / totalPlaza) * 100) : 0
                    return (
                      <div key={r.id} className="flex flex-col items-center gap-2 rounded-2xl bg-secondary/10 p-3">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/20 text-secondary shadow-sm">
                          {getGameMetadata('plaza').icon}
                        </div>
                        <span className="text-center text-xs font-bold text-base-content leading-tight">
                          {r.opcionNombre}
                        </span>
                        <span className="text-sm font-extrabold text-secondary">{pct}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {presupuesto.length > 0 && (
              <div className="mb-6 rounded-2xl bg-base-100 p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-base-content">
                  <span className="text-secondary">{getGameMetadata('presupuesto').icon}</span> Prioridades del barrio
                </h2>
                <div className="space-y-3">
                  {presupuesto.map((r, i) => {
                    const pct = totalPresupuesto > 0 ? Math.round(((r.votos ?? 0) / totalPresupuesto) * 100) : 0
                    const emoji = BUDGET_EMOJIS[r.opcionNombre ?? ''] ?? '📌'
                    const color = WARM_COLORS[i % WARM_COLORS.length]
                    return (
                      <div key={r.id} className="flex items-center gap-3">
                        <span className="text-xl">{emoji}</span>
                        <span className="w-24 shrink-0 truncate text-sm font-semibold text-base-content">
                          {r.opcionNombre}
                        </span>
                        <div className="relative h-7 flex-1 overflow-hidden rounded-full bg-base-200">
                          <div
                            className="flex h-full items-center rounded-full"
                            style={{ width: `${Math.max(pct, 3)}%`, backgroundColor: color }}
                          />
                        </div>
                        <span className="w-10 shrink-0 text-right text-sm font-bold" style={{ color }}>
                          {r.votos}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </>
        )}

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="/participacion"
            className="btn btn-md w-full gap-2 rounded-2xl border-2 border-primary bg-base-100 font-bold text-primary shadow-sm hover:bg-primary/5 sm:w-auto sm:min-w-[200px]"
          >
            <IconRefresh size={20} />
            Participar de nuevo
          </a>
        </div>

        <div className="mt-10 rounded-2xl bg-primary p-6 text-center text-primary-content shadow-md">
          <p className="text-lg font-bold">Tu opinión construye el futuro</p>
          <p className="mt-1 text-sm opacity-80">Municipio + Vecinos = Un mejor barrio para todos</p>
        </div>
      </div>
    </div>
  )
}

