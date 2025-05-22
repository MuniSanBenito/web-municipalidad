import { Metadata } from 'next'
import { unstable_cache as cache } from 'next/cache'
import { PageTitle } from '@/components/ui/PageTitle'
import { payload } from '@/web/lib/payload'
import { Autoridades as AutoridadesType } from '@/payload-types' // Assuming this type exists or will be created

export const metadata: Metadata = {
  title: 'Autoridades',
}

const getAutoridades = cache(
  async (): Promise<AutoridadesType | null> => {
    try {
      const data = await payload.findGlobal({
        slug: 'autoridades',
      })
      return data as AutoridadesType
    } catch (error) {
      console.error('Error fetching autoridades global:', error)
      return null // Return null on error to indicate data might be missing
    }
  },
  ['autoridades_global'],
  { revalidate: 3600 }, // Revalidate every hour
)

export default async function AutoridadesPage() {
  const autoridades = await getAutoridades()

  // Define what constitutes an "empty" or "incomplete" state
  const isEmpty =
    !autoridades ||
    !autoridades.presidente ||
    !autoridades.secretario ||
    !autoridades.bloques ||
    autoridades.bloques.length === 0

  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle title="Autoridades del Honorable Concejo Deliberante" />

      {isEmpty ? (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
          No hay información sobre autoridades disponible para mostrar en este momento.
        </p>
      ) : (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Presidente</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">{autoridades.presidente}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Secretario</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">{autoridades.secretario}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Bloques</h2>
            {autoridades.bloques?.map((bloque) => (
              <div key={bloque.id || bloque.nombre} className="mt-4 p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{bloque.nombre}</h3>
                {bloque.concejales && bloque.concejales.length > 0 ? (
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    {bloque.concejales.map((c) => (
                      <li key={c.id || c.concejal} className="text-gray-600 dark:text-gray-400">{c.concejal}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">No hay concejales listados para este bloque.</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
