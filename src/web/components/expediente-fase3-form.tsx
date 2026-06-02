'use client'

import { submitFaseIII } from '@/actions/habilitaciones'
import {
  IconAlertCircle,
  IconCheck,
  IconCircleCheck,
  IconFileText,
  IconLoader2,
  IconUpload,
} from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

interface Props {
  expedienteId: string
}

export function ExpedienteFase3Form({ expedienteId }: Props) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [confirmado, setConfirmado] = useState(false)
  const [libreDeuda, setLibreDeuda] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    setErrors({})

    const newErrors: Record<string, string> = {}
    if (!confirmado) newErrors.confirmacion = 'Debés confirmar que los datos son correctos'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsPending(false)
      return
    }

    const formData = new FormData(e.currentTarget)
    if (libreDeuda) formData.append('libreDeuda', libreDeuda)

    let result: Awaited<ReturnType<typeof submitFaseIII>>
    try {
      result = await submitFaseIII(expedienteId, formData)
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

    toast.success('¡Paso 3 enviado! Rentas procesará el Alta Fiscal a la brevedad.')
    setIsPending(false)
    router.push('/habilitaciones')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Resumen del proceso */}
      <div className="card border-success/30 bg-success/5 border-2 shadow">
        <div className="card-body p-5">
          <h3 className="text-success mb-2 font-semibold">¡Estás en el último paso!</h3>
          <p className="text-base-content/70 text-sm">
            Con las Fases I y II aprobadas, Rentas procederá a confeccionar el{' '}
            <strong>Alta Comercial</strong>, obtener la firma del Secretario de Gobierno y emitir el{' '}
            <strong>Certificado de Habilitación</strong>.
          </p>
          <ul className="mt-3 space-y-1">
            {[
              'Alta Comercial confeccionada por Rentas',
              'Firma de resolución por el Secretario de Gobierno',
              'Emisión del Certificado de Habilitación',
              'Capacitación para declaraciones juradas y Tasa Comercial mensual',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-xs">
                <IconCircleCheck size={13} className="text-success shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Libre Deuda */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-primary mb-2 text-base">
            Libre Deuda del inmueble (opcional)
          </h3>
          <p className="text-base-content/70 mb-4 text-sm">
            Si ya contás con el documento de Libre Deuda vigente de Rentas Municipal, podés
            adjuntarlo aquí. De lo contrario, Rentas lo verificará internamente.
          </p>

          <div
            className={`rounded-box cursor-pointer border-2 border-dashed p-5 text-center transition-colors ${
              libreDeuda ? 'border-success bg-success/5' : 'border-base-300 hover:border-primary/50'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => setLibreDeuda(e.target.files?.[0] ?? null)}
            />
            {libreDeuda ? (
              <div className="flex flex-col items-center gap-2">
                <IconCheck size={28} className="text-success" />
                <p className="text-success text-sm font-medium">{libreDeuda.name}</p>
                <p className="text-base-content/50 text-xs">
                  {(libreDeuda.size / 1024 / 1024).toFixed(2)} MB — Click para cambiar
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <IconUpload size={28} className="text-base-content/30" />
                <p className="text-base-content/60 text-sm">Adjuntar Libre Deuda (opcional)</p>
                <p className="text-base-content/40 text-xs">PDF, JPG o PNG</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Observaciones */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-primary mb-4 text-base">Observaciones adicionales</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Información adicional (opcional)</span>
            </label>
            <textarea
              name="observaciones"
              rows={3}
              placeholder="Cualquier información adicional que quieras comunicar a Rentas..."
              className="textarea textarea-bordered w-full"
            />
          </div>
        </div>
      </div>

      {/* Confirmación de datos */}
      <div
        className={`card border-2 shadow-lg ${
          errors.confirmacion
            ? 'border-error bg-error/5'
            : confirmado
              ? 'border-success bg-success/5'
              : 'border-warning bg-warning/5'
        }`}
      >
        <div className="card-body p-5">
          <div className="flex items-start gap-3">
            <IconAlertCircle
              size={22}
              className={`mt-0.5 shrink-0 ${
                errors.confirmacion ? 'text-error' : confirmado ? 'text-success' : 'text-warning'
              }`}
            />
            <div className="flex-1">
              <p className="mb-1 text-sm font-semibold">Declaración jurada</p>
              <p className="text-base-content/70 mb-3 text-sm">
                Al enviar este formulario, declarás que toda la información y documentación
                presentada en las 3 fases del trámite es <strong>verídica y completa</strong>.
              </p>
              <label className="flex cursor-pointer items-start gap-2">
                <input
                  type="checkbox"
                  name="confirmacion"
                  className="checkbox checkbox-success mt-0.5"
                  checked={confirmado}
                  onChange={(e) => {
                    setConfirmado(e.target.checked)
                    if (e.target.checked)
                      setErrors((prev) => {
                        const { confirmacion: _, ...rest } = prev
                        return rest
                      })
                  }}
                />
                <span className="text-sm font-medium">
                  Confirmo que los datos declarados son correctos y verídicos{' '}
                  <span className="text-error">*</span>
                </span>
              </label>
              {errors.confirmacion && (
                <p className="text-error mt-2 text-xs">{errors.confirmacion}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Info contacto Rentas */}
      <div className="alert">
        <IconFileText size={20} className="shrink-0" />
        <div className="text-sm">
          <p>
            Ante consultas sobre el Alta Fiscal, contactá a <strong>Rentas</strong>:{' '}
            <a href="tel:3436127015" className="link">
              3436127015
            </a>{' '}
            ·{' '}
            <a href="mailto:rentas@munisanbenito.gov.ar" className="link">
              rentas@munisanbenito.gov.ar
            </a>
          </p>
        </div>
      </div>

      {/* Botones */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <a href="/habilitaciones" className="btn btn-ghost">
          Cancelar
        </a>
        <button type="submit" className="btn btn-success gap-2" disabled={isPending}>
          {isPending ? (
            <>
              <IconLoader2 size={18} className="animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <IconCircleCheck size={18} />
              Enviar Solicitud — Paso 3
            </>
          )}
        </button>
      </div>
    </form>
  )
}
