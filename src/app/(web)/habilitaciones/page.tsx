import type { Ciudadano, SolicitudesPermisoUso } from '@/payload-types'
import { basePayload } from '@/web/lib/payload'
import {
  IconAlertCircle,
  IconAlertTriangle,
  IconArrowRight,
  IconBuildingStore,
  IconCircleCheck,
  IconClock,
  IconFileDescription,
  IconLock,
  IconMail,
  IconPhone,
  IconRefresh,
} from '@tabler/icons-react'
import { headers as nextHeaders } from 'next/headers'
import Link from 'next/link'

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
  const tieneAcceso =
    Array.isArray(ciudadano.permisos) && ciudadano.permisos.includes('HABILITACIONES')

  const { docs: solicitudesPermisoUso } = await basePayload.find({
    collection: 'solicitudes-permiso-uso',
    where: { 'created_by.value': { equals: ciudadano.id } },
    limit: 1,
    sort: '-createdAt',
  })
  const ultimaPermisoUso = (solicitudesPermisoUso[0] as SolicitudesPermisoUso) ?? null

  if (!tieneAcceso) {
    return (
      <main className="bg-base-100 min-h-screen">
        <div className="container mx-auto max-w-3xl px-4 py-10 sm:px-6">
          {/* Header */}
          <div className="mb-8 flex items-center gap-4">
            <div className="bg-primary/10 rounded-box p-3">
              <IconBuildingStore size={36} className="text-primary" />
            </div>
            <div>
              <h1 className="text-primary text-3xl font-bold">Habilitaciones Comerciales</h1>
              <p className="text-base-content/70 mt-1">
                Portal digital de gestión para alta de comercios — Municipalidad de San Benito
              </p>
            </div>
          </div>

          {/* Timeline del circuito */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Paso 1 — dinámico según estado */}
            <div
              className={`card shadow ${
                !ultimaPermisoUso
                  ? 'border-warning bg-warning/5 border-2'
                  : ultimaPermisoUso.estado === 'APROBADO'
                    ? 'border-success bg-success/5 border-2'
                    : ultimaPermisoUso.estado === 'RECHAZADO'
                      ? 'border-error bg-error/5 border-2'
                      : ultimaPermisoUso.estado === 'OBSERVADO'
                        ? 'border-warning bg-warning/5 border-2'
                        : 'border-info bg-info/5 border-2'
              }`}
            >
              <div className="card-body p-5">
                <div
                  className={`badge mb-2 ${
                    !ultimaPermisoUso
                      ? 'badge-warning'
                      : ultimaPermisoUso.estado === 'APROBADO'
                        ? 'badge-success'
                        : ultimaPermisoUso.estado === 'RECHAZADO'
                          ? 'badge-error'
                          : ultimaPermisoUso.estado === 'OBSERVADO'
                            ? 'badge-warning'
                            : 'badge-info'
                  }`}
                >
                  {!ultimaPermisoUso
                    ? 'Paso 1 — Comenzá acá'
                    : ultimaPermisoUso.estado === 'APROBADO'
                      ? '✓ Paso 1 Aprobado'
                      : ultimaPermisoUso.estado === 'RECHAZADO'
                        ? 'Paso 1 Rechazado'
                        : ultimaPermisoUso.estado === 'OBSERVADO'
                          ? 'Paso 1 Observado'
                          : ultimaPermisoUso.estado === 'EN_REVISION'
                            ? 'Paso 1 — En proceso'
                            : 'Paso 1 — Pendiente'}
                </div>
                <h3 className="font-bold">Permiso de Uso</h3>
                <p className="text-base-content/70 text-sm">
                  Verificación de zonificación y aptitud edilicia del local por Obras Privadas.
                </p>
              </div>
            </div>
            {/* Paso 2 */}
            <div className="card bg-base-200 opacity-50 shadow">
              <div className="card-body p-5">
                <div className="badge mb-2">Paso 2</div>
                <h3 className="font-bold">Habilitaciones</h3>
                <p className="text-base-content/70 text-sm">
                  Con el Permiso de Uso aprobado, se habilita el acceso a este paso.
                </p>
              </div>
            </div>
            {/* Paso 3 */}
            <div className="card bg-base-200 opacity-50 shadow">
              <div className="card-body p-5">
                <div className="badge mb-2">Paso 3</div>
                <h3 className="font-bold">Rentas</h3>
                <p className="text-base-content/70 text-sm">
                  Alta fiscal y emisión del Certificado de Habilitación.
                </p>
              </div>
            </div>
          </div>

          {/* Estado dinámico */}
          {!ultimaPermisoUso && (
            <div className="card bg-primary text-primary-content shadow-lg">
              <div className="card-body">
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="card-title text-xl">Iniciá el Paso 1 — Permiso de Uso</h2>
                    <p className="mt-1 text-sm opacity-80">
                      Descargá el formulario oficial, completalo, firmalo y envialo online. Obras
                      Privadas lo revisará.
                    </p>
                  </div>
                  <Link
                    href="/habilitaciones/permiso-uso/nueva"
                    className="btn btn-secondary shrink-0 gap-2"
                  >
                    <IconFileDescription size={18} />
                    Solicitar Permiso de Uso
                    <IconArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {ultimaPermisoUso?.estado === 'PENDIENTE' && (
            <div className="alert shadow-lg">
              <IconClock size={24} className="text-warning shrink-0" />
              <div>
                <h3 className="font-bold">Solicitud recibida — Pendiente de revisión</h3>
                <p className="text-sm">
                  Recibimos tu formulario de Permiso de Uso el{' '}
                  <strong>
                    {new Date(ultimaPermisoUso.createdAt).toLocaleDateString('es-AR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </strong>
                  . Obras Privadas lo revisará a la brevedad.
                </p>
              </div>
            </div>
          )}

          {ultimaPermisoUso?.estado === 'EN_REVISION' && (
            <div className="alert alert-info shadow-lg">
              <IconAlertCircle size={24} className="shrink-0" />
              <div>
                <h3 className="font-bold">Tu solicitud está siendo revisada</h3>
                <p className="text-sm">
                  El equipo de <strong>Obras Privadas</strong> está evaluando tu Permiso de Uso. Te
                  notificaremos cuando haya novedades.
                </p>
              </div>
            </div>
          )}

          {ultimaPermisoUso?.estado === 'APROBADO' && (
            <div className="alert alert-success shadow-lg">
              <IconCircleCheck size={24} className="shrink-0" />
              <div>
                <h3 className="font-bold">¡Permiso de Uso aprobado!</h3>
                <p className="text-sm">
                  Obras Privadas aprobó tu Permiso de Uso. El área de{' '}
                  <strong>Habilitaciones Comerciales</strong> habilitará tu acceso al Paso 2 a la
                  brevedad. Si tardara más de 48 hs, contactate:
                </p>
                <a
                  href="https://wa.me/543434537319"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success btn-sm mt-2 gap-1"
                >
                  <IconPhone size={14} />
                  WhatsApp Habilitaciones
                </a>
              </div>
            </div>
          )}

          {ultimaPermisoUso?.estado === 'OBSERVADO' && (
            <div className="alert alert-warning shadow-lg">
              <IconAlertTriangle size={24} className="shrink-0" />
              <div className="flex-1">
                <h3 className="font-bold">Tu solicitud necesita correcciones</h3>
                {ultimaPermisoUso.notaParaCiudadano && (
                  <p className="mt-1 text-sm">
                    <strong>Nota de Obras Privadas:</strong> {ultimaPermisoUso.notaParaCiudadano}
                  </p>
                )}
                <Link
                  href="/habilitaciones/permiso-uso/nueva"
                  className="btn btn-warning btn-sm mt-3 gap-1"
                >
                  <IconRefresh size={14} />
                  Enviar nueva solicitud
                </Link>
              </div>
            </div>
          )}

          {ultimaPermisoUso?.estado === 'RECHAZADO' && (
            <div className="alert alert-error shadow-lg">
              <IconAlertTriangle size={24} className="shrink-0" />
              <div className="flex-1">
                <h3 className="font-bold">Solicitud rechazada</h3>
                {ultimaPermisoUso.notaParaCiudadano && (
                  <p className="mt-1 text-sm">
                    <strong>Motivo:</strong> {ultimaPermisoUso.notaParaCiudadano}
                  </p>
                )}
                <div className="mt-3 flex gap-2">
                  <Link
                    href="/habilitaciones/permiso-uso/nueva"
                    className="btn btn-error btn-sm gap-1"
                  >
                    <IconRefresh size={14} />
                    Reenviar solicitud
                  </Link>
                  <a
                    href="https://wa.me/543434681033"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost btn-sm gap-1"
                  >
                    <IconPhone size={14} />
                    Consultar a Obras Privadas
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link href="/perfil" className="btn btn-ghost btn-sm">
              Volver a mi perfil
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-base-100 min-h-screen">
      <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="bg-primary/10 rounded-box p-3">
            <IconBuildingStore size={36} className="text-primary" />
          </div>
          <div>
            <h1 className="text-primary text-3xl font-bold">Habilitaciones Comerciales</h1>
            <p className="text-base-content/70 mt-1">
              Portal digital de gestión para alta de comercios — Municipalidad de San Benito
            </p>
          </div>
        </div>

        {/* Paso 1 — Obras Privadas primero */}
        <div className="alert alert-warning mb-6">
          <IconAlertCircle size={20} className="shrink-0" />
          <div>
            <p className="font-semibold">⚠️ Paso obligatorio antes de iniciar la solicitud</p>
            <p className="mt-1 text-sm">
              El primer paso es contactar al área de <strong>Obras Privadas</strong> para obtener el{' '}
              <strong>Permiso de Uso</strong> del local. Sin ese permiso aprobado, no se puede
              iniciar el trámite de Habilitación Comercial.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <a
                href="https://wa.me/543434681033"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-xs btn-success gap-1"
              >
                <IconPhone size={12} /> WhatsApp Obras Privadas
              </a>
              <a href="mailto:opriv.sanbenito@gmail.com" className="btn btn-xs btn-ghost gap-1">
                <IconMail size={12} /> opriv.sanbenito@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Fases del trámite */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="card bg-base-200 shadow">
            <div className="card-body p-5">
              <div className="badge badge-warning mb-2">Paso 1 — Primero</div>
              <h3 className="font-bold">Obras Privadas</h3>
              <p className="text-base-content/70 text-sm">
                Verificación de zonificación y aptitud edilicia del local. Obtención del{' '}
                <strong>Permiso de Uso</strong>.
              </p>
              <div className="mt-3 space-y-1 text-xs">
                <a
                  href="https://wa.me/543434681033"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:underline"
                >
                  <IconPhone size={12} />
                  <span>3434681033</span>
                </a>
                <a
                  href="mailto:opriv.sanbenito@gmail.com"
                  className="flex items-center gap-1 hover:underline"
                >
                  <IconMail size={12} />
                  <span>opriv.sanbenito@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          <div className="card bg-primary/10 border-primary border shadow">
            <div className="card-body p-5">
              <div className="badge badge-primary mb-2">Paso 2 — Este portal</div>
              <h3 className="font-bold">Habilitaciones Comerciales</h3>
              <p className="text-base-content/70 text-sm">
                Con el Permiso de Uso aprobado, presentá la solicitud aquí y la documentación
                requerida según el rubro.
              </p>
              <div className="mt-3 space-y-1 text-xs">
                <a
                  href="https://wa.me/543434537319"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:underline"
                >
                  <IconPhone size={12} />
                  <span>3434537319</span>
                </a>
                <a
                  href="mailto:habilitaciones@munisanbenito.gov.ar"
                  className="flex items-center gap-1 hover:underline"
                >
                  <IconMail size={12} />
                  <span>habilitaciones@munisanbenito.gov.ar</span>
                </a>
              </div>
            </div>
          </div>

          <div className="card bg-base-200 shadow">
            <div className="card-body p-5">
              <div className="badge badge-accent mb-2">Paso 3 — Final</div>
              <h3 className="font-bold">Rentas</h3>
              <p className="text-base-content/70 text-sm">
                Alta fiscal, confección del Alta Comercial, firma de Resolución y emisión del{' '}
                <strong>Certificado de Habilitación</strong>.
              </p>
              <div className="mt-3 space-y-1 text-xs">
                <div className="flex items-center gap-1">
                  <IconPhone size={12} />
                  <span>3436127015</span>
                </div>
                <a
                  href="mailto:rentas@munisanbenito.gov.ar"
                  className="flex items-center gap-1 hover:underline"
                >
                  <IconMail size={12} />
                  <span>rentas@munisanbenito.gov.ar</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA principal — ya tengo el Permiso de Uso */}
        <div className="card bg-primary text-primary-content mb-8 shadow-lg">
          <div className="card-body">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="card-title text-xl">¿Ya tenés el Permiso de Uso aprobado?</h2>
                <p className="mt-1 text-sm opacity-80">
                  Completá la solicitud digital de Habilitación Comercial (Paso 2).
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link href="/habilitaciones/nueva" className="btn btn-secondary gap-2">
                  <IconFileDescription size={18} />
                  Presentar Solicitud
                  <IconArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Requisitos para Paso 2 */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-primary mb-4">Documentación requerida para el Paso 2</h2>
            <p className="text-base-content/60 mb-4 text-sm">
              Documentos obligatorios a presentar junto con la solicitud:
            </p>
            <ul className="mb-5 space-y-2">
              {[
                'Formulario de solicitud inicial (descargar abajo)',
                'Formulario de Permiso de Uso aprobado por Obras Privadas',
                'Estado de Deuda del inmueble — Libre Deuda (Rentas Municipal)',
                'Sellado de Carpeta Técnica (consultar monto vigente en Habilitaciones)',
                'Fotocopia DNI y CUIT / constancia ARCA',
                'Fotocopia de Boleta de Tasa Inmobiliaria (Provincial y Municipal)',
                '2 cuadernos tapa dura ~42 hojas (Libro de Quejas y Libro de Habilitaciones)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <IconCircleCheck size={18} className="text-success mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-base-content/60 mb-3 text-sm font-medium">
              Según el rubro, pueden requerirse además:
            </p>
            <ul className="mb-5 space-y-2">
              {[
                'Libreta Sanitaria o Carnet de Manipulador de Alimentos (peluqueros, transporte, rubros alimenticios)',
                'Informe Técnico Bromatológico o de Seguridad e Higiene Laboral (profesional matriculado)',
                'Certificado de Buena Conducta (eventos, bares, hoteles, actividades con menores)',
                'Plano de evacuación (locales > 50 m²)',
                'Seguro de RC (salones de eventos, bares, gimnasios, clubes, etc.)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <IconCircleCheck size={18} className="text-warning mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="divider my-2" />
            <p className="text-base-content/60 text-xs">
              Ante dudas sobre requisitos específicos de tu rubro, contactate con Habilitaciones
              antes de iniciar la solicitud.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
