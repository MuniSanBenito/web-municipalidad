import {
  IconAlertTriangle,
  IconBallFootball,
  IconBallVolleyball,
  IconBrandWhatsapp,
  IconCalendar,
  IconDownload,
  IconExternalLink,
  IconGolf,
  IconLocation,
  IconSwimming,
  IconUsers,
} from '@tabler/icons-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Actividades Deportivas Municipales - San Benito',
}

const actividades = [
  {
    title: 'Golf Croquet Municipal',
    icon: IconGolf,
    age: 'A partir de 55 años',
    schedule: 'Lunes - 9:00 hs.',
    coaches: 'Guillermina Clausich - Ariadna Vince',
  },
  {
    title: 'Actividades Recreativas en Agua',
    icon: IconSwimming,
    age: 'A partir de 55 años',
    schedule: 'Martes y Jueves - 10:00 hs.',
    coaches: 'Guillermina Clausich y Solange Valin',
  },
  {
    title: 'Iniciación Deportiva',
    icon: IconBallFootball,
    age: 'De 3 a 7 años',
    schedule: 'Lunes y Miércoles - 10:15 hs.',
    coaches: 'Guillermina Clausich y Solange Valin',
  },
  {
    title: 'Escuela de Beach Voley',
    icon: IconBallVolleyball,
    age: 'De 12 años en adelante',
    schedule: 'Lunes, Miércoles y Viernes - 14:30 hs.',
    coaches: 'Magalí Meier y Alejandro Monzón',
  },
]

const puntosDeportivos = [
  'Parque Vieytes',
  'Av. Marizza y Av. Paraná',
  'Plaza el Triángulo (Echague y Gob Mihura)',
  'Barrio Las Tunas (Plaza)',
  'Barrio San Pedro (Salón - CIC)',
  'Barrios Solvencia - Altos del Este',
  'Barrio 250 Viviendas Mutual Modelo',
  'Barrio San Martín (Plaza)',
  'Barrio San Sebastián (Gob. Quirós y Tibiletti)',
  'Barrio Portal del Sol',
]

export default function PageActividadesDeportivas() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="hero bg-base-200 rounded-xl p-6 text-center shadow-lg transition-all duration-300 hover:shadow-xl md:p-12">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">Actividades Deportivas Municipales</h1>
            <div className="bg-primary mx-auto mt-4 h-1 w-24 rounded-full"></div>
            <p className="text-base-content mt-6 text-base leading-relaxed transition-colors duration-300 md:text-lg">
              ¡Sumate a la nueva temporada de los Talleres Municipales Deportivos y Recreativos!
              Todas las actividades son gratuitas.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-8 text-center text-3xl font-bold">Nuestras Propuestas</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {actividades.map((actividad, index) => (
            <div
              key={index}
              className="card bg-base-200 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="card-body">
                <h3 className="card-title text-primary">
                  <actividad.icon size={28} />
                  {actividad.title}
                </h3>
                <p className="text-base-content mt-4 font-semibold">{actividad.age}</p>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <IconCalendar size={18} className="text-secondary" />
                    <span className="font-semibold">Horario:</span>
                    <span>{actividad.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconUsers size={18} className="text-secondary" />
                    <span className="font-semibold">A cargo de:</span>
                    <span>{actividad.coaches}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="card bg-base-100 border-primary border p-6 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold">Inscripciones y Requisitos</h2>
            <p className="mt-2">La inscripción está abierta todo el año. ¡Asegurá tu lugar!</p>
            <div className="card-actions mt-4 justify-start">
              <a
                href="https://forms.gle/6v12MovAy6AeCxTJ9"
                className="btn btn-primary gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Inscripción Online
                <IconExternalLink size={20} />
              </a>
              <a
                href="/documents/FICHA-MEDICA-DEPORTES-SAN-BENITO.docx"
                className="btn btn-secondary gap-2"
                target="_blank"
                download
              >
                <IconDownload size={20} />
                Ficha Médica
              </a>
            </div>
            <div className="alert alert-warning mt-6 shadow-lg">
              <IconAlertTriangle size={24} />
              <div>
                <h3 className="font-bold">¡Importante!</h3>
                <div className="text-xs">
                  Para participar, es obligatorio presentar la ficha médica completa.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-xl p-6">
          <div className="card-body">
            <h2 className="card-title text-primary">
              <IconLocation size={28} />
              Puntos Deportivos
            </h2>
            <ul className="mt-4 columns-1 space-y-2 text-sm md:columns-2">
              {puntosDeportivos.map((punto, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="bg-secondary h-2 w-2 rounded-full"></div>
                  <span>{punto}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
          <div className="card-body items-center text-center">
            <h3 className="card-title text-primary">¿Tenés alguna consulta?</h3>
            <p className="text-base-content">Comunícate con el Área de Deportes.</p>
            <div className="card-actions mt-2">
              <a
                href="https://wa.me/5493434682745"
                className="btn btn-success gap-2 text-success-content"
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