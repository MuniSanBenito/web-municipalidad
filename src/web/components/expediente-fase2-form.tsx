'use client'

import { submitFaseII } from '@/actions/habilitaciones'
import type { ActividadesComercio, RubrosComercio } from '@/payload-types'
import {
  IconAlertCircle,
  IconCheck,
  IconCircleCheck,
  IconFileDescription,
  IconLoader2,
  IconUpload,
} from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

interface Props {
  expedienteId: string
  rubros: RubrosComercio[]
  actividades: ActividadesComercio[]
}

export function ExpedienteFase2Form({ expedienteId, rubros, actividades }: Props) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [rubroSeleccionado, setRubroSeleccionado] = useState('')
  const [actividadesSeleccionadas, setActividadesSeleccionadas] = useState<string[]>([])
  const [archivos, setArchivos] = useState<File[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  function toggleActividad(id: string) {
    setActividadesSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    )
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    setErrors({})

    const form = e.currentTarget
    const formData = new FormData(form)

    const newErrors: Record<string, string> = {}
    if (!formData.get('nombreFantasia')?.toString().trim()) newErrors.nombreFantasia = 'Requerido'
    if (!formData.get('razonSocial')?.toString().trim()) newErrors.razonSocial = 'Requerido'
    if (!formData.get('cuit')?.toString().trim()) newErrors.cuit = 'Requerido'
    if (!formData.get('direccion')?.toString().trim()) newErrors.direccion = 'Requerido'
    if (!formData.get('telefono')?.toString().trim()) newErrors.telefono = 'Requerido'
    if (!rubroSeleccionado) newErrors.rubro = 'Seleccioná un rubro'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsPending(false)
      return
    }

    formData.set('rubro', rubroSeleccionado)
    actividadesSeleccionadas.forEach((id) => formData.append('actividades', id))
    archivos.forEach((f) => formData.append('adjuntos', f))

    let result: Awaited<ReturnType<typeof submitFaseII>>
    try {
      result = await submitFaseII(expedienteId, formData)
    } catch (e) {
      toast.error('Ocurrió un error inesperado. Intentá nuevamente.')
      setIsPending(false)
      return
    }

    if (result.error) {
      toast.error(result.error)
      setIsPending(false)
      return
    }

    toast.success('¡Paso 2 enviado! El área de Habilitaciones revisará tu solicitud.')
    setIsPending(false)
    router.push('/habilitaciones')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Datos del comercio */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-primary mb-4 text-base">Datos del comercio</h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Nombre de Fantasía <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="text"
                name="nombreFantasia"
                placeholder="Ej: La Esquina de Juan"
                className={`input input-bordered w-full ${errors.nombreFantasia ? 'input-error' : ''}`}
              />
              {errors.nombreFantasia && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.nombreFantasia}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Razón Social / Titular <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="text"
                name="razonSocial"
                placeholder="Ej: Juan Pérez o Comercio SRL"
                className={`input input-bordered w-full ${errors.razonSocial ? 'input-error' : ''}`}
              />
              {errors.razonSocial && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.razonSocial}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  CUIT / CUIL <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="text"
                name="cuit"
                placeholder="Ej: 20-12345678-9"
                className={`input input-bordered w-full ${errors.cuit ? 'input-error' : ''}`}
              />
              {errors.cuit && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.cuit}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Teléfono de contacto <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="tel"
                name="telefono"
                placeholder="Ej: 3434123456"
                className={`input input-bordered w-full ${errors.telefono ? 'input-error' : ''}`}
              />
              {errors.telefono && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.telefono}</span>
                </label>
              )}
            </div>
          </div>

          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text font-medium">
                Dirección del Local <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="text"
              name="direccion"
              placeholder="Ej: Av. San Martín 456, San Benito"
              className={`input input-bordered w-full ${errors.direccion ? 'input-error' : ''}`}
            />
            {errors.direccion && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.direccion}</span>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Rubro y actividades */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-primary mb-4 text-base">Rubro y Actividades</h3>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">
                Rubro principal <span className="text-error">*</span>
              </span>
            </label>
            <select
              className={`select select-bordered w-full ${errors.rubro ? 'select-error' : ''}`}
              value={rubroSeleccionado}
              onChange={(e) => setRubroSeleccionado(e.target.value)}
            >
              <option value="">— Seleccioná un rubro —</option>
              {rubros.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.nombre}
                </option>
              ))}
            </select>
            {errors.rubro && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.rubro}</span>
              </label>
            )}
          </div>

          {actividades.length > 0 && (
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium">Actividades (opcional)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {actividades.map((a) => {
                  const selected = actividadesSeleccionadas.includes(a.id)
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => toggleActividad(a.id)}
                      className={`badge badge-lg cursor-pointer gap-1 transition-colors ${
                        selected ? 'badge-primary' : 'badge-outline hover:badge-primary'
                      }`}
                    >
                      {selected && <IconCheck size={12} />}
                      {a.nombre}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Descripción de la actividad (opcional)</span>
            </label>
            <textarea
              name="descripcionActividad"
              rows={3}
              placeholder="Describí brevemente qué vas a comercializar o qué servicio vas a brindar..."
              className="textarea textarea-bordered w-full"
            />
          </div>
        </div>
      </div>

      {/* Documentación a adjuntar */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-primary mb-2 text-base">Documentación adjunta</h3>
          <p className="text-base-content/70 mb-4 text-sm">
            Adjuntá los documentos requeridos. Podés seleccionar múltiples archivos.
          </p>

          <div className="bg-base-200 mb-4 rounded-lg p-4">
            <p className="mb-2 text-xs font-semibold tracking-wide uppercase">
              Documentos obligatorios
            </p>
            <ul className="space-y-1">
              {[
                'Permiso de Uso aprobado por Obras Privadas',
                'Libre Deuda del inmueble (Rentas Municipal)',
                'Fotocopia DNI y CUIT / constancia ARCA',
                'Fotocopia Boleta de Tasa Inmobiliaria (Provincial y Municipal)',
              ].map((doc) => (
                <li key={doc} className="flex items-center gap-2 text-xs">
                  <IconCircleCheck size={13} className="text-success shrink-0" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`rounded-box cursor-pointer border-2 border-dashed p-6 text-center transition-colors ${
              archivos.length > 0
                ? 'border-success bg-success/5'
                : 'border-base-300 hover:border-primary/50'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              className="hidden"
              onChange={(e) => {
                const files = Array.from(e.target.files ?? [])
                setArchivos((prev) => [...prev, ...files])
              }}
            />
            {archivos.length > 0 ? (
              <div className="flex flex-col items-center gap-2">
                <IconCheck size={32} className="text-success" />
                <p className="text-success text-sm font-medium">
                  {archivos.length} archivo{archivos.length > 1 ? 's' : ''} seleccionado
                  {archivos.length > 1 ? 's' : ''}
                </p>
                <ul className="text-base-content/60 mt-1 space-y-0.5 text-xs">
                  {archivos.map((f, i) => (
                    <li key={i}>{f.name}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="btn btn-ghost btn-xs mt-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    fileInputRef.current?.click()
                  }}
                >
                  Agregar más archivos
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <IconUpload size={32} className="text-base-content/30" />
                <p className="text-base-content/60 text-sm">Click para seleccionar archivos</p>
                <p className="text-base-content/40 text-xs">
                  PDF, JPG o PNG • Múltiples permitidos
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="alert alert-info">
        <IconAlertCircle size={20} className="shrink-0" />
        <div>
          <p className="text-sm">
            Además de esta solicitud digital, presentá los{' '}
            <strong>2 cuadernos tapa dura (~42 hojas)</strong> y el{' '}
            <strong>sellado de Carpeta Técnica</strong> de forma presencial en Habilitaciones.
          </p>
        </div>
      </div>

      {/* Botones */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <a href="/habilitaciones" className="btn btn-ghost">
          Cancelar
        </a>
        <button type="submit" className="btn btn-primary gap-2" disabled={isPending}>
          {isPending ? (
            <>
              <IconLoader2 size={18} className="animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <IconFileDescription size={18} />
              Enviar Solicitud — Paso 2
            </>
          )}
        </button>
      </div>
    </form>
  )
}
