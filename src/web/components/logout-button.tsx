'use client'
import { IconLogout } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

interface Props {
  // crudo en ingles
  className?: string
}
export function LogoutButton({ className }: Props) {
  const router = useRouter()
  async function handleClickLogout() {
    await fetch('/api/ciudadanos/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    router.replace('/')
    router.refresh()
  }

  return (
    <button className={className || 'btn btn-outline btn-sm'} onClick={handleClickLogout}>
      <IconLogout size={16} />
      Cerrar Sesión
    </button>
  )
}
