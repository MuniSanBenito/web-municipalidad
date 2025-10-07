import type { Ciudadano } from '@/payload-types'
import { CurriculumPDFDownload } from '@/web/components/curriculum-pdf-download'
import { LogoutButton } from '@/web/components/logout-button'
import { basePayload } from '@/web/lib/payload'
import { IconAlertTriangle, IconBriefcase, IconSchool, IconUsers } from '@tabler/icons-react'
import { headers as nextHeaders } from 'next/headers'
import Link from 'next/link'

export default async function PerfilPage() {
  const headers = await nextHeaders()
  const { user } = await basePayload.auth({ headers, canSetHeaders: false })

  if (!user) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold">Acceso Requerido</h1>
        <p className="text-base-content/70 mb-6">Debes iniciar sesión para acceder a tu perfil.</p>
        <Link href="/login" className="btn btn-primary">
          Iniciar Sesión
        </Link>
      </div>
    )
  }

  if (user.collection !== 'ciudadanos') {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold">Acceso Denegado</h1>
        <p className="text-base-content/70 mb-6">
          Esta página está disponible solo para ciudadanos registrados.
        </p>
        <Link href="/" className="btn btn-secondary">
          Volver al Inicio
        </Link>
      </div>
    )
  }

  const ciudadano = user as Ciudadano

  // Obtener el curriculum del ciudadano (solo uno permitido)
  const { docs: curriculums } = await basePayload.find({
    collection: 'curriculums',
    where: {
      ciudadano: {
        equals: ciudadano.id,
      },
    },
    limit: 1,
  })

  const curriculum = curriculums.length > 0 ? curriculums[0] : null

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No especificado'
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatDateShort = (dateString: string | null | undefined) => {
    if (!dateString) return 'Presente'
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
    })
  }

  return (
    <main className="bg-base-100 min-h-screen">
      <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {/* Header del perfil */}
        <div className="card bg-base-200 mb-8 shadow-lg">
          <div className="card-body">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
              {/* Avatar e Información básica */}
              <div className="flex flex-col items-center gap-6 sm:flex-row">
                {/* Avatar */}
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    {typeof ciudadano.avatar === 'object' && ciudadano.avatar?.url ? (
                      <img
                        src={ciudadano.avatar.url}
                        alt={ciudadano.avatar.alt || 'Avatar del usuario'}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="from-primary to-primary-focus text-primary-content flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br text-2xl font-bold shadow-lg">
                        {ciudadano.nombre && ciudadano.apellido
                          ? `${ciudadano.nombre[0]}${ciudadano.apellido[0]}`
                          : ciudadano.nombre?.[0] || ciudadano.email[0].toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Información básica */}
                <div className="text-center sm:text-left">
                  <h1 className="text-primary text-3xl font-bold">
                    {ciudadano.nombre && ciudadano.apellido
                      ? `${ciudadano.nombre} ${ciudadano.apellido}`
                      : ciudadano.email}
                  </h1>
                  <p className="text-base-content/80 mt-1">DNI: {ciudadano.dni}</p>
                </div>
              </div>

              {/* Botón de cerrar sesión */}
              <div className="flex flex-col gap-2 sm:items-end">
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>

        {/* Contenido del perfil */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-1">
          {/* Información Personal */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-primary mb-6">Información Personal</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="fieldset-legend">Email</label>
                  <p className="text-base-content">{ciudadano.email}</p>
                </div>

                {ciudadano.telefono && (
                  <div>
                    <label className="fieldset-legend">Teléfono</label>
                    <p className="text-base-content">{ciudadano.telefono}</p>
                  </div>
                )}

                {ciudadano.fecha_nacimiento && (
                  <div>
                    <label className="fieldset-legend">Fecha de Nacimiento</label>
                    <p className="text-base-content">{formatDate(ciudadano.fecha_nacimiento)}</p>
                  </div>
                )}

                {ciudadano.domicilio && (
                  <div>
                    <label className="fieldset-legend">Domicilio</label>
                    <p className="text-base-content">{ciudadano.domicilio}</p>
                  </div>
                )}

                {ciudadano.ciudad && (
                  <div>
                    <label className="fieldset-legend">Ciudad</label>
                    <p className="text-base-content">{ciudadano.ciudad}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="card bg-base-100 mt-8 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-primary">Acciones</h2>
            <div className="flex flex-wrap gap-4">
              <Link href="/perfil/editar" className="btn btn-primary">
                Editar Perfil
              </Link>
              <Link href="/perfil/cambiar-password" className="btn btn-secondary">
                Cambiar Contraseña
              </Link>
              <Link href="/perfil/curriculum" className="btn btn-accent">
                {curriculum ? 'Editar Currículum' : 'Crear Currículum'}
              </Link>
            </div>
          </div>
        </div>

        {/* Sección de Curriculum */}
        {curriculum && (
          <div className="card bg-base-100 mt-8 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-primary">Mi Currículum</h2>
              {/* Título del currículum */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-primary text-md font-semibold">
                    {curriculum.titulo || 'Mi Currículum'}
                  </h3>
                  <div className="text-base-content/60 mt-1 text-sm">
                    Actualizado: {formatDate(curriculum.updatedAt)}
                  </div>
                </div>
                <div className="ml-4 flex gap-2">
                  <CurriculumPDFDownload ciudadano={ciudadano} curriculum={curriculum} />
                </div>
              </div>

              {/* Categorías */}
              {curriculum.categorias && curriculum.categorias.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-base-content/80 mb-2 text-sm font-semibold">Categorías:</h4>
                  <div className="flex flex-wrap gap-2">
                    {curriculum.categorias.map((categoria, index) => (
                      <div
                        key={categoria.id || index}
                        className="badge badge-secondary badge-outline"
                      >
                        {categoria.nombre}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Estudios */}
                <div>
                  <h4 className="text-primary mb-3 flex items-center gap-2 font-semibold">
                    <IconSchool size={20} />
                    Estudios
                  </h4>
                  {curriculum.estudios && curriculum.estudios.length > 0 ? (
                    <div className="space-y-3">
                      {curriculum.estudios.map((estudio, index) => (
                        <div key={estudio.id || index} className="bg-base-200 rounded-lg p-3">
                          <div className="text-sm font-medium">{estudio.institucion}</div>
                          <div className="text-base-content/70 mt-1 text-xs">
                            {estudio.is_old ? estudio.nivel_old : estudio.nivel}
                          </div>
                          <div className="text-base-content/60 text-xs">
                            {formatDateShort(estudio.fecha_inicio)} -{' '}
                            {formatDateShort(estudio.fecha_finalizacion)}
                          </div>
                          {estudio.descripcion && (
                            <div className="text-base-content/80 mt-2 text-xs">
                              {estudio.descripcion}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-base-content/60 text-sm">No hay estudios registrados</div>
                  )}
                </div>

                {/* Experiencias */}
                <div>
                  <h4 className="text-primary mb-3 flex items-center gap-2 font-semibold">
                    <IconBriefcase size={20} />
                    Experiencia
                  </h4>
                  {curriculum.experiencias && curriculum.experiencias.length > 0 ? (
                    <div className="space-y-3">
                      {curriculum.experiencias.map((experiencia, index) => (
                        <div key={experiencia.id || index} className="bg-base-200 rounded-lg p-3">
                          <div className="text-sm font-medium">{experiencia.institucion}</div>
                          <div className="text-base-content/70 mt-1 text-xs">
                            {experiencia.puesto}
                          </div>
                          <div className="text-base-content/60 text-xs">
                            {formatDateShort(experiencia.fecha_inicio)} -{' '}
                            {formatDateShort(experiencia.fecha_finalizacion)}
                          </div>
                          {experiencia.descripcion && (
                            <div className="text-base-content/80 mt-2 text-xs">
                              {experiencia.descripcion}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-base-content/60 text-sm">
                      No hay experiencias registradas
                    </div>
                  )}
                </div>

                {/* Referencias */}
                <div>
                  <h4 className="text-primary mb-3 flex items-center gap-2 font-semibold">
                    <IconUsers size={20} />
                    Referencias
                  </h4>
                  {curriculum.referencias && curriculum.referencias.length > 0 ? (
                    <div className="space-y-3">
                      {curriculum.referencias.map((referencia, index) => (
                        <div key={referencia.id || index} className="bg-base-200 rounded-lg p-3">
                          <div className="text-sm font-medium">{referencia.nombre}</div>
                          {referencia.telefono && (
                            <div className="text-base-content/70 mt-1 text-xs">
                              Tel: {referencia.telefono}
                            </div>
                          )}
                          {referencia.email && (
                            <div className="text-base-content/70 text-xs">
                              Email: {referencia.email}
                            </div>
                          )}
                          {referencia.descripcion && (
                            <div className="text-base-content/80 mt-2 text-xs">
                              {referencia.descripcion}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-base-content/60 text-sm">
                      No hay referencias registradas
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mensaje si no hay curriculum */}
        {!curriculum && (
          <div className="card bg-base-100 mt-8 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-primary">Mi Currículum</h2>
              <div className="alert alert-warning">
                <IconAlertTriangle size={24} className="shrink-0 stroke-current" />
                <div>
                  <h3 className="font-bold">No tienes un currículum registrado</h3>
                  <div className="text-xs">
                    Puedes crear tu currículum desde el panel de gestión.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
