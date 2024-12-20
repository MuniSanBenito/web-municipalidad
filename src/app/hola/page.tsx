import config from '@payload-config'
import { getPayload } from 'payload'

export default async function HolaPage() {
  const payload = await getPayload({ config })
  const pruebas = await payload.find({ collection: 'prueba' })
  const prueba = await payload.findByID({ collection: 'prueba', id: 1 })
  console.log(pruebas, prueba)

  return (
    <div>
      {pruebas.docs.map((prueba) => (
        <div key={prueba.id}>
          <div dangerouslySetInnerHTML={{ __html: prueba.contenidoHTML ?? '' }} />
        </div>
      ))}
    </div>
  )
}
