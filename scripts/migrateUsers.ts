import config from '@payload-config'
import { getPayload } from 'payload'

const OLD_API_URL = 'https://api.sanbenito.gob.ar/api'

const TOKEN = 'yZ6UoJZ3Zz4CCWNqj0W4mUYwJXz6MCkVXPSqEmFrIKa9YsyFZehXvx5OiLZOqWZJ'

const DEFAULT_AVATAR = 'users/avatar/default.png'

const DEFAULT_AVATAR_ID = '67a35f72f5767f400c2ec263'

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

async function seed() {
  try {
    // Get a local copy of Payload by passing your config
    const payload = await getPayload({ config })

    let i = 6
    for (i = 6; i > 0; i--) {
      const url = `${OLD_API_URL}/plataforma/usuarios?page=${i}`
      console.log(url)
      const r = await fetch(url, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      const { data } = await r.json()
      if (!data || !data.length) continue

      for (const usuario of data) {
        console.log(usuario)
        if (usuario.is_admin || !usuario.is_active || !usuario.is_ciudadano) {
          continue
        }

        let email = usuario.email
        if (!emailRegex.test(email)) {
          email = email + '.com'
        }

        const alreadyExist = await payload.find({
          collection: 'users',
          where: {
            email: {
              equals: email,
            },
          },
        })
        if (alreadyExist.totalDocs > 0) {
          console.log('ya existe', email)
          continue
        }

        let avatarId = DEFAULT_AVATAR_ID
        if (usuario.image !== DEFAULT_AVATAR) {
          const resImagen = await fetch(usuario.imageUrl)
          const arrayBuffer = await resImagen.arrayBuffer()
          const buffer = Buffer.from(new Uint8Array(arrayBuffer))

          const mimetype = resImagen.headers.get('content-type') ?? 'image/*'

          const media = await payload.create({
            collection: 'media',
            data: {
              alt: email,
            },
            file: {
              data: buffer,
              size: buffer.length,
              name: email,
              mimetype,
            },
          })
          avatarId = media.id
        }

        await payload.create({
          collection: 'users',
          data: {
            email: email,
            password: String(usuario.dni),
            activo: true,
            rol: 'CIUDADANO',
            avatar: avatarId,
            datos_ciudadano: {
              nombre: usuario.nombre,
              apellido: usuario.apellido,
              dni: String(usuario.dni),
              domicilio: usuario.domicilio,
              fecha_nacimiento: usuario.fecha_nacimiento,
              ciudad: usuario.ciudad,
              telefono: usuario.telefono,
            },
            createdAt: usuario.created_at,
            updatedAt: usuario.updated_at,
          },
        })
      }
    }

    console.log('LISTO!')
  } catch (error) {
    console.error(error)
  }
}

// Call the function here to run your seed script
await seed()
