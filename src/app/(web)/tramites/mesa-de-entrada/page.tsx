import type { Metadata } from 'next'
import Link from 'next/link'
import { IconArrowLeft } from '@tabler/icons-react'

export const metadata: Metadata = {
  title: 'Mesa de Entrada - San Benito',
}

export default function PageMesaDeEntrada() {
  return (
    <main className="container mx-auto px-4 py-6">
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">Mesa de Entrada</h1>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="mb-6 text-center text-2xl font-semibold md:text-3xl">
            Presentación de Trámites
          </h2>

          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <ul className="list-disc space-y-3 pl-5 text-lg">
                <li>Fotocopia del DNI.</li>
                <li>
                  Requisitos de la nota para presentar el trámite:
                  <ul className="list-disc pl-5 mt-2">
                    <li>Nombre y Apellido.</li>
                  </ul>
                  <ul className="list-disc pl-5 mt-2">
                    <li>
                      Para profesionales: Número de matrícula individual
                      <ul className="list-disc pl-5 mt-2">
                        <li>
                          Domicilio real, legal o especial; el domicilio es el que deberán constituir los interesados en todo el expediente, dentro de la 
                          planta urbana de la ciudad de san Benito. Excepto organismos en el orden Nacional, Provincial, Judicial o 
                          Intermunicipales.
                        </li>
                      </ul>
                      <ul className="list-disc pl-5 mt-2">
                        <li>
                          La nota debe estar firmada del que se presenta, junto a la copia del documento, correo electrónico, numero de teléfono celular o 
                          fijo.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-4 text-xl font-semibold">Información Adicional</h3>
            <div className="alert alert-info shadow-lg">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 flex-shrink-0 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <div>
                  <p className="text-sm">
                    La Mesa de Entrada es el punto inicial para la presentación de todo tipo de trámites administrativos en la Municipalidad de San Benito. Asegúrese de cumplir con todos los requisitos para evitar demoras en la gestión de su trámite.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8 flex justify-center">
        <Link href="/tramites" className="btn btn-outline gap-2">
          <IconArrowLeft size={20} />
          <span>Volver a Trámites</span>
        </Link>
      </div>
    </main>
  )
}