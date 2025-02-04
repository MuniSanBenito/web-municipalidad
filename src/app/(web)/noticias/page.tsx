import { basePayload } from '@/libs/payload'

export default async function PageNoticias() {
  const noticias = await basePayload.find({
    collection: 'noticias',
  })

  return <div>Noticias</div>
}
