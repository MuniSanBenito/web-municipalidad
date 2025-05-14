
import PageTitle from '@/components/ui/PageTitle'
import { basePayload } from '@/web/lib/payload'
import Link from 'next/link'

interface Licitacion {
  id: string
  titulo: string
  descripcion: string
  fecha: string
  estado: 'en_proceso' | 'adjudicada' | 'cancelada'
}

type Props = {
  searchParams: Promise<{ [key: string]: string }>
}

export default async function PageLicitaciones({ searchParams }: Props) { 


  const { docs: licitaciones } = await basePayload.find({
    collection: 'licitaciones',
    limit: 10,
  })

  console.log(licitaciones)

  return (
    <div className="container mx-auto px-4 py-8">
    <PageTitle title="Licitaciones" />
    
    <div className="mb-12 text-center">
      <p className="text-lg text-gray-600">
        En esta sección encontrará información sobre las licitaciones públicas realizadas por el municipio,
        incluyendo pliegos, condiciones y resultados.
      </p>
    </div>

    {licitaciones.length > 0 ? (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {licitaciones.map((licitacion) => (
          <Link 
            href={`/transparencia/contabilidad/Licitaciones/${licitacion.id}`}
            key={licitacion.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{licitacion.titulo}</h3>
              {/* <p className="text-gray-600 mb-4 line-clamp-3">
                {licitacion.estado}
              </p> */}
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Fecha: {new Date(licitacion.fecha).toLocaleDateString()}</span>
                <span className={`px-3 py-1 rounded-full ${
                  licitacion.estado === 'en_proceso' ? 'bg-blue-100 text-blue-800' :
                  licitacion.estado === 'adjudicada' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {licitacion.estado === 'en_proceso' ? 'En proceso' :
                   licitacion.estado === 'adjudicada' ? 'Adjudicada' : 
                   'Cancelada'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    ) : (
      <div className="mt-12 text-center">
        <p className="text-gray-600">
          No hay licitaciones publicadas en este momento.
        </p>
      </div>
    )}
  </div>
  )
}