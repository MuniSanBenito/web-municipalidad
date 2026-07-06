import { isAdminCollectionAccess } from '@/payload/access/collection'
import type { CollectionConfig, Field } from 'payload'
import { HIDE_API_URL } from '../config'

const readOnlyField = { readOnly: true } as const

const contribuyenteFields: Field[] = [
  {
    name: 'numero_contribuyente',
    type: 'number',
    label: 'Nº Contribuyente',
    required: true,
    unique: true,
    index: true,
    admin: readOnlyField,
  },
  {
    name: 'nombre',
    type: 'text',
    label: 'Nombre',
    admin: readOnlyField,
  },
  {
    name: 'domicilio',
    type: 'text',
    label: 'Domicilio',
    admin: readOnlyField,
  },
  {
    name: 'codigo_postal',
    type: 'number',
    label: 'Código Postal',
    admin: readOnlyField,
  },
  {
    name: 'tipo_documento',
    type: 'number',
    label: 'Tipo Documento',
    admin: readOnlyField,
  },
  {
    name: 'numero_documento',
    type: 'text',
    label: 'Nº Documento',
    index: true,
    admin: readOnlyField,
  },
  {
    name: 'categoria',
    type: 'number',
    label: 'Categoría',
    admin: readOnlyField,
  },
  {
    name: 'cuit',
    type: 'text',
    label: 'CUIT',
    admin: readOnlyField,
  },
  {
    name: 'habilitado_web',
    type: 'checkbox',
    label: 'Habilitado Web',
    admin: readOnlyField,
  },
  {
    name: 'clave_web',
    type: 'text',
    label: 'Clave Web',
    admin: readOnlyField,
  },
  {
    name: 'email',
    type: 'text',
    label: 'Email',
    admin: readOnlyField,
  },
  {
    name: 'dcc',
    type: 'number',
    label: 'DCC',
    admin: readOnlyField,
  },
  {
    name: 'domicilio_altura',
    type: 'text',
    label: 'Domicilio Altura',
    admin: readOnlyField,
  },
  {
    name: 'domicilio_calle_secundaria',
    type: 'text',
    label: 'Domicilio Calle Secundaria',
    admin: readOnlyField,
  },
  {
    name: 'domicilio_torre',
    type: 'text',
    label: 'Domicilio Torre',
    admin: readOnlyField,
  },
  {
    name: 'domicilio_piso',
    type: 'text',
    label: 'Domicilio Piso',
    admin: readOnlyField,
  },
  {
    name: 'domicilio_depto',
    type: 'text',
    label: 'Domicilio Depto',
    admin: readOnlyField,
  },
  {
    name: 'sexo',
    type: 'number',
    label: 'Sexo',
    admin: readOnlyField,
  },
  {
    name: 'nacionalidad',
    type: 'text',
    label: 'Nacionalidad',
    admin: readOnlyField,
  },
  {
    name: 'cba',
    type: 'number',
    label: 'CBA',
    admin: readOnlyField,
  },
  {
    name: 'cbu',
    type: 'text',
    label: 'CBU',
    admin: readOnlyField,
  },
  {
    name: 'fecha_alta',
    type: 'date',
    label: 'Fecha Alta',
    admin: readOnlyField,
  },
  {
    name: 'fecha_nacimiento',
    type: 'date',
    label: 'Fecha Nacimiento',
    admin: readOnlyField,
  },
  {
    name: 'email_secundario',
    type: 'text',
    label: 'Email Secundario',
    admin: readOnlyField,
  },
  {
    name: 'telefono_web',
    type: 'text',
    label: 'Teléfono Web',
    admin: readOnlyField,
  },
  {
    name: 'telefono_secundario',
    type: 'text',
    label: 'Teléfono Secundario',
    admin: readOnlyField,
  },
  {
    name: 'dfi',
    type: 'number',
    label: 'DFI',
    admin: readOnlyField,
  },
]

export const Contribuyentes: CollectionConfig = {
  slug: 'contribuyentes',
  labels: {
    singular: 'Contribuyente',
    plural: 'Contribuyentes',
  },
  admin: {
    useAsTitle: 'nombre',
    hideAPIURL: HIDE_API_URL,
    group: 'Hacienda',
    defaultColumns: ['numero_contribuyente', 'nombre', 'cuit', 'email', 'domicilio'],
    listSearchableFields: ['nombre', 'numero_contribuyente', 'cuit', 'numero_documento', 'email'],
    description: 'Datos de contribuyentes importados del sistema legacy de Rentas',
  },
  access: {
    read: isAdminCollectionAccess,
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: contribuyenteFields,
}
