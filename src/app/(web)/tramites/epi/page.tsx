import {
  IconBuildingCommunity,
  IconMapPin,
  IconMoon,
  IconPhone,
  IconSunHigh,
} from '@tabler/icons-react'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Área de Primera Infancia - San Benito',
  description:
    'Espacios de Primera Infancia de la Municipalidad de San Benito. Jardines maternales con atención integral para bebés y niños en edad inicial.',
}

const jardines = [
  {
    id: 'maripositas-1',
    nombre: 'Maripositas I',
    barrio: 'Zona Centro',
    direccion: '25 de Mayo 1177',
    turnos: [
      { nombre: 'Mañana', telefono: '3435187971' },
      { nombre: 'Tarde', telefono: '3435187970' },
    ],
    imagenes: [{ src: '/images/epi/Maripositas1.webp', alt: 'Jardín Maripositas I' }],
  },
  {
    id: 'maripositas-2',
    nombre: 'Maripositas II',
    barrio: 'B° San Martín',
    direccion: 'Basavilbaso 1030',
    turnos: [
      { nombre: 'Mañana', telefono: '3435255527' },
      { nombre: 'Tarde', telefono: '3435238766' },
    ],
    imagenes: [
      { src: '/images/epi/Maripositas2a.webp', alt: 'Jardín Maripositas II - vista 1' },
      { src: '/images/epi/Maripositas2b.webp', alt: 'Jardín Maripositas II - vista 2' },
    ],
  },
  {
    id: 'maripositas-4',
    nombre: 'Maripositas IV',
    barrio: 'B° Las Tunas',
    direccion: 'Concordia 1136',
    turnos: [{ nombre: 'Mañana', telefono: '3434472539' }],
    imagenes: [{ src: '/images/epi/Maripositas4.webp', alt: 'Jardín Maripositas IV' }],
  },
  {
    id: 'rinconcito',
    nombre: 'Rinconcito de Sueños',
    barrio: 'B° San Pedro',
    direccion: 'Sarmiento 2623',
    turnos: [{ nombre: 'Mañana', telefono: '3435238766' }],
    imagenes: [
      {
        src: '/images/epi/Rinconcitodesue%C3%B1os.webp',
        alt: 'Jardín Rinconcito de Sueños',
      },
    ],
  },
]

const carouselSlides = jardines.flatMap((j) =>
  j.imagenes.map((img) => ({ ...img, jardinNombre: j.nombre })),
)

export default function PageEPI() {
  return (
    <main className="container mx-auto px-4 py-6">
      {/* Hero */}
      <section className="hero bg-base-200 mb-8 overflow-hidden rounded-2xl shadow-lg">
        <div className="hero-content flex-col gap-6 py-10 md:flex-row md:gap-12 md:py-16">
          <div className="flex shrink-0 justify-center">
            <Image
              src="/images/epi/portada-epi.jpeg"
              alt="Área de Primera Infancia - San Benito"
              width={260}
              height={260}
              className="rounded-xl object-contain drop-shadow-md"
              priority
            />
          </div>
          <div className="max-w-xl text-center md:text-left">
            <h1 className="text-3xl font-bold md:text-5xl">Área de Primera Infancia</h1>
            <div className="bg-primary mx-auto mt-4 h-1 w-24 rounded-full md:mx-0"></div>
            <p className="text-base-content mt-6 text-lg leading-relaxed">
              Los Espacios de Primera Infancia de la Municipalidad de San Benito brindan
              cuidado, acompañamiento y desarrollo integral para niños y niñas en edad inicial,
              promoviendo un entorno seguro, afectivo y estimulante en cada barrio de la ciudad.
            </p>
          </div>
        </div>
      </section>

      {/* Sobre los EPI */}
      <section className="mb-10">
        <div className="card bg-base-100 shadow-md transition-all duration-300 hover:shadow-lg">
          <div className="card-body">
            <h2 className="text-primary card-title text-2xl">Sobre nuestros Espacios de Primera Infancia</h2>
            <p className="text-base-content mt-4 leading-relaxed">
              La Municipalidad de San Benito cuenta con cuatro (4) Espacios de Primera Infancia (EPI) a su cargo,
              dos de ellos funcionando doble turno, turno mañana y turno tarde, con salas multiedad de 2 (dos) y
              3 (tres) años de edad. Estos se encuentran distribuidos en diferentes puntos estratégicos de la
              ciudad con la intención de cubrir la mayor cantidad de demanda existente al respecto. Estos
              comenzaron funcionando como Jardines Maternales Municipales con una función netamente asistencial
              para cubrir las necesidades de las familias, principalmente de trabajadores/as del Municipio. Con el
              paso del tiempo, la incorporación de nuevos equipos de trabajo y la adquisición de planes destinados
              a mejorar las condiciones de estos, el foco de atención se dirigió a la primera infancia ocupándose
              de ofrecer un espacio propicio que garantice los derechos de los niños/as a través de propuestas
              integrales que incluyen estimulación, contención afectiva, alimentación nutritiva, acompañamiento
              interinstitucional, entre otros.
            </p>
          </div>
        </div>
      </section>

      {/* Jardines Cards */}
      <section className="mb-10">
        <h2 className="text-primary mb-6 text-center text-2xl font-bold">Espacios de Primera Infancia Municipales</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {jardines.map((jardin) => (
            <div
              key={jardin.id}
              className="card bg-base-100 shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <div className="card-body gap-3">
                <h3 className="card-title text-primary text-xl">{jardin.nombre}</h3>
                <div className="flex items-start gap-2">
                  <IconMapPin size={16} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-base-content text-sm">
                    <span className="font-medium">{jardin.barrio}</span> — {jardin.direccion}
                  </span>
                </div>
                <div className="divider my-0" />
                <div className="space-y-2">
                  {jardin.turnos.map((turno, i) => (
                    <div key={i} className="flex flex-wrap items-center gap-2">
                      {turno.nombre === 'Tarde' ? (
                        <IconMoon size={15} className="text-secondary shrink-0" />
                      ) : (
                        <IconSunHigh size={15} className="text-warning shrink-0" />
                      )}
                      <span className="text-base-content text-sm font-medium">
                        Turno {turno.nombre}:
                      </span>
                      <a
                        href={`https://wa.me/+54${turno.telefono}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary text-base-content flex items-center gap-1 text-sm transition-colors duration-200"
                      >
                        <IconPhone size={13} className="shrink-0" />
                        {turno.telefono}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Galería */}
      <section className="mb-10">
        <h2 className="text-primary mb-6 text-center text-2xl font-bold">Galería de Fotos de los Jardines</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {carouselSlides.map((slide, i) => (
            <div
              key={i}
              className="group card bg-base-100 overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-3 left-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="rounded-full bg-black/40 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm">
                    {slide.jardinNombre}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Coordinación */}
      <section>
        <div className="bg-base-200 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <IconBuildingCommunity size={26} className="text-primary" />
            <h2 className="text-primary text-xl font-semibold">
              Coordinación y Equipo Técnico de Primera Infancia
            </h2>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <IconMapPin size={18} className="text-primary shrink-0" />
            <p className="text-base-content">Edificio Municipal — Basavilbaso 1094</p>
          </div>
        </div>
      </section>
    </main>
  )
}
