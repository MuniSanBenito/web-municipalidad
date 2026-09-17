import type { Ciudadano } from '@/payload-types'
import { ExpedienteRenovacionForm } from '@/web/components/expediente-renovacion-form'
import { ciudadanoTieneModuloHabilitaciones } from '@/web/lib/habilitaciones'
import { basePayload } from '@/web/lib/payload'
import { IconArrowLeft, IconBuildingStore } from '@tabler/icons-react'
import { headers as nextHeaders } from 'next/headers'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

const ESTADOS_EDITABLES = ['INICIADO', 'OBSERVADO']

function fileMeta(v: any): { url?: string | null; filename?: string | null } | null {
  return v && typeof v === 'object' ? { url: v.url ?? null, filename: v.filename ?? null } : null
}

export default async function RenovacionDetallePage({ params }: Props) {
  const { id } = await params

  const headers = await nextHeaders()
  const { user } = await basePayload.auth({ headers, canSetHeaders: false })
  if (!user) redirect('/login')
  if (user.collection !== 'ciudadanos') redirect('/habilitaciones')

  const ciudadano = user as Ciudadano
  if (!ciudadanoTieneModuloHabilitaciones(ciudadano)) redirect('/habilitaciones')

  let renovacion: any
  try {
    renovacion = await basePayload.findByID({
      collection: 'expedientes-renovacion',
      id,
      depth: 1,
      overrideAccess: false,
      user: ciudadano,
    })
  } catch {
    notFound()
  }

  const comercio =
    renovacion.comercio && typeof renovacion.comercio === 'object' ? renovacion.comercio : null
  if (!comercio) notFound()

  const rubroNombre =
    comercio.rubro && typeof comercio.rubro === 'object' ? comercio.rubro.nombre : null

  const readOnly = !ESTADOS_EDITABLES.includes(renovacion.estado)

  return (
    <main className="bg-base-100 min-h-screen">
      <div className="container mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Link
          href="/habilitaciones"
          className="text-base-content/60 hover:text-base-content mb-4 flex items-center gap-1 text-sm transition-colors"
        >
          <IconArrowLeft size={16} />
          Volver a Habilitaciones
        </Link>
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-primary/10 rounded-box p-2.5">
            <IconBuildingStore size={28} className="text-primary" />
          </div>
          <div>
            <span className="badge badge-primary">Renovación</span>
            <h1 className="text-primary text-2xl font-bold">
              {readOnly ? 'Estado de la renovación' : 'Completar renovación'}
            </h1>
            <p className="text-base-content/70 text-sm">
              {renovacion.titulo ?? comercio.nombre}
            </p>
          </div>
        </div>
        <ExpedienteRenovacionForm
          comercioId={comercio.id}
          comercio={{
            nombre: comercio.nombre,
            razonSocial: comercio.razonSocial,
            cuit: comercio.cuit,
            direccion: comercio.direccion,
            numeroHabilitacion: comercio.numeroHabilitacion ?? null,
            rubroNombre,
          }}
          renovacionId={renovacion.id}
          isEdit
          readOnly={readOnly}
          estado={renovacion.estado}
          notaCiudadano={renovacion.notaCiudadano}
          fechaVisita={renovacion.fechaVisita}
          resolucion={fileMeta(renovacion.resolucion)}
          formularioInicio={fileMeta(renovacion.formularioInicio)}
          comprobanteSellado={fileMeta(renovacion.comprobanteSellado)}
          dniAdjunto={fileMeta(renovacion.dniAdjunto)}
          libreDeuda={fileMeta(renovacion.libreDeuda)}
          certResiduosPeligrosos={fileMeta(renovacion.certResiduosPeligrosos)}
          adjuntosOtros={
            Array.isArray(renovacion.adjuntosOtros)
              ? renovacion.adjuntosOtros
                  .filter((a: any) => a && typeof a === 'object')
                  .map((a: any) => ({ url: a.url ?? null, filename: a.filename ?? null }))
              : []
          }
          solicitanteDefaults={{
            nombre: [ciudadano.nombre, ciudadano.apellido].filter(Boolean).join(' '),
            dni: ciudadano.dni,
            domicilio: ciudadano.domicilio ?? undefined,
            telefono: ciudadano.telefono ?? undefined,
            email: ciudadano.email,
          }}
          solicitanteNombre={renovacion.solicitanteNombre}
          solicitanteDni={renovacion.solicitanteDni}
          solicitanteDomicilio={renovacion.solicitanteDomicilio}
          solicitanteTelefono={renovacion.solicitanteTelefono}
          solicitanteEmail={renovacion.solicitanteEmail}
          numeroExpedienteAnterior={renovacion.numeroExpedienteAnterior}
          librosTapaDura={renovacion.librosTapaDura}
          higieneSeguridad={renovacion.higieneSeguridad}
          generaResiduosPeligrosos={renovacion.generaResiduosPeligrosos}
          declaracionJurada={renovacion.declaracionJurada}
        />
      </div>
    </main>
  )
}
