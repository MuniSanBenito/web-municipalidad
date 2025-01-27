import { RefreshRouteOnSave } from '@/components/refresh-route-on-save'
import { YouTuveVideo } from '@/components/youtube-video'
import type { Media } from '@/payload-types'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import styles from './page.module.css'

type PageParams = {
  params: Promise<{
    slug?: string
  }>
}
export default async function Page({ params: paramsPromise }: PageParams) {
  const { slug = 'home' } = await paramsPromise
  const payload = await getPayload({ config })

  const { docs: noticias } = await payload.find({
    collection: 'noticias',
    draft: true,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  console.log(noticias)

  if (!noticias || !noticias.length || !noticias[0]) {
    return notFound()
  }

  const [noticia] = noticias

  return (
    <>
      <RefreshRouteOnSave />
      <article key={noticia.id} className={styles.noticia}>
        <h1>{noticia.titulo}</h1>
        <p>{noticia.descripcion}</p>
        <img alt={(noticia.portada as Media).alt} src={(noticia.portada as Media).url!} />
        <RichText data={noticia.contenido} />
        {noticia.youtube_videos?.map((video) => <YouTuveVideo key={video.id} url={video.url} />)}
      </article>
    </>
  )
}
