import type { User } from '@/payload-types'
import { isAdminCollectionAccess } from '@/payload/access/collection'
import type { Access, CollectionConfig, Field } from 'payload'
import { HIDE_API_URL } from '../config'
import { ROL_ADMIN_VALUE } from '../constants/roles'

const readOnlyField = { readOnly: true } as const

const contribuyenteFields: Field[] = [
  {
    name: 'numero_contribuyente',
    type: 'number',
    label: 'Nº Contribuyente',
    required: false,
    admin: {
      ...readOnlyField,
      description:
        'Identificador único del contribuyente en el sistema legacy de Rentas (num_cont). Clave de deduplicación en la importación.',
    },
  },
  {
    name: 'nombre',
    type: 'text',
    label: 'Nombre',
    admin: {
      ...readOnlyField,
      description: 'Nombre o razón social del contribuyente (nom_cont).',
    },
  },
  {
    name: 'domicilio',
    type: 'text',
    label: 'Domicilio',
    admin: {
      ...readOnlyField,
      description: 'Domicilio fiscal o de contacto (dom_cont).',
    },
  },
  {
    name: 'codigo_postal',
    type: 'number',
    label: 'Código Postal',
    admin: {
      ...readOnlyField,
      description: 'Código postal del domicilio (pos_cont).',
    },
  },
  {
    name: 'tipo_documento',
    type: 'number',
    label: 'Tipo Documento',
    admin: {
      ...readOnlyField,
      description:
        'Código AFIP del tipo de documento (tdo_cont). Ej.: 96 = DNI, 80 = CUIT, 89 = LE, 90 = LC.',
    },
  },
  {
    name: 'numero_documento',
    type: 'text',
    label: 'Nº Documento',
    index: true,
    admin: {
      ...readOnlyField,
      description: 'Número de documento de identidad (ndo_cont).',
    },
  },
  {
    name: 'categoria',
    type: 'number',
    label: 'Categoría',
    admin: {
      ...readOnlyField,
      description:
        'Categoría del contribuyente en Rentas (cat_cont). Valor numérico; en el export predominan categoría 1.',
    },
  },
  {
    name: 'cuit',
    type: 'text',
    label: 'CUIT',
    admin: {
      ...readOnlyField,
      description: 'CUIT/CUIL del contribuyente (cui_cont).',
    },
  },
  {
    name: 'habilitado_web',
    type: 'checkbox',
    label: 'Habilitado Web',
    admin: {
      ...readOnlyField,
      description:
        'Habilitación para trámites web (hwe_cont). En legacy: 1 = habilitado, 2 = no habilitado; importado como checkbox (solo 1 → true).',
    },
  },
  {
    name: 'clave_web',
    type: 'text',
    label: 'Clave Web',
    admin: {
      ...readOnlyField,
      description:
        'Clave de acceso web (cwe_cont). Suele venir como (Binary/Image) en el export y se importa vacío.',
    },
  },
  {
    name: 'email',
    type: 'text',
    label: 'Email',
    admin: {
      ...readOnlyField,
      description:
        'Email principal para trámites web (mwe_cont). Normalizado a minúsculas en la importación; muchos registros sin dato en el export.',
    },
  },
  {
    name: 'dcc',
    type: 'number',
    label: 'DCC',
    admin: {
      ...readOnlyField,
      description: 'Campo numérico legacy de Rentas (dcc_cont), importado sin transformación.',
    },
  },
  {
    name: 'domicilio_altura',
    type: 'text',
    label: 'Domicilio Altura',
    admin: {
      ...readOnlyField,
      description: 'Altura o número de calle del domicilio (dca_cont).',
    },
  },
  {
    name: 'domicilio_calle_secundaria',
    type: 'text',
    label: 'Domicilio Calle Secundaria',
    admin: {
      ...readOnlyField,
      description: 'Entre calle o referencia secundaria (dcs_cont). Valores - se importan vacíos.',
    },
  },
  {
    name: 'domicilio_torre',
    type: 'text',
    label: 'Domicilio Torre',
    admin: {
      ...readOnlyField,
      description: 'Torre o bloque del domicilio (dct_cont).',
    },
  },
  {
    name: 'domicilio_piso',
    type: 'text',
    label: 'Domicilio Piso',
    admin: {
      ...readOnlyField,
      description: 'Piso del domicilio (dcp_cont).',
    },
  },
  {
    name: 'domicilio_depto',
    type: 'text',
    label: 'Domicilio Depto',
    admin: {
      ...readOnlyField,
      description: 'Departamento o unidad (dcd_cont).',
    },
  },
  {
    name: 'sexo',
    type: 'number',
    label: 'Sexo',
    admin: {
      ...readOnlyField,
      description: 'Código de sexo (sex_cont). 1 = masculino, 2 = femenino, 0 = no informado.',
    },
  },
  {
    name: 'nacionalidad',
    type: 'text',
    label: 'Nacionalidad',
    admin: {
      ...readOnlyField,
      description:
        'Nacionalidad declarada (nac_cont). Ej.: ARG.; valores (Binary/Image) se importan vacíos.',
    },
  },
  {
    name: 'cba',
    type: 'number',
    label: 'CBA',
    admin: {
      ...readOnlyField,
      description: 'Campo numérico legacy (cba_cont). En el export actual todos los valores son 0.',
    },
  },
  {
    name: 'cbu',
    type: 'text',
    label: 'CBU',
    admin: {
      ...readOnlyField,
      description: 'CBU — Clave Bancaria Uniforme (cbu_cont), si fue informado.',
    },
  },
  {
    name: 'fecha_alta',
    type: 'date',
    label: 'Fecha Alta',
    admin: {
      ...readOnlyField,
      description:
        'Fecha de alta en Rentas (fha_cont). La fecha sentinel 9999-12-31 se importa vacía.',
    },
  },
  {
    name: 'fecha_nacimiento',
    type: 'date',
    label: 'Fecha Nacimiento',
    admin: {
      ...readOnlyField,
      description: 'Fecha de nacimiento (fna_cont). La fecha sentinel 1900-01-01 se importa vacía.',
    },
  },
  {
    name: 'email_secundario',
    type: 'text',
    label: 'Email Secundario',
    admin: {
      ...readOnlyField,
      description:
        'Email secundario para trámites web (m2w_cont). Normalizado a minúsculas en la importación.',
    },
  },
  {
    name: 'telefono_web',
    type: 'text',
    label: 'Teléfono Web',
    admin: {
      ...readOnlyField,
      description: 'Teléfono principal para trámites web (twe_cont).',
    },
  },
  {
    name: 'telefono_secundario',
    type: 'text',
    label: 'Teléfono Secundario',
    admin: {
      ...readOnlyField,
      description: 'Teléfono secundario (t2w_cont).',
    },
  },
  {
    name: 'dfi',
    type: 'number',
    label: 'DFI',
    admin: {
      ...readOnlyField,
      description: 'Campo numérico legacy (dfi_cont). En el export actual todos los valores son 0.',
    },
  },
]

const isAdminOrWithKey: Access<User> = ({ req }) => {
  if (req.user?.collection === 'users' && req?.user?.rol?.includes(ROL_ADMIN_VALUE)) {
    return true
  }

  if (req?.headers?.get('token') === process.env.EXTERNAL_API_KEY) {
    return true
  }

  return false
}

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
    read: isAdminOrWithKey,
    create: isAdminOrWithKey,
    update: isAdminOrWithKey,
    delete: isAdminCollectionAccess,
  },
  fields: contribuyenteFields,
}
