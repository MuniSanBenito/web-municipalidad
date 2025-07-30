import { IconMapPin, IconPhone } from '@tabler/icons-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Área Mujer y Género - San Benito',
}

export default function PageAreaMujer() {
  return (
    <main className="container mx-auto px-4 py-6">
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg transition-all duration-300 hover:shadow-xl md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">Área Mujer y Género</h1>
            <div className="bg-primary mx-auto mt-4 h-1 w-24 rounded-full"></div>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <div className="bg-base-100 rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-lg">
          <div className="prose max-w-none">
            <p className="text-base-content text-lg">
              El área de la mujer fue creada el 11 de julio del año 2018 en nuestra ciudad bajo la
              ordenanza N° 510 – 16. Desde entonces nos dedicamos a trabajar incansablemente para
              erradicar la violencia de género en nuestra ciudad. Tenemos como objetivo visibilizar
              las violencias vividas por las mujeres en nuestra sociedad para así generar
              herramientas para acompañar, asesorar, y contener a todas las mujeres que así lo
              necesiten. Nuestro equipo de trabajo está conformado por:
            </p>

            <div className="card bg-base-200 mt-6 shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-primary">Nuestro Equipo</h3>
                <ul className="text-base-content list-disc space-y-2 pl-5">
                  <li className="hover:text-primary transition-colors duration-300">
                    Aumassanne Ma. Camila - Coordinadora del área
                  </li>
                  <li className="hover:text-primary transition-colors duration-300">
                    Navoni Jesica – trabajadora social - equipo técnico
                  </li>
                  <li className="hover:text-primary transition-colors duration-300">
                    Tamborini Brenda – Psicóloga – equipo técnico
                  </li>
                  <li className="hover:text-primary transition-colors duration-300">
                    Vicentin Silvana – equipo técnico
                  </li>
                  <li className="hover:text-primary transition-colors duration-300">
                    Yoris María Laura – Psicóloga – tratamiento individual
                  </li>
                  <li className="hover:text-primary transition-colors duration-300">
                    Duro Rivas Valeria – Abogada – asesoramiento legal
                  </li>
                  <li className="hover:text-primary transition-colors duration-300">
                    Buffa Jorge – administrativo
                  </li>
                  <li className="hover:text-primary transition-colors duration-300">
                    Beber Claudia – administrativa
                  </li>
                  <li className="hover:text-primary transition-colors duration-300">
                    Romero Celestina – promotora de derechos
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-base-200 mt-6 flex flex-col items-center justify-between rounded-lg p-4 transition-all duration-300 hover:shadow-lg md:flex-row">
              <div className="mb-4 md:mb-0">
                <h3 className="text-primary text-lg font-semibold">Contacto</h3>
                <div className="text-base-content mt-2 flex items-center">
                  <IconMapPin size={20} className="text-primary mr-2" />
                  <p>Podes encontrarnos en el NIDO, en calle Buenos Aires y Misiones.</p>
                </div>
              </div>
              <a
                href="https://wa.me/+543435204239"
                className="btn btn-primary gap-2 transition-transform duration-300 hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconPhone size={20} />
                <span>WhatsApp: 3435204239</span>
              </a>
            </div>

            <div className="mt-8 aspect-video w-full overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/UOkndDPgFVQ?si=tx2_fXpP-ZezRKzO&amp;controls=0"
                title="25 DE NOVIEMBRE: DÍA INTERNACIONAL DE LA ELIMINACIÓN DE LA VIOLENCIA CONTRA LA MUJER"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>

            <div className="mt-10">
              <h3 className="text-primary mb-4 text-center text-xl font-semibold">
                Formulario de Contacto
              </h3>
              <div className="flex justify-center">
                <div className="w-full max-w-3xl overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                  <iframe
                    className="w-full"
                    src="https://docs.google.com/forms/d/e/1FAIpQLSdDWnTm020PNHrMqrBtLjzx5XIxd7coxJp93rkoh0UYWPWWEA/viewform?embedded=true"
                    height="800"
                    style={{ maxWidth: '100%' }}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
