import type { Ciudadano, Curriculum } from '@/payload-types'
import config from '@payload-config'
import { getPayload } from 'payload'

async function seed() {
  try {
    // Get a local copy of Payload by passing your config
    const payload = await getPayload({ config })

    /* const { docs: cvs } = await payload.find({
      collection: 'curriculums',
      pagination: false,
    }) */

    const { docs: ciudadanos } = await payload.find({
      collection: 'ciudadanos',
      pagination: false,
    })

    let usersDuplicados = 0
    const duplicados: { cvs: Curriculum[]; ciudadano: Ciudadano }[] = []

    const cvsToUpdate: { ciudadano: Ciudadano; cv: Curriculum }[] = []

    for (const ciudadano of ciudadanos) {
      const titulo = `${ciudadano.nombre} ${ciudadano.apellido}`
      const data = await payload.find({
        collection: 'curriculums',
        where: {
          titulo: {
            equals: titulo,
          },
        },
      })
      if (data.totalDocs > 1) {
        usersDuplicados++
        duplicados.push({ cvs: data.docs, ciudadano })
        console.log(`El ciudadano ${titulo} esta duplicado`)
        console.log(data.docs)
      } else {
        cvsToUpdate.push({ ciudadano, cv: data.docs[0] })
        /* await payload.update({
          collection: 'curriculums',
          id: data.docs[0].id,
          data: {
            ciudadano: ciudadano.id,
          },
        }) */
      }
    }

    await Promise.all(
      cvsToUpdate.map((cvToUpdate) => {
        console.log(
          `Se actualiza el curriculum de ${cvToUpdate.cv.titulo} con el ciudadano ${cvToUpdate.ciudadano.id}`,
        )
        return payload.update({
          collection: 'curriculums',
          id: cvToUpdate.cv.id,
          data: {
            ciudadano: cvToUpdate.ciudadano.id,
          },
        })
      }),
    )

    console.log(`Se encontraron ${usersDuplicados} ciudadanos con curriculum duplicado`)
    console.log(duplicados)

    console.log('LISTO!')
  } catch (error) {
    console.error(error)
  }
}

// Call the function here to run your seed script
await seed()
