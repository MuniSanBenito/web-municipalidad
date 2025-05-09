import type { Metadata } from 'next'
import Link from 'next/link'
import { IconArrowLeft, IconPhone } from '@tabler/icons-react'

export const metadata: Metadata = {
  title: 'Área Mujer y Género - San Benito',
}

export default function PageAreaMujer() {
  return (
    <main className="container mx-auto px-4 py-6">
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">Área Mujer y Género</h1>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <div className="prose max-w-none">
            <p className="text-lg">
              El área de la mujer fue creada el 11 de julio del año 2018 en nuestra ciudad bajo la ordenanza N° 510 – 16. 
              Desde entonces nos dedicamos a trabajar incansablemente para erradicar la violencia de género en nuestra ciudad. 
              Tenemos como objetivo de visibilizar las violencias vividas por las mujeres en nuestra sociedad para así generar 
              herramientas para acompañar, asesorar, y contener a todas las mujeres que así lo necesiten. 
              Nuestro equipo de trabajo esta conformado por:
            </p>
            
            <div className="card bg-base-200 shadow-md mt-4">
              <div className="card-body">
                <h3 className="card-title">Nuestro Equipo</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Aumassanne Ma. Camila - Coordinadora del área</li>
                  <li>Navoni Jesica – trabajadora social - equipo técnico</li>
                  <li>Tamborini Brenda – Psicologa – equipo técnico</li>
                  <li>Vicentin Silvana – equipo técnico</li>
                  <li>Yoris María Laura – Psicologa – tratamiento individual</li>
                  <li>Duro Rivas Valeria – Abogada – asesoramiento legal</li>
                  <li>Buffa Jorge – administrativo</li>
                  <li>Beber Claudia – administrativa</li>
                  <li>Romero Celestina – promotora de derechos</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 bg-base-200 p-4 rounded-lg flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Contacto</h3>
                <p>Podes encontrarnos en el NIDO, en calle Buenos Aires y Misiones.</p>
              </div>
              <a 
                href="https://wa.me/+543435204239" 
                className="btn btn-success gap-2"
                target="_blank"
              >
                <IconPhone size={20} />
                <span>WhatsApp: 3435204239</span>
              </a>
            </div>
            
            <div className="mt-6 aspect-video w-full">
              <iframe 
                className="w-full h-full rounded-lg shadow-md"
                src="https://www.youtube.com/embed/UOkndDPgFVQ?si=tx2_fXpP-ZezRKzO&amp;controls=0" 
                title="25 DE NOVIEMBRE: DÍA INTERNACIONAL DE LA ELIMINACIÓN DE LA VIOLENCIA CONTRA LA MUJER" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-3 text-center">Formulario de Contacto</h3>
              <div className="flex justify-center">
                <iframe 
                  className="w-full max-w-3xl rounded-lg shadow-md"
                  src="https://docs.google.com/forms/d/e/1FAIpQLSdDWnTm020PNHrMqrBtLjzx5XIxd7coxJp93rkoh0UYWPWWEA/viewform?embedded=true" 
                  height="800" 
                  style={{ maxWidth: '100%' }}
                ></iframe>
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