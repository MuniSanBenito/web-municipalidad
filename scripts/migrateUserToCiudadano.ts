import config from '@payload-config'
import { getPayload } from 'payload'

async function seed() {
  try {
    // Get a local copy of Payload by passing your config
    const payload = await getPayload({ config })

    // get all users with role 'CIUDADANO'
    const { docs: ciudadanos } = await payload.find({
      collection: 'users',
      where: {
        rol: {
          contains: 'CIUDADANO',
        },
      },
      pagination: false,
    })

    /* await Promise.all(
      ciudadanos.map((ciudadano) => {
        const { datos_ciudadano, hash, rol, password, ...data } = ciudadano
        return payload.create({
          collection: 'ciudadanos',
          data: {
            ...data,
            ...datos_ciudadano,
            password: datos_ciudadano?.dni,
          },
        })
      }),
    ) */

    console.log(`Found ${ciudadanos.length} ciudadanos`)

    console.log('LISTO!')
  } catch (error) {
    console.error(error)
  }
}

// Call the function here to run your seed script
await seed()
