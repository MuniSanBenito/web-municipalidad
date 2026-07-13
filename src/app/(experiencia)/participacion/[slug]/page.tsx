import { GameShell } from '@/participacion/components/game-shell'
import type { CampaignData } from '@/participacion/types'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

export const dynamic = 'force-static'

interface PageProps {
  params: Promise<{ slug: string }>
}

function belongsToCampaign<T extends { campana?: string | null | { id?: string } }>(
  item: T,
  campaignId: string,
) {
  if (!item.campana) return true
  if (typeof item.campana === 'string') return item.campana === campaignId
  return item.campana.id === campaignId
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

  const campaignId = campaign.id

  const [sportsRes, treesRes, budgetRes, plazaRes] = await Promise.all([
    payload.find({ collection: 'deportes', limit: 50, sort: 'orden' }),
    payload.find({ collection: 'arboles', limit: 50, sort: 'orden' }),
    payload.find({ collection: 'opciones-presupuesto', limit: 50, sort: 'orden' }),
    payload.find({ collection: 'elementos-plaza', limit: 50, sort: 'orden' }),
  ])

  const data: CampaignData = {
    campaign,
    sports: sportsRes.docs.filter((s) => belongsToCampaign(s, campaignId)),
    trees: treesRes.docs.filter((t) => belongsToCampaign(t, campaignId)),
    budgetOptions: budgetRes.docs.filter((b) => belongsToCampaign(b, campaignId)),
    plazaElements: plazaRes.docs.filter((e) => belongsToCampaign(e, campaignId)),
  }

  return <GameShell data={data} />
}
