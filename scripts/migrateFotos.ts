import config from '@payload-config'
import { defaultEditorConfig } from '@payloadcms/richtext-lexical'
import { getPayload } from 'payload'

const OLD_API_URL = 'https://api.sanbenito.gob.ar/api'

// const yourEditorConfig // <= your editor config here
// const payloadConfig // <= your Payload Config here
const yourEditorConfig = defaultEditorConfig

async function seed() {
  // Get a local copy of Payload by passing your config
  const payload = await getPayload({ config })

  const url = `${OLD_API_URL}/web/noticias?page=7`

  const r = await fetch(url)
  const { data } = await r.json()

  if (!data || !data.length) return

  for (const noticia of data) {
    console.log(noticia.imageUrl)
    const resImagen = await fetch(noticia.imageUrl)
    const arrayBuffer = await resImagen.arrayBuffer()
    const buffer = Buffer.from(new Uint8Array(arrayBuffer))

    const mimetype = resImagen.headers.get('content-type') ?? 'image/*'

    const media = await payload.create({
      collection: 'media',
      data: {
        alt: noticia.title,
      },
      file: {
        data: buffer,
        size: buffer.length,
        name: noticia.slug,
        mimetype,
      },
    })

    await payload.create({
      collection: 'noticias',
      data: {
        titulo: noticia.title,
        slug: noticia.slug,
        descripcion: noticia.description,
        is_old: true,
        contenido_old: noticia.content,
        _status: 'published',
        portada: media,
        createdAt: noticia.created_at,
        updatedAt: noticia.updated_at,
      },
    })
  }
  console.log('LISTO!')
}

// Call the function here to run your seed script
await seed()
