import type { Ciudadano, SolicitudesHabilitacion } from '@/payload-types'
import { basePayload } from '@/web/lib/payload'
import {
  IconArrowLeft,
  IconBuildingStore,
  IconCalendar,
  IconCircleCheck,
  IconCircleDashed,
  IconCircleX,
  IconClock,
  IconFileDescription,
  IconLock,
  IconMapPin,
  IconPhone,
  IconUser,
} from '@tabler/icons-react'
import { headers as nextHeaders } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type EstadoSolicitud = SolicitudesHabilitacion['estado']

interface TimelineStep {
  estado: EstadoSolicitud
  label: string
  descripcion: string
  fase: 'habilitaciones' | 'rentas' | 'error'
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    estado: 'PENDIENTE',
    label: 'Solicitud recibida',
    descripcion: 'Tu solicitud fue enviada y está esperando revisión por el área de Habilitaciones.',
    fase: 'habilitaciones',
  },
  {
    estado: 'EN_REVISION',
    label: 'En revisión',
    descripcion: 'El equipo de Habilitaciones está analizando la documentación presentada.',
    fase: 'habilitaciones',
  },
  {
    estado: 'APROBADO_FASE_II',
    label: 'Aprobado por Habilitaciones',
    descripcion:
      'La documentación fue aprobada. El expediente pasa al área de Rentas para el alta fiscal.',
    fase: 'habilitaciones',
  },
  {
    estado: 'APROBADO_FASE_III',
    label: 'Alta fiscal completada',
    descripcion:
      'Rentas registró el alta comercial. Se emitió la Resolución y el Certificado de Habilitación.',
    fase: 'rentas',
  },
]

const ESTADO_CONFIG: Record<
  NonNullable<EstadoSolicitud>,
  { label: string; badge: string; icon: React.ReactNode }
> = {
  PENDIENTE: {
    label: 'Pendiente',
    badge: 'badge-warning',
    icon: <IconClock size={16} />,
  },
  EN_REVISION: {
    label: 'En revisión',
    badge: 'badge-info',
    icon: <IconCircleDashed size={16} />,
  },
  APROBADO_FASE_I: {
    label: 'Aprobado (Fase I)',
    badge: 'badge-success',
    icon: <IconCircleCheck size={16} />,
  },
  APROBADO_FASE_II: {
    label: 'Aprobado por Habilitaciones',
    badge: 'badge-success',
    icon: <IconCircleCheck size={16} />,
  },
  APROBADO_FASE_III: {
    label: 'Habilitación completada',
    badge: 'badge-success',
    icon: <IconCircleCheck size={16} />,
  },
  OBSERVADO: {
    label: 'Observada',
    badge: 'badge-warning',
    icon: <IconFileDescription size={16} />,
  },
  RECHAZADO: {
    label: 'Rechazada',
    badge: 'badge-error',
    icon: <IconCircleX size={16} />,
  },
}

function getTimelineStepStatus(
  step: TimelineStep,
  estadoActual: NonNullable<EstadoSolicitud>,
): 'done' | 'active' | 'pending' {
  const ORDER: EstadoSolicitud[] = [
    'PENDIENTE',
    'EN_REVISION',
    'APROBADO_FASE_II',
    'APROBADO_FASE_III',
  ]
  const actualIdx = ORDER.indexOf(estadoActual)
  const stepIdx = ORDER.indexOf(step.estado)

  if (estadoActual === 'RECHAZADO' || estadoActual === 'OBSERVADO') {
    if (stepIdx < actualIdx) return 'done'
    if (stepIdx === actualIdx) return 'active'
    return 'pending'
  }

  if (stepIdx < actualIdx) return 'done'
  if (stepIdx === actualIdx) return 'active'
  return 'pending'
}

