import { BeniAvatar } from '@/participacion/components/beni-avatar'
import { basePayload } from '@/web/lib/payload'
import { IconArrowRight, IconBuildingCommunity, IconMapPin } from '@tabler/icons-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Participación ciudadana',
  description: 'Sumate a los juegos y consultas de participación ciudadana de la Municipalidad de San Benito.',
}

export const dynamic = 'force-dynamic'

export default async function ParticipacionLandingPage() {
  const hoy = new Date().toISOString()
  const campaignsRes = await basePayload.find({
    collection: 'campanas',
    where: {
      and: [{ estado: { equals: 'activa' } }, { fechaFin: { greater_than: hoy } }],
    },
    limit: 50,
    sort: '-fechaInicio',
  })

  const campaigns = campaignsRes.docs

  return (
    <div data-theme="warm" className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 pb-16">
      <div className="mx-auto max-w-4xl px-4 pt-12">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-secondary/10 text-secondary">
            <IconBuildingCommunity size={44} strokeWidth={1.5} />
          </div>
          <BeniAvatar
            message="¡Sumate a decidir el futuro de tu barrio!"
            size={64}
            className="mb-4"
          />
          <h1 className="text-3xl font-bold text-base-content sm:text-4xl">
            Participación ciudadana
          </h1>
          <p className="mt-2 text-base text-base-content/60">
            Jugá, opiná y ayudá a construir un mejor San Benito.
          </p>
        </div>

        {campaigns.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-primary/20 bg-base-100 p-10 text-center shadow-sm">
            <p className="text-lg font-semibold text-base-content/60">No hay campañas activas</p>
            <p className="mt-2 text-sm text-base-content/40">
              Volvé pronto para ver nuevas propuestas y juegos.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {campaigns.map((campaign) => (
              <Link
                key={campaign.id}
                href={`/participacion/${campaign.slug}`}
                className="group flex flex-col rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <IconBuildingCommunity size={26} strokeWidth={1.5} />
                  </div>
                  <span className="badge border-0 bg-secondary text-secondary-content">
                    {campaign.publico === 'niños' ? 'Para niños' : campaign.publico === 'adultos' ? 'Para adultos' : 'Para todos'}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-base-content">{campaign.nombre}</h2>
                <p className="mt-1 line-clamp-2 text-sm text-base-content/60">{campaign.descripcion}</p>
                <div className="mt-4 flex items-center gap-1.5 text-sm text-base-content/50">
                  <IconMapPin size={16} className="text-secondary" />
                  <span>{campaign.barrio}</span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
                  <span>Participar</span>
                  <IconArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
