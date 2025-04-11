import config from '@payload-config'
import { getPayload } from 'payload'

async function seed() {
  try {
    // Get a local copy of Payload by passing your config
    const payload = await getPayload({ config })

    // ADMIN USER
    const { docs } = await payload.find({
      collection: 'users',
      where: {
        rol: {
          contains: 'ADMIN',
        },
      },
    })
    const adminUser = docs[0]
    if (!adminUser) {
      return
    }

    // collections: noticias, curriculums
    // noticias: created_by comunicacion
    // curriculums: created_by cada user
    // globals: autoridades
    console.log('LISTO!')
  } catch (error) {
    console.error(error)
  }
}

// Call the function here to run your seed script
await seed()
