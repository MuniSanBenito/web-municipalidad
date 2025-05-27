import { basePayload } from '@/web/lib/payload'
import {
  IconBuildingStore,
  IconCash,
  IconClipboardList,
  IconFileDescription,
} from '@tabler/icons-react'
import Link from 'next/link'

export default async function TramitesLicenciaPage() {
  const { docs: habilitaciones } = await basePayload.find({
    collection: 'habilitaciones',
  })

  return (
    <main className="container mx-auto px-4 py-6">
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">Habilitaciones Comerciales</h1>
            <p className="mt-4 text-base leading-relaxed md:text-lg">
              Aquí encontrarás toda la información necesaria para realizar trámites de
              habilitaciones comerciales en la Municipalidad de San Benito. Selecciona el tipo de
              habilitación que necesitas para conocer los requisitos, costos y procedimientos.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="mb-6 text-2xl font-semibold md:text-3xl">Tipos de Habilitaciones</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {habilitaciones.length > 0 ? (
              habilitaciones.map((opcion) => {
                // Usar el nombre directamente como slug, codificándolo para la URL
                const slugUrl = encodeURIComponent(opcion.nombre)

                return (
                  <Link
                    key={opcion.id}
                    href={`/tramites/habilitaciones/${slugUrl}`}
                    className="card bg-base-200 hover:bg-primary hover:text-primary-content shadow-md transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="card-body">
                      <div className="mb-4 flex justify-center">
                        <IconBuildingStore size={48} stroke={1.5} />
                      </div>
                      <h3 className="card-title justify-center text-xl">{opcion.nombre}</h3>
                      <div className="card-actions mt-4 justify-center">
                        <button className="btn btn-outline">Ver detalles</button>
                      </div>
                    </div>
                  </Link>
                )
              })
            ) : (
              // Si no hay habilitaciones en la base de datos, mostrar opciones predeterminadas
              <>
                <Link
                  href="/tramites/habilitaciones/comercios"
                  className="card bg-base-200 hover:bg-primary hover:text-primary-content shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  <div className="card-body">
                    <div className="mb-4 flex justify-center">
                      <IconBuildingStore size={48} stroke={1.5} />
                    </div>
                    <h3 className="card-title justify-center text-xl">Comercios Minoristas</h3>
                    <p className="text-center">
                      Requisitos y procedimientos para habilitar comercios minoristas en San Benito
                    </p>
                    <div className="card-actions mt-4 justify-center">
                      <button className="btn btn-outline">Ver detalles</button>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/tramites/habilitaciones/servicios"
                  className="card bg-base-200 hover:bg-primary hover:text-primary-content shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  <div className="card-body">
                    <div className="mb-4 flex justify-center">
                      <IconFileDescription size={48} stroke={1.5} />
                    </div>
                    <h3 className="card-title justify-center text-xl">Servicios Profesionales</h3>
                    <p className="text-center">
                      Información para habilitar oficinas y servicios profesionales
                    </p>
                    <div className="card-actions mt-4 justify-center">
                      <button className="btn btn-outline">Ver detalles</button>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/tramites/habilitaciones/gastronomia"
                  className="card bg-base-200 hover:bg-primary hover:text-primary-content shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  <div className="card-body">
                    <div className="mb-4 flex justify-center">
                      <IconClipboardList size={48} stroke={1.5} />
                    </div>
                    <h3 className="card-title justify-center text-xl">Gastronomía</h3>
                    <p className="text-center">
                      Requisitos para habilitar restaurantes, bares y locales gastronómicos
                    </p>
                    <div className="card-actions mt-4 justify-center">
                      <button className="btn btn-outline">Ver detalles</button>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/tramites/habilitaciones/industrias"
                  className="card bg-base-200 hover:bg-primary hover:text-primary-content shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  <div className="card-body">
                    <div className="mb-4 flex justify-center">
                      <IconCash size={48} stroke={1.5} />
                    </div>
                    <h3 className="card-title justify-center text-xl">Industrias</h3>
                    <p className="text-center">
                      Información para habilitación de industrias y establecimientos productivos
                    </p>
                    <div className="card-actions mt-4 justify-center">
                      <button className="btn btn-outline">Ver detalles</button>
                    </div>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">Información General</h2>
          <div className="space-y-4">
            <p>
              Para realizar cualquier trámite de habilitación comercial, es necesario presentar la
              documentación en el Area de Habilitaciones Comerciales de la Municipalidad de San
              Benito.
            </p>
            <p>
              <strong>Horario de atención:</strong> Lunes a Viernes de 7:00 a 13:00 hs.
            </p>
            <p>
              <strong>Ubicación:</strong> Edificio Municipal - Basavilbaso 1094, San Benito, Entre
              Ríos.
            </p>
            <p className="font-medium">
              <strong className="text-primary">Consultas:</strong> Para más información:
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-8">
              <li>
                <strong>WhatsApp:</strong>{' '}
                <a
                  href="https://wa.me/3434537319"
                  target="_blank"
                  className="text-primary hover:underline"
                >
                  3434537319
                </a>
              </li>
              <li>
                <strong>Correo electrónico:</strong>{' '}
                <a
                  href="mailto:habilitaciones@munisanbenito.gov.ar"
                  className="text-primary hover:underline"
                >
                  habilitaciones@munisanbenito.gov.ar
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
