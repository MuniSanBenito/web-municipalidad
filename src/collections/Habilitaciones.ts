import { accessCreate, accessDelete, accessRead, accessUpdate } from '@/access/collection'
import { CreatedBy } from '@/fields/created_by'
import { HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

const SLUG = 'habilitaciones'

export const Habilitaciones: CollectionConfig = {
  slug: SLUG,
  labels: {
    singular: 'Habilitación',
    plural: 'Habilitaciones',
  },
  admin: {
    useAsTitle: 'nombre',
  },
  access: {
    create: async (args) => await accessCreate({ ...args, collection: SLUG }),
    read: async (args) => await accessRead({ ...args, collection: SLUG }),
    update: async (args) => await accessUpdate({ ...args, collection: SLUG }),
    delete: async (args) => await accessDelete({ ...args, collection: SLUG }),
  },
  fields: [
    {
      type: 'text',
      name: 'nombre',
      label: 'Nombre',
      required: true,
      unique: true,
    },
    {
      type: 'richText',
      name: 'contenido',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          const featuresWithoutRel = rootFeatures.filter(
            (feature) => feature.key !== 'relationship',
          )
          /* const featuresWithoutUpload = featuresWithoutRel.filter(
            (feature) => feature.key !== 'upload',
          ) */

          return [
            ...featuresWithoutRel,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            /* UploadFeature({
              collections: {
                archivos: {
                  fields: [],
                },
              },
            }), */
          ]
        },
      }),
    },
    {
      type: 'upload',
      name: 'adjuntos',
      label: 'Adjuntos',
      relationTo: 'archivos',
      hasMany: true,
    },
    CreatedBy,
  ],
}
