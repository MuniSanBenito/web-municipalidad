import { IconInfoCircle } from '@tabler/icons-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mesa de Entrada - San Benito',
}

export default function PageMesaDeEntrada() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="hero bg-base-200 rounded-xl p-6 text-center shadow-lg transition-all duration-300 hover:shadow-xl md:p-12">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">Mesa de Entrada</h1>
            <div className="bg-primary mx-auto mt-4 h-1 w-24 rounded-full"></div>
            <p className="text-base-content mt-6 text-base leading-relaxed transition-colors duration-300 md:text-lg">
              La Mesa de Entrada es el punto inicial para la presentación de todo tipo de trámites
              administrativos en la Municipalidad. Aquí puede iniciar sus gestiones de forma
              ordenada y segura.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-primary mb-8 text-center text-2xl font-bold md:text-3xl">
          Requisitos para la Presentación de Trámites
        </h2>
        <div className="grid gap-8 md:grid-cols-1">
          <div className="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
            <div className="card-body">
              <h3 className="card-title text-primary">Documentación General</h3>
              <ul className="text-base-content list-disc space-y-3 pl-5">
                <li className="hover:text-primary transition-colors duration-300">
                  Presentar una <strong>nota de solicitud</strong> dirigida a la autoridad
                  correspondiente.
                </li>
                <li className="hover:text-primary transition-colors duration-300">
                  Adjuntar <strong>fotocopia del DNI</strong> del solicitante.
                </li>
              </ul>
            </div>
          </div>

          <div className="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
            <div className="card-body">
              <h3 className="card-title text-primary">Contenido de la Nota</h3>
              <ul className="text-base-content list-disc space-y-3 pl-5">
                <li className="hover:text-primary transition-colors duration-300">
                  <strong>Nombre y Apellido</strong> completos del solicitante.
                </li>
                <li className="hover:text-primary transition-colors duration-300">
                  <strong>Domicilio real y legal</strong> constituido dentro de la planta urbana de
                  San Benito.
                </li>
                <li className="hover:text-primary transition-colors duration-300">
                  Para profesionales, incluir <strong>número de matrícula</strong> individual.
                </li>
                <li className="hover:text-primary transition-colors duration-300">
                  La nota debe estar <strong>firmada</strong> por el presentante.
                </li>
                <li className="hover:text-primary transition-colors duration-300">
                  Incluir datos de contacto: <strong>correo electrónico</strong> y{' '}
                  <strong>número de teléfono</strong> (celular o fijo).
                </li>
              </ul>
            </div>
          </div>

          <div className="alert alert-info mt-4 shadow-lg">
            <IconInfoCircle size={24} />
            <span>
              Asegúrese de cumplir con todos los requisitos para evitar demoras en la gestión de su
              trámite.
            </span>
          </div>
        </div>
      </section>
    </main>
  )
}