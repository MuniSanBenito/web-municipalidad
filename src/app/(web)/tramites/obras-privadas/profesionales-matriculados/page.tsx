import type { Matriculado } from '@/payload-types'
import { basePayload } from '@/web/lib/payload'
import { IconArrowLeft, IconMail, IconPhone, IconSearch } from '@tabler/icons-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Profesionales Matriculados - Obras Privadas - San Benito',
  description:
    'Listado de profesionales matriculados habilitados para obras privadas en San Benito',
}

async function getMatriculadosHabilitados(): Promise<Matriculado[]> {
  const matriculados = await basePayload.find({
    collection: 'matriculados',
    where: {
      habilitado: {
        equals: true,
      },
    },
    sort: 'nombreCompleto',
    limit: 500,
  })
  return matriculados.docs
}

export default async function PageProfesionalesMatriculados() {
  const matriculados = await getMatriculadosHabilitados()

  return (
    <main className="container mx-auto px-4 py-6">
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">Obras Privadas</h1>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
              Profesionales Matriculados Habilitados
            </h2>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold md:text-2xl">
              Listado de Profesionales ({matriculados.length})
            </h2>
          </div>

          {matriculados.length === 0 ? (
            <div className="alert alert-info">
              <IconSearch size={20} />
              <span>No se encontraron profesionales matriculados habilitados.</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-zebra table w-full">
                <thead>
                  <tr>
                    <th>Nombre Completo</th>
                    <th>Profesión</th>
                    <th>Matrícula</th>
                    <th>Contacto</th>
                  </tr>
                </thead>
                <tbody>
                  {matriculados.map((matriculado) => (
                    <tr key={matriculado.id}>
                      <td className="font-medium">{matriculado.nombreCompleto}</td>
                      <td>{matriculado.profesion}</td>
                      <td>{matriculado.matricula}</td>
                      <td>
                        <div className="flex flex-col gap-1">
                          {matriculado.telefono && (
                            <a
                              href={`https://wa.me/54${matriculado.telefono.replace(/\D/g, '')}`}
                              className="link link-primary flex items-center gap-1 text-sm"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <IconPhone size={14} />
                              {matriculado.telefono}
                            </a>
                          )}
                          {matriculado.email && (
                            <a
                              href={`mailto:${matriculado.email}`}
                              className="link link-primary flex items-center gap-1 text-sm"
                            >
                              <IconMail size={14} />
                              {matriculado.email}
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6">
            <div className="alert alert-warning">
              <div>
                <p className="text-sm">
                  <strong>Nota:</strong> Este listado incluye únicamente a los profesionales que se
                  encuentran habilitados y con su matrícula al día en el registro municipal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8 flex justify-center">
        <Link href="/tramites/obras-privadas" className="btn btn-outline gap-2">
          <IconArrowLeft size={20} />
          <span>Volver a Obras Privadas</span>
        </Link>
      </div>
    </main>
  )
}
