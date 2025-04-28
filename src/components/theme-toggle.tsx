'use client'
import { IconMoon, IconSun } from '@tabler/icons-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { twJoin } from 'tailwind-merge'

export function ThemeToggle() {
  const [defaultTheme, setDefaultTheme] = useState<string>()
  const { resolvedTheme, setTheme } = useTheme()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setDefaultTheme(resolvedTheme), [])

  if (!defaultTheme) return null

  return (
    <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm">
      <input
        type="checkbox"
        className="theme-controller"
        value={resolvedTheme}
        onChange={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
      />
      <IconMoon className={twJoin(defaultTheme === 'light' ? 'swap-on' : 'swap-off')} />
      <IconSun className={twJoin(defaultTheme === 'light' ? 'swap-off' : 'swap-on')} />
    </label>
  )
}
