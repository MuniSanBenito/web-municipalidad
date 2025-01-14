import { HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Noticias: CollectionConfig = {
  slug: 'noticias',
  labels: {
    singular: 'Noticia',
    plural: 'Noticias',
  },
  admin: {
    useAsTitle: 'titulo',
  },
  fields: [
    {
      type: 'text',
      name: 'titulo',
      label: 'Titulo',
      required: true,
    },
    {
      type: 'text',
      name: 'slug',
      label: 'Slug',
      required: true,
      unique: true,
    },
    {
      type: 'textarea',
      name: 'descripcion',
      label: 'Descripcion',
      required: true,
    },
    {
      type: 'upload',
      relationTo: 'media',
      name: 'portada',
      label: 'Imagen de Portada',
      required: true,
    },
    {
      type: 'richText',
      name: 'contenido',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          const features = rootFeatures.filter((feature) => feature.key !== 'relationship')
          return [...features, HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] })]
        },
      }),
    },
    {
      type: 'array',
      name: 'youtube_videos',
      label: 'Videos de YouTube',
      labels: {
        singular: 'Video de YouTube',
        plural: 'Videos de YouTube',
      },
      fields: [
        {
          type: 'text',
          name: 'url',
          label: 'URL del video',
          required: true,
        },
      ],
    },
  ],
}
