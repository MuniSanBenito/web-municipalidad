import {
  IconBuildingSkyscraper,
  IconCertificate,
  IconCopy,
  IconFileDescription,
  IconInfoCircle,
} from '@tabler/icons-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Obras Privadas - San Benito',
}

export default function PageObrasPrivadas() {
  return (
    <main className="container mx-auto px-4 py-6">
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg transition-all duration-300 hover:shadow-xl md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">Obras Privadas</h1>
            <div className="bg-primary mx-auto mt-4 h-1 w-24 rounded-full"></div>
            <p className="text-base-content mt-6 text-base leading-relaxed transition-colors duration-300 md:text-lg">
              La Dirección de Obras Privadas se encarga de regular y controlar las construcciones
              dentro del municipio, garantizando el cumplimiento de las normativas vigentes y el
              desarrollo urbano ordenado.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <div className="bg-base-100 rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-lg">
          <h2 className="text-primary mb-6 text-center text-2xl font-semibold md:text-3xl">
            Trámites Disponibles
          </h2>

          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-center">
            <Link
              href="/tramites/obras-privadas/inscripcion-municipal"
              className="btn btn-primary gap-2 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <IconCertificate size={20} />
              <span className="text-primary-content">Inscripción Municipal de Profesional</span>
            </Link>

            <Link
              href="/tramites/obras-privadas/presentacion-de-proyecto"
              className="btn gap-2 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: '#cbc846',
                color: '#333333',
                borderColor: '#b6c544',
              }}
            >
              <IconFileDescription size={20} />
              <span>Presentación de Proyecto</span>
            </Link>

            <Link
              href="/tramites/obras-privadas/presentacion-de-relevamiento"
              className="btn gap-2 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: '#dfce45',
                color: '#333333',
                borderColor: '#b6c544',
              }}
            >
              <IconCopy size={20} />
              <span>Presentación de Relevamiento</span>
            </Link>

            <Link
              href="/tramites/obras-privadas/presentacion-de-final-de-obra"
              className="btn btn-secondary gap-2 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <IconBuildingSkyscraper size={20} />
              <span className="text-secondary-content">Presentación de Finalización de Obra</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-base-100 rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-lg">
          <h2 className="text-primary mb-6 text-center text-2xl font-semibold md:text-3xl">
            Información Importante
          </h2>

          <div className="alert alert-info shadow-lg transition-all duration-300 hover:shadow-xl">
            <div>
              <IconInfoCircle size={24} className="h-6 w-6 flex-shrink-0" />
              <div>
                <h3 className="text-info font-bold">Horarios de Atención</h3>
                <p className="text-info-content text-sm">
                  Lunes a Viernes de 7:00 a 13:00 hs en el Edificio Municipal. Para consultas, puede
                  comunicarse al teléfono (0343) 4973454 o por correo a
                  <a
                    href="mailto:obrasprivadas@munisanbenito.gov.ar"
                    className="text-info font-bold hover:underline"
                  >
                    obrasprivadas@munisanbenito.gov.ar
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-primary">Requisitos Generales</h3>
                <ul className="text-base-content list-disc space-y-2 pl-5">
                  <li className="hover:text-primary transition-colors duration-300">
                    Título de propiedad o boleto de compra-venta certificado
                  </li>
                  <li className="hover:text-primary transition-colors duration-300">
                    Plano de mensura visado por la Dirección de Catastro
                  </li>
                  <li className="hover:text-primary transition-colors duration-300">
                    Libre deuda municipal
                  </li>
                  <li className="hover:text-primary transition-colors duration-300">
                    Certificado de factibilidad de servicios
                  </li>
                  <li className="hover:text-primary transition-colors duration-300">
                    Planos firmados por profesional habilitado
                  </li>
                </ul>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-primary">Normativa Aplicable</h3>
                <p className="text-base-content">
                  Las construcciones en el municipio de San Benito deben cumplir con:
                </p>
                <ul className="text-base-content mt-2 list-disc space-y-2 pl-5">
                  <li className="hover:text-primary transition-colors duration-300">
                    Código de Edificación Municipal
                  </li>
                  <li className="hover:text-primary transition-colors duration-300">
                    Ordenanza de Uso del Suelo
                  </li>
                  <li className="hover:text-primary transition-colors duration-300">
                    Reglamentaciones sobre retiros y factores de ocupación
                  </li>
                  <li className="hover:text-primary transition-colors duration-300">
                    Normativas de seguridad e higiene
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
