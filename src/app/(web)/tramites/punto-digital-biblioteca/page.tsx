import {
  IconAlertTriangle,
  IconBook,
  IconBrain,
  IconBrandWhatsapp,
  IconCode,
  IconDeviceLaptop,
  IconLanguage,
  IconYoga,
} from '@tabler/icons-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Punto Digital - Biblioteca - San Benito',
}

const talleres = {
  idiomas: [
    { nombre: 'Inglés Inicial (7 a 9 años)', link: 'https://forms.gle/Pr9DaKQKxqYrbsTN8' },
    { nombre: 'Inglés Inicial (10 a 14 años)', link: 'https://forms.gle/4cfjCqgLQd8akmPcA' },
    { nombre: 'Inglés Inicial (+15 años)', link: 'https://forms.gle/gjqoppWZYZ3AqfPv7' },
    { nombre: 'Portugués Inicial (7 a 10 años)', link: 'https://forms.gle/7PAcbvFHnUCqxCai9' },
    { nombre: 'Portugués Inicial (11 a 14 años)', link: 'https://forms.gle/XgjRrT1EjUc9rKfe7' },
    { nombre: 'Portugués Inicial (+15 años)', link: 'https://forms.gle/FTsPdjC7hojfKbVC8' },
  ],
  tecnologia: [
    {
      nombre: 'Programación Web Full Stack',
      link: 'https://forms.gle/1LjQu5QF3dZzTizV6',
      icon: IconCode,
    },
    {
      nombre: 'Computación para Adultos (+40 años)',
      link: 'https://forms.gle/kHKoSM2dzVqmT8gi8',
      icon: IconDeviceLaptop,
    },
    {
      nombre: 'Robótica para Niños (8 a 11 años)',
      link: 'https://forms.gle/MFqa4tPjdbxmogKu9',
      icon: IconCode, // O un ícono más específico si lo encuentras
    },
  ],
  bienestar: [
    {
      nombre: 'Envejecientemente Activ@',
      link: 'https://forms.gle/KGvkQwazKGXMENmJ9',
      icon: IconBrain,
    },
    { nombre: 'Yoga en el Vieytes', link: 'https://forms.gle/Q2s7h3t8d9J4Rk6t7', icon: IconYoga },
  ],
}

export default function PagePuntoDigitalBiblioteca() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="hero bg-base-200 rounded-xl p-6 text-center shadow-lg transition-all duration-300 hover:shadow-xl md:p-12">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">Punto Digital - Biblioteca</h1>
            <div className="bg-primary mx-auto mt-4 h-1 w-24 rounded-full"></div>
            <p className="text-base-content mt-6 text-base leading-relaxed transition-colors duration-300 md:text-lg">
              Comienzan las actividades municipales en el Punto Digital - Biblioteca Municipal
              &quot;Santiago Tórtul&quot;. Explora nuestros talleres e inscríbete.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="alert alert-warning shadow-lg">
          <IconAlertTriangle size={24} />
          <div>
            <h3 className="font-bold">¡Atención!</h3>
            <div className="text-xs">
              Los cupos son limitados. Para inscribirte, es requisito tener domicilio en San Benito.
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          {/* Card de Idiomas */}
          <div className="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
            <div className="card-body">
              <h2 className="card-title text-primary">
                <IconLanguage size={28} />
                Idiomas
              </h2>
              <ul className="mt-4 space-y-3">
                {talleres.idiomas.map((taller, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-base-100 p-3 transition-all duration-300 hover:bg-base-300/50 hover:shadow-md"
                  >
                    <span className="text-base-content">{taller.nombre}</span>
                    <a
                      href={taller.link}
                      className="btn btn-primary btn-sm text-primary-content"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Inscribirse
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card de Tecnología */}
          <div className="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
            <div className="card-body">
              <h2 className="card-title text-primary">
                <IconDeviceLaptop size={28} />
                Tecnología
              </h2>
              <ul className="mt-4 space-y-3">
                {talleres.tecnologia.map((taller, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-base-100 p-3 transition-all duration-300 hover:bg-base-300/50 hover:shadow-md"
                  >
                    <span className="flex items-center gap-2 text-base-content">
                      <taller.icon size={20} />
                      {taller.nombre}
                    </span>
                    <a
                      href={taller.link}
                      className="btn btn-primary btn-sm text-primary-content"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Inscribirse
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card de Bienestar */}
          <div className="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
            <div className="card-body">
              <h2 className="card-title text-primary">
                <IconBook size={28} />
                Bienestar y Cultura
              </h2>
              <ul className="mt-4 space-y-3">
                {talleres.bienestar.map((taller, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-base-100 p-3 transition-all duration-300 hover:bg-base-300/50 hover:shadow-md"
                  >
                    <span className="flex items-center gap-2 text-base-content">
                      <taller.icon size={20} />
                      {taller.nombre}
                    </span>
                    <a
                      href={taller.link}
                      className="btn btn-primary btn-sm text-primary-content"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Inscribirse
                    </a>
                  </li>
                ))}
              </ul>
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
                href="https://wa.me/5493434508085"
                className="btn btn-success gap-2 text-success-content"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconBrandWhatsapp size={22} />
                Consultas por WhatsApp
              </a>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-xl font-semibold">
                Sobre la Biblioteca Municipal &quot;Santiago Tórtul&quot;
              </h3>
              <p>
                La Biblioteca Municipal &quot;Santiago Tórtul&quot; es un espacio cultural y
                educativo que ofrece a los vecinos de San Benito acceso a libros, recursos digitales
                y actividades formativas. Junto con el Punto Digital, constituye un centro integral
                para el desarrollo de habilidades y el fomento de la cultura en nuestra comunidad.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
