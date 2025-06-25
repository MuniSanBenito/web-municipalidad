import type { Archivo } from '@/payload-types'
import PageTitle from '@/web/components/ui/PageTitle'
import { basePayload } from '@/web/lib/payload'
import { IconArrowLeft, IconCalendar, IconDownload, IconFile } from '@tabler/icons-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Documento {
  id: string
  filename: string
  url: string
  createdAt?: string
  updatedAt?: string
  created_by?: any
  prefix?: string
  mimeType?: string
  filesize?: number
  thumbnailURL?: string | null
}

interface Licitacion {
  id: string
  titulo: string
  descripcion: { root: any }
  fecha: string
  estado: 'en_proceso' | 'adjudicada' | 'cancelada'
  documento?: Documento | string
  archivos_adicionales?: Array<Documento | string>
  createdAt?: string
  updatedAt?: string
  created_by?: any
}

type Props = {
  params: Promise<{ slug: string }>
}

export default async function LicitacionDetalle({ params }: Props) {
  const { slug } = await params
  // Obtener la licitación específica usando el slug (id)
  const licitacion = await basePayload
    .findByID({
      collection: 'licitaciones',
      id: slug,
    })
    .catch(() => null)

  // Si no se encuentra la licitación, mostrar página 404
  if (!licitacion) {
    notFound()
  }

  // Función para convertir el objeto rich text a HTML
  const richTextToHTML = (richText: any) => {
    if (!richText || !richText.root || !richText.root.children) {
      return ''
    }

    // Aquí deberías implementar la lógica para convertir el rich text a HTML
    // Esta es una implementación básica, puede que necesites ajustarla según tu editor
    return richText.root.children
      .map((node: any) => {
        if (node.type === 'paragraph') {
          return `<p>${node.children.map((child: any) => child.text || '').join('')}</p>`
        }
        return ''
      })
      .join('')
  }

  const descripcionHTML = richTextToHTML(licitacion.descripcion)
  // Eliminamos la referencia a resultados ya que no existe en el objeto
  // const resultadosHTML = licitacion.resultados ? richTextToHTML(licitacion.resultados) : '';

  console.log(licitacion?.archivos_adicionales)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link
          href="/transparencia/contabilidad/licitaciones"
          className="btn btn-outline btn-sm gap-2"
        >
          <IconArrowLeft size={16} />
          <span>Volver a licitaciones</span>
        </Link>
      </div>

      <PageTitle title={licitacion.titulo} />

      <div className="bg-base-100 mb-8 rounded-lg p-6 shadow-md">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-gray-500">
          <IconCalendar size={20} />
          <span>Fecha: {new Date(licitacion.fecha).toLocaleDateString('es-AR')}</span>
          <span
            className={`ml-auto rounded-full px-3 py-1 ${
              licitacion.estado === 'en_proceso'
                ? 'bg-blue-100 text-blue-800'
                : licitacion.estado === 'adjudicada'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
            }`}
          >
            {licitacion.estado === 'en_proceso'
              ? 'En proceso'
              : licitacion.estado === 'adjudicada'
                ? 'Adjudicada'
                : 'Cancelada'}
          </span>
        </div>

        <div className="prose max-w-none">
          <h2 className="mb-4 text-xl font-semibold">Descripción</h2>
          <div dangerouslySetInnerHTML={{ __html: descripcionHTML }} />
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">Documentos</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {licitacion.documento && (
              <a
                href={(licitacion?.documento as Archivo)?.url!}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary gap-2"
              >
                <IconFile size={20} />
                <span>Pliego de licitación: {(licitacion.documento as Archivo).filename}</span>
              </a>
            )}
            {licitacion.archivos_adicionales?.map(({ archivo }, index) => (
              <a
                key={index}
                href={(archivo as Archivo).url ?? ''}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline gap-2"
              >
                <IconDownload size={20} />
                <span>{(archivo as Archivo).filename}</span>
              </a>
            ))}
          </div>
        </div>

        {licitacion.estado === 'adjudicada' && (
          <div className="mt-8 rounded-lg bg-green-50 p-4">
            <h2 className="mb-4 text-xl font-semibold text-green-800">
              Resultados de la Licitación
            </h2>
            {/* Eliminamos las referencias a propiedades que no existen en el objeto */}
            {/* 
            {licitacion.empresaAdjudicada && (
              <p className="mb-2"><strong>Empresa adjudicada:</strong> {licitacion.empresaAdjudicada}</p>
            )}
            {licitacion.montoAdjudicado && (
              <p className="mb-2"><strong>Monto adjudicado:</strong> ${licitacion.montoAdjudicado.toLocaleString('es-AR')}</p>
            )}
            {resultadosHTML && (
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Detalles adicionales:</h3>
                <div dangerouslySetInnerHTML={{ __html: resultadosHTML }} />
              </div>
            )}
            */}
            <p>La información detallada sobre la adjudicación estará disponible próximamente.</p>
          </div>
        )}
      </div>
    </div>
  )
}
