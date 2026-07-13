'use server'

import type { AnalyticsPayload } from '@/participacion/types'
import config from '@/payload.config'
import { getPayload } from 'payload'

export async function submitResults(payload: AnalyticsPayload) {
  try {
    if (!payload.campaignSlug || !payload.sessionId || !Array.isArray(payload.entries)) {
      return { success: false, error: 'Payload inválido' }
    }

    const payloadInstance = await getPayload({ config })

    const campanaRes = await payloadInstance.find({
      collection: 'campanas',
      where: { slug: { equals: payload.campaignSlug } },
      limit: 1,
    })

    const campana = campanaRes.docs[0]
    if (!campana || campana.estado !== 'activa') {
      console.error('[submitResults] Campaña no encontrada o inactiva:', payload.campaignSlug)
      return { success: false, error: 'Campaña no encontrada o inactiva' }
    }

    const campanaId = campana.id
    const sessionId = payload.sessionId
    const rawEdad = payload.edad ?? null
    const validEdad = rawEdad === 'niño' || rawEdad === 'adulto' ? rawEdad : null

    if (campana.sessionUnica) {
      const previous = await payloadInstance.find({
        collection: 'resultados-campana',
        where: {
          and: [{ 'campana.id': { equals: campanaId } }, { sessionId: { equals: sessionId } }],
        },
        limit: 1,
      })
      if (previous.docs.length > 0) {
        return { success: false, error: 'Ya participaste en esta campaña' }
      }
    }

    for (const entry of payload.entries) {
      if (!entry.actividad || !entry.opcionId || !entry.opcionNombre || typeof entry.votos !== 'number') {
        continue
      }

      const existing = await payloadInstance.find({
        collection: 'resultados-campana',
        where: {
          and: [
            { 'campana.id': { equals: campanaId } },
            { sessionId: { equals: sessionId } },
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
            opcionNombre: entry.opcionNombre,
            edad: validEdad ?? doc.edad,
            metadata: entry.metadata ?? doc.metadata,
          },
        })
      } else {
        await payloadInstance.create({
          collection: 'resultados-campana',
          data: {
            campana: campanaId,
            sessionId,
            actividad: entry.actividad,
            opcionId: entry.opcionId,
            opcionNombre: entry.opcionNombre,
            votos: entry.votos,
            edad: validEdad,
            metadata: entry.metadata,
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

export async function getCampaignResults(campaignSlug: string) {
  try {
    const payloadInstance = await getPayload({ config })
    const campanaRes = await payloadInstance.find({
      collection: 'campanas',
      where: { slug: { equals: campaignSlug } },
      limit: 1,
    })

    const campana = campanaRes.docs[0]
    if (!campana) return null

    const resultadosRes = await payloadInstance.find({
      collection: 'resultados-campana',
      where: { 'campana.id': { equals: campana.id } },
      limit: 1000,
      sort: '-votos',
      depth: 0,
    })

    return {
      campana,
      resultados: resultadosRes.docs,
    }
  } catch (error) {
    console.error('[getCampaignResults] Error:', error)
    return null
  }
}
