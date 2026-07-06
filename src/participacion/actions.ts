'use server'

import type { AnalyticsPayload } from '@/participacion/types'
import config from '@/payload.config'
import { getPayload } from 'payload'

export async function submitResults(payload: AnalyticsPayload) {
  try {
    const payloadInstance = await getPayload({ config })

    const campanaRes = await payloadInstance.find({
      collection: 'campanas',
      where: { slug: { equals: payload.campaignSlug } },
      limit: 1,
    })

    const campanaId = campanaRes.docs[0]?.id
    if (!campanaId) {
      console.error('[submitResults] Campaña no encontrada:', payload.campaignSlug)
      return { success: false, error: 'Campaña no encontrada' }
    }

    for (const entry of payload.entries) {
      const existing = await payloadInstance.find({
        collection: 'resultados-campana',
        where: {
          and: [
            { 'campana.id': { equals: campanaId } },
            { actividad: { equals: entry.actividad } },
            { opcionId: { equals: entry.opcionId } },
          ],
        },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        const doc = existing.docs[0]
        await payloadInstance.update({
          collection: 'resultados-campana',
          id: doc.id,
          data: {
            votos: (doc.votos ?? 0) + entry.votos,
          },
        })
      } else {
        await payloadInstance.create({
          collection: 'resultados-campana',
          data: {
            campana: campanaId,
            actividad: entry.actividad,
            opcionId: entry.opcionId,
            opcionNombre: entry.opcionNombre,
            votos: entry.votos,
          },
        })
      }
    }

    return { success: true }
  } catch (error) {
    console.error('[submitResults] Error:', error)
    return { success: false, error: 'Failed to submit results' }
  }
}
