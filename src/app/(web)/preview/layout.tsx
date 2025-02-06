import { basePayload } from '@/libs/payload'
import { headers as nextHeaders } from 'next/headers'
import { notFound } from 'next/navigation'
import type { PropsWithChildren } from 'react'

export default async function PreviewLayout({ children }: PropsWithChildren) {
  const headers = await nextHeaders()
  const auth = await basePayload.auth({ headers })
  if (!auth.user || auth.user.rol === 'CIUDADANO') {
    return notFound()
  }

  return <>{children}</>
}
