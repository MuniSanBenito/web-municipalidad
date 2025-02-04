import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
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

const accountId = process.env.R2_ACCOUNT_ID
const accessKeyId = process.env.R2_ACCESS_KEY_ID!
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY!
const bucket = process.env.R2_BUCKET!
const storagePlugin = s3Storage({
  collections: {
    [Media.slug]: true,
  },
  config: {
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  },
  bucket,
})

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const email = nodemailerAdapter({
  defaultFromAddress: process.env.EMAIL_FROM_ADDRESS ?? '',
  defaultFromName: process.env.EMAIL_FROM_NAME ?? '',
  // Nodemailer transportOptions
  transportOptions: {
    host: process.env.EMAIL_SMTP_HOST,
    port: process.env.EMAIL_SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_AUTH_USER,
      pass: process.env.EMAIL_AUTH_PASS,
    },
  },
})

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '/brand/logo#Logo',
        Icon: '/brand/icon#Icon',
      },
      logout: {
        Button: '/components/logout-button#LogoutButton',
      },
      afterDashboard: ['/components/redirect-ciudadano#RedirectCiudadano'],
    },
    theme: 'light',
    avatar: 'default',
    meta: {
      titleSuffix: ' | San Benito',
      icons: [
        {
          rel: 'icon',
          type: 'image/webp',
          url: '/public/images/icon.webp',
        },
        {
          rel: 'apple-touch-icon',
          type: 'image/webp',
          url: '/public/images/icon.webp',
        },
        {
          rel: 'mask-icon',
          type: 'image/webp',
          url: '/public/images/icon.webp',
        },
      ],
    },
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
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
    storagePlugin,
    // storage-adapter-placeholder
  ],
  i18n: {
    fallbackLanguage: 'es',
    supportedLanguages: {
      es,
    },
  },
  email,
})
