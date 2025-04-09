import { accessCreate, accessDelete, accessRead, accessUpdate } from '@/access/collection'
import { CreatedBy } from '@/fields/created_by'
import { HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

const SLUG = 'noticias'

export const Noticias: CollectionConfig = {
  slug: SLUG,
  labels: {
    singular: 'Noticia',
    plural: 'Noticias',
  },
  versions: {
    drafts: {
      autosave: {
        interval: 500, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
  admin: {
    useAsTitle: 'titulo',
    livePreview: {
      url: ({ data }) => `${process.env.NEXT_PUBLIC_BASE_URL}/preview/noticias/${data.slug}`,
    },
    preview: (data) => `${process.env.NEXT_PUBLIC_BASE_URL}/preview/noticias/${data.slug}`,
    components: {
      views: {
        edit: {
          livePreview: {
            tab: {
              label: 'Modo en vivo',
            },
          },
        },
      },
    },
  },
  access: {
    create: async (args) => await accessCreate({ ...args, collection: SLUG }),
    read: async (args) => await accessRead({ ...args, collection: SLUG }),
    update: async (args) => await accessUpdate({ ...args, collection: SLUG }),
    delete: async (args) => await accessDelete({ ...args, collection: SLUG }),
  },
  fields: [
    CreatedBy,
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
      relationTo: 'imagenes',
      name: 'portada',
      label: 'Imagen de Portada',
      required: true,
    },
    {
      type: 'richText',
      name: 'contenido',
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
    {
      type: 'upload',
      name: 'archivos',
      label: 'Archivos adjuntos',
      relationTo: 'archivos',
      hasMany: true,
    },
    {
      type: 'checkbox',
      name: 'is_old',
      label: 'Es noticia vieja',
      defaultValue: false,
      required: true,
      admin: {
        disabled: true,
      },
    },
    {
      type: 'textarea',
      name: 'contenido_old',
      label: 'Contenido viejo',
      required: false,
      admin: {
        disabled: true,
      },
    },
  ],
}
