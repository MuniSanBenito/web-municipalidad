'use client'

import { submitRenovacion, updateRenovacion } from '@/actions/renovaciones'
import {
  FORMULARIO_INICIO_PDF_URL,
  HIGIENE_SEGURIDAD_ITEMS,
  LIBROS_TAPA_DURA_OPTIONS,
} from '@/payload/constants/renovacion'
import {
  IconAlertTriangle,
  IconCheck,
  IconDownload,
  IconFile,
  IconLoader2,
  IconUpload,
} from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useRef, useState, type ReactNode } from 'react'
import { toast } from 'sonner'

type FileMeta = { url?: string | null; filename?: string | null } | null

interface ComercioResumen {
  nombre: string
  razonSocial: string
  cuit: string
  direccion: string
  numeroHabilitacion?: string | null
  rubroNombre?: string | null
}

interface SolicitanteDefaults {
  nombre?: string
  dni?: string
  domicilio?: string
  telefono?: string
  email?: string
}

interface Props {
  comercioId: string
  comercio: ComercioResumen
  solicitanteDefaults?: SolicitanteDefaults
  renovacionId?: string
  isEdit?: boolean
  readOnly?: boolean
  estado?: string | null
  notaCiudadano?: string | null
  fechaVisita?: string | null
  resolucion?: FileMeta
  solicitanteNombre?: string | null
  solicitanteDni?: string | null
  solicitanteDomicilio?: string | null
  solicitanteTelefono?: string | null
  solicitanteEmail?: string | null
  numeroExpedienteAnterior?: string | null
  formularioInicio?: FileMeta
  comprobanteSellado?: FileMeta
  dniAdjunto?: FileMeta
  libreDeuda?: FileMeta
  certResiduosPeligrosos?: FileMeta
  adjuntosOtros?: FileMeta[]
  librosTapaDura?: string | null
  higieneSeguridad?: string[] | null
  generaResiduosPeligrosos?: string | boolean | null
  declaracionJurada?: boolean | null
}

