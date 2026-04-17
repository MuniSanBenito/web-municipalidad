import type { ImagenArbol } from '@/payload-types'
import { basePayload } from '@/web/lib/payload'
import {
  IconAlertTriangle,
  IconCheck,
  IconHeartHandshake,
  IconInfoCircle,
  IconLeaf,
  IconRuler,
  IconTree,
  IconX,
} from '@tabler/icons-react'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Arbolado Urbano - San Benito',
  description:
    'Guía de especies de árboles permitidas y recomendadas para la vía pública según el ancho de vereda en la ciudad de San Benito.',
}

type EspecieConImagen = {
  nombre: string
  cientifico?: string
  imagen: ImagenArbol | string
  descripcion?: string
}

const especiesNoPermitidas = [
  'Ligustro',
  'Paraíso',
  'Mora',
  'Acacia negra',
  'Acacia blanca',
  'Arce negundo',
]

type SeccionVeredaProps = {
  titulo: string
  ancho: string
  altura: string
  descripcion: string
  idealPara: string[]
  especies: EspecieConImagen[]
  acentoClass: string
}

function getImagenUrl(imagen: ImagenArbol | string | null | undefined): string {
  if (!imagen) return ''
  if (typeof imagen === 'string') return imagen
  return imagen.sizes?.medium?.url || imagen.sizes?.small?.url || imagen.url || ''
}

function getImagenAlt(imagen: ImagenArbol | string | null | undefined, nombre: string): string {
  if (!imagen) return `Árbol ${nombre}`
  if (typeof imagen === 'string') return `Árbol ${nombre}`
  return imagen.alt || `Árbol ${nombre}`
}

