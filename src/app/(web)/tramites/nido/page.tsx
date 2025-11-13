import {
  IconBriefcase,
  IconBuildingStore,
  IconCalendar,
  IconClock,
  IconDoor,
  IconGuitarPick,
  IconHeartHandshake,
  IconInfoCircle,
  IconMusic,
  IconPresentationAnalytics,
  IconSchool,
  IconUsers,
} from '@tabler/icons-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NIDO - Núcleo de Innovación y Desarrollo de Oportunidades - San Benito',
}

const talleres = [
  {
    nombre: 'Apoyo Escolar Primario',
    icon: IconSchool,
    descripcion: 'Con derivación de las escuelas donde concurren',
    horarios: [
      'Matutino: Lunes, Miércoles y Jueves de 9 a 10:15 hs',
      'Vespertino: Lunes, Miércoles y Viernes de 17 a 18:15 hs',
    ],
    color: 'text-primary',
  },
  {
    nombre: 'Taller de Guitarra',
    icon: IconGuitarPick,
    horarios: ['Lunes, Jueves y Viernes de 16:45 a 19:15 hs'],
    color: 'text-secondary',
  },
  {
    nombre: 'Taller de Folclore',
    icon: IconMusic,
    horarios: ['Martes y Jueves de 18 a 20:30 hs'],
    color: 'text-accent',
  },
  {
    nombre: 'Taller de Danzas Típicas',
    icon: IconMusic,
    horarios: ['Lunes de 18 a 20 hs'],
    color: 'text-primary',
  },
  {
    nombre: 'Vení a Bailar',
    icon: IconHeartHandshake,
    descripcion: 'Salud Mental en Movimiento - Ministerio de Salud E.R.',
    horarios: ['Lunes de 16 a 17 hs'],
    color: 'text-success',
  },
  {
    nombre: 'Banda de Música Municipal',
    icon: IconMusic,
    horarios: ['Miércoles de 18 a 20:40 hs'],
    color: 'text-warning',
  },
  {
    nombre: 'Taller de Tango',
    icon: IconMusic,
    horarios: ['Sábados de 16 a 18 hs'],
    color: 'text-error',
  },
]

export default function PageNido() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="hero bg-base-200 rounded-xl p-6 text-center shadow-lg transition-all duration-300 hover:shadow-xl md:p-12">
        <div className="hero-content">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-3xl font-bold md:text-5xl">
              NIDO - Núcleo de Innovación y Desarrollo de Oportunidades
            </h1>
            <div className="bg-primary mx-auto mt-4 h-1 w-24 rounded-full"></div>
            <p className="text-base-content mt-6 text-base leading-relaxed transition-colors duration-300 md:text-lg">
              Un espacio comunitario destinado a promover la inclusión social y el desarrollo de las
              personas, a través de capacitaciones, talleres, emprendimientos y el empleo. Ofrecemos
              infraestructura, conocimientos y apoyo para que la comunidad local pueda encontrar
              nuevas oportunidades y mejorar su calidad de vida.
            </p>
          </div>
        </div>
      </section>

      {/* Talleres y Actividades */}
      <section className="mt-12">
        <h2 className="mb-2 text-center text-3xl font-bold">Talleres y Actividades</h2>
        <p className="text-base-content mb-8 text-center">
          Los cupos para los diferentes talleres se consultan en los días y horarios que funcionan.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {talleres.map((taller, index) => (
            <div
              key={index}
              className="card bg-base-200 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="card-body">
                <h3 className={`card-title ${taller.color}`}>
                  <taller.icon size={28} />
                  {taller.nombre}
                </h3>
                {taller.descripcion && (
                  <p className="text-base-content text-sm italic">{taller.descripcion}</p>
                )}
                <div className="mt-4 space-y-2">
                  {taller.horarios.map((horario, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <IconClock size={18} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-base-content text-sm">{horario}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Escuela de Emprendedores */}
      <section className="mt-12">
        <div className="card bg-gradient-to-br from-primary/10 to-secondary/10 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl md:text-3xl">
              <IconPresentationAnalytics size={32} className="text-primary" />
              Escuela de Emprendedores
            </h2>
            <p className="text-base-content mt-4 leading-relaxed">
              Una guía para todos aquellos que quieran emprender un negocio, centralizada en el
              desarrollo de habilidades para crear y gestionar sus propios proyectos en el contexto
              local. Brindamos capacitaciones que les permitan identificar oportunidades, desarrollar
              soluciones innovadoras y contribuir a la economía local.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de Servicios */}
      <section className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Oficinas a Puertas Abiertas */}
        <div className="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
          <div className="card-body">
            <h3 className="card-title text-xl">
              <IconDoor size={28} className="text-primary" />
              Oficinas a Puertas Abiertas
            </h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-2">
                <IconCalendar size={20} className="text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-base-content">Lunes a Viernes</span>
              </div>
              <div className="flex items-start gap-2">
                <IconClock size={20} className="text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-base-content">Mañana: 7 a 13 hs</p>
                  <p className="text-base-content">Tarde: 15 a 19 hs</p>
                </div>
              </div>
              <div className="divider my-2"></div>
              <p className="text-base-content text-sm">
                Se reciben todo tipo de consultas o reclamos en relación a las actividades que se
                brindan, como también de otras áreas del municipio donde se hará llegar su solicitud.
              </p>
            </div>
          </div>
        </div>

        {/* Producción y Empleo */}
        <div className="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
          <div className="card-body">
            <h3 className="card-title text-xl">
              <IconBriefcase size={28} className="text-primary" />
              Producción y Empleo
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2">
                <IconBuildingStore size={20} className="text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-base-content">Organización y cronogramas de Ferias</span>
              </li>
              <li className="flex items-start gap-2">
                <IconUsers size={20} className="text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-base-content">Atención a Feriantes Emprendedores</span>
              </li>
              <li className="flex items-start gap-2">
                <IconInfoCircle size={20} className="text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-base-content">Información General</span>
              </li>
              <li className="flex items-start gap-2">
                <IconSchool size={20} className="text-secondary mt-0.5 flex-shrink-0" />
                <div className="text-base-content text-sm">
                  Inscripciones a las Actividades Deportivas, Colonias de Vacaciones, Jardines
                  Municipales
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Infraestructura */}
      <section className="mt-12">
        <div className="card bg-base-100 border-primary border-2 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl md:text-3xl">
              <IconBuildingStore size={32} className="text-primary" />
              Infraestructura Destacada
            </h2>
            <div className="divider"></div>
            <div className="space-y-4">
              <p className="text-base-content leading-relaxed">
                Contamos con un <strong>SUM (Salón de Usos Múltiples)</strong> con capacidad para
                ochenta personas cómodamente sentadas y un proyector a disposición.
              </p>
              <div className="alert alert-info shadow-lg">
                <IconInfoCircle size={24} />
                <div>
                  <h3 className="font-bold">Servicio de Préstamo</h3>
                  <div className="text-sm">
                    El SUM y el proyector están disponibles para instituciones locales para
                    conversatorios, reuniones gubernamentales y otros servicios a la comunidad y
                    emprendedores. <strong>(Previa disponibilidad)</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="mt-12">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body items-center text-center">
            <h3 className="card-title text-2xl">Coordinador</h3>
            <div className="divider my-2"></div>
            <p className="text-base-content text-lg">
              <strong>Jorge Buffa</strong>
            </p>
            <p className="text-base-content mt-4 text-sm">
              Para más información sobre los talleres, servicios y disponibilidad del SUM, comunicate
              durante los horarios de oficina.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
