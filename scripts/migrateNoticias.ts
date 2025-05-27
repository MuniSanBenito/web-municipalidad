import config from '@payload-config'
import { getPayload } from 'payload'

const OLD_API_URL = 'https://api.sanbenito.gob.ar/api'

const SLUGS = [
  // 'san-benito-plantacion-de-272-arboles-nativos-como-parte-del-convenio-con-uader',
  'emprendedores-locales-participan-de-nuestras-ferias',
  'castracion-y-colocacion-de-antirrabica',
  'presentacion-del-libro-los-furlanos',
]

const NOTICIA_PREFIX = 'noticia_'
const ADJUNTO_PREFIX = 'adjunto_'

async function seed() {
  try {
    // Get a local copy of Payload by passing your config
    const payload = await getPayload({ config })

    for (const slug of SLUGS) {
      const url = `${OLD_API_URL}/web/noticias/${slug}`
      console.log(url)
      const r = await fetch(url)
      const noticia = await r.json()
      if (!noticia) continue

      const { content, files, ...restOfNoticia } = noticia
      console.log(restOfNoticia)
      const resImagen = await fetch(noticia.imageUrl)
      const arrayBuffer = await resImagen.arrayBuffer()
      const buffer = Buffer.from(new Uint8Array(arrayBuffer))

      const mimetype = resImagen.headers.get('content-type') ?? 'image/*'

      /* const media = await payload.create({
        collection: 'imagenes',
        data: {
          alt: noticia.title,
        },
        file: {
          data: buffer,
          size: buffer.length,
          name: NOTICIA_PREFIX + noticia.slug,
          mimetype,
        },
      })

      const dom = new JSDOM(noticia.content)

      const imagenesContenido = dom.window.document.querySelectorAll('img')
      let index = 0
      for (const imagen of imagenesContenido) {
        if (imagen.src.startsWith('data:image')) {
          console.log('convertir fotito')
          // si es base 64 debemos convertirlo a buffer para poder subirlo
          const data = imagen.src.split(',')[1]
          // Remover espacios en blanco y saltos de línea si existen
          const base64Clean = data.trim().replace(/\s/g, '').replace(/\n/g, '')
          const arrayBuffer = Buffer.from(base64Clean, 'base64')
          const buffer = Buffer.from(new Uint8Array(arrayBuffer))
          // con la imagen obtenida, creamos el media y reemplazamos el src de la imagen del dom.window.document por la url del nuevo media
          const media = await payload.create({
            collection: 'imagenes',
            data: {
              alt: noticia.title + '-' + index,
            },
            file: {
              data: buffer,
              size: buffer.length,
              name: NOTICIA_PREFIX + noticia.slug + '-' + index,
              mimetype,
            },
          })
          console.log(media.url)
          imagen.src = media.url!
        }
        index++
      }

      console.log('adjuntos: ', files)

      let uploadFiles: Archivo[] = []
      if (files?.length) {
        for (const file of files) {
          const resFile = await fetch(file.url)
          const arrayBuffer = await resFile.arrayBuffer()
          const buffer = Buffer.from(new Uint8Array(arrayBuffer))

          const mimetype = resFile.headers.get('content-type') ?? 'image/*'

          const uploadFile = await payload.create({
            collection: 'archivos',
            data: {},
            file: {
              data: buffer,
              size: buffer.length,
              name: ADJUNTO_PREFIX + file.name,
              mimetype,
            },
          })
          uploadFiles.push(uploadFile)
        }
      }
      console.log(uploadFiles)

      await payload.create({
        collection: 'noticias',
        data: {
          titulo: noticia.title,
          slug: noticia.slug,
          descripcion: noticia?.description || '-',
          is_old: true,
          contenido_old: dom.window.document.body.innerHTML,
          // contenido: editorJSON,
          _status: 'published',
          portada: media,
          createdAt: noticia.created_at,
          updatedAt: noticia.updated_at,
          archivos: uploadFiles,
        },
      }) */
    }

    /* let i = 1
    for (i = 1; i > 0; i--) {
      const url = `${OLD_API_URL}/web/noticias?page=${i}`
      console.log(url)
      const r = await fetch(url)
      const { data } = await r.json()
      if (!data || !data.length) continue

      for (const noticia of data) {
        const { content, ...restOfNoticia } = noticia
        console.log(restOfNoticia)
        const resImagen = await fetch(noticia.imageUrl)
        const arrayBuffer = await resImagen.arrayBuffer()
        const buffer = Buffer.from(new Uint8Array(arrayBuffer))

        const mimetype = resImagen.headers.get('content-type') ?? 'image/*'

        const portada = await payload.create({
          collection: 'imagenes',
          data: {
            alt: noticia.title,
          },
          file: {
            data: buffer,
            size: buffer.length,
            name: NOTICIA_PREFIX + noticia.slug,
            mimetype,
          },
        })

        const dom = new JSDOM(noticia.content)

        const imagenesContenido = dom.window.document.querySelectorAll('img')
        let index = 0
        for (const imagen of imagenesContenido) {
          if (imagen.src.startsWith('data:image')) {
            console.log('convertir fotito')
            // si es base 64 debemos convertirlo a buffer para poder subirlo
            const data = imagen.src.split(',')[1]
            // Remover espacios en blanco y saltos de línea si existen
            const base64Clean = data.trim().replace(/\s/g, '').replace(/\n/g, '')
            const arrayBuffer = Buffer.from(base64Clean, 'base64')
            const buffer = Buffer.from(new Uint8Array(arrayBuffer))
            // con la imagen obtenida, creamos el media y reemplazamos el src de la imagen del dom.window.document por la url del nuevo media
            const media = await payload.create({
              collection: 'imagenes',
              data: {
                alt: noticia.title + '-' + index,
              },
              file: {
                data: buffer,
                size: buffer.length,
                name: NOTICIA_PREFIX + noticia.slug + '-' + index,
                mimetype,
              },
            })
            console.log(media.url)
            imagen.src = media.url!
          }
          index++
        }

        const rNoticia = await fetch(`${OLD_API_URL}/web/noticias/${noticia.slug}`)
        const { files } = await rNoticia.json()

        console.log('adjuntos: ', files)

        let uploadFiles: Archivo[] = []
        if (files?.length) {
          for (const file of files) {
            const resFile = await fetch(file.url)
            const arrayBuffer = await resFile.arrayBuffer()
            const buffer = Buffer.from(new Uint8Array(arrayBuffer))

            const mimetype = resFile.headers.get('content-type') ?? 'image/*'

            const uploadFile = await payload.create({
              collection: 'archivos',
              data: {},
              file: {
                data: buffer,
                size: buffer.length,
                name: ADJUNTO_PREFIX + file.name,
                mimetype,
              },
            })
            uploadFiles.push(uploadFile)
          }
        }
        console.log(uploadFiles)

        await payload.create({
          collection: 'noticias',
          data: {
            titulo: noticia.title,
            slug: noticia.slug,
            descripcion: noticia?.description || '-',
            is_old: true,
            contenido_old: dom.window.document.body.innerHTML,
            // contenido: editorJSON,
            _status: 'published',
            portada,
            createdAt: noticia.created_at,
            updatedAt: noticia.updated_at,
            archivos: uploadFiles,
          },
        })
      }
    } */

    console.log('LISTO!')
  } catch (error) {
    console.error(error)
  }
}

// Call the function here to run your seed script
await seed()
