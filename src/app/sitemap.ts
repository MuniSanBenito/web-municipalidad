import { basePayload } from '@/web/lib/payload'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sanbenito.gob.ar'

  // Páginas estáticas principales
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/noticias`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/agenda`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tramites`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/transparencia`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/nuestra-ciudad`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/habilitaciones`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  // Trámites específicos
  const tramitesRoutes: MetadataRoute.Sitemap = [
    'licencia',
    'catastro',
    'rentas',
    'habilitaciones',
    'obras-privadas',
    'mesa-de-entrada',
    'actividades-deportivas',
    'area-mujer',
    'cav',
    'cic-barrio-san-pedro',
    'produccion-empleo',
    'punto-digital-biblioteca',
    'talleres-culturales',
    'tercera-edad-discapacidad',
  ].map((tramite) => ({
    url: `${baseUrl}/tramites/${tramite}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Secciones de transparencia
  const transparenciaRoutes: MetadataRoute.Sitemap = [
    'estructura-municipal',
    'gestion',
    'contabilidad',
    'memorias',
    'obras',
    'intimaciones-publicas',
    'ide',
  ].map((seccion) => ({
    url: `${baseUrl}/transparencia/${seccion}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  // Secciones de nuestra ciudad
  const ciudadRoutes: MetadataRoute.Sitemap = [
    'san-benito',
    'gobierno',
    'bandera',
    'lineas-colectivos',
  ].map((seccion) => ({
    url: `${baseUrl}/nuestra-ciudad/${seccion}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  try {
    // Obtener noticias dinámicas
    const noticias = await basePayload.find({
      collection: 'noticias',
      where: {
        _status: {
          equals: 'published',
        },
      },
      limit: 1000, // Ajustar según necesidades
      sort: '-createdAt',
    })

    const noticiasRoutes: MetadataRoute.Sitemap = noticias.docs.map((noticia) => ({
      url: `${baseUrl}/noticias/${noticia.slug}`,
      lastModified: new Date(noticia.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    return [
      ...staticRoutes,
      ...tramitesRoutes,
      ...transparenciaRoutes,
      ...ciudadRoutes,
      ...noticiasRoutes,
    ]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // En caso de error, devolver solo las rutas estáticas
    return [...staticRoutes, ...tramitesRoutes, ...transparenciaRoutes, ...ciudadRoutes]
  }
}
