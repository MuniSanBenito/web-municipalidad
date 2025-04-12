import { headers } from 'next/headers'
import { redirect, RedirectType } from 'next/navigation'
import type { Payload } from 'payload'

type Props = { payload: Payload }
export async function RedirectCiudadano({ payload }: Props) {
  const auth = await payload.auth({ headers: await headers() })

  if (auth.user?.rol.includes('CIUDADANO')) {
    return redirect('/', RedirectType.replace)
  }

  return null
}