function SeccionVereda({
  titulo,
  ancho,
  altura,
  descripcion,
  idealPara,
  especies,
  acentoClass,
}: SeccionVeredaProps) {
  return (
    <div className="bg-base-100 rounded-lg p-6 shadow-md">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className={`${acentoClass} text-4xl`}>
            <IconTree stroke={1.5} size={40} />
          </span>
          <div>
            <h3 className="text-2xl font-semibold md:text-3xl">{titulo}</h3>
            <p className="text-base-content/70 flex items-center gap-2 text-sm">
              <IconRuler size={16} />
              <span>
                Ancho: {ancho} · Altura: {altura}
              </span>
            </p>
          </div>
        </div>
      </div>

      <p className="text-base leading-relaxed">{descripcion}</p>

      <div className="mt-4">
        <p className="font-semibold">Son ideales para:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {idealPara.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <h4 className="mt-6 mb-4 text-xl font-semibold">Especies recomendadas</h4>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {especies
          .filter((especie) => getImagenUrl(especie.imagen))
          .map((especie) => (
            <div
              key={especie.nombre}
              className="card bg-base-200 overflow-hidden shadow-xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              <figure className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={getImagenUrl(especie.imagen)}
                  alt={getImagenAlt(especie.imagen, especie.nombre)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 hover:scale-105 dark:brightness-90"
                />
              </figure>
              <div className="card-body p-4">
                <h5 className="card-title text-lg">{especie.nombre}</h5>
                {especie.cientifico && (
                  <p className="text-base-content/60 text-sm italic">{especie.cientifico}</p>
                )}
                {especie.descripcion && (
                  <p className="mt-1 text-sm leading-relaxed">{especie.descripcion}</p>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

async function getArbolesPorTipoVereda(
  tipoVereda: 'angosta' | 'mediana' | 'ancha',
): Promise<EspecieConImagen[]> {
  try {
    const response = await basePayload.find({
      collection: 'imagenes-arboles',
      where: {
        tipoVereda: {
          equals: tipoVereda,
        },
      },
      limit: 100,
    })

    return response.docs.map((arbol) => ({
      nombre: arbol.nombreComun,
      cientifico: arbol.nombreCientifico || undefined,
      imagen: arbol as ImagenArbol,
      descripcion: arbol.descripcion || undefined,
    }))
  } catch (error) {
    console.error(`Error al obtener árboles para vereda ${tipoVereda}:`, error)
    return []
  }
}

export default async function PageArboladoUrbano() {
  const [especiesAngosta, especiesMediana, especiesAncha] = await Promise.all([
    getArbolesPorTipoVereda('angosta'),
    getArbolesPorTipoVereda('mediana'),
    getArbolesPorTipoVereda('ancha'),
  ])

  return (
    <main className="container mx-auto px-4 py-6">
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <span className="text-success mb-4 inline-block">
              <IconTree stroke={1.5} size={72} />
            </span>
            <h1 className="text-3xl font-bold md:text-5xl">Arbolado Urbano</h1>
            <p className="mt-4 text-base leading-relaxed md:text-lg">
              La Municipalidad de San Benito promueve el desarrollo de un arbolado urbano
              planificado, seguro y sustentable. La correcta elección de especies es fundamental
              para garantizar una buena convivencia entre los árboles, la infraestructura urbana y
              los vecinos.
            </p>
            <p className="mt-3 text-base leading-relaxed md:text-lg">
              A continuación, se presentan las recomendaciones según el ancho de vereda y las
              especies permitidas y no permitidas.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="flex items-center justify-center gap-3 text-center text-2xl font-semibold md:text-3xl">
            <IconLeaf className="text-success" size={32} />
            <span>Clasificación según el tipo de vereda</span>
          </h2>
          <p className="mt-3 text-center text-base leading-relaxed">
            Elegir la especie adecuada al ancho de la vereda permite que el árbol se desarrolle
            sanamente y que la infraestructura urbana no resulte afectada.
          </p>
        </div>

        <SeccionVereda
          titulo="Veredas angostas"
          ancho="menos de 2,5 m"
          altura="hasta 6 m"
          acentoClass="text-info"
          descripcion="En estos espacios se recomienda la plantación de árboles pequeños, que no superen los 6 metros de altura y tengan copas reducidas."
          idealPara={['Zonas con cableado aéreo', 'Espacios reducidos']}
          especies={especiesAngosta}
        />

        <SeccionVereda
          titulo="Veredas medianas"
          ancho="entre 2,5 y 4,5 m"
          altura="entre 6 y 12 m"
          acentoClass="text-primary"
          descripcion="Para estas veredas se recomiendan árboles medianos, con alturas de entre 6 y 12 metros."
          idealPara={['Veredas más amplias', 'Plazas, parques y bulevares']}
          especies={especiesMediana}
        />

        <SeccionVereda
          titulo="Veredas anchas"
          ancho="más de 4,5 m"
          altura="más de 12 m"
          acentoClass="text-success"
          descripcion="En estos casos se pueden plantar árboles grandes, que superan los 12 metros de altura y desarrollan copas amplias. Brindan gran sombra y valor paisajístico, pero requieren suficiente espacio para su desarrollo."
          idealPara={['Avenidas', 'Espacios verdes amplios']}
          especies={especiesAncha}
        />

        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="flex items-center justify-center gap-3 text-center text-2xl font-semibold md:text-3xl">
            <IconAlertTriangle className="text-error" size={32} />
            <span>Especies no permitidas</span>
          </h2>
          <p className="mt-4 text-center text-base leading-relaxed">
            Con el objetivo de evitar daños en veredas, cañerías, infraestructura y problemas
            ambientales, existen especies que no deben ser plantadas en el arbolado urbano. Pueden
            resultar invasivas, generar inconvenientes estructurales o afectar el entorno urbano.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {especiesNoPermitidas.map((especie) => (
              <div
                key={especie}
                className="border-error/40 bg-error/10 flex items-center gap-2 rounded-lg border p-3 shadow-sm"
              >
                <IconX className="text-error shrink-0" size={20} />
                <span className="font-medium">{especie}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="flex items-center justify-center gap-3 text-center text-2xl font-semibold md:text-3xl">
            <IconInfoCircle className="text-primary" size={32} />
            <span>Recomendaciones generales</span>
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              'Elegir siempre la especie adecuada según el ancho de vereda.',
              'Consultar con el área municipal antes de plantar.',
              'Evitar especies no autorizadas.',
              'Realizar podas de formación cuando sea necesario.',
            ].map((texto) => (
              <div
                key={texto}
                className="card bg-base-200 shadow-md transition-transform duration-300 hover:scale-[1.02]"
              >
                <div className="card-body flex-row items-center gap-3 p-4">
                  <IconCheck className="text-success shrink-0" size={24} />
                  <p className="text-base leading-relaxed">{texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <div className="alert alert-success shadow-lg">
            <IconHeartHandshake size={32} className="shrink-0" />
            <div>
              <h3 className="text-lg font-bold">Compromiso con el ambiente</h3>
              <p className="text-sm leading-relaxed">
                El arbolado urbano es un patrimonio de todos. Su cuidado y correcta planificación
                contribuyen a mejorar la calidad de vida, reducir el impacto ambiental y embellecer
                nuestra ciudad.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
