import { YouTuveVideo } from '@/components/youtube-video'
import { basePayload } from '@/libs/payload'
import type { Imagen } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import styles from './page.module.css'

export default async function PruebaPage() {
  const noticias = await basePayload.find({
    collection: 'noticias',
  })

  return (
    <div>
      {noticias?.docs?.map((noticia) => (
        <article key={noticia.id} className={styles.noticia}>
          <h1>{noticia.titulo}</h1>
          <p>{noticia.descripcion}</p>
          <img alt={(noticia.portada as Imagen).alt} src={(noticia.portada as Imagen).url!} />
          <RichText data={noticia.contenido!} />
          {noticia.youtube_videos?.map((video) => <YouTuveVideo key={video.id} url={video.url} />)}
        </article>
      ))}
    </div>
  )
}