export default async function DetalleSolicitudPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const headers = await nextHeaders()
  const { user } = await basePayload.auth({ headers, canSetHeaders: false })

  if (!user) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <IconLock size={48} className="text-base-content/30 mb-4" />
        <h1 className="mb-4 text-2xl font-bold">Acceso Requerido</h1>
        <p className="text-base-content/70 mb-6">Debés iniciar sesión para acceder a este módulo.</p>
        <Link href="/login" className="btn btn-primary">
          Iniciar Sesión
        </Link>
      </div>
    )
  }

  if (user.collection !== 'ciudadanos') {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <IconLock size={48} className="text-base-content/30 mb-4" />
        <h1 className="mb-4 text-2xl font-bold">Acceso Denegado</h1>
        <Link href="/" className="btn btn-secondary">Volver al Inicio</Link>
      </div>
    )
  }

  const ciudadano = user as Ciudadano
  if (!Array.isArray(ciudadano.permisos) || !ciudadano.permisos.includes('HABILITACIONES')) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <IconLock size={48} className="text-warning mb-4" />
        <h1 className="mb-4 text-2xl font-bold">Módulo no habilitado</h1>
        <Link href="/habilitaciones" className="btn btn-ghost">Volver</Link>
      </div>
    )
  }

  let solicitud: SolicitudesHabilitacion | null = null
  try {
    solicitud = await basePayload.findByID({
      collection: 'solicitudes-habilitacion',
      id,
      depth: 2,
    })
  } catch {
    notFound()
  }

  if (!solicitud) notFound()

  const estado = solicitud.estado as NonNullable<EstadoSolicitud>
  const estadoConfig = ESTADO_CONFIG[estado]

  const rubroNombre =
    solicitud.rubro && typeof solicitud.rubro === 'object'
      ? (solicitud.rubro as { nombre?: string }).nombre ?? '—'
      : '—'

  const actividadesNombres =
    Array.isArray(solicitud.actividades)
      ? solicitud.actividades
          .map((a) => (typeof a === 'object' ? (a as { nombre?: string }).nombre : null))
          .filter(Boolean)
          .join(', ')
      : null

  const esEstadoFinal = estado === 'APROBADO_FASE_III'
  const esObservado = estado === 'OBSERVADO'
  const esRechazado = estado === 'RECHAZADO'

  return (
    <main className="bg-base-100 min-h-screen">
      <div className="container mx-auto max-w-3xl px-4 py-8 sm:px-6">

        {/* Breadcrumb */}
        <Link
          href="/habilitaciones"
          className="text-base-content/60 hover:text-base-content mb-6 flex items-center gap-1 text-sm transition-colors"
        >
          <IconArrowLeft size={16} />
          Volver a Habilitaciones
        </Link>

        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-primary text-2xl font-bold flex items-center gap-2">
              <IconBuildingStore size={26} />
              {solicitud.nombreFantasia}
            </h1>
            <p className="text-base-content/60 mt-1 text-sm">{solicitud.razonSocial}</p>
          </div>
          <div className={`badge badge-lg gap-1.5 ${estadoConfig.badge}`}>
            {estadoConfig.icon}
            {estadoConfig.label}
          </div>
        </div>

        {/* Alertas de estado especial */}
        {esEstadoFinal && (
          <div className="alert alert-success mb-6">
            <IconCircleCheck size={20} className="shrink-0" />
            <div>
              <p className="font-semibold">¡Habilitación completada!</p>
              <p className="text-sm">
                Tu comercio fue habilitado. Retirá el Certificado de Habilitación en el área de
                Rentas Municipal.
              </p>
            </div>
          </div>
        )}

        {esObservado && (
          <div className="alert alert-warning mb-6">
            <IconFileDescription size={20} className="shrink-0" />
            <div>
              <p className="font-semibold">Solicitud observada</p>
              <p className="text-sm">
                El área de Habilitaciones requiere documentación o información adicional. Contactate
                para resolver las observaciones.
              </p>
              <a
                href="https://wa.me/543434537319"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-xs btn-warning mt-2"
              >
                <IconPhone size={12} /> Contactar Habilitaciones
              </a>
            </div>
          </div>
        )}

        {esRechazado && (
          <div className="alert alert-error mb-6">
            <IconCircleX size={20} className="shrink-0" />
            <div>
              <p className="font-semibold">Solicitud rechazada</p>
              <p className="text-sm">
                Esta solicitud no fue aprobada. Podés comunicarte con el área para más información.
              </p>
              <a
                href="https://wa.me/543434537319"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-xs btn-error mt-2"
              >
                <IconPhone size={12} /> Contactar Habilitaciones
              </a>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Timeline */}
          {!esRechazado && (
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-primary mb-4 text-base">Estado del trámite</h2>
                <ul className="steps steps-vertical w-full gap-1">
                  {TIMELINE_STEPS.map((step) => {
                    const status = getTimelineStepStatus(step, estado)
                    return (
                      <li
                        key={step.estado}
                        className={`step text-left ${
                          status === 'done' || status === 'active' ? 'step-primary' : ''
                        }`}
                      >
                        <div className="text-left ml-2">
                          <p
                            className={`text-sm font-medium ${
                              status === 'active'
                                ? 'text-primary'
                                : status === 'done'
                                  ? 'text-base-content'
                                  : 'text-base-content/40'
                            }`}
                          >
                            {step.label}
                            {status === 'active' && (
                              <span className="badge badge-primary badge-xs ml-2">Actual</span>
                            )}
                          </p>
                          {status === 'active' && (
                            <p className="text-base-content/60 text-xs mt-0.5">
                              {step.descripcion}
                            </p>
                          )}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          )}

          {/* Datos del comercio */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-primary mb-4 text-base">Datos del comercio</h2>
              <dl className="space-y-3">
                <div className="flex items-start gap-2">
                  <IconBuildingStore size={16} className="text-base-content/50 mt-0.5 shrink-0" />
                  <div>
                    <dt className="text-xs text-base-content/50">Rubro</dt>
                    <dd className="text-sm font-medium">{rubroNombre}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <IconMapPin size={16} className="text-base-content/50 mt-0.5 shrink-0" />
                  <div>
                    <dt className="text-xs text-base-content/50">Dirección</dt>
                    <dd className="text-sm font-medium">{solicitud.direccion}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <IconUser size={16} className="text-base-content/50 mt-0.5 shrink-0" />
                  <div>
                    <dt className="text-xs text-base-content/50">CUIT / CUIL</dt>
                    <dd className="text-sm font-medium">{solicitud.cuit}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <IconPhone size={16} className="text-base-content/50 mt-0.5 shrink-0" />
                  <div>
                    <dt className="text-xs text-base-content/50">Teléfono</dt>
                    <dd className="text-sm font-medium">{solicitud.telefono}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <IconCalendar size={16} className="text-base-content/50 mt-0.5 shrink-0" />
                  <div>
                    <dt className="text-xs text-base-content/50">Fecha de solicitud</dt>
                    <dd className="text-sm font-medium">
                      {new Date(solicitud.createdAt).toLocaleDateString('es-AR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </dd>
                  </div>
                </div>
                {actividadesNombres && (
                  <div className="flex items-start gap-2">
                    <IconFileDescription size={16} className="text-base-content/50 mt-0.5 shrink-0" />
                    <div>
                      <dt className="text-xs text-base-content/50">Actividades</dt>
                      <dd className="text-sm font-medium">{actividadesNombres}</dd>
                    </div>
                  </div>
                )}
                {solicitud.descripcionActividad && (
                  <div className="pt-2 border-t border-base-200">
                    <dt className="text-xs text-base-content/50 mb-1">Descripción de actividad</dt>
                    <dd className="text-sm text-base-content/70">{solicitud.descripcionActividad}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>

        {/* Paso siguiente si está aprobado en Fase II */}
        {estado === 'APROBADO_FASE_II' && (
          <div className="card bg-success/10 border-success border mt-6 shadow">
            <div className="card-body p-5">
              <h3 className="font-semibold text-success flex items-center gap-2">
                <IconCircleCheck size={18} />
                Siguiente paso: Rentas Municipal
              </h3>
              <p className="text-sm text-base-content/70 mt-1">
                Tu solicitud fue aprobada por Habilitaciones. El siguiente paso es presentarte en
                el área de <strong>Rentas</strong> para gestionar el alta fiscal y obtener el
                Certificado de Habilitación.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <IconPhone size={12} />
                  <span>3436127015</span>
                </div>
                <a
                  href="mailto:rentas@munisanbenito.gov.ar"
                  className="flex items-center gap-1 hover:underline"
                >
                  rentas@munisanbenito.gov.ar
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Contacto Habilitaciones */}
        {!esEstadoFinal && (
          <div className="card bg-base-200 mt-6 shadow">
            <div className="card-body p-5">
              <p className="text-sm text-base-content/70">
                ¿Tenés dudas sobre el estado de tu solicitud? Contactate directamente con el área de
                Habilitaciones.
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <a
                  href="https://wa.me/543434537319"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-xs btn-success gap-1"
                >
                  <IconPhone size={12} /> WhatsApp Habilitaciones
                </a>
                <a
                  href="mailto:habilitaciones@munisanbenito.gov.ar"
                  className="btn btn-xs btn-ghost gap-1"
                >
                  habilitaciones@munisanbenito.gov.ar
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
