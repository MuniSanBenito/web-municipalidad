import { CertificadoHabilitacion } from '@/web/components/certificado-habilitacion'
import {
  IconCircleCheck,
  IconClock,
  IconFileText,
} from '@tabler/icons-react'

interface ComercioData {
  id: string
  nombre: string
  razonSocial: string
  cuit: string
  fechaAlta?: string | null
  fechaBaja?: string | null
  direccion: string
  urlValidacion?: string | null
  rubro?: { nombre: string } | string | null
}

interface Props {
  faseIIIEstado?: string | null
  notaCiudadano?: string | null
  comercio?: ComercioData | null
}


export function ExpedienteFase3Form({ faseIIIEstado, notaCiudadano, comercio }: Props) {
  const isAprobado = faseIIIEstado === 'APROBADO'
  const rubroNombre =
    comercio?.rubro && typeof comercio.rubro === 'object'
      ? (comercio.rubro as { nombre: string }).nombre
      : null

  return (
    <div className="space-y-6">
      {/* Estado principal */}
      {isAprobado && comercio ? (
        <div className="no-print card border-success/30 bg-success/5 border-2 shadow">
          <div className="card-body p-5">
            <div className="flex items-center gap-3">
              <IconCircleCheck size={32} className="text-success shrink-0" />
              <div>
                <h3 className="text-success text-lg font-bold">¡Habilitación otorgada!</h3>
                <p className="text-base-content/70 text-sm">
                  Tu comercio fue habilitado por la Municipalidad de San Benito.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-print card border-info/30 bg-info/5 border-2 shadow">
          <div className="card-body p-5">
            <div className="flex items-center gap-3">
              <IconClock size={28} className="text-info shrink-0" />
              <div>
                <h3 className="font-bold">Alta Fiscal en proceso</h3>
                <p className="text-base-content/70 text-sm">
                  El equipo de Rentas está procesando tu Alta Fiscal y emitirá el Certificado de
                  Habilitación. Te notificaremos por correo cuando esté disponible.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nota del admin al ciudadano */}
      {notaCiudadano && (
        <div className="no-print alert alert-info">
          <IconFileText size={16} className="shrink-0" />
          <p className="text-sm">{notaCiudadano}</p>
        </div>
      )}

      {/* Certificado oficial — solo cuando APROBADO y hay comercio vinculado */}
      {isAprobado && comercio && (
        <CertificadoHabilitacion
          nombre={comercio.nombre}
          razonSocial={comercio.razonSocial}
          cuit={comercio.cuit}
          direccion={comercio.direccion}
          fechaAlta={comercio.fechaAlta}
          fechaBaja={comercio.fechaBaja}
          urlValidacion={comercio.urlValidacion}
          numeroHabilitacion={(comercio as any).numeroHabilitacion ?? null}
          rubroNombre={rubroNombre}
          showActions
        />
      )}

      {/* Qué sucede — visible mientras esperan */}
      {!isAprobado && (
        <div className="no-print card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title text-primary mb-3 text-base">¿Qué sucede en este paso?</h3>
            <ul className="space-y-2">
              {[
                'Alta Comercial confeccionada por Rentas',
                'Firma de resolución por el Secretario de Gobierno',
                'Emisión del Certificado de Habilitación',
                'Capacitación para declaraciones juradas y Tasa Comercial mensual',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <IconCircleCheck size={14} className="text-success shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Contacto Rentas */}
      <div className="no-print alert">
        <IconFileText size={20} className="shrink-0" />
        <div className="text-sm">
          <p>
            Ante consultas sobre el Alta Fiscal, contactá a <strong>Rentas</strong>:{' '}
            <a href="tel:3436127015" className="link">
              3436127015
            </a>{' '}
            ·{' '}
            <a href="mailto:rentas@munisanbenito.gov.ar" className="link">
              rentas@munisanbenito.gov.ar
            </a>
          </p>
        </div>
      </div>

      <div className="no-print flex justify-start">
        <a href="/habilitaciones" className="btn btn-ghost">
          Volver a mi trámite
        </a>
      </div>
    </div>
  )
}
