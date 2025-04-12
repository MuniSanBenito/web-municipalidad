import {
  HeadingFeature,
  lexicalEditor,
  UploadFeature,
  type UploadFeatureProps,
} from '@payloadcms/richtext-lexical'
import type { Field } from 'payload'

type Args = {
  upload?: UploadFeatureProps
}

export function contenido({ upload }: Args): Field {
  return {
    type: 'richText',
    name: 'contenido',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        const features = rootFeatures.filter((feature) => feature.key !== 'relationship')
        const baseFeatures = [
          ...features,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
        ]
        if (!upload) return baseFeatures
        const withoutUploadFeature = features.filter((feature) => feature.key !== 'upload')
        return [...withoutUploadFeature, UploadFeature(upload)]
      },
    }),
  }
}
