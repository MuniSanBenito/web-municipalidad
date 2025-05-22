import { Metadata } from 'next'
import { unstable_cache as cache } from 'next/cache'
import { PageTitle } from '@/components/ui/PageTitle'
import { payload } from '@/web/lib/payload'
import { Licitacion } from '@/payload-types'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Licitaciones',
}

const getLicitaciones = cache(
  async (): Promise<Licitacion[]> => {
    const data = await payload.find({
      collection: 'licitaciones',
      sort: '-fecha',
      limit: 100, // Adjust limit as needed
    })
    return data.docs as Licitacion[]
  },
  ['licitaciones'],
  { revalidate: 3600 }, // Revalidate every hour
)

export default async function LicitacionesPage() {
  const licitaciones = await getLicitaciones()

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Fecha no disponible'
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('es-AR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date)
    } catch (error) {
      console.error('Error formatting date:', error)
      return 'Fecha inválida'
    }
  }

  const getEstadoLabel = (estadoValue: string | undefined) => {
    switch (estadoValue) {
      case 'en_proceso':
        return 'En Proceso'
      case 'adjudicada':
        return 'Adjudicada'
      case 'cancelada':
        return 'Cancelada'
      default:
        return 'No especificado'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle title="Licitaciones" />

      {licitaciones && licitaciones.length > 0 ? (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Título
                </th>
                <th scope="col" className="px-6 py-3">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3">
                  Documento Principal
                </th>
              </tr>
            </thead>
            <tbody>
              {licitaciones.map((licitacion) => (
                <tr
                  key={licitacion.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {licitacion.titulo}
                  </td>
                  <td className="px-6 py-4">{formatDate(licitacion.fecha)}</td>
                  <td className="px-6 py-4">
                    {getEstadoLabel(licitacion.estado)}
                  </td>
                  <td className="px-6 py-4">
                    {typeof licitacion.documento === 'object' &&
                    licitacion.documento !== null &&
                    'url' in licitacion.documento &&
                    licitacion.documento.url ? (
                      <Link
                        href={licitacion.documento.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 rounded"
                      >
                        Descargar PDF
                      </Link>
                    ) : (
                      'No disponible'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
          No hay licitaciones disponibles en este momento.
        </p>
      )}
    </div>
  )
}
