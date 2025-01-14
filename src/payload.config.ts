import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { es } from 'payload/i18n/es'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { Media } from './collections/Media'
import { Noticias } from './collections/Noticias'
import { Prueba } from './collections/Test'
import { Users } from './collections/Users'
import { VariablesHabilitaciones } from './globals/Habilitaciones'
import { Variables } from './globals/Variables'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      afterDashboard: ['/components/redirect-ciudadano#RedirectCiudadano'],
    },
  },
  collections: [Users, Noticias, Media, Prueba],
  globals: [Variables, VariablesHabilitaciones],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI ?? '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  i18n: {
    fallbackLanguage: 'es',
    supportedLanguages: {
      es,
    },
  },
})
