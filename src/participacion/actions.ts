'use server'

import type { AnalyticsPayload, SpinResult } from '@/participacion/types'
import config from '@/payload.config'
import type { Premio } from '@/payload-types'
import type { MongooseAdapter } from '@payloadcms/db-mongodb'
import { getPayload } from 'payload'

function pickWeighted(prizes: Premio[]): Premio | null {
  const total = prizes.reduce((sum, p) => sum + (p.peso ?? 0), 0)
  if (total <= 0) return null
  let roll = Math.random() * total
  for (const prize of prizes) {
    roll -= prize.peso ?? 0
    if (roll < 0) return prize
  }
  return prizes[prizes.length - 1]
}

export async function spinRoulette(campaignSlug: string, sessionId: string): Promise<SpinResult> {
  try {
    if (!campaignSlug || !sessionId) {
      return { success: false, error: 'Datos inválidos' }
    }

    const payloadInstance = await getPayload({ config })

    const campanaRes = await payloadInstance.find({
      collection: 'campanas',
      where: { slug: { equals: campaignSlug } },
      limit: 1,
    })
    const campana = campanaRes.docs[0]
    if (!campana || campana.estado !== 'activa' || !campana.ruletaActivo) {
      return { success: false, error: 'Campaña no encontrada o sin ruleta' }
    }

    const previous = await payloadInstance.find({
      collection: 'resultados-campana',
      where: {
        and: [
          { 'campana.id': { equals: campana.id } },
          { sessionId: { equals: sessionId } },
          { actividad: { equals: 'ruleta' } },
        ],
      },
      limit: 1,
      overrideAccess: true,
    })
    if (previous.docs.length > 0) {
      const doc = previous.docs[0]
      return { success: true, prize: { id: doc.opcionId, nombre: doc.opcionNombre }, repetido: true }
    }

    const prizesRes = await payloadInstance.find({
      collection: 'premios',
      where: {
        and: [
          { stock: { greater_than: 0 } },
          { peso: { greater_than: 0 } },
          { or: [{ campana: { equals: campana.id } }, { campana: { exists: false } }, { campana: { equals: null } }] },
        ],
      },
      limit: 100,
      depth: 0,
    })

    const premiosModel = (payloadInstance.db as MongooseAdapter).collections['premios']
    let candidates = prizesRes.docs

    while (candidates.length > 0) {
      const prize = pickWeighted(candidates)
      if (!prize) break

      // Descuento atómico: si otro participante se llevó la última unidad, no matchea y se reintenta
      const updated = await premiosModel.findOneAndUpdate(
        { _id: prize.id, stock: { $gt: 0 } },
        { $inc: { stock: -1 } },
        { new: true },
      )

      if (!updated) {
        candidates = candidates.filter((p) => p.id !== prize.id)
        continue
      }

      await payloadInstance.create({
        collection: 'resultados-campana',
        overrideAccess: true,
        data: {
          campana: campana.id,
          sessionId,
          actividad: 'ruleta',
          opcionId: prize.id,
          opcionNombre: prize.nombre,
          votos: 1,
        },
      })

      return { success: true, prize: { id: prize.id, nombre: prize.nombre }, repetido: false }
    }

    return { success: false, agotado: true, error: 'Se agotaron los premios' }
  } catch (error) {
    console.error('[spinRoulette] Error:', error)
    return { success: false, error: 'No se pudo girar la ruleta' }
  }
}

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
          and: [
            { 'campana.id': { equals: campanaId } },
            { sessionId: { equals: sessionId } },
            { actividad: { not_equals: 'ruleta' } },
          ],
        },
        limit: 1,
        overrideAccess: true,
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
        overrideAccess: true,
      })

      if (existing.docs.length > 0) {
        const doc = existing.docs[0]
        await payloadInstance.update({
          collection: 'resultados-campana',
          id: doc.id,
          overrideAccess: true,
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
          overrideAccess: true,
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
      overrideAccess: true,
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
