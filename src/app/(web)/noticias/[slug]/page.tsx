import { basePayload } from '@/libs/payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import styles from './page.module.css'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string }>
}
export default async function PageNoticia({ params }: Props) {
  const { slug } = await params

  const { docs } = await basePayload.find({
    collection: 'noticias',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  if (!docs.length) return <div>No se encontro la noticia</div>
  const noticia = docs[0]

  if (noticia.is_old) {
    return (
      <div>
        Noticia antigua
        <section
          dangerouslySetInnerHTML={{ __html: noticia.contenido_old ?? '' }}
          className={styles.noticia}
        ></section>
      </div>
    )
  }

  return (
    <div>
      Noticia
      <RichText data={noticia.contenido!} className={styles.noticia} />
    </div>
  )
}

/* "
<p>Durante la mañana de este jueves, concretamos el primer encuentro en la Escuela Secundaria Evita 77, con estudiantes de 5 y 6 año.</p>
<p>El objetivo del programa provincial se enmarca en la necesidad de reflexionar acerca de dos aspectos fundamentales de la salud de los jóvenes
, como son la salud mental y la salud sexual y reproductiva, con el fin de promover su desarrollo integral.</p><p>Agradecemos al Gobierno 
Provincial este tipo de propuestas que nos acerca a los jóvenes. Nos acompañaron el Director de Juventud y Niñez de la Provincia, Facundo Suárez
, y en representación del Área Juventud Municipal, Milagros Cavallo.</p>
<img src="/api/media/file/acompanamos-acciones-para-promover-la-salud-joven-integral-0.jpg">
" 
*/
