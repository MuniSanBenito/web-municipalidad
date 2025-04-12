'use client'
import { Button } from '@payloadcms/ui'
import { IconLogout } from '@tabler/icons-react'
import { redirect, RedirectType } from 'next/navigation'

async function handleClick() {
  try {
    await fetch('/api/users/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
  } finally {
    redirect('/admin/login', RedirectType.replace)
  }
}

export function LogoutButton() {
  return (
    <Button icon={<IconLogout />} iconPosition="left" onClick={handleClick}>
      Cerrar sesion
    </Button>
  )
}
