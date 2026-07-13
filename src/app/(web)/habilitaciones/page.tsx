import type { Ciudadano } from '@/payload-types'
import { basePayload } from '@/web/lib/payload'
import {
    IconArrowRight,
    IconBuildingStore,
    IconCalendarCheck,
    IconCircleCheck,
    IconFileDescription,
    IconInfoCircle,
    IconLock,
    IconMail,
    IconPhone,
} from '@tabler/icons-react'
import { headers as nextHeaders } from 'next/headers'
import Link from 'next/link'

type EstadoFase = 'INICIADO' | 'PENDIENTE' | 'VISITA_PROGRAMADA' | 'APROBADO' | null | undefined

function EstadoBadge({ estado }: { estado: EstadoFase }) {
  if (!estado) {
    return <span className="badge badge-ghost">Sin iniciar</span>
  }
  if (estado === 'INICIADO') {
    return <span className="badge badge-warning">Iniciado — en revisión</span>
  }
  if (estado === 'PENDIENTE') {
    return <span className="badge badge-info">Pendiente — siendo procesado</span>
  }
  if (estado === 'VISITA_PROGRAMADA') {
    return (
      <span className="badge badge-accent gap-1">
        <IconCalendarCheck size={12} /> Visita programada
      </span>
    )
  }
  if (estado === 'APROBADO') {
    return (
      <span className="badge badge-success gap-1">
        <IconCircleCheck size={12} /> Aprobado
      </span>
    )
  }
  return null
}

