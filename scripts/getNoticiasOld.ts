import config from '@payload-config'
import {
  defaultEditorConfig,
  getEnabledNodes,
  sanitizeServerEditorConfig,
} from '@payloadcms/richtext-lexical'
import { $getRoot, $getSelection } from '@payloadcms/richtext-lexical/lexical'
import { createHeadlessEditor } from '@payloadcms/richtext-lexical/lexical/headless'
import { $generateNodesFromDOM } from '@payloadcms/richtext-lexical/lexical/html'
import { JSDOM } from 'jsdom'
import { getPayload } from 'payload'

const OLD_API_URL = 'https://api.sanbenito.gob.ar/api'

// const yourEditorConfig // <= your editor config here
// const payloadConfig // <= your Payload Config here
const yourEditorConfig = defaultEditorConfig

async function seed() {
  // Get a local copy of Payload by passing your config
  const payload = await getPayload({ config })

  const headlessEditor = createHeadlessEditor({
    nodes: getEnabledNodes({
      editorConfig: await sanitizeServerEditorConfig(yourEditorConfig, payload.config),
    }),
  })

  const url = `${OLD_API_URL}/web/noticias?page=6`

  const r = await fetch(url)
  const { data } = await r.json()

  const noticia = data[0]
  if (!noticia || !noticia.content) return

  headlessEditor.update(
    () => {
      // In a headless environment you can use a package such as JSDom to parse the HTML string.
      const dom = new JSDOM(noticia.content)

      // Once you have the DOM instance it's easy to generate LexicalNodes.
      const nodes = $generateNodesFromDOM(headlessEditor, dom.window.document)

      // Select the root
      $getRoot().select()

      // Insert them at a selection.
      const selection = $getSelection()
      selection?.insertNodes(nodes)
    },
    { discrete: true },
  )

  // Do this if you then want to get the editor JSON
  const editorJSON = headlessEditor.getEditorState().toJSON()

  const resImagen = await fetch(noticia.imageUrl)
  const imagen = await resImagen.blob()

  console.log(resImagen, imagen)

  const media = await payload.create({
    collection: 'imagenes',
    data: {
      alt: noticia.title,
      url: URL.createObjectURL(imagen),
      thumbnailURL: URL.createObjectURL(imagen),
      filename: noticia.title,
      mimeType: imagen.type,
      filesize: imagen.size,
    },
  })

  /* await payload.create({
    collection: 'noticias',
    data: {
      titulo: noticia.title,
      slug: noticia.slug,
      descripcion: noticia.description,
      contenido: editorJSON,
      _status: 'published',
      portada: media.id,
    },
  }) */

  //   console.log(editorJSON)
}

// Call the function here to run your seed script
await seed()
