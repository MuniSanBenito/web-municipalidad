import type { Imagen } from '@/payload-types'
import { YouTuveVideo } from '@/web/components/youtube-video'
import { basePayload } from '@/web/lib/payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
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
          {noticia.portada && (noticia.portada as Imagen).url ? (
            <Image
              src={(noticia.portada as Imagen).url || '/images/placeholder.jpg'}
              alt={(noticia.portada as Imagen).alt || 'Imagen de noticia'}
              width={800}
              height={450}
              className="h-64 w-full rounded-lg object-cover"
              priority={true}
            />
          ) : (
            <div className="bg-base-200 text-base-content/60 flex h-64 w-full items-center justify-center rounded-lg">
              <span>Sin imagen</span>
            </div>
          )}
          <RichText data={noticia.contenido!} />
          {noticia.youtube_videos?.map((video) => <YouTuveVideo key={video.id} url={video.url} />)}
        </article>
      ))}
    </div>
  )
}