function PasoCard({
  numero,
  titulo,
  descripcion,
  area,
  estado,
  notaCiudadano,
  ctaHref,
  ctaLabel,
  bloqueado,
  completado,
}: {
  numero: number
  titulo: string
  descripcion: string
  area: string
  estado: EstadoFase
  notaCiudadano?: string | null
  ctaHref?: string
  ctaLabel?: string
  bloqueado?: boolean
  completado?: boolean
}) {
  const borderClass = completado
    ? 'border-success bg-success/5'
    : bloqueado
      ? 'border-base-300 bg-base-200/50 opacity-60'
      : estado === 'INICIADO' || estado === 'PENDIENTE' || estado === 'VISITA_PROGRAMADA'
        ? 'border-warning bg-warning/5'
        : 'border-primary bg-primary/5'

  return (
    <div className={`card border-2 shadow-md transition-all ${borderClass}`}>
      <div className="card-body p-5">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                completado
                  ? 'bg-success text-success-content'
                  : bloqueado
                    ? 'bg-base-300 text-base-content/40'
                    : 'bg-primary text-primary-content'
              }`}
            >
              {completado ? <IconCircleCheck size={16} /> : numero}
            </div>
            <span className="text-base-content/60 text-xs font-medium tracking-wide uppercase">
              {area}
            </span>
          </div>
          {bloqueado && <IconLock size={16} className="text-base-content/30 shrink-0" />}
        </div>

        <h3 className="mb-1 font-bold">{titulo}</h3>
        <p className="text-base-content/60 mb-3 text-sm">{descripcion}</p>

        <EstadoBadge estado={estado} />

        {notaCiudadano && (
          <div className="alert alert-info mt-3 p-3">
            <IconInfoCircle size={16} className="shrink-0" />
            <p className="text-xs">{notaCiudadano}</p>
          </div>
        )}

        {ctaHref && !bloqueado && (
          <Link href={ctaHref} className="btn btn-primary btn-sm mt-4 gap-1 self-start">
            {ctaLabel ?? 'Completar'}
            <IconArrowRight size={14} />
          </Link>
        )}
      </div>
    </div>
  )
}

export default async function HabilitacionesPage() {
  const headers = await nextHeaders()
  const { user } = await basePayload.auth({ headers, canSetHeaders: false })

  if (!user) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <IconLock size={48} className="text-base-content/30 mb-4" />
        <h1 className="mb-4 text-2xl font-bold">Acceso Requerido</h1>
        <p className="text-base-content/70 mb-6">
          Debés iniciar sesión para acceder al portal de Habilitaciones Comerciales.
        </p>
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
        <p className="text-base-content/70 mb-6">
          Esta sección está disponible únicamente para ciudadanos registrados.
        </p>
        <Link href="/" className="btn btn-secondary">
          Volver al Inicio
        </Link>
      </div>
    )
  }

  const ciudadano = user as Ciudadano

  const { docs } = await basePayload.find({
    collection: 'expedientes-habilitacion' as any,
    where: { 'created_by.value': { equals: ciudadano.id } },
    limit: 1,
    sort: '-createdAt',
    depth: 0,
  })

  const exp = (docs[0] as any) ?? null

  const f1Estado: EstadoFase = exp?.faseIEstado ?? null
  const f2Estado: EstadoFase = exp?.faseIIEstado ?? null
  const f3Estado: EstadoFase = exp?.faseIIIEstado ?? null

  const fase2Bloqueada = f1Estado !== 'APROBADO'
  const fase3Bloqueada = f1Estado !== 'APROBADO' || f2Estado !== 'APROBADO'

  const todoAprobado = f1Estado === 'APROBADO' && f2Estado === 'APROBADO' && f3Estado === 'APROBADO'

  // CTA por paso — editable mientras no esté APROBADO
  const ctaFase1 = !exp
    ? { href: '/habilitaciones/fase/1', label: 'Iniciar Paso 1' }
    : f1Estado === 'INICIADO' || f1Estado === 'PENDIENTE'
      ? { href: '/habilitaciones/fase/1', label: 'Editar Paso 1' }
      : null
  const ctaFase2 =
    !fase2Bloqueada && f2Estado !== 'APROBADO'
      ? {
          href: '/habilitaciones/fase/2',
          label: f2Estado ? 'Editar Paso 2' : 'Completar Paso 2',
        }
      : null
  const ctaFase3 = !fase3Bloqueada
    ? {
        href: '/habilitaciones/fase/3',
        label: f3Estado === 'APROBADO' ? 'Ver Habilitación' : 'Ver estado',
      }
    : null

  return (
    <main className="bg-base-100 min-h-screen">
      <div className="container mx-auto max-w-3xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="bg-primary/10 rounded-box p-3">
            <IconBuildingStore size={36} className="text-primary" />
          </div>
          <div>
            <h1 className="text-primary text-3xl font-bold">Habilitaciones Comerciales</h1>
            <p className="text-base-content/70 mt-1">
              Portal digital — Municipalidad de San Benito
            </p>
          </div>
        </div>

        {/* Certificado final */}
        {todoAprobado && (
          <div className="alert alert-success mb-6 shadow-lg">
            <IconCircleCheck size={28} className="shrink-0" />
            <div>
              <h3 className="text-lg font-bold">¡Habilitación Comercial completada!</h3>
              <p className="text-sm">
                Las tres fases del trámite fueron aprobadas. El Certificado de Habilitación fue
                emitido por Rentas. Ante consultas:{' '}
                <a href="mailto:rentas@munisanbenito.gov.ar" className="link">
                  rentas@munisanbenito.gov.ar
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Sin expediente — CTA inicial */}
        {!exp && (
          <div className="card bg-primary text-primary-content mb-8 shadow-lg">
            <div className="card-body">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="card-title text-xl">Iniciá tu trámite de Alta de Comercio</h2>
                  <p className="mt-1 text-sm opacity-80">
                    El proceso tiene 3 pasos digitales. El primer paso es la solicitud del Permiso
                    de Uso, revisada por Obras Privadas.
                  </p>
                </div>
                <Link href="/habilitaciones/fase/1" className="btn btn-secondary shrink-0 gap-2">
                  <IconFileDescription size={18} />
                  Iniciar Paso 1
                  <IconArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Stepper — 3 pasos */}
        <div className="mb-8 space-y-4">
          <h2 className="text-base-content/80 mb-4 text-sm font-semibold tracking-wider uppercase">
            Estado del trámite
          </h2>

          <PasoCard
            numero={1}
            titulo="Permiso de Uso"
            descripcion="Verificación de zonificación y aptitud edilicia del local."
            area="Obras Privadas"
            estado={f1Estado}
            notaCiudadano={exp?.faseINotaCiudadano}
            ctaHref={ctaFase1?.href}
            ctaLabel={ctaFase1?.label}
            bloqueado={false}
            completado={f1Estado === 'APROBADO'}
          />

          <PasoCard
            numero={2}
            titulo="Habilitación Comercial"
            descripcion="Presentación de requisitos de Habilitaciones y Bromatología."
            area="Habilitaciones Comerciales"
            estado={f2Estado}
            notaCiudadano={exp?.faseIINotaCiudadano}
            ctaHref={ctaFase2?.href}
            ctaLabel={ctaFase2?.label}
            bloqueado={fase2Bloqueada}
            completado={f2Estado === 'APROBADO'}
          />

          <PasoCard
            numero={3}
            titulo="Alta Fiscal"
            descripcion="Confección del Alta Comercial y emisión del Certificado de Habilitación."
            area="Rentas"
            estado={f3Estado}
            notaCiudadano={exp?.faseIIINotaCiudadano}
            ctaHref={ctaFase3?.href}
            ctaLabel={ctaFase3?.label}
            bloqueado={fase3Bloqueada}
            completado={f3Estado === 'APROBADO'}
          />
        </div>

        {/* Info del proceso */}
        {!exp && (
          <div className="card bg-base-200 shadow">
            <div className="card-body p-5">
              <h3 className="mb-3 text-sm font-semibold">¿Cómo funciona el circuito?</h3>
              <ol className="space-y-2">
                {[
                  {
                    n: 1,
                    txt: 'Solicitás el Permiso de Uso — Obras Privadas verifica la zonificación del local.',
                  },
                  {
                    n: 2,
                    txt: 'Con el Permiso aprobado, presentás la documentación de Habilitación Comercial.',
                  },
                  {
                    n: 3,
                    txt: 'Rentas confecciona el Alta Comercial y emite el Certificado de Habilitación.',
                  },
                ].map(({ n, txt }) => (
                  <li key={n} className="flex items-start gap-3 text-sm">
                    <span className="bg-primary text-primary-content flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                      {n}
                    </span>
                    <span className="text-base-content/70">{txt}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {/* Contactos */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            {
              area: 'Obras Privadas',
              tel: '3434681033',
              email: 'opriv.sanbenito@gmail.com',
              wa: '543434681033',
            },
            {
              area: 'Habilitaciones',
              tel: '3434537319',
              email: 'habilitaciones@munisanbenito.gov.ar',
              wa: '543434537319',
            },
            {
              area: 'Rentas',
              tel: '3436127015',
              email: 'rentas@munisanbenito.gov.ar',
              wa: '543436127015',
            },
          ].map((c) => (
            <div key={c.area} className="bg-base-200 rounded-box p-3">
              <p className="mb-1.5 text-xs font-semibold">{c.area}</p>
              <div className="space-y-1">
                <a
                  href={`https://wa.me/${c.wa}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base-content/60 hover:text-base-content flex items-center gap-1.5 text-xs transition-colors"
                >
                  <IconPhone size={11} /> {c.tel}
                </a>
                <a
                  href={`mailto:${c.email}`}
                  className="text-base-content/60 hover:text-base-content flex items-center gap-1.5 text-xs transition-colors"
                >
                  <IconMail size={11} /> {c.email}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link href="/perfil" className="btn btn-ghost btn-sm">
            Volver a mi perfil
          </Link>
        </div>
      </div>
    </main>
  )
}
