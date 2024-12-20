import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Prueba: CollectionConfig = {
  slug: 'prueba',
  fields: [
    {
      type: 'richText',
      name: 'contenido',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures, rootFeatures }) => {
          return [...defaultFeatures, ...rootFeatures, HTMLConverterFeature({})]
        },
      }),
    },
    lexicalHTML('contenido', { name: 'contenidoHTML' }),
  ],
}
