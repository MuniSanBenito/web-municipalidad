import { basePayload } from '@/web/lib/payload'
import { headers as nextHeaders } from 'next/headers'

export default async function Page() {
  const headers = await nextHeaders()
  const auth = await basePayload.auth({ headers })

  return (
    <div className="bg-base-200 rounded-lg p-6 shadow-lg">
      <h1 className="text-primary mb-4 text-3xl font-bold">
        Bienvenido a la Municipalidad de San Benito
      </h1>
      {auth.user ? <p>Bienvenido {auth.user.email}</p> : null}
      <p className="text-base-content text-lg">
        Aquí puedes encontrar información sobre nuestros servicios, horarios, y cómo contactarnos.
      </p>
    </div>
  )
}
