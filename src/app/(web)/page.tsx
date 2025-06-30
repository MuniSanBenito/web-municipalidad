import type { Imagen, Noticia, Ubicacione } from '@/payload-types'
import type { Evento } from '@/types/evento'
import { EventCalendar } from '@/web/components/ui/EventCalendar'
import { basePayload } from '@/web/lib/payload'
import {
  IconBallFootball,
  IconBrandWhatsapp,
  IconBuilding,
  IconBuildingStore,
  IconCash,
  IconClipboardList,
  IconHeadset,
  IconLicense,
  IconMail,
  IconUserCircle,
  type Icon,
  type IconProps,
} from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'

const TRAMITES: {
  title: string
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>
  link: string
}[] = [
  {
    title: 'Licencia de Conducir',
    icon: IconLicense,
    link: '/tramites/licencia',
  },
  {
    title: 'Centro de Atención Al Vecino',
    icon: IconHeadset,
    link: '/tramites/cav',
  },
  {
    title: 'Habilitaciones Comerciales',
    icon: IconBuildingStore,
    link: '/tramites/habilitaciones',
  },
  {
    title: 'Obras Privadas',
    icon: IconBuilding,
    link: '/tramites/obras-privadas',
  },
  {
    title: 'Rentas',
    icon: IconCash,
    link: '/tramites/rentas',
  },
  {
    title: 'Actividades Deportivas',
    icon: IconBallFootball,
    link: '/tramites/actividades-deportivas',
  },
  {
    title: 'Mesa de Entrada',
    icon: IconClipboardList,
    link: '/tramites/mesa-de-entrada',
  },
  /* {
    title: 'Área Mujer y Género',
    icon: IconGenderFemale,
    link: '/tramites/area-mujer',
    description: 'Servicios y asistencia del área de mujer y género',
  },
  {
    title: 'Punto Digital - Biblioteca',
    icon: IconBook,
    link: '/tramites/punto-digital-biblioteca',
    description: 'Talleres y actividades en la Biblioteca Municipal',
  },
  {
    title: 'Talleres Culturales',
    icon: IconMusic,
    link: '/tramites/talleres-culturales',
    description: 'Información sobre talleres artísticos municipales',
  },
  {
    title: 'CIC Barrio San Pedro',
    icon: IconBuildingCommunity,
    link: '/tramites/cic-barrio-san-pedro',
    description: 'Actividades y talleres en el Centro Integrador Comunitario',
  },*/
  {
    title: 'Recursos Humanos',
    icon: IconUserCircle,
    link: 'http://181.228.27.231/personal/personal.aspx',
  },
]

function renderNoticia(noticia: Noticia, index: number, noticias: Noticia[]) {
  const portada = noticia.portada as Imagen

  return (
    <article
      key={noticia.id}
      className="carousel-item card flex w-full flex-col shadow-xl transition-all duration-300"
    >
      <div id={`noticia${index + 1}`} className="-z-50 h-32 w-full"></div>
      <div className="relative w-full">
        <div
          id="foto-texto"
          className="flex h-72 items-center justify-between overflow-hidden sm:h-80 lg:mx-5 lg:my-5 lg:h-96 2xl:justify-center"
        >
          <div id="foto" className="relative h-full w-full 2xl:w-[40%]">
            <Image
              alt={portada.alt}
              src={portada.url!}
              fill
              className="absolute inset-0 -z-20 object-contain"
              priority
            />
          </div>
          <div
            id="text"
            className="bg-base-100/80 hidden h-full w-full max-w-1/3 flex-col gap-3 px-5 py-4 md:flex"
          >
            <h3 className="text-xl font-extrabold">{noticia.titulo}</h3>
            <p className="line-clamp-none max-h-full overflow-hidden text-lg md:line-clamp-4 lg:line-clamp-6 xl:line-clamp-none">
              {noticia.descripcion}
            </p>
          </div>
        </div>
        {/* La misma imagen como fondo difuminado */}
        <div
          className="absolute inset-0 -z-30 bg-cover bg-center blur-sm"
          style={{ backgroundImage: `url('${portada.url}')` }}
        ></div>
        {/* Flechas */}
        <div className="absolute top-1/2 right-1 left-1 z-0 flex -translate-y-1/2 transform justify-between">
          <a
            href={`#noticia${index === 0 ? noticias.length : index}`}
            className="btn btn-square btn-soft btn-sm focus-visible:ring-primary rounded-xs focus-visible:ring-2"
          >
            ❮
          </a>
          <a
            href={`#noticia${index === noticias.length - 1 ? 1 : index + 2}`}
            className="btn btn-square btn-soft btn-sm focus-visible:ring-primary rounded-xs focus-visible:ring-2"
          >
            ❯
          </a>
        </div>
      </div>
      <div className="bg-base-100 flex flex-col gap-3 px-5 py-4 md:hidden">
        <h3 className="text-lg font-bold">{noticia.titulo}</h3>
        <p className="text-base-content/80">{noticia.descripcion}</p>
      </div>
    </article>
  )
}

