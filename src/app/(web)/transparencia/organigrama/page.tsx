import { Metadata } from 'next'
import { PageTitle } from '@/components/ui/PageTitle'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Organigrama Municipal',
}

export default function OrganigramaPage() {
  const organigramaPdfUrl = '/documents/organigrama.pdf' // Path relative to /public

  const isOrganigramaAvailable = !!organigramaPdfUrl 

  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle title="Organigrama Municipal" />

      {isOrganigramaAvailable ? (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            A continuación, se presenta el organigrama municipal. Puede visualizarlo directamente en la página o descargarlo.
          </p>
          <div className="w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9]">
            <iframe
              src={organigramaPdfUrl}
              className="w-full h-full border rounded-lg shadow-md"
              title="Organigrama Municipal PDF"
            />
          </div>
          <div className="text-center mt-4">
            <Link
              href={organigramaPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:text-white dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700 dark:focus:ring-offset-gray-800"
            >
              Descargar Organigrama (PDF)
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
          El organigrama municipal no está disponible para mostrar en este momento.
        </p>
      )}
    </div>
  )
}
