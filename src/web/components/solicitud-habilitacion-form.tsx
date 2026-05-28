'use client'

import type { ActividadesComercio, RubrosComercio } from '@/payload-types'
import {
  IconAlertCircle,
  IconBuildingStore,
  IconCheck,
  IconCircleCheck,
  IconFileDescription,
  IconLoader2,
} from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface SolicitudHabilitacionFormProps {
  rubros: RubrosComercio[]
  actividades: ActividadesComercio[]
}

export function SolicitudHabilitacionForm({ rubros, actividades }: SolicitudHabilitacionFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [rubroSeleccionado, setRubroSeleccionado] = useState('')
  const [actividadesSeleccionadas, setActividadesSeleccionadas] = useState<string[]>([])
  const [tienePermisoUso, setTienePermisoUso] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function toggleActividad(id: string) {
    setActividadesSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    )
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    const formData = new FormData(e.currentTarget)

    const newErrors: Record<string, string> = {}
    const nombreFantasia = formData.get('nombreFantasia')?.toString().trim()
    const razonSocial = formData.get('razonSocial')?.toString().trim()
    const cuit = formData.get('cuit')?.toString().trim()
    const direccion = formData.get('direccion')?.toString().trim()
    const telefono = formData.get('telefono')?.toString().trim()
    const descripcionActividad = formData.get('descripcionActividad')?.toString().trim()

    if (!tienePermisoUso)
      newErrors.permisoUso = 'Debés confirmar que tenés el Permiso de Uso aprobado'
    if (!nombreFantasia) newErrors.nombreFantasia = 'Campo requerido'
    if (!razonSocial) newErrors.razonSocial = 'Campo requerido'
    if (!cuit) newErrors.cuit = 'Campo requerido'
    if (!direccion) newErrors.direccion = 'Campo requerido'
    if (!telefono) newErrors.telefono = 'Campo requerido'
    if (!rubroSeleccionado) newErrors.rubro = 'Seleccioná un rubro'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    try {
      const body: Record<string, unknown> = {
        nombreFantasia,
        razonSocial,
        cuit,
        direccion,
        telefono,
        rubro: rubroSeleccionado,
        descripcionActividad: descripcionActividad || undefined,
        actividades: actividadesSeleccionadas.length > 0 ? actividadesSeleccionadas : undefined,
      }

      const response = await fetch('/api/solicitudes-habilitacion', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (!response.ok) {
        const msg = data?.errors?.[0]?.message || data?.message || 'Error al enviar la solicitud'
        toast.error(msg)
        setIsSubmitting(false)
        return
      }

      toast.success(
        '¡Solicitud enviada correctamente! El área de Habilitaciones se contactará pronto.',
      )
      router.push('/habilitaciones')
    } catch {
      toast.error('Error de red. Intentá nuevamente.')
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Confirmación Permiso de Uso */}
      <div
        className={`card border-2 shadow-lg ${
          errors.permisoUso
            ? 'border-error bg-error/5'
            : tienePermisoUso
              ? 'border-success bg-success/5'
              : 'border-warning bg-warning/5'
        }`}
      >
        <div className="card-body p-5">
          <div className="flex items-start gap-3">
            <IconAlertCircle
              size={22}
              className={`mt-0.5 shrink-0 ${
                errors.permisoUso ? 'text-error' : tienePermisoUso ? 'text-success' : 'text-warning'
              }`}
            />
            <div className="flex-1">
              <p className="mb-1 text-sm font-semibold">Requisito previo obligatorio</p>
              <p className="text-base-content/70 mb-3 text-sm">
                Esta solicitud corresponde al <strong>Paso 2</strong> del circuito. Para
                presentarla, debés haber obtenido previamente el{' '}
                <strong>Permiso de Uso aprobado</strong> por Obras Privadas.
              </p>
              <label className="flex cursor-pointer items-start gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-success mt-0.5"
                  checked={tienePermisoUso}
                  onChange={(e) => {
                    setTienePermisoUso(e.target.checked)
                    if (e.target.checked)
                      setErrors((prev) => {
                        const { permisoUso: _, ...rest } = prev
                        return rest
                      })
                  }}
                />
                <span className="text-sm font-medium">
                  Confirmo que cuento con el Permiso de Uso aprobado por Obras Privadas
                </span>
              </label>
              {errors.permisoUso && <p className="text-error mt-2 text-xs">{errors.permisoUso}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Datos del comercio */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-primary mb-4 flex items-center gap-2">
            <IconBuildingStore size={22} />
            Datos del Comercio
          </h2>

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
                  Razón Social / Nombre del Titular <span className="text-error">*</span>
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
          <h2 className="card-title text-primary mb-4">Rubro y Actividades</h2>

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
            <div className="form-control">
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

          <div className="form-control mt-4">
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

      {/* Documentación física a presentar */}
      <div className="card bg-base-200 shadow">
        <div className="card-body p-5">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <IconFileDescription size={18} className="text-primary" />
            Documentación física a presentar en el área
          </h3>
          <p className="text-base-content/60 mb-3 text-xs">
            Luego de enviar esta solicitud digital, presentá los siguientes documentos en el área de
            Habilitaciones:
          </p>
          <ul className="space-y-1.5">
            {[
              'Formulario de solicitud inicial impreso (Formulario 1 INICIO)',
              'Permiso de Uso aprobado por Obras Privadas',
              'Libre Deuda del inmueble (Rentas Municipal)',
              'Sellado de Carpeta Técnica (consultar monto vigente)',
              'Fotocopia DNI y CUIT / constancia ARCA',
              'Fotocopia Boleta de Tasa Inmobiliaria (Provincial y Municipal)',
              '2 cuadernos tapa dura ~42 hojas (Libro de Quejas + Libro de Habilitaciones)',
            ].map((doc) => (
              <li key={doc} className="flex items-start gap-2 text-xs">
                <IconCircleCheck size={14} className="text-success mt-0.5 shrink-0" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
          <div className="divider my-2" />
          <p className="text-base-content/60 text-xs">
            Según el rubro pueden requerirse documentos adicionales (libreta sanitaria, informe
            técnico, certificado de buena conducta, etc.). Consultá con el área ante cualquier duda.
          </p>
        </div>
      </div>

      {/* Botones */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <a href="/habilitaciones" className="btn btn-ghost">
          Cancelar
        </a>
        <button type="submit" className="btn btn-primary gap-2" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <IconLoader2 size={18} className="animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <IconFileDescription size={18} />
              Enviar Solicitud
            </>
          )}
        </button>
      </div>
    </form>
  )
}
