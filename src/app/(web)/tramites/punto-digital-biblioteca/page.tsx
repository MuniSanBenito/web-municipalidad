import type { Metadata } from 'next'
import Link from 'next/link'
import { IconBrandWhatsapp } from '@tabler/icons-react'

export const metadata: Metadata = {
  title: 'Punto Digital - Biblioteca - San Benito',
}

export default function PagePuntoDigitalBiblioteca() {
  return (
    <main className="container mx-auto px-4 py-6">
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">PUNTO DIGITAL - BIBLIOTECA</h1>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <div className="prose max-w-none">
            <p className="text-lg">
              <strong>Comienzan las actividades municipales en el Punto Digital - Biblioteca Municipal "Santiago Tórtul"</strong>, y a continuación se disponen las 
              inscripciones para los talleres que se brindarán.
            </p>
            
            <div className="alert alert-warning mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span><strong>Recordá que los cupos son limitados y para inscribirte deberás contar con domicilio en nuestra localidad.</strong></span>
            </div>

            <h2 className="text-2xl font-semibold mt-6 mb-4">Talleres Disponibles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card bg-base-200 shadow-md">
                <div className="card-body">
                  <h3 className="card-title">Idiomas</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>
                        <span>Inglés Inicial (7 a 9 años)</span>
                        <a href="https://forms.gle/Pr9DaKQKxqYrbsTN8" className="btn btn-primary btn-sm ml-2" target="_blank">
                          Inscripción
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>
                        <span>Inglés Inicial (10 a 14 años)</span>
                        <a href="https://forms.gle/4cfjCqgLQd8akmPcA" className="btn btn-primary btn-sm ml-2" target="_blank">
                          Inscripción
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>
                        <span>Inglés Inicial (+15 años)</span>
                        <a href="https://forms.gle/gjqoppWZYZ3AqfPv7" className="btn btn-primary btn-sm ml-2" target="_blank">
                          Inscripción
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>
                        <span>Portugués Inicial (7 a 10 años)</span>
                        <a href="https://forms.gle/7PAcbvFHnUCqxCai9" className="btn btn-primary btn-sm ml-2" target="_blank">
                          Inscripción
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>
                        <span>Portugués Inicial (11 a 14 años)</span>
                        <a href="https://forms.gle/XgjRrT1EjUc9rKfe7" className="btn btn-primary btn-sm ml-2" target="_blank">
                          Inscripción
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>
                        <span>Portugués Inicial (+15 años)</span>
                        <a href="https://forms.gle/FTsPdjC7hojfKbVC8" className="btn btn-primary btn-sm ml-2" target="_blank">
                          Inscripción
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="card bg-base-200 shadow-md">
                <div className="card-body">
                  <h3 className="card-title">Tecnología y Bienestar</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>
                        <span>Programación Web Full Stack</span>
                        <a href="https://forms.gle/1LjQu5QF3dZzTizV6" className="btn btn-primary btn-sm ml-2" target="_blank">
                          Inscripción
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>
                        <span>Computación para Adultos (+40 años)</span>
                        <a href="https://forms.gle/kHKoSM2dzVqmT8gi8" className="btn btn-primary btn-sm ml-2" target="_blank">
                          Inscripción
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>
                        <span>Robótica para Niños (8 a 11 años)</span>
                        <a href="https://forms.gle/MFqa4tPjdbxmogKu9" className="btn btn-primary btn-sm ml-2" target="_blank">
                          Inscripción
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>
                        <span>Envejecientemente Activ@</span>
                        <a href="https://forms.gle/KGvkQwazKGXMENmJ9" className="btn btn-primary btn-sm ml-2" target="_blank">
                          Inscripción
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>
                        <span>Yoga en el Vieytes</span>
                        <a href="https://forms.gle/kgBsh4rJf93haKBS8" className="btn btn-primary btn-sm ml-2" target="_blank">
                          Inscripción
                        </a>
                      </div>
                    </li>
                  </ul>
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
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3">Sobre la Biblioteca Municipal "Santiago Tórtul"</h3>
              <p>
                La Biblioteca Municipal "Santiago Tórtul" es un espacio cultural y educativo que ofrece a los vecinos de San Benito acceso a libros, 
                recursos digitales y actividades formativas. Junto con el Punto Digital, constituye un centro integral para el desarrollo de habilidades 
                y el fomento de la cultura en nuestra comunidad.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}