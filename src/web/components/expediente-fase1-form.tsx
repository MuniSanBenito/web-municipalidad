'use client'

import { submitFaseI, updateFaseI } from '@/actions/habilitaciones'
import {
  IconAlertCircle,
  IconBrandWhatsapp,
  IconCheck,
  IconDownload,
  IconFile,
  IconLoader2,
  IconMail,
  IconSend,
  IconUpload
} from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

const BARRIOS = [
  'Las Tunas',
  'Loteo Aguer Cavallo',
  'San Pedro',
  'La Loma',
  'San Miguel',
  'Loteo Dobanton/Mizawak/Martinez',
  'San Sebastián',
  'La Virgencita II',
  'Loteo Bizai',
  'San Martín',
  'Portal del Sol',
  'Senger',
  'Puesta del Sol',
  'Centro',
  'Loteo Furios',
  'Jardines',
  'Sur',
  'Loteo Cumini',
  'Altos del Este',
  'Solvencia',
  '250 Viviendas',
]

type FileKey =
  | 'formulario'
  | 'docInmueble'
  | 'planoLocal'
  | 'certElectrico'
  | 'facturaEnergia'
  | 'plancheta'

type ArchivoExistente = { url?: string | null; filename?: string | null } | null

function ExistingFileLink({ existing }: { existing: ArchivoExistente }) {
  if (!existing?.url) return null
  return (
    <a
      href={existing.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="text-primary mt-1 inline-flex items-center gap-1 text-xs hover:underline"
    >
      <IconFile size={13} />
      <span className="max-w-[220px] truncate">{existing.filename ?? 'Ver archivo cargado'}</span>
    </a>
  )
}

interface FileZoneProps {
  fileRef: React.RefObject<HTMLInputElement | null>
  file: File | null
  error?: string
  existing?: ArchivoExistente
  onFileChange: (file: File | null) => void
}

function FileZone({ fileRef, file, error, existing, onFileChange }: FileZoneProps) {
  const hasExisting = !file && !!existing?.url
  return (
    <div>
      <div
        className={`rounded-box cursor-pointer border-2 border-dashed p-4 text-center transition-colors ${
          file
            ? 'border-success bg-success/5'
            : hasExisting
              ? 'border-primary/40 bg-primary/5'
              : error
                ? 'border-error bg-error/5'
                : 'border-base-300 hover:border-primary/50'
        }`}
        onClick={() => fileRef.current?.click()}
      >
        <input
          ref={fileRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
        />
        {file ? (
          <div className="flex items-center justify-center gap-2">
            <IconCheck size={18} className="text-success shrink-0" />
            <p className="text-success max-w-[220px] truncate text-sm font-medium">{file.name}</p>
          </div>
        ) : hasExisting ? (
          <div className="flex flex-col items-center gap-1">
            <div className="text-primary flex items-center justify-center gap-2">
              <IconCheck size={18} className="shrink-0" />
              <p className="text-sm font-medium">Archivo ya cargado</p>
            </div>
            <ExistingFileLink existing={existing} />
            <span className="text-base-content/40 text-xs">Click para reemplazar</span>
          </div>
        ) : (
          <div className="text-base-content/50 flex items-center justify-center gap-2">
            <IconUpload size={18} />
            <p className="text-sm">Adjuntar archivo</p>
            <span className="text-xs">(PDF, JPG o PNG)</span>
          </div>
        )}
      </div>
      {error && <p className="text-error mt-1 text-xs">{error}</p>}
    </div>
  )
}

interface Props {
  expedienteId?: string
  isEdit?: boolean
  emailDefault?: string
  apellidoDefault?: string
  nombreDefault?: string
  dniDefault?: string
  telefonoDefault?: string
  domicilioDefault?: string
  barrioDefault?: string
  archivosExistentes?: Partial<Record<FileKey, ArchivoExistente>>
}

export function ExpedienteFase1Form({
  expedienteId,
  isEdit = false,
  emailDefault = '',
  apellidoDefault = '',
  nombreDefault = '',
  dniDefault = '',
  telefonoDefault = '',
  domicilioDefault = '',
  barrioDefault = '',
  archivosExistentes = {},
}: Props) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [email, setEmail] = useState(emailDefault)
  const [apellido, setApellido] = useState(apellidoDefault)
  const [nombre, setNombre] = useState(nombreDefault)
  const [dni, setDni] = useState(dniDefault)
  const [telefono, setTelefono] = useState(telefonoDefault)
  const [domicilio, setDomicilio] = useState(domicilioDefault)
  const [barrio, setBarrio] = useState(barrioDefault)

  const [archivos, setArchivos] = useState<Record<FileKey, File | null>>({
    formulario: null,
    docInmueble: null,
    planoLocal: null,
    certElectrico: null,
    facturaEnergia: null,
    plancheta: null,
  })
  const [declaracion, setDeclaracion] = useState(false)

  const fileRefs: Record<FileKey, React.RefObject<HTMLInputElement | null>> = {
    formulario: useRef<HTMLInputElement | null>(null),
    docInmueble: useRef<HTMLInputElement | null>(null),
    planoLocal: useRef<HTMLInputElement | null>(null),
    certElectrico: useRef<HTMLInputElement | null>(null),
    facturaEnergia: useRef<HTMLInputElement | null>(null),
    plancheta: useRef<HTMLInputElement | null>(null),
  }

  function clearError(key: string) {
    setErrors((prev) => {
      const { [key]: _, ...rest } = prev
      return rest
    })
  }

  function setArchivo(key: FileKey, file: File | null) {
    setArchivos((prev) => ({ ...prev, [key]: file }))
    if (file) {
      clearError(key)
      if (key === 'certElectrico') clearError('facturaEnergia')
      if (key === 'facturaEnergia') clearError('certElectrico')
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors({})
    const newErrors: Record<string, string> = {}
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      newErrors.email = 'Ingresá un correo electrónico válido'
    if (!isEdit && !archivos.formulario)
      newErrors.formulario = 'Debés adjuntar el formulario completado y firmado'
    if (!apellido.trim()) newErrors.apellido = 'Requerido'
    if (!nombre.trim()) newErrors.nombre = 'Requerido'
    if (!dni.trim()) newErrors.dni = 'Requerido'
    if (!telefono.trim()) newErrors.telefono = 'Requerido'
    if (!domicilio.trim()) newErrors.domicilio = 'Requerido'
    if (!barrio) newErrors.barrio = 'Seleccioná un barrio'
    if (!isEdit && !archivos.docInmueble) newErrors.docInmueble = 'Requerido'
    if (!isEdit && !archivos.planoLocal) newErrors.planoLocal = 'Requerido'
    if (!isEdit && !archivos.certElectrico && !archivos.facturaEnergia) {
      newErrors.certElectrico = 'Adjuntá al menos uno de los dos'
      newErrors.facturaEnergia = 'Adjuntá al menos uno de los dos'
    }
    if (!isEdit && !archivos.plancheta) newErrors.plancheta = 'Requerido'
    if (!declaracion) newErrors.declaracion = 'Debés aceptar los términos de la declaración jurada'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsPending(true)
    const fd = new FormData()
    fd.append('email', email)
    fd.append('apellido', apellido)
    fd.append('nombre', nombre)
    fd.append('dni', dni)
    fd.append('telefono', telefono)
    fd.append('domicilio', domicilio)
    fd.append('barrio', barrio)
    if (archivos.formulario) fd.append('formulario', archivos.formulario)
    if (archivos.docInmueble) fd.append('docInmueble', archivos.docInmueble)
    if (archivos.planoLocal) fd.append('planoLocal', archivos.planoLocal)
    if (archivos.certElectrico) fd.append('certElectrico', archivos.certElectrico)
    if (archivos.facturaEnergia) fd.append('facturaEnergia', archivos.facturaEnergia)
    if (archivos.plancheta) fd.append('plancheta', archivos.plancheta)

    let result: { error?: string }
    try {
      result = isEdit && expedienteId ? await updateFaseI(expedienteId, fd) : await submitFaseI(fd)
    } catch {
      toast.error('Ocurrió un error inesperado. Intentá nuevamente.')
      setIsPending(false)
      return
    }

    if (result.error) {
      toast.error(result.error)
      setIsPending(false)
      return
    }

    toast.success(
      isEdit
        ? '¡Solicitud actualizada correctamente!'
        : '¡Solicitud de Permiso de Uso enviada! Obras Privadas revisará tu formulario.',
    )
    setIsPending(false)
    router.push('/habilitaciones')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isEdit && (
        <div className="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          <span className="text-sm">
            Estás editando tu solicitud. Los archivos ya cargados se mantienen — solo adjuntá nuevos
            si querés reemplazarlos.
          </span>
        </div>
      )}
      {/* Introducción */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-primary mb-3 text-base">
            Formulario 1 — Permiso de Uso — Obras Privadas
          </h3>
          <div className="text-base-content/80 space-y-3 text-sm">
            <p>
              Este formulario tiene como finalidad iniciar el trámite de evaluación de factibilidad
              para la habilitación de una actividad comercial, profesional o de servicios dentro del
              ejido de la Municipalidad de San Benito.
            </p>
            <p>
              Antes de completar este formulario, deberá descargar el formulario de{' '}
              <strong>Permiso de Uso</strong>, completarlo y firmarlo. Además, deberá adjuntar toda
              la documentación requerida para que el Área de Obras Privadas pueda realizar la
              evaluación correspondiente.
            </p>
            <p>
              Una vez recibida la documentación, el personal técnico verificará que el inmueble
              cumpla con las condiciones urbanísticas y edilicias necesarias para el desarrollo de
              la actividad solicitada. El resultado de la evaluación será informado al correo
              electrónico o teléfono consignado en esta solicitud.
            </p>
            <div className="alert alert-warning py-2">
              <IconAlertCircle size={16} className="shrink-0" />
              <p className="text-xs font-medium">
                La aprobación del Permiso de Uso es un requisito obligatorio para continuar con el
                trámite de Habilitación Comercial.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contacto Obras Privadas */}
      <div className="card border-base-300 bg-base-200/40 border shadow">
        <div className="card-body p-4">
          <p className="mb-2 text-sm font-medium">¿Tenés dudas sobre la documentación requerida?</p>
          <div className="flex flex-col gap-2 text-sm">
            <a
              href="https://wa.me/543434681033"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-success flex items-center gap-2"
            >
              <IconBrandWhatsapp size={16} />
              WhatsApp Obras Privadas: 3434681033
            </a>
            <a
              href="mailto:opriv.sanbenito@gmail.com"
              className="link link-primary flex items-center gap-2"
            >
              <IconMail size={16} />
              opriv.sanbenito@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Correo electrónico */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Correo electrónico <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                clearError('email')
              }}
              placeholder="tucorreo@ejemplo.com"
              className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
            />
            {errors.email && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.email}</span>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Descarga + adjunto formulario PDF */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-primary mb-2 text-base">Formulario de Permiso de Uso</h3>
          <div className="bg-primary/5 border-primary/20 mb-4 rounded-lg border p-4">
            <p className="text-base-content/70 mb-3 text-sm">
              📥 Descargue el formulario desde el siguiente enlace. Una vez completado y firmado,
              deberá adjuntarlo.
            </p>
            <a
              href="/formularios/permiso-de-uso.pdf"
              download
              className="btn btn-primary btn-sm w-fit gap-2"
            >
              <IconDownload size={16} />
              Permiso de Uso (PDF)
            </a>
          </div>
          <label className="label pt-0">
            <span className="label-text font-medium">
              Adjuntar formulario completado y firmado <span className="text-error">*</span>
            </span>
          </label>
          <div
            className={`rounded-box cursor-pointer border-2 border-dashed p-6 text-center transition-colors ${
              archivos.formulario
                ? 'border-success bg-success/5'
                : !archivos.formulario && archivosExistentes.formulario?.url
                  ? 'border-primary/40 bg-primary/5'
                  : errors.formulario
                    ? 'border-error bg-error/5'
                    : 'border-base-300 hover:border-primary/50'
            }`}
            onClick={() => fileRefs.formulario.current?.click()}
          >
            <input
              ref={fileRefs.formulario}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => setArchivo('formulario', e.target.files?.[0] ?? null)}
            />
            {archivos.formulario ? (
              <div className="flex flex-col items-center gap-2">
                <IconCheck size={32} className="text-success" />
                <p className="text-success text-sm font-medium">{archivos.formulario.name}</p>
                <p className="text-base-content/50 text-xs">
                  {(archivos.formulario.size / 1024 / 1024).toFixed(2)} MB — Click para cambiar
                </p>
              </div>
            ) : archivosExistentes.formulario?.url ? (
              <div className="flex flex-col items-center gap-1">
                <IconCheck size={32} className="text-primary" />
                <p className="text-primary text-sm font-medium">Archivo ya cargado</p>
                <ExistingFileLink existing={archivosExistentes.formulario} />
                <p className="text-base-content/40 text-xs">Click para reemplazar</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <IconUpload size={32} className="text-base-content/30" />
                <p className="text-base-content/60 text-sm">Click para seleccionar el archivo</p>
                <p className="text-base-content/40 text-xs">PDF, JPG o PNG • Máx. 10 MB</p>
              </div>
            )}
          </div>
          {errors.formulario && <p className="text-error mt-2 text-xs">{errors.formulario}</p>}
        </div>
      </div>

      {/* Datos de contacto */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-primary mb-4 text-base">Datos de contacto</h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Apellido <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="text"
                value={apellido}
                onChange={(e) => {
                  setApellido(e.target.value)
                  clearError('apellido')
                }}
                className={`input input-bordered w-full ${errors.apellido ? 'input-error' : ''}`}
              />
              {errors.apellido && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.apellido}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Nombre <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value)
                  clearError('nombre')
                }}
                className={`input input-bordered w-full ${errors.nombre ? 'input-error' : ''}`}
              />
              {errors.nombre && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.nombre}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  DNI <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="text"
                value={dni}
                onChange={(e) => {
                  setDni(e.target.value)
                  clearError('dni')
                }}
                placeholder="Ej: 12345678"
                className={`input input-bordered w-full ${errors.dni ? 'input-error' : ''}`}
              />
              {errors.dni && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.dni}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Teléfono de Contacto <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="tel"
                value={telefono}
                onChange={(e) => {
                  setTelefono(e.target.value)
                  clearError('telefono')
                }}
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
                Domicilio <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="text"
              value={domicilio}
              onChange={(e) => {
                setDomicilio(e.target.value)
                clearError('domicilio')
              }}
              placeholder="Ej: Av. San Martín 456"
              className={`input input-bordered w-full ${errors.domicilio ? 'input-error' : ''}`}
            />
            {errors.domicilio && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.domicilio}</span>
              </label>
            )}
          </div>

          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text font-medium">
                Barrio <span className="text-error">*</span>
              </span>
            </label>
            <select
              value={barrio}
              onChange={(e) => {
                setBarrio(e.target.value)
                clearError('barrio')
              }}
              className={`select select-bordered w-full ${errors.barrio ? 'select-error' : ''}`}
            >
              <option value="">— Seleccioná un barrio —</option>
              {BARRIOS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            {errors.barrio && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.barrio}</span>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Documentación obligatoria */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-primary mb-4 text-base">Documentación obligatoria</h3>
          <div className="space-y-5">
            <div>
              <p className="mb-1 text-sm font-medium">
                1. Documentación del inmueble <span className="text-error">*</span>
              </p>
              <p className="text-base-content/60 mb-2 text-xs">
                Título de propiedad, contrato de locación o autorización del propietario.
              </p>
              <FileZone
                fileRef={fileRefs.docInmueble}
                file={archivos.docInmueble}
                error={errors.docInmueble}
                existing={archivosExistentes.docInmueble}
                onFileChange={(f) => setArchivo('docInmueble', f)}
              />
            </div>

            <div>
              <p className="mb-1 text-sm font-medium">
                2. Plano del local <span className="text-error">*</span>
              </p>
              <p className="text-base-content/60 mb-2 text-xs">
                Adjuntar copia del plano o croquis del inmueble.
              </p>
              <FileZone
                fileRef={fileRefs.planoLocal}
                file={archivos.planoLocal}
                error={errors.planoLocal}
                existing={archivosExistentes.planoLocal}
                onFileChange={(f) => setArchivo('planoLocal', f)}
              />
            </div>

            <div>
              <p className="mb-1 text-sm font-medium">
                3. Certificado de instalaciones eléctricas o factura de energía eléctrica{' '}
                <span className="text-error">*</span>
              </p>
              <p className="text-base-content/60 mb-2 text-xs">
                Adjuntar al menos uno de los dos: certificado emitido por profesional matriculado
                o copia de una factura de energía reciente.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-base-content/70 mb-1 text-xs font-medium">
                    Certificado eléctrico
                  </p>
                  <FileZone
                    fileRef={fileRefs.certElectrico}
                    file={archivos.certElectrico}
                    error={errors.certElectrico}
                    existing={archivosExistentes.certElectrico}
                    onFileChange={(f) => setArchivo('certElectrico', f)}
                  />
                </div>
                <div>
                  <p className="text-base-content/70 mb-1 text-xs font-medium">
                    Factura de energía
                  </p>
                  <FileZone
                    fileRef={fileRefs.facturaEnergia}
                    file={archivos.facturaEnergia}
                    error={errors.facturaEnergia}
                    existing={archivosExistentes.facturaEnergia}
                    onFileChange={(f) => setArchivo('facturaEnergia', f)}
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="mb-1 text-sm font-medium">
                4. Plancheta catastral <span className="text-error">*</span>
              </p>
              <p className="text-base-content/60 mb-2 text-xs">
                Adjuntar plancheta catastral del inmueble.
              </p>
              <FileZone
                fileRef={fileRefs.plancheta}
                file={archivos.plancheta}
                error={errors.plancheta}
                existing={archivosExistentes.plancheta}
                onFileChange={(f) => setArchivo('plancheta', f)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Declaración Jurada */}
      <div
        className={`card border-2 shadow-lg ${
          errors.declaracion
            ? 'border-error bg-error/5'
            : declaracion
              ? 'border-success bg-success/5'
              : 'border-warning bg-warning/5'
        }`}
      >
        <div className="card-body p-5">
          <div className="flex items-start gap-3">
            <IconAlertCircle
              size={20}
              className={`mt-0.5 shrink-0 ${
                errors.declaracion ? 'text-error' : declaracion ? 'text-success' : 'text-warning'
              }`}
            />
            <div className="flex-1">
              <p className="mb-1 text-sm font-semibold">Declaración Jurada</p>
              <p className="text-base-content/70 mb-3 text-sm">
                Declaro que la información y documentación presentada es auténtica y corresponde al
                inmueble y actividad declarados. Asimismo, tomo conocimiento de que la aprobación
                del Permiso de Uso no implica la habilitación automática de la actividad comercial,
                debiendo continuar posteriormente con las instancias de Habilitaciones Comerciales y
                Rentas.
              </p>
              <label className="flex cursor-pointer items-start gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-warning mt-0.5"
                  checked={declaracion}
                  onChange={(e) => {
                    setDeclaracion(e.target.checked)
                    if (e.target.checked) clearError('declaracion')
                  }}
                />
                <span className="text-sm font-medium">
                  Acepto los términos de esta declaración <span className="text-error">*</span>
                </span>
              </label>
              {errors.declaracion && (
                <p className="text-error mt-2 text-xs">{errors.declaracion}</p>
              )}
            </div>
          </div>
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
              <IconSend size={18} />
              Enviar Solicitud — Paso 1
            </>
          )}
        </button>
      </div>
    </form>
  )
}
