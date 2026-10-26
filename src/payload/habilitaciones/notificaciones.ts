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

export function normalizarBaseUrl(baseUrl: string) {
  const value = baseUrl.trim()
  if (!value) throw new Error('NEXT_PUBLIC_SERVER_URL no está configurada')

  let parsed: URL
  try {
    parsed = new URL(value)
  } catch {
    throw new Error('NEXT_PUBLIC_SERVER_URL debe ser una URL absoluta con http o https')
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error('NEXT_PUBLIC_SERVER_URL debe usar http o https')
  }

  return parsed.toString().replace(/\/+$/, '')
}

function absoluteUrl(baseUrl: string, pathname: string) {
  return new URL(pathname, `${baseUrl}/`).toString()
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

function eventColor(event: EventoNotificacionHabilitacion) {
  if (event.tipo === 'CAMBIO_ESTADO' && event.estadoNuevo === 'APROBADO') return '#2f855a'
  if (event.tipo === 'CAMBIO_ESTADO' && event.estadoNuevo === 'VISITA_PROGRAMADA') return '#7c3aed'
  if (event.tipo === 'CAMBIO_ESTADO') return '#2563eb'
  if (event.tipo === 'ACTUALIZACION_CIUDADANA') return '#d97706'
  return '#5A7A3E'
}

function tipoEventoLabel(event: EventoNotificacionHabilitacion) {
  if (event.tipo === 'PRESENTACION') return 'Nueva presentación'
  if (event.tipo === 'ACTUALIZACION_CIUDADANA') return 'Documentación actualizada'
  return 'Cambio de estado'
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
  const normalizedBaseUrl = normalizarBaseUrl(baseUrl)
  const label = eventoLabel(event)
  const safeId = escapeHtml(expedienteId)
  const portalUrl = absoluteUrl(normalizedBaseUrl, '/habilitaciones')
  const detailUrl = absoluteUrl(
    normalizedBaseUrl,
    `/admin/collections/expedientes-habilitacion/${encodeURIComponent(expedienteId)}`,
  )
  const actionUrl = audience === 'AREA' ? detailUrl : portalUrl
  const logoUrl = absoluteUrl(normalizedBaseUrl, '/images/escudo.webp')
  const actionLabel = audience === 'AREA' ? 'Abrir expediente' : 'Ver mi trámite'
  const subject =
    audience === 'AREA'
      ? `[Habilitaciones] Fase ${event.fase}: ${label}`
      : `Tu trámite de habilitación tiene una novedad`
  const intro =
    audience === 'AREA'
      ? `Hay una novedad en la Fase ${event.fase} del expediente <strong>${safeId}</strong>.`
      : `Tu trámite de habilitación tiene una novedad en la Fase ${event.fase}.`
  const statusDetail =
    event.tipo === 'CAMBIO_ESTADO'
      ? `${estadoLabel(event.estadoAnterior)} → ${estadoLabel(event.estadoNuevo)}`
      : label
  const color = eventColor(event)
  const preheader = escapeHtml(`${label} — Fase ${event.fase}`)
  const text = [
    audience === 'AREA' ? `Expediente ${expedienteId}` : 'Municipalidad de San Benito',
    `Fase ${event.fase}: ${label}`,
    event.tipo === 'CAMBIO_ESTADO'
      ? `Estado: ${estadoLabel(event.estadoAnterior)} → ${estadoLabel(event.estadoNuevo)}`
      : '',
    `Ingresá al portal: ${actionUrl}`,
  ]
    .filter(Boolean)
    .join('\n')
  const html = `<!doctype html>
<html lang="es">
  <body style="margin:0;background:#f3f5f0;color:#4d4d4d;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f5f0;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;background:#ffffff;border:1px solid #e3e8df;border-radius:14px;overflow:hidden;">
            <tr>
              <td style="background:#b6c544;padding:24px 28px;text-align:center;">
                <img src="${escapeHtml(logoUrl)}" width="64" height="64" alt="Escudo Municipalidad de San Benito" style="display:block;margin:0 auto 10px;object-fit:contain;" />
                <div style="font-size:12px;letter-spacing:1.5px;font-weight:bold;color:#4d4d4d;text-transform:uppercase;">Municipalidad de San Benito</div>
                <div style="font-size:22px;line-height:30px;font-weight:bold;color:#354020;margin-top:5px;">Habilitaciones Comerciales</div>
              </td>
            </tr>
            <tr>
              <td style="padding:30px 32px 12px;">
                <div style="font-size:14px;line-height:22px;color:#687065;">${intro}</div>
                <h1 style="font-size:22px;line-height:30px;color:#3f4c31;margin:12px 0 22px;">${escapeHtml(label)}</h1>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e1e8d9;border-radius:10px;background:#f8faf6;">
                  <tr>
                    <td style="padding:16px 18px;">
                      <div style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#7b8674;font-weight:bold;">Fase ${event.fase}</div>
                      <div style="font-size:16px;font-weight:bold;color:#4d4d4d;margin-top:5px;">${escapeHtml(tipoEventoLabel(event))}</div>
                      ${event.tipo === 'CAMBIO_ESTADO' ? `<div style="display:inline-block;margin-top:12px;padding:7px 11px;border-radius:999px;background:${color};color:#ffffff;font-size:13px;font-weight:bold;">${escapeHtml(statusDetail)}</div>` : ''}
                    </td>
                  </tr>
                </table>
                <div style="text-align:center;padding:28px 0 20px;">
                  <a href="${escapeHtml(actionUrl)}" style="display:inline-block;background:#5A7A3E;color:#ffffff;text-decoration:none;font-size:15px;font-weight:bold;border-radius:7px;padding:13px 24px;">${escapeHtml(actionLabel)}</a>
                </div>
                <div style="font-size:12px;line-height:18px;color:#8a9386;word-break:break-all;">Si el botón no funciona, copiá este enlace:<br /><a href="${escapeHtml(actionUrl)}" style="color:#5A7A3E;">${escapeHtml(actionUrl)}</a></div>
              </td>
            </tr>
            <tr>
              <td style="border-top:1px solid #edf0ea;padding:18px 32px 24px;text-align:center;color:#92998f;font-size:12px;line-height:18px;">
                Notificación automática de la Municipalidad de San Benito.<br />Por favor, no respondas este correo.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

  return { subject, text, html }
}