export default async function Page() {
  const [noticias, eventosData] = await Promise.all([
    basePayload.find({
      collection: 'noticias',
      limit: 4,
      where: {
        _status: {
          equals: 'published',
        },
      },
    }),
    basePayload.find({
      collection: 'eventos',
      depth: 3,
    }),
  ])

  // Mapear los datos a los tipos correctos
  const eventos: Evento[] = eventosData.docs.map((evento) => {
    const ubicacion = evento.ubicacion as Ubicacione
    return {
      id: evento.id,
      nombre: evento.nombre || '',
      fecha: evento.fecha || new Date().toISOString(),
      ubicacion: {
        id: ubicacion?.id || '',
        nombre: ubicacion?.nombre || 'San Benito',
        geolocalizacion: ubicacion?.geolocalizacion,
      },
      descripcion: evento.descripcion || '',
      entradas: evento.entradas,
      organiza: evento.organiza,
      createdAt: evento.createdAt,
      updatedAt: evento.updatedAt,
      slug: evento.nombre?.toLowerCase().replace(/ /g, '-') || '',
    }
  })

  return (
    <main className="min-h-screen">
      {/* Alertas Importantes */}

      <div className="bg-yellow-100 px-4 py-3">
        <div className="container mx-auto flex items-center gap-2">
          <p className="font-medium text-yellow-700"></p>
        </div>
      </div>

      <div className="container mx-auto flex flex-col items-center justify-center">
        <div className="carousel carousel-center w-full">{noticias.docs.map(renderNoticia)}</div>
        <div className="hidden w-full justify-center gap-2 py-2 md:flex">
          {noticias.docs.map((noticia, i) => (
            <a key={noticia.id} href={`#noticia${i + 1}`} className="btn btn-xs">
              {i + 1}
            </a>
          ))}
        </div>
        <div className="my-6 flex w-full justify-center">
          <Link
            href="/noticias"
            className="btn btn-outline btn-primary focus-visible:ring-primary rounded-full px-6 py-2 shadow transition hover:scale-105 focus-visible:ring-2"
          >
            Ver más noticias
          </Link>
        </div>
        <section id="tramites" className="border-base-200 my-12 w-full border-t pt-12 text-center">
          <h2 className="mb-4 text-4xl font-bold">Trámites y Servicios</h2>
          <p className="text-base-content/80 mx-auto mb-10 max-w-2xl text-lg">
            Accedé a los principales servicios municipales de forma online.
          </p>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {TRAMITES.map((tramite) => (
              <Link
                key={tramite.link}
                href={tramite.link}
                className="card bg-base-100 hover:bg-base-200 border-base-200 focus-visible:ring-primary rounded-xl border shadow-lg transition-all duration-200 outline-none hover:scale-105 hover:shadow-2xl focus-visible:ring-2"
                aria-label={`Ir a ${tramite.title}`}
                tabIndex={0}
              >
                <article className="card-body items-center p-6 text-center">
                  <tramite.icon className="text-primary" stroke={1.3} size={48} />
                  <h3 className="card-title text-base-content/90 mt-3 text-base font-semibold">
                    {tramite.title}
                  </h3>
                </article>
              </Link>
            ))}
          </div>
        </section>
        {/* Quick Access Section */}
        {/* <QuickAccess /> */}

        {/* Event Calendar */}
        <EventCalendar events={eventos} highlightToday highlightNext />

        {/* Portal Tributario */}
        <section className="my-8 w-full bg-gradient-to-r from-primary to-base-100 text-primary-content">
          <div className="container mx-auto grid grid-cols-1 gap-8 px-6 py-12 md:grid-cols-2 lg:px-8">
            <div className="flex flex-col items-start justify-center text-left">
              <h3 className="mb-4 text-4xl font-bold text-primary-content">Portal Tributario</h3>
              <p className="mb-6 text-lg text-base-content">
                Consultá, imprimí y pagá tus tasas municipales de forma rápida y segura.
              </p>
              <Link
                href="http://181.228.27.231/ingresospublicos/ingresospublicos.aspx"
                className="btn btn-accent btn-lg gap-2"
              >
                Ir al Portal
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-base-100/80 flex flex-col items-center gap-5 rounded-xl p-8 shadow-lg">
                <div className="flex items-center gap-2">
                  {/* Icono WhatsApp Tabler */}
                  <IconBrandWhatsapp
                    size={18}
                    className="flex-shrink-0 text-accent"
                    stroke={1.5}
                  />
                  <span className="font-medium whitespace-nowrap text-base-content">WhatsApp Rentas:</span>
                  <a
                    href="https://wa.me/+543436127015"
                    target="_blank"
                    rel="noopener"
                    className="whitespace-nowrap underline hover:text-accent"
                  >
                    3436127015
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  {/* Icono Mail Tabler */}
                  <IconMail size={18} className="text-primary flex-shrink-0" stroke={1.5} />
                  <span className="font-medium whitespace-nowrap text-base-content">Correo Rentas:</span>
                  <a
                    href="mailto:rentas@munisanbenito.gov.ar"
                    className="hover:text-primary whitespace-nowrap underline"
                  >
                    rentas@munisanbenito.gov.ar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
