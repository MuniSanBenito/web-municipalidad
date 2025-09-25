import { RefreshRouteOnSave } from '@/web/components/refresh-route-on-save'
import { TemplateNoticia } from '@/web/components/template-noticia'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

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

  if (!noticias || !noticias.length || !noticias[0]) {
    return notFound()
  }

  const [noticia] = noticias

  return (
    <>
      <RefreshRouteOnSave />
      <TemplateNoticia noticia={noticia} />
    </>
  )
}
