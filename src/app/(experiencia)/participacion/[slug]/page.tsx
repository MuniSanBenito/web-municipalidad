import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { ExperienceClient } from '@/participacion/components/experience-client'
import type { CampaignData } from '@/participacion/types'

export const dynamic = 'force-static'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ParticipacionPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const campaignRes = await payload.find({
    collection: 'campanas',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const campaign = campaignRes.docs[0]
  if (!campaign || campaign.estado !== 'activa') {
    notFound()
  }

  const [sportsRes, treesRes, budgetRes, plazaRes] = await Promise.all([
    payload.find({ collection: 'deportes', limit: 20, sort: 'orden' }),
    payload.find({ collection: 'arboles', limit: 20, sort: 'orden' }),
    payload.find({ collection: 'opciones-presupuesto', limit: 20, sort: 'orden' }),
    payload.find({ collection: 'elementos-plaza', limit: 20, sort: 'orden' }),
  ])

  const data: CampaignData = {
    campaign,
    sports: sportsRes.docs,
    trees: treesRes.docs,
    budgetOptions: budgetRes.docs,
    plazaElements: plazaRes.docs,
  }

  return <ExperienceClient data={data} />
}
