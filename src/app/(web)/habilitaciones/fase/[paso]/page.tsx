import type { Ciudadano } from '@/payload-types'
import { ExpedienteFase1Form } from '@/web/components/expediente-fase1-form'
import { ExpedienteFase2Form } from '@/web/components/expediente-fase2-form'
import { ExpedienteFase3Form } from '@/web/components/expediente-fase3-form'
import { basePayload } from '@/web/lib/payload'
import {
  IconArrowLeft,
  IconBuildingStore,
  IconCircleCheck,
  IconLock,
} from '@tabler/icons-react'
import { headers as nextHeaders } from 'next/headers'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

interface Props {
  params: Promise<{ paso: string }>
}

export default async function HabilitacionFasePage({ params }: Props) {
  const { paso } = await params
  const pasoNum = parseInt(paso, 10)

  if (![1, 2, 3].includes(pasoNum)) notFound()

  const headers = await nextHeaders()
  const { user } = await basePayload.auth({ headers, canSetHeaders: false })

  if (!user) redirect('/login')
  if (user.collection !== 'ciudadanos') redirect('/habilitaciones')

  const ciudadano = user as Ciudadano

  // Buscar el expediente activo del ciudadano
  const { docs } = await basePayload.find({
    collection: 'expedientes-habilitacion' as any,
    where: { 'created_by.value': { equals: ciudadano.id } },
    limit: 1,
    sort: '-createdAt',
    depth: 0,
  })

  const expediente = docs[0] as any | null

  // Validaciones de acceso por paso
  if (pasoNum === 1 && expediente?.faseIEstado) {
    // Ya envió el paso 1 — no puede re-enviarlo
    redirect('/habilitaciones')
  }

  if (pasoNum === 2) {
    if (!expediente) redirect('/habilitaciones')
    if (expediente.faseIEstado !== 'APROBADO') redirect('/habilitaciones')
    if (expediente.faseIIEstado) redirect('/habilitaciones')
  }

  if (pasoNum === 3) {
    if (!expediente) redirect('/habilitaciones')
    if (expediente.faseIEstado !== 'APROBADO' || expediente.faseIIEstado !== 'APROBADO') {
      redirect('/habilitaciones')
    }
    if (expediente.faseIIIEstado) redirect('/habilitaciones')
  }

  // Datos para el formulario
  const [{ docs: rubros }, { docs: actividades }] = await Promise.all([
    pasoNum === 2
      ? basePayload.find({ collection: 'rubros-comercios', limit: 200, sort: 'nombre' })
      : Promise.resolve({ docs: [] }),
    pasoNum === 2
      ? basePayload.find({ collection: 'actividades-comercios', limit: 200, sort: 'nombre' })
      : Promise.resolve({ docs: [] }),
  ])

  const pasoMeta = [
    { titulo: 'Permiso de Uso', subtitulo: 'Verificación de aptitud edilicia — Obras Privadas', paso: 1 },
    { titulo: 'Habilitación Comercial', subtitulo: 'Presentación de requisitos — Habilitaciones y Bromatología', paso: 2 },
    { titulo: 'Alta Fiscal', subtitulo: 'Emisión del Certificado de Habilitación — Rentas', paso: 3 },
  ]
  const meta = pasoMeta[pasoNum - 1]

  return (
    <main className="bg-base-100 min-h-screen">
      <div className="container mx-auto max-w-3xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/habilitaciones"
            className="text-base-content/60 hover:text-base-content mb-4 flex items-center gap-1 text-sm transition-colors"
          >
            <IconArrowLeft size={16} />
            Volver a mi trámite
          </Link>

          <div className="flex items-center gap-3">
            <div className="bg-primary/10 rounded-box p-2.5">
              <IconBuildingStore size={28} className="text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="badge badge-primary">Paso {pasoNum} de 3</span>
              </div>
              <h1 className="text-primary text-2xl font-bold">{meta.titulo}</h1>
              <p className="text-base-content/70 text-sm">{meta.subtitulo}</p>
            </div>
          </div>
        </div>

        {/* Stepper mini */}
        <div className="mb-8 flex items-center gap-2">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex flex-1 items-center gap-2">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  n < pasoNum
                    ? 'bg-success text-success-content'
                    : n === pasoNum
                      ? 'bg-primary text-primary-content'
                      : 'bg-base-300 text-base-content/40'
                }`}
              >
                {n < pasoNum ? <IconCircleCheck size={16} /> : n}
              </div>
              {n < 3 && (
                <div
                  className={`h-0.5 flex-1 ${n < pasoNum ? 'bg-success' : 'bg-base-300'}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Formulario según paso */}
        {pasoNum === 1 && <ExpedienteFase1Form />}
        {pasoNum === 2 && expediente && (
          <ExpedienteFase2Form
            expedienteId={expediente.id}
            rubros={rubros as any}
            actividades={actividades as any}
          />
        )}
        {pasoNum === 3 && expediente && (
          <ExpedienteFase3Form expedienteId={expediente.id} />
        )}
      </div>
    </main>
  )
}
