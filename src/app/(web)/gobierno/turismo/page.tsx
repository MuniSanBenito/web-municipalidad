import { generateMetadata as generateSEOMetadata } from '@/web/lib/metadata'
import {
  IconBook,
  IconBuildingCommunity,
  IconCalendar,
  IconFlag,
  IconHeart,
  IconInfoCircle,
  IconMapPin,
  IconTree,
  IconUsers,
} from '@tabler/icons-react'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Turismo',
  description:
    'Descubrí los lugares históricos y culturales de San Benito. Un recorrido por la Iglesia San Benito Abad, el Parque Vieytes, el Museo Histórico y las tradiciones de la ciudad.',
  keywords: [
    'turismo san benito',
    'iglesia san benito abad',
    'parque vieytes',
    'museo histórico',
    'lugares turísticos entre ríos',
    'historia san benito',
    'inmigrantes friulanos',
    'colonia brugo',
    'fiesta patronal san benito',
  ],
  url: '/gobierno/turismo',
})

const STATS = [
  { value: '1879', label: 'Año de fundación' },
  { value: '~25.000', label: 'Habitantes' },
  { value: '12 km', label: 'De Paraná capital' },
  { value: '1888', label: 'Iglesia fundada' },
]

const PUNTOS_DE_INTERES = [
  {
    title: 'Iglesia San Benito Abad',
    icon: IconBuildingCommunity,
    badge: 'Patrimonio histórico',
    description:
      'El corazón espiritual de la ciudad, construida en menos de cuatro meses en 1888. Sus paredes originales siguen en pie como testigos de la fe de los primeros colonos.',
    moreInfo:
      'El terreno fue donado por don Juan Bautista Solaro en 1887. La piedra fundamental se bendijo el 25 de noviembre del mismo año. El 20 de marzo de 1888 el Obispado de Paraná autorizó su inauguración. En años posteriores se fue refaccionando y ampliando, pero la base de las paredes de la nave central y los altares laterales son los originales de 1888.',
  },
  {
    title: 'Parque Vieytes',
    icon: IconTree,
    badge: 'Espacio verde',
    description:
      'El corazón verde de la ciudad. Áreas verdes, senderos y juegos lo convierten en el punto de encuentro favorito de familias y vecinos.',
    moreInfo:
      'Espacio de recreación y encuentro para toda la familia durante todo el año. Ideal para picnics, caminatas y actividades al aire libre. Un lugar de descanso y conexión con la naturaleza en plena zona urbana.',
  },
  {
    title: 'Cementerio Parroquial',
    icon: IconBuildingCommunity,
    badge: 'Visita guiada',
    description:
      'Un recorrido histórico entre las tumbas de los primeros colonos fundadores de la ciudad y sus familias.',
    moreInfo:
      'Las visitas guiadas al cementerio parroquial permiten descubrir la historia de las familias inmigrantes que fundaron San Benito. Epitafios en italiano, esloveno y alemán son testimonio de la diversidad cultural que dio vida a la ciudad. Un lugar de memoria y respeto que conecta a los visitantes con los orígenes de la comunidad.',
  },
  {
    title: 'Batalla del Saucesito',
    icon: IconFlag,
    badge: 'Historia y patrimonio',
    description:
      'Visitá la zona donde se libró la Batalla del Saucesito, uno de los hechos históricos más relevantes de la región entrerriana.',
    moreInfo:
      'La Batalla del Saucesito fue un enfrentamiento militar de gran importancia para la historia de Entre Ríos. Las visitas guiadas al lugar recorren el terreno original donde se desarrollaron los combates, con relatos históricos que reviven los hechos y el contexto político de la época.',
  },
  {
    title: 'Batalla de Las Tunas',
    icon: IconFlag,
    badge: 'Historia y patrimonio',
    description:
      'Visitá la zona donde se desarrolló la Batalla de Las Tunas, otro de los hechos históricos destacados de la región entrerriana.',
    moreInfo:
      'La Batalla de Las Tunas es un acontecimiento histórico relevante para Entre Ríos. Las visitas guiadas al área permiten recorrer el escenario original de los combates, acompañadas de relatos que contextualizan los hechos en el marco político y militar de la época. Un destino imprescindible para los apasionados por la historia regional.',
  },
]

const ORIGEN_INMIGRANTES = [
  {
    origen: 'Friuli (Italia)',
    icon: IconFlag,
    descripcion:
      'La mayoría de los colonos fundadores provenían de la región del Friuli, aportando su cultura, idioma y costumbres.',
  },
  {
    origen: 'Eslovenia',
    icon: IconUsers,
    descripcion:
      'Un importante grupo de inmigrantes eslovenos se asentó en la colonia, enriqueciendo la diversidad cultural de San Benito.',
  },
  {
    origen: 'Austria',
    icon: IconHeart,
    descripcion:
      'Colonos de origen austríaco completaron el mosaico cultural que dio identidad a la ciudad.',
  },
]

