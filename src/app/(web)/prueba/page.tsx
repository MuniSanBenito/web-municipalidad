import { payload } from '@/libs/payload'
import type { Media } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import styles from './page.module.css'

function YouTuveVideo(props: { url: string }) {
  try {
    const url = new URL(props.url)
    const videoId = url.searchParams.get('v')
    if (!videoId) return null

    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="aspect-video w-full max-w-lg"
      ></iframe>
    )
  } catch (error) {
    return null
  }
}

export default async function PruebaPage() {
  const noticias = await payload.find({
    collection: 'noticias',
  })

  return (
    <div>
      {noticias?.docs?.map((noticia) => (
        <article key={noticia.id}>
          <h1>{noticia.titulo}</h1>
          <p>{noticia.descripcion}</p>
          <img alt={(noticia.portada as Media).alt} src={(noticia.portada as Media).url!} />
          <RichText data={noticia.contenido} className={styles.noticia} />
          {noticia.youtube_videos?.map((video) => <YouTuveVideo key={video.id} url={video.url} />)}
        </article>
      ))}
    </div>
  )
}
