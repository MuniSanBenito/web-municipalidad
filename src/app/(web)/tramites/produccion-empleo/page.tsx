import {
  IconBrandWhatsapp,
  IconClipboardText,
  IconExternalLink,
  IconLocation,
} from '@tabler/icons-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Área de Producción y Empleo - San Benito',
}

export default function PageProduccionEmpleo() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="hero bg-base-200 rounded-xl p-6 text-center shadow-lg transition-all duration-300 hover:shadow-xl md:p-12">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">Área de Producción y Empleo</h1>
            <div className="bg-primary mx-auto mt-4 h-1 w-24 rounded-full"></div>
            <p className="text-base-content mt-6 text-base leading-relaxed transition-colors duration-300 md:text-lg">
              Te damos la bienvenida al espacio de Producción y Empleo, donde apoyamos a los emprendedores
              locales y fomentamos el desarrollo productivo de San Benito.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="card bg-base-100 border-primary border p-6 shadow-lg transition-all duration-300 hover:shadow-2xl">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold">
              <IconClipboardText size={28} className="text-primary" />
              Reempadronamiento de Emprendedores
            </h2>
            <p className="mt-2">
              Si sos emprendedor de San Benito, actualizá tus datos para acceder a programas, capacitaciones
              y beneficios.
            </p>
            <div className="card-actions mt-4 justify-start">
              <a
                href="https://forms.gle/2nQfHh6LixSHKrR5A"
                className="btn btn-primary gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Completar Formulario
                <IconExternalLink size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
          <div className="card-body">
            <h2 className="card-title text-primary">
              <IconLocation size={28} />
              Nuestra Oficina
            </h2>
            <p className="mt-2">
              Para consultas y asesoramiento, te esperamos en nuestras oficinas ubicadas en el edificio del
              NIDO de San Benito.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
          <div className="card-body items-center text-center">
            <h3 className="card-title text-primary">¿Tenés alguna consulta?</h3>
            <p className="text-base-content">Comunicate con nosotros por WhatsApp.</p>
            <div className="card-actions mt-2">
              <a
                href="https://wa.me/5493434470379"
                className="btn btn-success gap-2 text-success-content"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconBrandWhatsapp size={22} />
                Enviar WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
