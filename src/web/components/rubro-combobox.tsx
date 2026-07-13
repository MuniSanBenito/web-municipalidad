'use client'

import type { RubrosComercio } from '@/payload-types'
import { IconChevronDown, IconSearch, IconX } from '@tabler/icons-react'
import { useEffect, useMemo, useRef, useState } from 'react'

interface Props {
  rubros: RubrosComercio[]
  value: string
  onChange: (value: string) => void
  error?: boolean
}

export function RubroCombobox({ rubros, value, onChange, error }: Props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const selected = rubros.find((r) => r.id === value)

  const filtered = useMemo(() => {
    if (!query.trim()) return rubros
    const q = query.toLowerCase().trim()
    return rubros.filter(
      (r) =>
        r.nombre?.toLowerCase().includes(q) ||
        r.codigo?.includes(q) ||
        r.categoria?.toLowerCase().includes(q) ||
        r.subcategoria?.toLowerCase().includes(q),
    )
  }, [rubros, query])

  const grouped = useMemo(() => {
    const map = new Map<string, RubrosComercio[]>()
    for (const r of filtered) {
      const cat = r.categoria || ''
      if (!map.has(cat)) map.set(cat, [])
      map.get(cat)!.push(r)
    }
    return Array.from(map.entries())
  }, [filtered])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSelect(id: string) {
    onChange(id)
    setOpen(false)
    setQuery('')
  }

  function handleClear(e: React.MouseEvent) {
    e.stopPropagation()
    onChange('')
  }

  return (
    <div ref={containerRef} className="relative">
      {open ? (
        <div className="flex items-center gap-2 rounded-lg border-2 border-primary bg-base-100 px-3 py-2">
          <IconSearch size={18} className="text-base-content/40 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            autoFocus
            placeholder="Buscar por nombre, código o categoría..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-base-content/40 hover:text-base-content"
            >
              <IconX size={16} />
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            setOpen(true)
            setTimeout(() => inputRef.current?.focus(), 0)
          }}
          className={`select select-bordered flex w-full items-center justify-between text-left ${error ? 'select-error' : ''}`}
        >
          <span className={selected ? '' : 'text-base-content/40'}>
            {selected
              ? `${selected.codigo} — ${selected.nombre}`
              : '— Seleccioná un rubro —'}
          </span>
          <span className="flex items-center gap-1">
            {selected && (
              <IconX
                size={16}
                className="text-base-content/40 hover:text-error"
                onClick={handleClear}
              />
            )}
            <IconChevronDown size={18} className="text-base-content/40" />
          </span>
        </button>
      )}

      {open && (
        <div className="absolute z-50 mt-1 max-h-80 w-full overflow-y-auto rounded-lg border border-base-300 bg-base-100 shadow-lg">
          {grouped.length === 0 ? (
            <div className="px-4 py-3 text-sm text-base-content/50">
              No se encontraron rubros para &ldquo;{query}&rdquo;
            </div>
          ) : (
            grouped.map(([categoria, items], idx) => (
              <div key={categoria || `cat-${idx}`}>
                <div className="bg-base-200/60 px-3 py-1.5 text-xs font-semibold text-base-content/60">
                  {categoria || 'Sin categoría'}
                </div>
                {items.map((r) => (
                  <button
                    key={r.id || r.codigo}
                    type="button"
                    onClick={() => handleSelect(r.id)}
                    className={`flex w-full items-start gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-primary/10 ${
                      r.id === value ? 'bg-primary/5' : ''
                    }`}
                  >
                    <span className="font-mono text-xs text-base-content/40 shrink-0">
                      {r.codigo}
                    </span>
                    <span>{r.nombre}</span>
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
