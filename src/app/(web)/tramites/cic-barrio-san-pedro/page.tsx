import {
  IconAlertTriangle,
  IconBrandWhatsapp,
  IconDeviceDesktop,
  IconExternalLink,
  IconHeartHandshake,
  IconInfoCircle,
  IconLocation,
  IconScissors,
} from '@tabler/icons-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Actividades en el CIC Barrio San Pedro - San Benito',
}

const talleres = [
  {
    category: 'Computación',
    icon: IconDeviceDesktop,
    subTalleres: [
      { name: 'Niños y adolescentes (8 a 14 años)', link: 'https://forms.gle/PunossoQFuQrCHhD9' },
      { name: 'Jóvenes (15 a 25 años)', link: 'https://forms.gle/hrteym7LjbRYHQmg6' },
      { name: 'Adultos (mayores de 25 años)', link: 'https://forms.gle/4AfY2megQeb1XASC9' },
    ],
  },
  {
    category: 'Bienestar',
    icon: IconHeartHandshake,
    subTalleres: [
      { name: 'Envejecientemente Activ@', link: 'https://forms.gle/8nmE7754QMXG2kLL6' },
      { name: 'Yoga', link: 'https://forms.gle/7gDELwJ7cPxnQp4m6' },
    ],
  },
  {
    category: 'Taller de Telar',
    icon: IconScissors,
    subTalleres: [
      { name: 'Telar para Principiantes', link: 'https://forms.gle/cssjjrpRCj7xTm2c7' },
      { name: 'Telar Avanzado', link: 'https://forms.gle/EZzD9BD5xDjZvVVCA' },
    ],
  },
]

export default function PageCICBarrioSanPedro() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="hero bg-base-200 rounded-xl p-6 text-center shadow-lg transition-all duration-300 hover:shadow-xl md:p-12">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">
              Actividades en el CIC Barrio San Pedro
            </h1>
            <div className="bg-primary mx-auto mt-4 h-1 w-24 rounded-full"></div>
            <p className="text-base-content mt-6 text-base leading-relaxed transition-colors duration-300 md:text-lg">
              Descubrí las actividades y talleres gratuitos que ofrecemos para toda la comunidad en
              el Centro Integrador Comunitario.
            </p>
          </div>
        </div>
      </section>

      <div className="alert alert-info mt-12 shadow-lg">
        <IconAlertTriangle size={24} />
        <div>
          <h3 className="font-bold">¡Cupos limitados!</h3>
          <div className="text-xs">
            Recordá que para inscribirte debés tener domicilio en San Benito.
          </div>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="mb-8 text-center text-3xl font-bold">Nuestros Talleres</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {talleres.map((taller, index) => (
            <div
              key={index}
              className="card bg-base-200 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="card-body">
                <h3 className="card-title text-primary">
                  <taller.icon size={28} />
                  {taller.category}
                </h3>
                <ul className="mt-4 space-y-3">
                  {taller.subTalleres.map((sub, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <span className="text-base-content text-sm">{sub.name}</span>
                      <a
                        href={sub.link}
                        className="btn btn-primary btn-sm gap-2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Inscribite
                        <IconExternalLink size={16} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="card bg-base-100 border-primary border p-6 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold">
              <IconInfoCircle size={28} className="text-primary" />
              Sobre el CIC
            </h2>
            <p className="mt-2">
              El Centro Integrador Comunitario (CIC) es un espacio para promover actividades
              culturales, educativas y recreativas para todos los vecinos.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <IconLocation size={20} className="text-secondary" />
              <span className="font-semibold">Ubicación:</span>
              <span>Calle Garay y Nogoyá, Barrio San Pedro.</span>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
          <div className="card-body items-center text-center">
            <h3 className="card-title text-primary">¿Tenés alguna consulta?</h3>
            <p className="text-base-content">Comunicate con nosotros por WhatsApp.</p>
            <div className="card-actions mt-2">
              <a
                href="https://wa.me/5493434503200"
                className="btn btn-success text-success-content gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconBrandWhatsapp size={22} />
                Consultar (Solo mensajes)
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
