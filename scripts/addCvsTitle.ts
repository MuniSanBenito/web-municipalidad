import type { User } from '@/payload-types'
import config from '@payload-config'
import { getPayload } from 'payload'

async function seed() {
  try {
    // Get a local copy of Payload by passing your config
    const payload = await getPayload({ config })

    const { docs: cvs } = await payload.find({
      collection: 'curriculums',
      pagination: false,
      depth: 2,
    })

    for (const cv of cvs) {
      const usuario = cv.user as User
      const titulo = `${usuario.datos_ciudadano?.nombre} ${usuario.datos_ciudadano?.apellido}`
      console.log(titulo)
      await payload.update({
        collection: 'curriculums',
        id: cv.id,
        data: {
          titulo,
        },
      })
    }

    console.log('LISTO!')
  } catch (error) {
    console.error(error)
  }
}

// Call the function here to run your seed script
await seed()
