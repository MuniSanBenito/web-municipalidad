export type FaseHabilitacion = 1 | 2 | 3
export type AreaHabilitacion = 'OBRAS_PRIVADAS' | 'HABILITACIONES' | 'HACIENDA'
export type TipoEventoHabilitacion = 'PRESENTACION' | 'ACTUALIZACION_CIUDADANA' | 'CAMBIO_ESTADO'

export interface EventoNotificacionHabilitacion {
  fase: FaseHabilitacion
  tipo: TipoEventoHabilitacion
  estadoAnterior?: string | null
  estadoNuevo?: string | null
  areas: AreaHabilitacion[]
  notificarCiudadano: boolean
  clave: string
}

type Expediente = Record<string, any> & { id?: string; updatedAt?: string }
type Operacion = 'create' | 'update'

const ESTADO_POR_FASE: Record<FaseHabilitacion, string> = {
  1: 'faseIEstado',
  2: 'faseIIEstado',
  3: 'faseIIIEstado',
}

export function areasParaEvento(fase: FaseHabilitacion, estadoNuevo?: string | null) {
  if (fase === 1) return ['OBRAS_PRIVADAS'] as AreaHabilitacion[]
  if (fase === 2) {
    return estadoNuevo === 'APROBADO'
      ? (['HABILITACIONES', 'HACIENDA'] as AreaHabilitacion[])
      : (['HABILITACIONES'] as AreaHabilitacion[])
  }
  return ['HABILITACIONES', 'HACIENDA'] as AreaHabilitacion[]
}

function changed(a: unknown, b: unknown) {
  return JSON.stringify(a ?? null) !== JSON.stringify(b ?? null)
}

function fieldPhase(field: string): FaseHabilitacion | null {
  if (field.startsWith('faseIII')) return 3
  if (field.startsWith('faseII')) return 2
  if (field.startsWith('faseI')) return 1
  return null
}

function phaseChanged(doc: Expediente, previousDoc: Expediente, fase: FaseHabilitacion) {
  return Object.keys(doc).some(
    (key) => fieldPhase(key) === fase && changed(doc[key], previousDoc?.[key]),
  )
}

function eventKey(
  doc: Expediente,
  fase: FaseHabilitacion,
  tipo: TipoEventoHabilitacion,
  estadoNuevo?: string | null,
) {
  return [doc.id, fase, tipo, estadoNuevo ?? '-', doc.updatedAt ?? '-'].join(':')
}

export function detectarEventosNotificacion({
  doc,
  previousDoc = {},
  operation,
  actorCollection,
}: {
  doc: Expediente
  previousDoc?: Expediente
  operation: Operacion
  actorCollection?: string
}): EventoNotificacionHabilitacion[] {
  if (operation === 'create') {
    return [
      {
        fase: 1,
        tipo: 'PRESENTACION',
        estadoAnterior: null,
        estadoNuevo: doc.faseIEstado ?? 'INICIADO',
        areas: areasParaEvento(1),
        notificarCiudadano: true,
        clave: eventKey(doc, 1, 'PRESENTACION', doc.faseIEstado ?? 'INICIADO'),
      },
    ]
  }

  const events: EventoNotificacionHabilitacion[] = []
  const phasesWithStateChange = new Set<FaseHabilitacion>()

  for (const fase of [1, 2, 3] as const) {
    const field = ESTADO_POR_FASE[fase]
    if (!changed(doc[field], previousDoc?.[field])) continue
    phasesWithStateChange.add(fase)
    events.push({
      fase,
      tipo: 'CAMBIO_ESTADO',
      estadoAnterior: previousDoc?.[field] ?? null,
      estadoNuevo: doc[field] ?? null,
      areas: areasParaEvento(fase, doc[field]),
      notificarCiudadano: true,
      clave: eventKey(doc, fase, 'CAMBIO_ESTADO', doc[field]),
    })
  }

  if (actorCollection === 'ciudadanos') {
    for (const fase of [1, 2] as const) {
      if (phasesWithStateChange.has(fase) || !phaseChanged(doc, previousDoc, fase)) continue
      events.push({
        fase,
        tipo: 'ACTUALIZACION_CIUDADANA',
        areas: areasParaEvento(fase),
        notificarCiudadano: false,
        clave: eventKey(doc, fase, 'ACTUALIZACION_CIUDADANA'),
      })
    }
  }

  return events
}

export function normalizeEmails(values: Array<string | null | undefined>) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return [...new Set(values.map((value) => value?.trim().toLowerCase()).filter(Boolean))].filter(
    (value): value is string => emailPattern.test(value as string),
  )
}

export function correosCiudadano({
  loginEmail,
  doc,
  fase,
}: {
  loginEmail?: string | null
  doc: Expediente
  fase: FaseHabilitacion
}) {
  const declaredEmail = fase === 1 ? doc.faseIEmail : doc.faseIIEmail || doc.faseIEmail
  return normalizeEmails([loginEmail, declaredEmail])
}

export function correosAreas(config: Record<string, any>, areas: AreaHabilitacion[]) {
  const fieldByArea: Record<AreaHabilitacion, string> = {
    OBRAS_PRIVADAS: 'emailsObrasPrivadas',
    HABILITACIONES: 'emailsHabilitaciones',
    HACIENDA: 'emailsHacienda',
  }
  return normalizeEmails(
    areas.flatMap((area) =>
      (config[fieldByArea[area]] ?? []).map((item: { email?: string | null }) => item.email),
    ),
  )
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function estadoLabel(estado?: string | null) {
  if (!estado) return 'Sin estado'
  return estado
    .toLowerCase()
    .replaceAll('_', ' ')
    .replace(/^./, (value) => value.toUpperCase())
}

function eventoLabel(event: EventoNotificacionHabilitacion) {
  if (event.tipo === 'PRESENTACION') return 'Nueva presentación recibida'
  if (event.tipo === 'ACTUALIZACION_CIUDADANA') return 'Documentación actualizada por el ciudadano'
  return `Estado actualizado a ${estadoLabel(event.estadoNuevo)}`
}

export function construirCorreoNotificacion({
  event,
  expedienteId,
  audience,
  baseUrl,
}: {
  event: EventoNotificacionHabilitacion
  expedienteId: string
  audience: 'AREA' | 'CIUDADANO'
  baseUrl: string
}) {
  const label = eventoLabel(event)
  const safeId = escapeHtml(expedienteId)
  const normalizedBaseUrl = baseUrl.replace(/\/$/, '')
  const url =
    audience === 'AREA'
      ? `${normalizedBaseUrl}/admin/collections/expedientes-habilitacion/${encodeURIComponent(expedienteId)}`
      : `${normalizedBaseUrl}/habilitaciones`
  const subject =
    audience === 'AREA'
      ? `[Habilitaciones] Fase ${event.fase}: ${label}`
      : `Tu trámite de habilitación cambió de estado`
  const intro =
    audience === 'AREA'
      ? `Hay una novedad en la Fase ${event.fase} del expediente ${safeId}.`
      : `Tu trámite de habilitación tiene una novedad en la Fase ${event.fase}.`
  const text = `${intro}\n${label}.\nIngresá al portal para consultar el detalle: ${url}`
  const html = `<p>${intro}</p><p><strong>${escapeHtml(label)}</strong></p><p><a href="${escapeHtml(url)}">Ingresar al portal de habilitaciones</a></p>`

  return { subject, text, html }
}
