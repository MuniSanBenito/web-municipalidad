import type { Metadata } from 'next'
import Link from 'next/link'
import { IconArrowLeft, IconBrandWhatsapp, IconExternalLink } from '@tabler/icons-react'

export const metadata: Metadata = {
  title: 'Talleres Culturales Municipales - San Benito',
}

export default function PageTalleresCulturales() {
  return (
    <main className="container mx-auto px-4 py-6">
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">Talleres Culturales Municipales</h1>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <div className="prose max-w-none">
            <div className="alert alert-info mb-6">
              <div>
                <p className="text-lg font-bold">
                  💃🏻 TALLERES ARTÍSTICOS MUNICIPALES 2024 🎺
                </p>
                <p>
                  ✍🏼 ¡Inscribite al nuevo año de Talleres Artísticos y sumate a nuestros equipos culturales!
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">🎷 BANDA DE MÚSICA MUNICIPAL</h2>
                  <p>
                    Convocatoria para niños a partir de los 9 años de edad y jóvenes; con o sin conocimiento musical. 
                    Espacios disponibles: flauta, clarinete, saxo, trompeta, batería y percusión.
                  </p>
                  <ul className="mt-2">
                    <li><strong>📆 Día y hora de ensayo:</strong> miércoles de 18:00 a 20:30 hs.</li>
                    <li><strong>📍 Lugar:</strong> NIDO.</li>
                  </ul>
                </div>
              </div>
              
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">🎸 GUITARRA</h2>
                  <p>
                    Convocatoria para niños a partir de los 9 años de edad, jóvenes y adultos, con o sin conocimientos musicales.
                  </p>
                  <ul className="mt-2">
                    <li><strong>📆 Días y horarios:</strong></li>
                    <ul className="pl-5">
                      <li>- Lunes de 17 a 19 hs.</li>
                      <li>- Jueves de 17 a 19:30 hs.</li>
                      <li>- Viernes de 16 a 18:30 hs.</li>
                    </ul>
                    <li><strong>📍 Lugar:</strong> NIDO.</li>
                  </ul>
                </div>
              </div>
              
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">💃🏻 TALLER DE DANZAS INMIGRANTES</h2>
                  <p>
                    Convocatoria para niños a partir de los 9 años, jóvenes y adultos.
                  </p>
                  <ul className="mt-2">
                    <li><strong>📆 Día y hora de ensayo:</strong> Lunes de 18:00 a 20:00 hs.</li>
                    <li><strong>📍 Lugar:</strong> NIDO.</li>
                  </ul>
                </div>
              </div>
              
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">🎤 CORO MUNICIPAL</h2>
                  <p>
                    Convocatoria para jóvenes a partir de los 16 años y adultos.
                  </p>
                  <ul className="mt-2">
                    <li><strong>📆 Día y hora de ensayo:</strong> Miércoles de 19:30 a 21:30 hs.</li>
                    <li><strong>📍 Lugar:</strong> CIC de Barrio San Pedro.</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col items-center">
              <a 
                href="https://forms.gle/mjTTB6GRN3QiFTh77" 
                className="btn btn-primary btn-lg gap-2 text-xl"
                target="_blank"
              >
                🌐 INSCRIPCIONES AQUÍ
                <IconExternalLink size={20} />
              </a>
              
              <div className="alert alert-warning mt-6 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span><strong>Recordá que los cupos son limitados y para inscribirte deberás contar con domicilio en nuestra localidad.</strong></span>
              </div>
            </div>
            
            <div className="mt-6 bg-base-200 p-4 rounded-lg flex items-center justify-between">
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