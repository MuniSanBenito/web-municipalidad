import {
  IconAlertTriangle,
  IconBrandWhatsapp,
  IconCalendar,
  IconExternalLink,
  IconGuitarPick,
  IconLocation,
  IconMan,
  IconMicrophone2,
  IconMusic,
  IconPiano,
  IconShoe,
  IconUsers,
} from '@tabler/icons-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Talleres Culturales Municipales - San Benito',
}

const talleres = [
  // Sede NIDO
  {
    title: 'Guitarra',
    icon: IconGuitarPick,
    description:
      'Convocatoria para niños desde 9 años, jóvenes y adultos, con o sin conocimientos. La profe confirmará tu horario según tu nivel (principiante o avanzado).',
    schedule: 'Lunes y Martes (17:00 a 19:30), Jueves (17:00 a 20:30) o Viernes (16:30 a 20:00)',
    location: 'NIDO - Calle Buenos Aires y Misiones',
  },
  {
    title: 'Danzas Inmigrantes',
    icon: IconUsers,
    description: 'Convocatoria para niños desde 9 años, jóvenes y adultos.',
    schedule: 'Lunes de 18:30 a 20:00 hs.',
    location: 'NIDO - Calle Buenos Aires y Misiones',
  },
  {
    title: 'Banda de Música Municipal',
    icon: IconMusic,
    description:
      'Convocatoria para niños desde 9 años y jóvenes, con o sin conocimiento musical. Espacios disponibles: flauta, clarinete, saxo, trompeta, batería y percusión.',
    schedule: 'Miércoles de 18:00 a 20:30 y Sábados de 10:00 a 12:00 hs.',
    location: 'NIDO - Calle Buenos Aires y Misiones',
  },
  {
    title: 'Tango',
    icon: IconMan,
    description: 'Convocatoria para adultos mayores de 18 años.',
    schedule: 'Sábados de 18:00 a 19:30 hs.',
    location: 'NIDO - Calle Buenos Aires y Misiones',
  },
  {
    title: 'Danzas Tradicionales',
    icon: IconShoe,
    description: 'Convocatoria para niños desde 9 años en adelante.',
    schedule: 'Martes y Jueves de 17:00 a 21:00 hs.',
    location: 'NIDO - Calle Buenos Aires y Misiones',
  },
  // Sede CIC
  {
    title: 'Teatro',
    icon: IconUsers,
    description: 'Convocatoria para mayores de 16 años.',
    schedule: 'Miércoles de 18:30 a 20:00 hs.',
    location: 'CIC - Calle Garay y Nogoya',
  },
  {
    title: 'Coro Municipal',
    icon: IconMicrophone2,
    description: 'Convocatoria para jóvenes desde 16 años y adultos.',
    schedule: 'Viernes de 19:30 a 21:30 hs.',
    location: 'CIC - Calle Garay y Nogoya',
  },
  // Sede Biblioteca Municipal
  {
    title: 'Piano',
    icon: IconPiano,
    description: 'Convocatoria para niños desde 9 años en adelante.',
    schedule: 'Martes de 16:30 a 21:30 y Viernes de 16:30 a 20:30 hs.',
    location: 'Biblioteca Municipal - Av Friuli 1051',
  },
]

export default function PageTalleresCulturales() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="hero bg-base-200 rounded-xl p-6 text-center shadow-lg transition-all duration-300 hover:shadow-xl md:p-12">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">Talleres Culturales Municipales</h1>
            <div className="bg-primary mx-auto mt-4 h-1 w-24 rounded-full"></div>
            <p className="text-base-content mt-6 text-base leading-relaxed transition-colors duration-300 md:text-lg">
              ¡Inscribite al nuevo año de Talleres Artísticos y sumate a nuestros equipos
              culturales!
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {talleres.map((taller, index) => (
            <div
              key={index}
              className="card bg-base-200 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="card-body">
                <h2 className="card-title text-primary">
                  <taller.icon size={28} />
                  {taller.title}
                </h2>
                <p className="text-base-content mt-4 text-sm leading-relaxed">
                  {taller.description}
                </p>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <IconCalendar size={18} className="text-secondary" />
                    <span className="font-semibold">Horario:</span>
                    <span>{taller.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconLocation size={18} className="text-secondary" />
                    <span className="font-semibold">Lugar:</span>
                    <span>{taller.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="card bg-base-100 border-primary border p-6 text-center shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold">Inscripciones Abiertas</h2>
            <p className="mt-2">Asegurá tu lugar en nuestros talleres culturales.</p>
            <div className="card-actions mt-4 justify-center">
              <a
                href="https://forms.gle/YMu2AjBLckmdZoF79"
                className="btn btn-primary btn-lg gap-2 text-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Inscribite Aquí
                <IconExternalLink size={20} />
              </a>
            </div>
            <div className="alert alert-warning mt-6 shadow-lg">
              <IconAlertTriangle size={24} />
              <div>
                <h3 className="font-bold">¡Importante!</h3>
                <div className="text-xs">
                  Los cupos son limitados. Es requisito tener domicilio en San Benito.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
          <div className="card-body items-center text-center">
            <h3 className="card-title text-primary">¿Tenés alguna consulta?</h3>
            <p className="text-base-content">Comunícate directamente con nosotros.</p>
            <div className="card-actions mt-2">
              <a
                href="https://wa.me/5493434503200"
                className="btn btn-success text-success-content gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconBrandWhatsapp size={22} />
                Consultas por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
