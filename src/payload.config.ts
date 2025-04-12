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
import { Archivos } from './payload/collections/Archivos'
import { Avatares } from './payload/collections/Avatares'
import { Imagenes } from './payload/collections/Imagenes'
import { Users } from './payload/collections/Users'
import { COLLECTIONS, GLOBALS, Permisos } from './payload/globals/Permisos'

const accountId = process.env.R2_ACCOUNT_ID
const accessKeyId = process.env.R2_ACCESS_KEY_ID!
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY!
const bucket = process.env.R2_BUCKET!
const storagePlugin = s3Storage({
  collections: {
    [Imagenes.slug]: {
      prefix: 'imagenes',
    },
    [Archivos.slug]: {
      prefix: 'archivos',
    },
    [Avatares.slug]: {
      prefix: 'avatares',
    },
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
  collections: COLLECTIONS,
  globals: [...GLOBALS, Permisos],
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
