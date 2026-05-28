'use client'

import {
  IconAlertCircle,
  IconCheck,
  IconDownload,
  IconLoader2,
  IconUpload,
} from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

export function SolicitudPermisoUsoForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [archivo, setArchivo] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  function clearFileError() {
    setErrors((prev) => {
      const { formulario: _, ...rest } = prev
      return rest
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    const formData = new FormData(e.currentTarget)
    const newErrors: Record<string, string> = {}

    const direccionLocal = formData.get('direccionLocal')?.toString().trim()
    const rubro = formData.get('rubro')?.toString().trim()
    const telefono = formData.get('telefono')?.toString().trim()

    if (!direccionLocal) newErrors.direccionLocal = 'Campo requerido'
    if (!rubro) newErrors.rubro = 'Campo requerido'
    if (!telefono) newErrors.telefono = 'Campo requerido'
    if (!archivo) newErrors.formulario = 'Debés adjuntar el formulario completado'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    try {
      const uploadData = new FormData()
      uploadData.append('file', archivo!)

      const uploadRes = await fetch('/api/archivos', {
        method: 'POST',
        credentials: 'include',
        body: uploadData,
      })

      if (!uploadRes.ok) {
        toast.error('Error al subir el archivo. Verificá el formato e intentá de nuevo.')
        setIsSubmitting(false)
        return
      }

      const uploadedFile = await uploadRes.json()
      const fileId = uploadedFile.doc?.id ?? uploadedFile.id

      if (!fileId) {
        toast.error('No se pudo procesar el archivo. Intentá nuevamente.')
        setIsSubmitting(false)
        return
      }

      const res = await fetch('/api/solicitudes-permiso-uso', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          direccionLocal,
          rubro,
          telefono,
          descripcion: formData.get('descripcion')?.toString().trim() || undefined,
          formularioAdjunto: fileId,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        const msg = data?.errors?.[0]?.message ?? data?.message ?? 'Error al enviar la solicitud'
        toast.error(msg)
        setIsSubmitting(false)
        return
      }

      toast.success('¡Solicitud enviada! Obras Privadas revisará tu formulario a la brevedad.')
      router.push('/habilitaciones')
    } catch {
      toast.error('Error de red. Intentá nuevamente.')
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Paso 1 — Descarga */}
      <div className="card border-2 border-primary/30 bg-primary/5 shadow">
        <div className="card-body p-5">
          <h3 className="font-semibold flex items-center gap-2 mb-1">
            <span className="badge badge-primary badge-sm">Paso 1</span>
            Descargá y completá el formulario
          </h3>
          <p className="text-sm text-base-content/70 mb-4">
            Descargá el formulario oficial de Permiso de Uso, completalo, firmalo y escanealo o
            sacale una foto clara. Necesitarás adjuntarlo al finalizar este formulario.
          </p>
          <a
            href="/formularios/permiso-de-uso.pdf"
            download
            className="btn btn-primary btn-sm gap-2 w-fit"
          >
            <IconDownload size={16} />
            Descargar Formulario de Permiso de Uso (PDF)
          </a>
        </div>
      </div>

      {/* Paso 2 — Datos del local */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-primary mb-4 text-base flex items-center gap-2">
            <span className="badge badge-primary badge-sm">Paso 2</span>
            Datos del local
          </h3>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">
                Dirección del local <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="text"
              name="direccionLocal"
              placeholder="Ej: Av. San Martín 456, San Benito"
              className={`input input-bordered w-full ${errors.direccionLocal ? 'input-error' : ''}`}
            />
            {errors.direccionLocal && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.direccionLocal}</span>
              </label>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Rubro / Actividad <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="text"
                name="rubro"
                placeholder="Ej: Peluquería, Kiosco, Ferretería..."
                className={`input input-bordered w-full ${errors.rubro ? 'input-error' : ''}`}
              />
              {errors.rubro && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.rubro}</span>
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
              <span className="label-text font-medium">Descripción de la actividad (opcional)</span>
            </label>
            <textarea
              name="descripcion"
              rows={2}
              placeholder="Describí brevemente qué actividad se va a desarrollar en el local..."
              className="textarea textarea-bordered w-full"
            />
          </div>
        </div>
      </div>

      {/* Paso 3 — Upload */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-primary mb-2 text-base flex items-center gap-2">
            <span className="badge badge-primary badge-sm">Paso 3</span>
            Adjuntá el formulario completado
          </h3>
          <p className="text-sm text-base-content/70 mb-4">
            Subí el formulario completado y firmado. Formatos aceptados: PDF, JPG o PNG (máx. 10 MB).
          </p>

          <div
            className={`rounded-box cursor-pointer border-2 border-dashed p-6 text-center transition-colors ${
              archivo
                ? 'border-success bg-success/5'
                : errors.formulario
                  ? 'border-error bg-error/5'
                  : 'hover:border-primary/50 border-base-300'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null
                setArchivo(file)
                if (file) clearFileError()
              }}
            />
            {archivo ? (
              <div className="flex flex-col items-center gap-2">
                <IconCheck size={32} className="text-success" />
                <p className="text-sm font-medium text-success">{archivo.name}</p>
                <p className="text-base-content/50 text-xs">
                  {(archivo.size / 1024 / 1024).toFixed(2)} MB — Click para cambiar
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <IconUpload size={32} className="text-base-content/30" />
                <p className="text-base-content/60 text-sm">Click para seleccionar el archivo</p>
                <p className="text-base-content/40 text-xs">PDF, JPG o PNG • Máx. 10 MB</p>
              </div>
            )}
          </div>
          {errors.formulario && (
            <p className="text-error mt-2 text-xs">{errors.formulario}</p>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="alert alert-info">
        <IconAlertCircle size={20} className="shrink-0" />
        <p className="text-sm">
          Una vez enviada, el área de <strong>Obras Privadas</strong> revisará tu solicitud. Cuando
          sea aprobada podrás continuar con el Paso 2 en Habilitaciones Comerciales.
        </p>
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
              <IconUpload size={18} />
              Enviar Solicitud
            </>
          )}
        </button>
      </div>
    </form>
  )
}
