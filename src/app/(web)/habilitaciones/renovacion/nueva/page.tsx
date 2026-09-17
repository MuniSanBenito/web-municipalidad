import type { Ciudadano } from '@/payload-types'
import { ExpedienteRenovacionForm } from '@/web/components/expediente-renovacion-form'
import {
  ciudadanoTieneModuloHabilitaciones,
  esTitularDelComercio,
} from '@/web/lib/habilitaciones'
import { basePayload } from '@/web/lib/payload'
import { IconArrowLeft, IconBuildingStore } from '@tabler/icons-react'
import { headers as nextHeaders } from 'next/headers'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

interface Props {
  searchParams: Promise<{ comercio?: string }>
}

export default async function NuevaRenovacionPage({ searchParams }: Props) {
  const { comercio: comercioId } = await searchParams
  if (!comercioId) notFound()

  const headers = await nextHeaders()
  const { user } = await basePayload.auth({ headers, canSetHeaders: false })
  if (!user) redirect('/login')
  if (user.collection !== 'ciudadanos') redirect('/habilitaciones')

  const ciudadano = user as Ciudadano
  if (!ciudadanoTieneModuloHabilitaciones(ciudadano)) redirect('/habilitaciones')

  let comercio: any
  try {
    comercio = await basePayload.findByID({
      collection: 'comercios-habilitados',
      id: comercioId,
      depth: 1,
      overrideAccess: false,
      user: ciudadano,
    })
  } catch {
    notFound()
  }

  if (!esTitularDelComercio(comercio.titulares, ciudadano.id)) redirect('/habilitaciones')
  if (comercio.fechaBaja && new Date(comercio.fechaBaja) <= new Date()) {
    redirect('/habilitaciones')
  }

  const { docs: abiertos } = await basePayload.find({
    collection: 'expedientes-renovacion',
    where: {
      and: [
        { comercio: { equals: comercioId } },
        { 'created_by.value': { equals: ciudadano.id } },
        { estado: { not_equals: 'APROBADO' } },
      ],
    },
    limit: 1,
    depth: 0,
  })
  if (abiertos.length > 0) {
    redirect(`/habilitaciones/renovacion/${abiertos[0].id}`)
  }

  const rubroNombre =
    comercio.rubro && typeof comercio.rubro === 'object' ? comercio.rubro.nombre : null

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
            <h1 className="text-primary text-2xl font-bold">Renovar habilitación</h1>
            <p className="text-base-content/70 text-sm">
              Presentá la documentación. El área de Habilitaciones revisa el expediente y puede
              solicitar una visita o documentación adicional según el rubro.
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
          solicitanteDefaults={{
            nombre: [ciudadano.nombre, ciudadano.apellido].filter(Boolean).join(' '),
            dni: ciudadano.dni,
            domicilio: ciudadano.domicilio ?? undefined,
            telefono: ciudadano.telefono ?? undefined,
            email: ciudadano.email,
          }}
        />
      </div>
    </main>
  )
}