function FileField({
  label,
  name,
  required = false,
  existing,
  error,
  disabled,
  hint,
}: {
  label: string
  name: string
  required?: boolean
  existing?: FileMeta
  error?: string
  disabled?: boolean
  hint?: ReactNode
}) {
  const [file, setFile] = useState<File | null>(null)
  const hasExisting = !file && !!existing?.url
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-sm font-medium">
          {label} {required && <span className="text-error">*</span>}
        </span>
      </label>
      {hint && <div className="text-base-content/60 mb-2 text-xs">{hint}</div>}
      {disabled ? (
        existing?.url ? (
          <a
            href={existing.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm justify-start gap-2"
          >
            <IconFile size={14} />
            {existing.filename ?? 'Ver archivo'}
          </a>
        ) : (
          <p className="text-base-content/50 text-xs">Sin archivo</p>
        )
      ) : (
        <div
          className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed p-3 transition-colors ${file ? 'border-success bg-success/5' : hasExisting ? 'border-primary/40 bg-primary/5' : error ? 'border-error bg-error/5' : 'border-base-300 hover:border-primary/40'}`}
          onClick={() => ref.current?.click()}
        >
          <input
            ref={ref}
            type="file"
            name={name}
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
          {file ? (
            <>
              <IconCheck size={16} className="text-success shrink-0" />
              <span className="text-success truncate text-xs">{file.name}</span>
            </>
          ) : hasExisting ? (
            <>
              <IconCheck size={16} className="text-primary shrink-0" />
              <span className="text-primary truncate text-xs">
                {existing?.filename ?? 'Archivo ya cargado'} — click para reemplazar
              </span>
            </>
          ) : (
            <>
              <IconUpload size={16} className="text-base-content/30 shrink-0" />
              <span className="text-base-content/40 text-xs">PDF, JPG o PNG · máx. 20 MB</span>
            </>
          )}
        </div>
      )}
      {error && <p className="text-error mt-1 text-xs">{error}</p>}
    </div>
  )
}

function TextField({
  label,
  name,
  defaultValue,
  required,
  disabled,
  type = 'text',
  hint,
}: {
  label: string
  name: string
  defaultValue?: string
  required?: boolean
  disabled?: boolean
  type?: string
  hint?: string
}) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-sm font-medium">
          {label} {required && <span className="text-error">*</span>}
        </span>
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required && !disabled}
        disabled={disabled}
        className="input input-bordered input-sm w-full"
      />
      {hint && <p className="text-base-content/60 mt-1 text-xs">{hint}</p>}
    </div>
  )
}

function residuosValue(value: string | boolean | null | undefined): 'SI' | 'NO' | '' {
  if (value === 'SI' || value === true) return 'SI'
  if (value === 'NO' || value === false) return 'NO'
  return ''
}

export function ExpedienteRenovacionForm({
  comercioId,
  comercio,
  solicitanteDefaults,
  renovacionId,
  isEdit,
  readOnly,
  estado,
  notaCiudadano,
  fechaVisita,
  resolucion,
  solicitanteNombre,
  solicitanteDni,
  solicitanteDomicilio,
  solicitanteTelefono,
  solicitanteEmail,
  numeroExpedienteAnterior,
  formularioInicio,
  comprobanteSellado,
  dniAdjunto,
  libreDeuda,
  certResiduosPeligrosos,
  adjuntosOtros = [],
  librosTapaDura,
  higieneSeguridad,
  generaResiduosPeligrosos,
  declaracionJurada,
}: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [libros, setLibros] = useState(librosTapaDura ?? '')
  const [higiene, setHigiene] = useState<string[]>(higieneSeguridad ?? [])
  const [residuos, setResiduos] = useState<'SI' | 'NO' | ''>(residuosValue(generaResiduosPeligrosos))
  const [declaracion, setDeclaracion] = useState(Boolean(declaracionJurada))

  function toggleHigiene(value: string) {
    setHigiene((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (readOnly) return

    const nextErrors: Record<string, string> = {}
    if (!libros) nextErrors.libros = 'Indicá si tenés los libros o si los vas a tramitar.'
    if (higiene.length !== HIGIENE_SEGURIDAD_ITEMS.length) {
      nextErrors.higiene = 'Debés marcar todos los ítems (contar con ellos o regularizarlos).'
    }
    if (!residuos) nextErrors.residuos = 'Indicá si genera residuos peligrosos.'
    if (!declaracion) nextErrors.declaracion = 'Debés aceptar la declaración jurada.'
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      toast.error('Completá las declaraciones obligatorias.')
      return
    }

    setLoading(true)
    setErrors({})
    const formData = new FormData(e.currentTarget)
    formData.set('comercioId', comercioId)
    formData.set('librosTapaDura', libros)
    formData.set('generaResiduosPeligrosos', residuos)
    formData.set('declaracionJurada', String(declaracion))
    formData.delete('higieneSeguridad')
    for (const item of higiene) formData.append('higieneSeguridad', item)

    const result = renovacionId
      ? await updateRenovacion(renovacionId, formData)
      : await submitRenovacion(formData)

    setLoading(false)

    if (result.error) {
      toast.error(result.error)
      return
    }

    toast.success(isEdit ? 'Renovación actualizada.' : 'Renovación enviada.')
    router.push('/habilitaciones')
    router.refresh()
  }

  const rentasHint = (
    <>
      Podés acercarte a Rentas o coordinarlo por WhatsApp:{' '}
      <a
        href="https://wa.me/543436127015"
        target="_blank"
        rel="noopener noreferrer"
        className="link"
      >
        3436127015
      </a>
    </>
  )

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="card bg-base-200 shadow">
        <div className="card-body p-5">
          <h2 className="card-title text-base">Comercio</h2>
          <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-base-content/60 text-xs uppercase">Nombre de fantasía</dt>
              <dd className="font-medium">{comercio.nombre}</dd>
            </div>
            <div>
              <dt className="text-base-content/60 text-xs uppercase">Razón social</dt>
              <dd className="font-medium">{comercio.razonSocial}</dd>
            </div>
            <div>
              <dt className="text-base-content/60 text-xs uppercase">CUIT / CUIL</dt>
              <dd className="font-medium">{comercio.cuit}</dd>
            </div>
            <div>
              <dt className="text-base-content/60 text-xs uppercase">Dirección</dt>
              <dd className="font-medium">{comercio.direccion}</dd>
            </div>
            {comercio.numeroHabilitacion && (
              <div>
                <dt className="text-base-content/60 text-xs uppercase">N° habilitación</dt>
                <dd className="font-mono font-medium">{comercio.numeroHabilitacion}</dd>
              </div>
            )}
            {comercio.rubroNombre && (
              <div>
                <dt className="text-base-content/60 text-xs uppercase">Rubro</dt>
                <dd className="font-medium">{comercio.rubroNombre}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      {notaCiudadano && (
        <div className="alert alert-info">
          <IconAlertTriangle size={16} className="shrink-0" />
          <p className="text-sm whitespace-pre-wrap">{notaCiudadano}</p>
        </div>
      )}

      {fechaVisita && (
        <div className="alert alert-accent">
          <p className="text-sm">
            Visita programada:{' '}
            {new Date(fechaVisita).toLocaleString('es-AR', {
              dateStyle: 'full',
              timeStyle: 'short',
            })}
          </p>
        </div>
      )}

      {resolucion?.url && (
        <div className="border-info/30 bg-info/5 flex flex-wrap items-center gap-2 rounded-lg border p-3">
          <IconFile size={16} className="text-info shrink-0" />
          <span className="min-w-0 flex-1 truncate text-xs">
            {resolucion.filename ?? 'Resolución'}
          </span>
          <a href={resolucion.url} target="_blank" rel="noopener noreferrer" className="btn btn-info btn-xs gap-1">
            Ver
          </a>
          <a href={resolucion.url} download className="btn btn-ghost btn-xs gap-1">
            <IconDownload size={13} />
            Descargar
          </a>
        </div>
      )}

      {estado === 'OBSERVADO' && !readOnly && (
        <div className="alert alert-warning">
          <IconAlertTriangle size={16} className="shrink-0" />
          <p className="text-sm">
            Habilitaciones observó el trámite. Revisá la nota, actualizá la documentación y volvé a
            enviar.
          </p>
        </div>
      )}

      <div className="card bg-base-100 shadow">
        <div className="card-body grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
          <h2 className="card-title text-base sm:col-span-2">Datos del solicitante</h2>
          <TextField
            label="Nombre y apellido"
            name="solicitanteNombre"
            required
            disabled={readOnly}
            defaultValue={solicitanteNombre ?? solicitanteDefaults?.nombre ?? ''}
          />
          <TextField
            label="DNI"
            name="solicitanteDni"
            required
            disabled={readOnly}
            defaultValue={solicitanteDni ?? solicitanteDefaults?.dni ?? ''}
          />
          <TextField
            label="Domicilio legal"
            name="solicitanteDomicilio"
            required
            disabled={readOnly}
            defaultValue={solicitanteDomicilio ?? solicitanteDefaults?.domicilio ?? ''}
          />
          <TextField
            label="Teléfono"
            name="solicitanteTelefono"
            required
            disabled={readOnly}
            defaultValue={solicitanteTelefono ?? solicitanteDefaults?.telefono ?? ''}
          />
          <TextField
            label="Correo electrónico"
            name="solicitanteEmail"
            type="email"
            required
            disabled={readOnly}
            defaultValue={solicitanteEmail ?? solicitanteDefaults?.email ?? ''}
            hint="El correo declarado será utilizado como domicilio fiscal electrónico para enviar notificaciones."
          />
          <TextField
            label="Número de expediente anterior (si lo conoce)"
            name="numeroExpedienteAnterior"
            disabled={readOnly}
            defaultValue={numeroExpedienteAnterior ?? ''}
          />
        </div>
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body space-y-4 p-5">
          <h2 className="card-title text-base">Documentación</h2>
          <FileField
            label="Foto DNI actualizada"
            name="dniAdjunto"
            required
            existing={dniAdjunto}
            disabled={readOnly}
          />

          <div className="bg-primary/5 border-primary/20 rounded-lg border p-4">
            <p className="text-base-content/70 mb-3 text-sm">
              Descargá el Formulario 1 de Inicio, completalo, firmalo y subilo acá.
            </p>
            <a
              href={FORMULARIO_INICIO_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm w-fit gap-2"
            >
              <IconDownload size={16} />
              Descargar Formulario 1 INICIO
            </a>
          </div>
          <FileField
            label="Formulario de Inicio firmado"
            name="formularioInicio"
            required
            existing={formularioInicio}
            disabled={readOnly}
          />
          <FileField
            label="Comprobante de pago del sellado municipal (Carpeta Técnica de Habilitaciones)"
            name="comprobanteSellado"
            required
            existing={comprobanteSellado}
            disabled={readOnly}
            hint={rentasHint}
          />
          <FileField
            label="Estado de deuda Rentas"
            name="libreDeuda"
            required
            existing={libreDeuda}
            disabled={readOnly}
            hint={rentasHint}
          />
          {!readOnly && (
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm font-medium">Otra documentación</span>
              </label>
              <input
                type="file"
                name="adjuntosOtros"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
                className="file-input file-input-bordered file-input-sm w-full"
              />
            </div>
          )}
          {adjuntosOtros.length > 0 && (
            <ul className="space-y-1">
              {adjuntosOtros.map((a, i) =>
                a?.url ? (
                  <li key={`${a.url}-${i}`}>
                    <a
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link link-primary text-xs"
                    >
                      {a.filename ?? `Adjunto ${i + 1}`}
                    </a>
                  </li>
                ) : null,
              )}
            </ul>
          )}
        </div>
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body space-y-4 p-5">
          <h2 className="card-title text-base">Libros tapa dura</h2>
          <p className="text-base-content/70 text-sm">
            ¿Tiene libros de quejas y habilitaciones tapa dura? <span className="text-error">*</span>
          </p>
          <div className="flex flex-col gap-2">
            {LIBROS_TAPA_DURA_OPTIONS.map((opt) => (
              <label key={opt.value} className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  className="radio radio-primary radio-sm"
                  name="librosTapaDuraUi"
                  checked={libros === opt.value}
                  disabled={readOnly}
                  onChange={() => setLibros(opt.value)}
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
          {errors.libros && <p className="text-error text-xs">{errors.libros}</p>}
        </div>
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body space-y-3 p-5">
          <h2 className="card-title text-base">Declaración jurada de higiene y seguridad</h2>
          <p className="text-base-content/70 text-sm">
            Ley 19.587, CAA 18.284, Ord. 355/13. Declaro contar con lo siguiente o comprometerme a
            regularizarlo antes de la inspección: <span className="text-error">*</span>
          </p>
          {HIGIENE_SEGURIDAD_ITEMS.map((item) => (
            <label key={item.value} className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                className="checkbox checkbox-primary mt-0.5"
                checked={higiene.includes(item.value)}
                disabled={readOnly}
                onChange={() => toggleHigiene(item.value)}
              />
              <span className="text-sm">{item.label}</span>
            </label>
          ))}
          {errors.higiene && <p className="text-error text-xs">{errors.higiene}</p>}
        </div>
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body space-y-4 p-5">
          <h2 className="card-title text-base">Residuos peligrosos</h2>
          <p className="text-sm">
            ¿Genera residuos peligrosos? <span className="text-error">*</span>
          </p>
          <div className="flex gap-4">
            {(
              [
                ['SI', 'Sí'],
                ['NO', 'No'],
              ] as const
            ).map(([val, label]) => (
              <label key={val} className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  className="radio radio-primary radio-sm"
                  checked={residuos === val}
                  disabled={readOnly}
                  onChange={() => setResiduos(val)}
                />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
          {errors.residuos && <p className="text-error text-xs">{errors.residuos}</p>}
          {residuos === 'SI' && (
            <FileField
              label="Certificación Medio Ambiente de la Provincia"
              name="certResiduosPeligrosos"
              required
              existing={certResiduosPeligrosos}
              disabled={readOnly}
            />
          )}
        </div>
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body space-y-3 p-5">
          <h2 className="card-title text-base">Confirmación final</h2>
          <p className="text-base-content/70 text-sm">
            Declaro bajo juramento que los datos consignados en esta solicitud y la documentación
            adjunta son veraces y exactos. Tomo conocimiento de que cualquier falsedad,
            ocultamiento u omisión dará lugar a la anulación del trámite, sin perjuicio de las
            acciones legales y sanciones correspondientes. Asimismo, me comprometo a cumplir con
            las normativas municipales vigentes (Ordenanza N° 355/13 HCDSB y modificatorias).
          </p>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              className="checkbox checkbox-primary mt-0.5"
              checked={declaracion}
              disabled={readOnly}
              onChange={(e) => setDeclaracion(e.target.checked)}
            />
            <span className="text-sm">
              He leído, comprendo y acepto los términos de esta declaración jurada.{' '}
              <span className="text-error">*</span>
            </span>
          </label>
          {errors.declaracion && <p className="text-error text-xs">{errors.declaracion}</p>}
        </div>
      </div>

      {!readOnly && (
        <button type="submit" className="btn btn-primary w-full gap-2" disabled={loading}>
          {loading ? <IconLoader2 size={18} className="animate-spin" /> : <IconCheck size={18} />}
          {isEdit ? 'Actualizar renovación' : 'Enviar renovación'}
        </button>
      )}
    </form>
  )
}