export default function PageTurismo() {
  return (
    <main className="container mx-auto space-y-12 px-4 py-6">
      {/* Hero */}
      <section
        className="relative overflow-hidden rounded-2xl shadow-xl"
        style={{ minHeight: '480px' }}
      >
        <Image
          src="/images/DJI_0046.webp"
          alt="Vista aérea de San Benito"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-10 text-center">
          <IconMapPin className="mb-3 text-white drop-shadow" size={44} stroke={1.5} />
          <h1 className="text-4xl font-bold text-white drop-shadow-lg md:text-6xl">
            Turismo en San Benito
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/90 drop-shadow md:text-lg">
            Descubrí una ciudad camino a los 150 años de historia, tradición inmigrante y lugares
            únicos que contar.
          </p>
          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-white/15 px-4 py-3 text-center backdrop-blur-sm"
              >
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="mt-0.5 text-xs text-white/75">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Origen e identidad */}
      <section>
        <div className="mb-6 flex items-center gap-3">
          <IconUsers className="text-primary shrink-0" size={32} stroke={1.5} />
          <h2 className="text-2xl font-semibold md:text-3xl">Raíces inmigrantes</h2>
        </div>
        <p className="mb-6 max-w-3xl text-base leading-relaxed md:text-lg">
          San Benito nació en 1879 cuando un contingente de inmigrantes europeos se estableció en lo
          que entonces se conocía como <strong>Colonia 3 de Febrero</strong>. Su identidad es
          inseparable del esfuerzo y la cultura de esas familias que cruzaron el océano para
          construir una nueva vida.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {ORIGEN_INMIGRANTES.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.origen}
                className="bg-base-100 border-primary rounded-xl border-t-4 p-5 shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex items-center gap-3">
                  <Icon className="text-primary shrink-0" size={28} stroke={1.5} />
                  <h3 className="text-lg font-semibold">{item.origen}</h3>
                </div>
                <p className="text-sm leading-relaxed">{item.descripcion}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Historia de la Iglesia */}
      <section>
        <div className="bg-base-100 overflow-hidden rounded-2xl shadow-md">
          <div className="bg-primary/10 border-primary/20 border-b px-6 py-4 md:px-10">
            <div className="flex items-center gap-3">
              <IconBuildingCommunity className="text-primary shrink-0" size={32} stroke={1.5} />
              <h2 className="text-2xl font-semibold md:text-3xl">La Iglesia de San Benito Abad</h2>
            </div>
          </div>
          <div className="px-6 py-6 md:px-10 md:py-8">
            <div className="space-y-4 text-base leading-relaxed md:text-lg">
              <p>
                La iglesia de San Benito Abad, testigo de la fe y el sacrificio de quienes nos
                precedieron, se comenzó a construir sobre el terreno donado por{' '}
                <strong>don Juan Bautista Solaro</strong> en 1887. El 5 de noviembre del mismo año
                fue designado capellán de la Colonia Brugo el <strong>Pbro. Benito Garabaso</strong>
                , cuya iniciativa fue trascendental para llevar adelante el proyecto.
              </p>
              <p>
                El 25 de noviembre se colocaba y bendecía la piedra fundamental. En menos de cuatro
                meses — un plazo excepcionalmente rápido para la época —, la obra estaba terminada.
                El <strong>20 de marzo de 1888</strong> el Obispado de Paraná autorizó la
                inauguración y bendición de la Iglesia.
              </p>
              <p>
                En años posteriores se fue refaccionando, reforzando y ampliando el edificio, pero
                la base de las paredes de la nave del altar mayor hasta los altares laterales son
                las mismas de aquella primera construcción.
              </p>
            </div>

            {/* Timeline */}
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold">Línea de tiempo</h3>
              <ol className="border-primary/30 relative ml-3 space-y-6 border-l-2">
                {[
                  {
                    year: '1887',
                    text: 'Donación del terreno por Juan Bautista Solaro. El Pbro. Benito Garabaso es designado capellán.',
                  },
                  {
                    year: 'Nov 1887',
                    text: 'Se coloca y bendice la piedra fundamental de la Iglesia.',
                  },
                  {
                    year: 'Mar 1888',
                    text: 'El Obispado de Paraná autoriza la inauguración. La obra se completó en menos de cuatro meses.',
                  },
                  {
                    year: 'Hoy',
                    text: 'Las paredes originales de la nave central aún se conservan como patrimonio histórico de la ciudad.',
                  },
                ].map((item) => (
                  <li key={item.year} className="ml-6">
                    <span className="bg-primary absolute -left-[9px] flex h-4 w-4 items-center justify-center rounded-full" />
                    <p className="text-primary text-sm font-bold">{item.year}</p>
                    <p className="mt-1 text-sm leading-relaxed">{item.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border-primary bg-base-200 mt-8 rounded-xl border-l-4 p-4">
              <p className="text-base italic md:text-lg">
                &quot;Este edificio es símbolo de fe y un hito en la urbanización de San
                Benito.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Puntos de interés */}
      <section>
        <div className="mb-6 flex items-center gap-3">
          <IconBook className="text-primary shrink-0" size={32} stroke={1.5} />
          <h2 className="text-2xl font-semibold md:text-3xl">Puntos icónicos de San Benito</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PUNTOS_DE_INTERES.map((punto) => {
            const Icon = punto.icon
            return (
              <div
                key={punto.title}
                className="card bg-base-100 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="card-body">
                  <div className="bg-primary/10 mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl">
                    <Icon className="text-primary" size={36} stroke={1.5} />
                  </div>
                  <div className="badge badge-primary badge-outline mx-auto text-xs">
                    {punto.badge}
                  </div>
                  <h3 className="card-title mt-1 justify-center text-center">{punto.title}</h3>
                  <p className="text-center text-sm leading-relaxed">{punto.description}</p>

                  <div className="collapse-arrow bg-base-200 collapse mt-4 rounded-xl">
                    <input type="checkbox" />
                    <div className="collapse-title text-sm font-medium">Más información</div>
                    <div className="collapse-content">
                      <p className="pt-1 text-sm leading-relaxed">{punto.moreInfo}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Eventos destacados */}
      <section>
        <div className="mb-6 flex items-center gap-3">
          <IconCalendar className="text-primary shrink-0" size={32} stroke={1.5} />
          <h2 className="text-2xl font-semibold md:text-3xl">Eventos destacados</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Fiesta Patronal */}
          <div className="bg-base-100 rounded-2xl p-6 shadow-md">
            <div className="badge badge-primary mb-3">Tradición religiosa</div>
            <h3 className="mb-3 text-xl font-semibold">Fiesta Patronal — San Benito Abad</h3>
            <p className="mb-4 text-sm leading-relaxed">
              Cada año, alrededor del <strong>21 de marzo</strong>, San Benito celebra a su santo
              patrono. La fiesta reúne a vecinos y visitantes en torno a la Iglesia con misas,
              procesiones y actividades culturales que mantienen vivas las tradiciones de los
              colonos fundadores.
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-base-200 rounded-xl p-3 text-center">
                <p className="text-primary text-sm font-bold">21 de marzo</p>
                <p className="mt-0.5 text-xs">Día del patrono</p>
              </div>
              <div className="bg-base-200 rounded-xl p-3 text-center">
                <p className="text-primary text-sm font-bold">Misa solemne</p>
                <p className="mt-0.5 text-xs">Iglesia central</p>
              </div>
              <div className="bg-base-200 rounded-xl p-3 text-center">
                <p className="text-primary text-sm font-bold">Procesión</p>
                <p className="mt-0.5 text-xs">Por la ciudad</p>
              </div>
            </div>
          </div>

          {/* Fiesta del Gaucho */}
          <div className="bg-base-100 rounded-2xl p-6 shadow-md">
            <div className="badge badge-secondary mb-3">Tradición gaucha</div>
            <h3 className="mb-3 text-xl font-semibold">Fiesta del Gaucho</h3>
            <p className="mb-4 text-sm leading-relaxed">
              Uno de los eventos más convocantes de San Benito. La Fiesta del Gaucho reúne a
              jinetes, payadores y amantes de las tradiciones criollas en una jornada que celebra la
              identidad gaucha de Entre Ríos con desfiles, asados y música folclórica.
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-base-200 rounded-xl p-3 text-center">
                <p className="text-secondary text-sm font-bold">Jinetes</p>
                <p className="mt-0.5 text-xs">Desfile criollo</p>
              </div>
              <div className="bg-base-200 rounded-xl p-3 text-center">
                <p className="text-secondary text-sm font-bold">Doma</p>
                <p className="mt-0.5 text-xs">Tradición criolla</p>
              </div>
              <div className="bg-base-200 rounded-xl p-3 text-center">
                <p className="text-secondary text-sm font-bold">Folclore</p>
                <p className="mt-0.5 text-xs">Música y payada</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo llegar */}
      <section>
        <div className="bg-base-100 rounded-2xl p-6 shadow-md md:p-8">
          <div className="mb-4 flex items-center gap-3">
            <IconInfoCircle className="text-primary shrink-0" size={32} stroke={1.5} />
            <h2 className="text-2xl font-semibold md:text-3xl">Información para el visitante</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <IconMapPin className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <p className="font-semibold">Ubicación</p>
                  <p className="text-sm">
                    12 km del centro de Paraná, capital de Entre Ríos. Acceso por ruta provincial
                    11.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <IconCalendar className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <p className="font-semibold">Mejor época para visitar</p>
                  <p className="text-sm">
                    Todo el año. La primavera es ideal por el clima y las festividades de marzo.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <IconTree className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <p className="font-semibold">Actividades al aire libre</p>
                  <p className="text-sm">
                    Recorridas históricas, visitas guiadas a la iglesia, paseos por el Parque
                    Vieytes.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <IconHeart className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <p className="font-semibold">Municipalidad de San Benito</p>
                  <p className="text-sm">Blvd. Basavilbaso 1094 — Tel: (0343) 4973454</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
