import type { Metadata } from 'next'
import Link from 'next/link'
import { IconArrowLeft, IconBrandWhatsapp } from '@tabler/icons-react'

export const metadata: Metadata = {
  title: 'CIC Barrio San Pedro - San Benito',
}

export default function PageCICBarrioSanPedro() {
  return (
    <main className="container mx-auto px-4 py-6">
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">CIC Barrio San Pedro</h1>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <div className="prose max-w-none">
            <p className="text-lg">
              Desde el área de juventud, se abren las inscripciones para las distintas actividades que se llevarán adelante en el 
              <strong> CIC del Barrio San Pedro de la ciudad de San Benito, ubicado en calle Garay y Nogoyá</strong>.
            </p>
            
            <div className="alert alert-warning mt-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span><strong>Recuerda que los cupos son limitados y para inscribirte deberás contar con domicilio en nuestra localidad.</strong></span>
            </div>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">Actividades Disponibles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card bg-base-200 shadow-md">
                <div className="card-body">
                  <h3 className="card-title">Computación</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>
                        <span>Para niños y adolescentes (8 a 14 años)</span>
                        <a href="https://forms.gle/PunossoQFuQrCHhD9" className="btn btn-primary btn-sm ml-2" target="_blank">
                          Inscripción
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>
                        <span>Para jóvenes (15 a 25 años)</span>
                        <a href="https://forms.gle/hrteym7LjbRYHQmg6" className="btn btn-primary btn-sm ml-2" target="_blank">
                          Inscripción
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>
                        <span>Para adultos (mayores de 25 años)</span>
                        <a href="https://forms.gle/4AfY2megQeb1XASC9" className="btn btn-primary btn-sm ml-2" target="_blank">
                          Inscripción
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="card bg-base-200 shadow-md">
                <div className="card-body">
                  <h3 className="card-title">Talleres de Bienestar</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>
                        <span>Envejecientemente Activ@</span>
                        <a href="https://forms.gle/8nmE7754QMXG2kLL6" className="btn btn-primary btn-sm ml-2" target="_blank">
                          Inscripción
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>
                        <span>Yoga</span>
                        <a href="https://forms.gle/7gDELwJ7cPxnQp4m6" className="btn btn-primary btn-sm ml-2" target="_blank">
                          Inscripción
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="card bg-base-200 shadow-md">
                <div className="card-body">
                  <h3 className="card-title">Talleres de Telar</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>
                        <span>Taller de Telar para Principiantes</span>
                        <a href="https://forms.gle/cssjjrpRCj7xTm2c7" className="btn btn-primary btn-sm ml-2" target="_blank">
                          Inscripción
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>
                        <span>Taller de Telar Avanzado</span>
                        <a href="https://forms.gle/EZzD9BD5xDjZvVVCA" className="btn btn-primary btn-sm ml-2" target="_blank">
                          Inscripción
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="card bg-base-200 shadow-md">
                <div className="card-body">
                  <h3 className="card-title">Información del CIC</h3>
                  <p>El Centro Integrador Comunitario (CIC) del Barrio San Pedro es un espacio dedicado a promover actividades culturales, educativas y recreativas para todos los vecinos de San Benito.</p>
                  <p className="mt-2">Dirección: Calle Garay y Nogoyá, Barrio San Pedro, San Benito.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-base-200 p-4 rounded-lg flex items-center justify-between">
              <div>
                <h3 className="font-semibold">¿Necesitás más información?</h3>
                <p>Contactanos por WhatsApp al 3434508085 (SOLO MENSAJES, NO LLAMADAS NI AUDIOS)</p>
              </div>
              <a 
                href="https://wa.me/+543434508085" 
                className="btn btn-success gap-2"
                target="_blank"
              >
                <IconBrandWhatsapp size={20} />
                <span>WhatsApp</span>
              </a>
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