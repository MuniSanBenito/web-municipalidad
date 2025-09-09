import type { Metadata } from 'next'

interface MetadataProps {
  title?: string
  description?: string
  image?: string
  url?: string
  keywords?: string[]
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
}

export function generateMetadata({
  title,
  description = 'Portal oficial de la Municipalidad de San Benito. Trámites en línea, noticias, agenda de eventos y servicios municipales.',
  image = '/images/og-image.png',
  url,
  keywords = [],
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
}: MetadataProps = {}): Metadata {
  const baseUrl = 'https://sanbenito.gob.ar'
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`

  const metadata: Metadata = {
    title,
    description,
    keywords: [
      'municipalidad',
      'san benito',
      'tramites',
      'gobierno local',
      'servicios municipales',
      'argentina',
      ...keywords,
    ],
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: title || 'Municipalidad de San Benito',
      description,
      url: fullUrl,
      siteName: 'Municipalidad de San Benito',
      locale: 'es_AR',
      type,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title || 'Municipalidad de San Benito',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title || 'Municipalidad de San Benito',
      description,
      images: [fullImageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  }

  // Añadir metadatos específicos para artículos
  if (type === 'article' && metadata.openGraph) {
    const articleMetadata = metadata.openGraph as any
    articleMetadata.type = 'article'
    if (publishedTime) {
      articleMetadata.publishedTime = publishedTime
    }
    if (modifiedTime) {
      articleMetadata.modifiedTime = modifiedTime
    }
    if (author) {
      articleMetadata.authors = [author]
    }
    if (section) {
      articleMetadata.section = section
    }
  }

  return metadata
}

// Función para generar datos estructurados JSON-LD
export function generateStructuredData(
  type: 'WebSite' | 'Article' | 'GovernmentOrganization',
  data: any,
) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
  }

  switch (type) {
    case 'WebSite':
      return {
        ...baseData,
        name: 'Municipalidad de San Benito',
        url: 'https://sanbenito.gob.ar',
        description: 'Portal oficial de la Municipalidad de San Benito',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://sanbenito.gob.ar/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
        ...data,
      }

    case 'GovernmentOrganization':
      return {
        ...baseData,
        name: 'Municipalidad de San Benito',
        url: 'https://sanbenito.gob.ar',
        logo: 'https://sanbenito.gob.ar/images/logo.webp',
        description: 'Gobierno municipal de San Benito',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'AR',
          addressLocality: 'San Benito',
          addressRegion: 'Entre Ríos',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          availableLanguage: 'Spanish',
        },
        ...data,
      }

    case 'Article':
      return {
        ...baseData,
        headline: data.title,
        description: data.description,
        image: data.image,
        datePublished: data.publishedTime,
        dateModified: data.modifiedTime,
        author: {
          '@type': 'Organization',
          name: 'Municipalidad de San Benito',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Municipalidad de San Benito',
          logo: {
            '@type': 'ImageObject',
            url: 'https://sanbenito.gob.ar/images/logo.webp',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url,
        },
        ...data,
      }

    default:
      return baseData
  }
}
