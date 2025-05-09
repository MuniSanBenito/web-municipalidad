import type { Metadata } from 'next'
import Link from 'next/link'
import { IconArrowLeft, IconBrandWhatsapp, IconDownload } from '@tabler/icons-react'

export const metadata: Metadata = {
  title: 'Actividades Deportivas Municipales - San Benito',
}

export default function PageActividadesDeportivas() {
  return (
    <main className="container mx-auto px-4 py-6">
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">Actividades Deportivas Municipales</h1>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <div className="prose max-w-none">
            <div className="alert alert-info mb-6">
              <div>
                <p className="text-lg font-bold">
                  ACTIVIDADES DEPORTIVAS MUNICIPALES 2024
                </p>
                <p>
                  ⚽️ ¡VUELVEN LOS TALLERES MUNICIPALES DEPORTIVOS Y RECREATIVOS!
                </p>
                <p>
                  😃 Te invitamos a sumarte a una nueva temporada de los Talleres Municipales Deportivos, organizados desde el Área de Deportes de nuestro municipio.
                </p>
              </div>
            </div>
            
            <p className="text-lg font-semibold">
              👉🏼 Todas las actividades son totalmente GRATUITAS y se realizan en los siguientes puntos de nuestra ciudad:
            </p>
            
            <div className="card bg-base-200 shadow-xl mt-4">
              <div className="card-body">
                <h3 className="card-title">Puntos Deportivos</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>🔸 Parque Vieytes.</li>
                  <li>🔸 Av. Marizza y Av. Paraná́.</li>
                  <li>🔸 Plaza el Triángulo (Echague y Gob Mihura).</li>
                  <li>🔸 Barrio Las Tunas (Plaza).</li>
                  <li>🔸 Barrio San Pedro (Salón - CIC).</li>
                  <li>🔸 Barrios Solvencia - Altos del Este.</li>
                  <li>🔸 Barrio 250 Viviendas Mutual Modelo.</li>
                  <li>🔸 Barrio San Martín (Plaza).</li>
                  <li>🔸 Barrio San Sebastián (Gob. Quirós y Tibiletti).</li>
                  <li>🔸 Barrio Portal del Sol.</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3">Inscripciones</h3>
              <p>📝 INSCRIPCIONES: Abierta todo el año.</p>
              <div className="mt-4 flex flex-col items-center">
                <a 
                  href="https://forms.gle/6v12MovAy6AeCxTJ9" 
                  className="btn btn-primary btn-lg gap-2 text-xl"
                  target="_blank"
                >
                  🌐 INSCRIPCIONES ONLINE
                </a>
                
                <p className="mt-4 text-center">
                  Se solicitan datos personales básicos (nombre y apellido, edad, fecha de nacimiento, domicilio, Teléfono etc.), 
                  debiendo optar allí por uno o lo que quieras de los puntos deportivos antes mencionados y en qué actividad desean participar.
                </p>
              </div>
            </div>
            
            <div className="alert alert-warning mt-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <div>
                <p><strong>El comienzo de las actividades será el MARTES 1 DE ABRIL DE 2025.</strong></p>
                <p><strong>Recuerde que para sumarse a cualquier actividad deportiva deberá llevar la siguiente ficha completada por un médico</strong></p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <a 
                href="/documents/FICHA-MEDICA-DEPORTES-SAN-BENITO.docx" 
                className="btn btn-primary gap-2"
                target="_blank"
                download
              >
                <IconDownload size={20} />
                <span>Ficha médica para las prácticas deportivas</span>
              </a>
            </div>
            
            <div className="mt-8 bg-base-200 p-4 rounded-lg flex items-center justify-between">
              <div>
                <h3 className="font-semibold">¿Necesitás más información?</h3>
                <p>Por consultas, enviar WhatsApp al 3434682745</p>
                <p className="text-sm mt-2">#SeguimosTrabajando #PorUnaCiudadMejor #UnaCiudadParaVivir Estamos #EnMovimiento</p>
              </div>
              <a 
                href="https://wa.me/+543434682745" 
                className="btn btn-success gap-2"
                target="_blank"
              >
                <IconBrandWhatsapp size={20} />
                <span>WhatsApp</span>
              </a>
            </div>
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3">Actividades Disponibles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card bg-base-200 shadow-md">
                  <div className="card-body">
                    <h4 className="card-title text-lg">GOLF CROQUET MUNICIPAL</h4>
                    <p>A partir de 55 años</p>
                    <ul className="mt-2">
                      <li><strong>📆 Día y hora:</strong> Lunes - 9:00 hs.</li>
                      <li><strong>👨‍🏫 A cargo de:</strong> Guillermina Clausich - Ariadna Vince</li>
                    </ul>
                  </div>
                </div>
                
                <div className="card bg-base-200 shadow-md">
                  <div className="card-body">
                    <h4 className="card-title text-lg">ACTIVIDADES RECREATIVAS EN AGUA</h4>
                    <p>A partir de 55 años</p>
                    <ul className="mt-2">
                      <li><strong>📆 Días y hora:</strong> Martes y Jueves - 10:00 hs.</li>
                      <li><strong>👨‍🏫 A cargo de:</strong> Guillermina Clausich y Solange Valin</li>
                    </ul>
                  </div>
                </div>
                
                <div className="card bg-base-200 shadow-md">
                  <div className="card-body">
                    <h4 className="card-title text-lg">INICIACIÓN DEPORTIVA</h4>
                    <p>De 3 a 7 años</p>
                    <ul className="mt-2">
                      <li><strong>📆 Días y hora:</strong> Lunes y Miércoles - 10:15 hs.</li>
                      <li><strong>👨‍🏫 A cargo de:</strong> Guillermina Clausich y Solange Valin</li>
                    </ul>
                  </div>
                </div>
                
                <div className="card bg-base-200 shadow-md">
                  <div className="card-body">
                    <h4 className="card-title text-lg">ESCUELA DE BEACH VOLEY</h4>
                    <p>De 12 años en adelante</p>
                    <ul className="mt-2">
                      <li><strong>📆 Días y hora:</strong> Lunes, Miércoles y Viernes - 14:30 hs.</li>
                      <li><strong>👨‍🏫 A cargo de:</strong> Magalí Meier y Alejandro Monzón</li>
                    </ul>
                  </div>
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