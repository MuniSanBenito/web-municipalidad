import { CertificadoHabilitacion } from '@/web/components/certificado-habilitacion'
import { basePayload } from '@/web/lib/payload'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ token: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Validación de Habilitación Comercial',
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function ValidarHabilitacionPage({ params }: Props) {
  const { token } = await params

  const result = await basePayload.find({
    collection: 'comercios-habilitados',
    where: { tokenValidacion: { equals: token } },
    depth: 1,
    limit: 1,
  })

  if (result.docs.length === 0) return notFound()

  const comercio = result.docs[0] as any

  const rubroNombre =
    comercio.rubro && typeof comercio.rubro === 'object'
      ? (comercio.rubro as { nombre: string }).nombre
      : null

  return (
    <main className="bg-base-200 min-h-screen px-4 py-8 md:py-12">
      <CertificadoHabilitacion
        nombre={comercio.nombre}
        razonSocial={comercio.razonSocial}
        cuit={comercio.cuit}
        direccion={comercio.direccion}
        fechaAlta={comercio.fechaAlta ?? null}
        fechaBaja={comercio.fechaBaja ?? null}
        urlValidacion={comercio.urlValidacion ?? null}
        numeroHabilitacion={comercio.numeroHabilitacion ?? null}
        rubroNombre={rubroNombre}
      />

      <div className="no-print mt-6 text-center">
        <a
          href="/tramites/habilitaciones/comercios-habilitados"
          className="btn btn-ghost btn-sm text-gray-500"
        >
          ← Ver todos los comercios habilitados
        </a>
      </div>
    </main>
  )
}
