import type { User } from '@/payload-types'
import config from '@payload-config'
import { getPayload } from 'payload'

const OLD_API_URL = 'https://api.sanbenito.gob.ar/api'

const TOKEN = 'yZ6UoJZ3Zz4CCWNqj0W4mUYwJXz6MCkVXPSqEmFrIKa9YsyFZehXvx5OiLZOqWZJ'

const PAGES = 18

async function seed() {
  try {
    // Get a local copy of Payload by passing your config
    const payload = await getPayload({ config })

    const cvsWithoutUser = []
    const cvsAlreadyInDb = []

    let i = PAGES
    for (i = PAGES; i > 0; i--) {
      const url = `${OLD_API_URL}/odt/curriculums?page=${i}`
      console.log(url)
      const r = await fetch(url, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      const { data } = await r.json()
      if (!data || !data.length) continue

      for (const curriculum of data) {
        let user: User | null = null
        console.log(curriculum)
        // find user by email in curriculum
        const { docs: users } = await payload.find({
          collection: 'users',
          where: {
            email: {
              equals: curriculum?.usuario?.email?.toLowerCase(),
            },
          },
        })
        if (!users.length) {
          console.log('no user found')
          const { docs: usersByDni } = await payload.find({
            collection: 'users',
            where: {
              'datos_ciudadano.dni': {
                equals: String(curriculum?.usuario?.dni),
              },
            },
          })

          if (!usersByDni.length) {
            console.log('no user2 found')
            cvsWithoutUser.push(curriculum)
            continue
          }

          console.log(usersByDni)
          user = usersByDni[0]
        } else {
          console.log(users)
          user = users[0]
        }

        if (!user) {
          continue
        }

        const { docs: cvsExists } = await payload.find({
          collection: 'curriculums',
          where: {
            user: {
              equals: user,
            },
          },
        })
        if (cvsExists.length > 0) {
          console.log('cvs exists', cvsExists)
          cvsAlreadyInDb.push(cvsExists[0])
          continue
        }

        const estudios = curriculum?.estudios?.map((estudio: any) => ({
          institucion: estudio?.institucion,
          fecha_inicio: estudio?.fecha_inicio,
          fecha_finalizacion: estudio?.fecha_finalizacion,
          is_old: true,
          nivel_old: estudio?.nivel,
          descripcion: estudio?.descripcion,
        }))
        const experiencias = curriculum?.experiencias?.map((experiencia: any) => ({
          institucion: experiencia?.institucion,
          fecha_inicio: experiencia?.fecha_inicio,
          fecha_finalizacion: experiencia?.fecha_finalizacion,
          descripcion: experiencia?.descripcion,
          puesto: experiencia?.puesto,
        }))
        const referencias = curriculum?.referencias?.map((referencia: any) => ({
          nombre: referencia?.nombre,
          telefono: referencia?.telefono,
          email: referencia?.email,
          descripcion: referencia?.descripcion,
        }))
        const categorias = curriculum?.categorias?.map((categoria: any) => ({
          nombre: categoria?.nombre,
        }))
        await payload.create({
          collection: 'curriculums',
          data: {
            user,
            estudios,
            experiencias,
            referencias,
            categorias,
          },
        })
      }
    }

    console.log('cvs existentes en db', cvsAlreadyInDb)
    console.log('cvs sin user', cvsWithoutUser)

    console.log('LISTO!')
  } catch (error) {
    console.error(error)
  }
}

// Call the function here to run your seed script
await seed()
