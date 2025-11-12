import type { Noticia } from '@/payload-types'
import { TemplateNoticia } from '@/web/components/template-noticia'
import { basePayload } from '@/web/lib/payload'
import { IconNewsOff } from '@tabler/icons-react'
import type { Metadata } from 'next'
import Link from 'next/link'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: PageProps<'/noticias/[slug]'>): Promise<Metadata> {
  const { slug } = await params

  const { docs } = await basePayload.find({
    collection: 'noticias',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const noticia = docs[0] as Noticia | undefined

  if (!noticia) {
    return {
      title: 'Noticia no encontrada',
    }
  }

  // const previousImages = (await parent).openGraph?.images || []

  let portada = noticia.portada
  if (typeof portada === 'string') {
    portada = await basePayload.findByID({
      collection: 'imagenes',
      id: portada,
    })
  }

  const imageUrl = portada
    ? `https://sanbenito.gob.ar${portada.url}`
    : 'https://sanbenito.gob.ar/images/og-image.png' // Fallback OG image

  return {
    title: noticia.titulo,
    description:
      noticia.descripcion ||
      `Noticia publicada por la Municipalidad de San Benito: ${noticia.titulo}`,
    keywords: [
      'noticia',
      'san benito',
      'municipalidad',
      'actualidad',
      ...(noticia.titulo?.split(' ').slice(0, 5) || []),
    ],
    authors: [{ name: 'Municipalidad de San Benito' }],
    alternates: {
      canonical: `https://sanbenito.gob.ar/noticias/${slug}`,
    },
    openGraph: {
      title: noticia.titulo,
      description:
        noticia.descripcion ||
        `Noticia publicada por la Municipalidad de San Benito: ${noticia.titulo}`,
      url: `https://sanbenito.gob.ar/noticias/${slug}`,
      siteName: 'Municipalidad de San Benito',
      locale: 'es_AR',
      type: 'article',
      publishedTime: noticia.createdAt,
      modifiedTime: noticia.updatedAt,
      authors: ['Municipalidad de San Benito'],
      section: 'Noticias',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: noticia.titulo,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: noticia.titulo,
      description:
        noticia.descripcion ||
        `Noticia publicada por la Municipalidad de San Benito: ${noticia.titulo}`,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function PageNoticia({ params }: PageProps<'/noticias/[slug]'>) {
  const { slug } = await params

  const { docs } = await basePayload.find({
    collection: 'noticias',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  if (!docs.length) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <IconNewsOff size={64} className="text-base-content/30 mb-4" />
        <p className="text-2xl font-bold">Noticia no encontrada</p>
        <p className="text-base-content/70 mt-2">
          El enlace puede ser incorrecto o la noticia ha sido eliminada.
        </p>
        <Link href="/noticias" className="btn btn-primary mt-6">
          Volver a Noticias
        </Link>
      </div>
    )
  }

  const noticia = docs[0]

  return <TemplateNoticia noticia={noticia} />
}
