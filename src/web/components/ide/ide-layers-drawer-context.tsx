'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

interface IdeLayersDrawerContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
}

const IdeLayersDrawerContext = createContext<IdeLayersDrawerContextValue | null>(null)

export function IdeLayersDrawerProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false)

  const toggle = useCallback(() => {
    setOpen((prev) => !prev)
  }, [])

  const value = useMemo(() => ({ open, setOpen, toggle }), [open, toggle])

  return (
    <IdeLayersDrawerContext.Provider value={value}>{children}</IdeLayersDrawerContext.Provider>
  )
}

export function useIdeLayersDrawer() {
  const ctx = useContext(IdeLayersDrawerContext)
  if (!ctx) {
    throw new Error('useIdeLayersDrawer must be used within IdeLayersDrawerProvider')
  }
  return ctx
}
