import { YouTuveVideo } from '@/components/youtube-video'
import { basePayload } from '@/libs/payload'
import type { Media } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import styles from './page.module.css'

export default async function PruebaPage() {
  const payload = await basePayload
  const noticias = await payload.find({
    collection: 'noticias',
  })

  return (
    <div>
      {noticias?.docs?.map((noticia) => (
        <article key={noticia.id} className={styles.noticia}>
          <h1>{noticia.titulo}</h1>
          <p>{noticia.descripcion}</p>
          <img alt={(noticia.portada as Media).alt} src={(noticia.portada as Media).url!} />
          <RichText data={noticia.contenido} />
          {noticia.youtube_videos?.map((video) => <YouTuveVideo key={video.id} url={video.url} />)}
        </article>
      ))}
    </div>
  )
}
