import type { Ciudadano } from '@/payload-types'
import { CurriculumPDFDownload } from '@/web/components/curriculum-pdf-download'
import { LogoutButton } from '@/web/components/logout-button'
import { basePayload } from '@/web/lib/payload'
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

  // Obtener los currículums del ciudadano
  const { docs: curriculums } = await basePayload.find({
    collection: 'curriculums',
    where: {
      ciudadano: {
        equals: ciudadano.id,
      },
    },
    limit: 10,
  })

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
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Información Personal */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-primary">Información Personal</h2>
              <div className="space-y-4">
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

        {/* Sección de Currículums Detallada */}
        {curriculums && curriculums.length > 0 && (
          <div className="card bg-base-100 mt-8 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-primary">Mis Currículums</h2>
              <div className="space-y-6">
                {curriculums.map((curriculum) => (
                  <div key={curriculum.id} className="border-base-300 rounded-lg border p-6">
                    {/* Título del currículum */}
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-primary text-lg font-bold">
                          {curriculum.titulo || 'Currículum sin título'}
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
                        <h4 className="text-base-content/80 mb-2 text-sm font-semibold">
                          Categorías:
                        </h4>
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443a55.381 55.381 0 0 1 5.25 2.882V15"
                            />
                          </svg>
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
                          <div className="text-base-content/60 text-sm">
                            No hay estudios registrados
                          </div>
                        )}
                      </div>

                      {/* Experiencias */}
                      <div>
                        <h4 className="text-primary mb-3 flex items-center gap-2 font-semibold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                            />
                          </svg>
                          Experiencia
                        </h4>
                        {curriculum.experiencias && curriculum.experiencias.length > 0 ? (
                          <div className="space-y-3">
                            {curriculum.experiencias.map((experiencia, index) => (
                              <div
                                key={experiencia.id || index}
                                className="bg-base-200 rounded-lg p-3"
                              >
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                            />
                          </svg>
                          Referencias
                        </h4>
                        {curriculum.referencias && curriculum.referencias.length > 0 ? (
                          <div className="space-y-3">
                            {curriculum.referencias.map((referencia, index) => (
                              <div
                                key={referencia.id || index}
                                className="bg-base-200 rounded-lg p-3"
                              >
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
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mensaje si no hay currículums */}
        {(!curriculums || curriculums.length === 0) && (
          <div className="card bg-base-100 mt-8 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-primary">Mis Currículums</h2>
              <div className="alert alert-warning">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 shrink-0 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <div>
                  <h3 className="font-bold">No tienes currículums registrados</h3>
                  <div className="text-xs">
                    Puedes crear tu primer currículum desde el panel correspondiente.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Acciones */}
        <div className="card bg-base-100 mt-8 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-primary">Acciones</h2>
            <div className="flex flex-wrap gap-4">
              <Link href="/perfil/editar-perfil" className="btn btn-primary">
                Editar Perfil
              </Link>
              <Link href="/perfil/cambiar-password" className="btn btn-secondary">
                Cambiar Contraseña
              </Link>
              <Link href="/perfil/curriculum" className="btn btn-accent">
                Gestionar Currículum
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
