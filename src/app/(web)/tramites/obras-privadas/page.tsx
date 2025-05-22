import { HeroTramite } from '@/components/tramites/HeroTramite'
import { SeccionContenidoTramite } from '@/components/tramites/SeccionContenidoTramite'
import { BotonEnlaceInterno } from '@/components/tramites/BotonEnlaceInterno'
import {
  IconBuildingSkyscraper,
  IconCertificate,
  IconClockHour4,
  IconCopy,
  IconFileDescription,
  IconMail,
  IconPhone,
} from '@tabler/icons-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Obras Privadas - San Benito',
}

export default function PageObrasPrivadas() {
  const descripcionIntro = (
    <>
      La Dirección de Obras Privadas se encarga de regular y controlar las construcciones dentro del
      municipio, garantizando el cumplimiento de las normativas vigentes y el desarrollo urbano
      ordenado.
    </>
  )

  return (
    <main className="container mx-auto px-4 py-6">
      <HeroTramite titulo="Obras Privadas" descripcionIntro={descripcionIntro} />

      <SeccionContenidoTramite tituloSeccion="Trámites Disponibles">
        <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-center">
          <BotonEnlaceInterno
            href="/tramites/obras-privadas/inscripcion-municipal"
            titulo="Inscripción Municipal de Profesional"
            Icono={IconCertificate}
            className="btn-primary"
          />
          <BotonEnlaceInterno
            href="/tramites/obras-privadas/presentacion-de-proyecto"
            titulo="Presentación de Proyecto"
            Icono={IconFileDescription}
            className="btn-primary"
          />
          <BotonEnlaceInterno
            href="/tramites/obras-privadas/presentacion-de-relevamiento"
            titulo="Presentación de Relevamiento"
            Icono={IconCopy}
            className="btn-secondary"
          />
          <BotonEnlaceInterno
            href="/tramites/obras-privadas/presentacion-de-final-de-obra"
            titulo="Presentación de Finalización de Obra"
            Icono={IconBuildingSkyscraper}
            className="btn-secondary"
          />
        </div>
      </SeccionContenidoTramite>

      <SeccionContenidoTramite tituloSeccion="Información Importante">
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
            <div className="text-sm">
              <h3 className="font-bold text-base mb-2">Contacto y Horarios de Atención</h3>
              <p className="flex items-center gap-1 mb-1">
                <IconClockHour4 size={18} className="inline-block text-info-content" /> 
                <strong>Horario:</strong> Lunes a Viernes de 7:00 a 13:00 hs en el Edificio Municipal.
              </p>
              <p className="flex items-center gap-1 mb-1">
                <IconPhone size={18} className="inline-block text-info-content" />
                <strong>Teléfono:</strong>
                <a href="tel:03434970556" className="ml-1 hover:underline">(0343) 4970556</a>
              </p>
              <p className="flex items-center gap-1">
                <IconMail size={18} className="inline-block text-info-content" />
                <strong>Correo Electrónico:</strong>
                <a
                  href="mailto:obrasprivadas@munisanbenito.gov.ar"
                  className="ml-1 hover:underline"
                >
                  obrasprivadas@munisanbenito.gov.ar
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Requisitos Generales</h3>
              {/*
                SUGERENCIA A FUTURO:
                Si la lista de 'Requisitos Generales' o la 'Normativa Aplicable'
                necesitan actualizarse con frecuencia por personal no técnico,
                considerar obtener este contenido desde un CMS 
                (ej. Payload CMS, creando una colección para estos ítems)
                o desde archivos de datos externos (ej. JSON o Markdown) 
                para facilitar su mantenimiento y evitar modificar directamente el código.
              */}
              <ul className="list-disc space-y-2 pl-5">
                <li>Título de propiedad o boleto de compra-venta certificado</li>
                <li>Plano de mensura visado por la Dirección de Catastro</li>
                <li>Libre deuda municipal</li>
                <li>Certificado de factibilidad de servicios</li>
                <li>Planos firmados por profesional habilitado</li>
              </ul>
            </div>
          </div>

          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Normativa Aplicable</h3>
              {/*
                SUGERENCIA A FUTURO: (Misma sugerencia aplica aquí si este contenido también es dinámico)
                Si la lista de 'Requisitos Generales' o la 'Normativa Aplicable'
                necesitan actualizarse con frecuencia por personal no técnico,
                considerar obtener este contenido desde un CMS 
                (ej. Payload CMS, creando una colección para estos ítems)
                o desde archivos de datos externos (ej. JSON o Markdown) 
                para facilitar su mantenimiento y evitar modificar directamente el código.
              */}
              <p>Las construcciones en el municipio de San Benito deben cumplir con:</p>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>Código de Edificación Municipal</li>
                <li>Ordenanza de Uso del Suelo</li>
                <li>Reglamentaciones sobre retiros y factores de ocupación</li>
                <li>Normativas de seguridad e higiene</li>
              </ul>
            </div>
          </div>
        </div>
      </SeccionContenidoTramite>
    </main>
  )
}
