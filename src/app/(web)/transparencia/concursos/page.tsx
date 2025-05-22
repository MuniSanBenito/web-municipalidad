import { Metadata } from 'next'
import { unstable_cache as cache } from 'next/cache'
import { PageTitle } from '@/components/ui/PageTitle'
import { payload } from '@/web/lib/payload'
import { Concurso } from '@/payload-types' // Assuming this type exists or will be created
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Concursos',
}

const getConcursos = cache(
  async (): Promise<Concurso[]> => {
    try {
      const data = await payload.find({
        collection: 'concursos',
        sort: '-fecha', // Sort by date, newest first
        limit: 100, // Adjust limit as needed
      })
      return data.docs as Concurso[]
    } catch (error) {
      console.error('Error fetching concursos:', error)
      return [] // Return empty array on error
    }
  },
  ['concursos_collection'],
  { revalidate: 3600 }, // Revalidate every hour
)

export default async function ConcursosPage() {
  const concursos = await getConcursos()

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
      case 'abierto':
        return 'Abierto'
      case 'en_evaluacion':
        return 'En Evaluación'
      case 'finalizado':
        return 'Finalizado'
      case 'cancelado':
        return 'Cancelado'
      default:
        return 'No especificado'
    }
  }

  const isEmpty = !concursos || concursos.length === 0

  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle title="Concursos Públicos" />

      {isEmpty ? (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
          No hay concursos públicos disponibles para mostrar en este momento.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Título
                </th>
                <th scope="col" className="px-6 py-3">
                  Fecha de Publicación
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
              {concursos.map((concurso) => (
                <tr
                  key={concurso.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {concurso.titulo}
                  </td>
                  <td className="px-6 py-4">{formatDate(concurso.fecha)}</td>
                  <td className="px-6 py-4">
                    {getEstadoLabel(concurso.estado)}
                  </td>
                  <td className="px-6 py-4">
                    {typeof concurso.documento === 'object' &&
                    concurso.documento !== null &&
                    'url' in concurso.documento &&
                    concurso.documento.url ? (
                      <Link
                        href={concurso.documento.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 rounded"
                      >
                        Ver / Descargar PDF
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
      )}
    </div>
  )
}
