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
      type: 'richText',
      name: 'contenido',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] })]
        },
      }),
    },
    {
      type: 'upload',
      relationTo: 'media',
      name: 'portada',
      label: 'Imagen de Portada',
      required: true,
    },
  ],
}
