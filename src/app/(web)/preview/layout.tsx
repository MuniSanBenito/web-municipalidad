import { basePayload } from '@/web/lib/payload'
import { headers as nextHeaders } from 'next/headers'
import { notFound } from 'next/navigation'
import type { PropsWithChildren } from 'react'

export default async function PreviewLayout({ children }: PropsWithChildren) {
  const headers = await nextHeaders()
  const auth = await basePayload.auth({ headers })
  if (!auth.user || auth.user.rol.includes('CIUDADANO')) {
    return notFound()
  }

  return <>{children}</>
}
