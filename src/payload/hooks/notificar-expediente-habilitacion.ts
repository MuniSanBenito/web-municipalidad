import type { CollectionAfterChangeHook } from 'payload'
import {
  construirCorreoNotificacion,
  correosAreas,
  correosCiudadano,
  detectarEventosNotificacion,
  type EventoNotificacionHabilitacion,
} from '../habilitaciones/notificaciones'

async function getCitizenLoginEmail(doc: Record<string, any>, req: any) {
  const createdBy = doc.created_by
  if (!createdBy || createdBy.relationTo !== 'ciudadanos') return null
  const value = createdBy.value
  const citizenId = typeof value === 'object' && value !== null ? value.id : value
  if (!citizenId) return null

  try {
    const ciudadano = await req.payload.findByID({
      collection: 'ciudadanos',
      id: citizenId,
      depth: 0,
      overrideAccess: true,
    })
    return ciudadano?.email ?? null
  } catch {
    return null
  }
}

async function queueEmail({
  event,
  audience,
  recipients,
  doc,
  req,
  baseUrl,
}: {
  event: EventoNotificacionHabilitacion
  audience: 'AREA' | 'CIUDADANO'
  recipients: string[]
  doc: Record<string, any>
  req: any
  baseUrl: string
}) {
  if (recipients.length === 0) return
  const email = construirCorreoNotificacion({
    event,
    expedienteId: String(doc.id),
    audience,
    baseUrl,
  })

  await req.payload.jobs.queue({
    task: 'enviarNotificacionHabilitacion',
    queue: 'notificaciones-habilitaciones',
    req,
    overrideAccess: true,
    input: {
      destinatarios: recipients.map((recipient) => ({ email: recipient })),
      asunto: email.subject,
      texto: email.text,
      html: email.html,
      expedienteId: String(doc.id),
      fase: event.fase,
      tipoEvento: event.tipo,
      claveEvento: event.clave,
    },
  })
}

export const notificarExpedienteHabilitacion: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  operation,
  req,
}) => {
  const events = detectarEventosNotificacion({
    doc,
    previousDoc: previousDoc ?? {},
    operation,
    actorCollection: req.user?.collection,
  })
  if (events.length === 0) return doc

  try {
    const config = await (req.payload.findGlobal as any)({
      slug: 'configuracion-notificaciones-habilitacion',
      depth: 0,
      overrideAccess: true,
    })
    if (!config?.notificacionesActivas) return doc

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL?.trim()
    if (!baseUrl) {
      req.payload.logger.error(
        '[NotificacionesHabilitacion] Falta NEXT_PUBLIC_SERVER_URL; no se encolaron correos.',
      )
      return doc
    }

    const loginEmail = await getCitizenLoginEmail(doc, req)
    for (const event of events) {
      const areaRecipients = correosAreas(config, event.areas)
      await queueEmail({ event, audience: 'AREA', recipients: areaRecipients, doc, req, baseUrl })

      if (event.notificarCiudadano) {
        const citizenRecipients = correosCiudadano({ loginEmail, doc, fase: event.fase })
        await queueEmail({
          event,
          audience: 'CIUDADANO',
          recipients: citizenRecipients,
          doc,
          req,
          baseUrl,
        })
      }
    }
  } catch (error) {
    req.payload.logger.error(
      `[NotificacionesHabilitacion] No se pudieron encolar las notificaciones del expediente ${doc.id}: ${error}`,
    )
  }

  return doc
}
