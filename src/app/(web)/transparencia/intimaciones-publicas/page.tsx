'use client'

import { IconCalendar, IconDownload, IconFileText, IconSearch } from '@tabler/icons-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Definimos el tipo para las intimaciones
type Intimacion = {
  id: string
  nombre: string
  archivo: {
    url: string
    filename: string
  }
  createdAt: string
  updatedAt: string
}

export default function IntimacionesPublicas() {
  const [intimaciones, setIntimaciones] = useState<Intimacion[]>([])
  const [filteredIntimaciones, setFilteredIntimaciones] = useState<Intimacion[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchIntimaciones = async () => {
      try {
        const response = await fetch('/api/intimaciones')
        const data = await response.json()

        // Verificamos la estructura de la respuesta y aseguramos que sea un array
        const intimacionesData = Array.isArray(data.docs) 
          ? data.docs 
          : Array.isArray(data) 
            ? data 
            : [];

        // Ordenamos por fecha de creación (más reciente primero)
        const sortedIntimaciones = intimacionesData.sort(
          (a: Intimacion, b: Intimacion) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )

        setIntimaciones(sortedIntimaciones)
        setFilteredIntimaciones(sortedIntimaciones)
      } catch (error) {
        console.error('Error al cargar intimaciones:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchIntimaciones()
  }, [])

  // Función para filtrar las intimaciones según el término de búsqueda
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)

    if (term.trim() === '') {
      setFilteredIntimaciones(intimaciones)
    } else {
      const filtered = intimaciones.filter((intimacion) =>
        intimacion.nombre.toLowerCase().includes(term),
      )
      setFilteredIntimaciones(filtered)
    }
  }

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg md:p-10">
        <div className="hero-content p-0 md:p-4">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-3xl font-bold md:text-5xl">Intimaciones Públicas</h1>
            <p className="mt-4 text-base leading-relaxed md:text-lg">
              La Municipalidad de San Benito comunica que en ejercicio de la ordenanza N° 511/16 en
              su artículo 12° se procederá a publicar en la web las cédulas de notificaciones que no
              hubieran podido ser diligenciadas por la mudanza, no localización del domicilio o el
              fallecimiento del o los titulares.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 space-y-4 md:mt-10 md:space-y-6">
        <div className="bg-base-100 rounded-lg p-4 shadow-md md:p-8">
          <h2 className="mb-4 text-2xl font-semibold md:mb-6 md:text-3xl">Ordenanza N° 511/16</h2>

          <div className="mb-6 space-y-4 text-base md:mb-8 md:text-lg">
            <div className="bg-base-200 rounded-lg p-4 md:p-6">
              <h3 className="mb-2 font-bold">Malezas</h3>
              <p className="mb-4">
                <strong>ARTÍCULO 1°:</strong> A los efectos de la interpretación de la presente
                ordenanza, se considerará maleza, pastizal o predio no conservado, a todo aquel lote
                o predio cuyos pastos o malezas superen la altura máxima de treinta (30) centímetros
                y aquel que cuente con una forestación tal que no respete la distancia mínima de
                plantado de tres (3) metros de la línea de edificación, o no proceda a la poda o
                tala de dichos árboles, cuando la misma sea requerida mediante intimación cursada
                por el Funcionario municipal designado por el área pertinente, a sus efectos y ello
                ponga en peligro la seguridad de personas o cosas de terceros.-
              </p>
              <p>
                <strong>ARTÍCULO 12°:</strong> Autorizase al D.E.M. para que en los casos de
                propietarios desconocidos o no localizados, o que habiéndose cursado cédula de
                notificación la misma no hubiera podido ser diligenciada por la mudanza o el
                fallecimiento del o los titulares, se publique por dos días en la página Web oficial
                del Municipio y oficinas respectiva, a elección del D.E.M., a fin de llevar adelante
                los trabajos de desmalezado y/o limpieza y dichos costos se liquidarán de
                conformidad al Artículo 8º.-
              </p>
            </div>
          </div>

          <div className="mb-6">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <IconSearch className="text-gray-500" size={20} />
              </div>
              <input
                type="text"
                className="bg-base-200 border-base-300 text-base-content focus:ring-primary focus:border-primary block w-full rounded-lg border p-3 pl-10 text-base md:text-lg"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          {loading ? (
            <div className="py-10 text-center">
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <p className="mt-4">Cargando intimaciones...</p>
            </div>
          ) : filteredIntimaciones.length > 0 ? (
            <div className="-mx-4 overflow-x-auto md:mx-0">
              <table className="table w-full text-sm md:text-base">
                <thead>
                  <tr>
                    <th className="text-base md:text-lg">Nombre</th>
                    <th className="hidden text-base md:table-cell md:text-lg">Fecha</th>
                    <th className="text-base md:text-lg text-center">Descargar</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIntimaciones.map((intimacion) => (
                    <tr key={intimacion.id} className="hover">
                      <td className="align-middle">
                        <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2">
                          <IconFileText size={18} className="hidden md:inline flex-shrink-0" />
                          <span className="line-clamp-2">{intimacion.nombre}</span>
                          <span className="text-xs text-gray-500 md:hidden">
                            {formatDate(intimacion.createdAt)}
                          </span>
                        </div>
                      </td>
                      <td className="hidden align-middle md:table-cell">
                        <div className="flex items-center gap-2">
                          <IconCalendar size={18} className="flex-shrink-0" />
                          <span>{formatDate(intimacion.createdAt)}</span>
                        </div>
                      </td>
                      <td className="text-center align-middle">
                        <Link
                          href={intimacion.archivo.url}
                          target="_blank"
                          className="btn btn-primary btn-sm"
                          aria-label={`Descargar ${intimacion.nombre}`}
                        >
                          <IconDownload size={16} className="md:mr-1" />
                          <span className="hidden md:inline">Descargar</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-base-200 rounded-lg py-8 text-center md:py-10">
              <p className="text-base md:text-lg">
                {searchTerm
                  ? 'No se encontraron intimaciones que coincidan con la búsqueda.'
                  : 'No hay intimaciones disponibles actualmente.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
