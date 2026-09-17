export const FORMULARIO_INICIO_PDF_URL =
  'https://sanbenito.gob.ar/api/archivos/file/Formulario%201%20INICIO%20-%202026-1.pdf'

export const HIGIENE_SEGURIDAD_ITEMS = [
  { value: 'MATAFUEGOS', label: 'Matafuegos vigente' },
  { value: 'LUCES_EMERGENCIA', label: 'Luces de emergencia' },
  { value: 'PLANO_EVACUACION', label: 'Plano de evacuación' },
  { value: 'BOTIQUIN', label: 'Botiquín de primeros auxilios' },
  { value: 'SANITARIOS', label: 'Sanitarios en buen estado' },
  { value: 'AGUA_DESAGUES', label: 'Agua potable y desagües' },
  { value: 'CESTOS', label: 'Cestos con tapa interno y elevado 1,50 m externo' },
  { value: 'ILUMINACION', label: 'Iluminación adecuada' },
  { value: 'SENALIZACION', label: 'Señalización' },
  { value: 'ELECTRICA', label: 'Instalación eléctrica en buen estado' },
  { value: 'VESTIMENTA_ALIMENTICIO', label: 'Vestimenta reglamentaria rubro alimenticio' },
  { value: 'VENTILACION', label: 'Ventilación adecuada' },
  { value: 'PLAGAS', label: 'Control de plagas' },
  { value: 'PISOS_PAREDES_TECHOS', label: 'Pisos, paredes y techos en buen estado' },
  { value: 'SEGURO_RC', label: 'Seguro RC si corresponde' },
  { value: 'HORARIOS', label: 'Cumplimiento de horarios comerciales' },
] as const

export type HigieneSeguridadItem = (typeof HIGIENE_SEGURIDAD_ITEMS)[number]['value']

export const HIGIENE_SEGURIDAD_VALUES = HIGIENE_SEGURIDAD_ITEMS.map((i) => i.value)

export const LIBROS_TAPA_DURA_OPTIONS = [
  { value: 'SI', label: 'Sí' },
  { value: 'LOS_TRAMITARE', label: 'No, los tramitaré antes' },
] as const
