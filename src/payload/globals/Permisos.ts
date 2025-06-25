// export const COLLECTIONS = [
//   Users,
//   Noticias,
//   Imagenes,
//   Curriculums,
//   Archivos,
//   Avatares,
//   Memorias,
//   Contabilidad,
//   Intimaciones,
//   Ubicaciones,
//   Eventos,
//   Habilitaciones,
//   Licitaciones,
//   Concursos,
//   BalancesMensuales,
// ]

// export const GLOBALS = [Autoridades]

// function fieldAccion(args: { name: string; label: string }): Field {
//   const { name, label } = args
//   return {
//     type: 'select',
//     name,
//     label,
//     options: [...ROLES, ROL_OWN_VALUE, ROL_PUBLICO_VALUE],
//     hasMany: true,
//     defaultValue: ROL_ADMIN_VALUE,
//     interfaceName: 'PermisoRoles',
//   }
// }

// export const Permisos: GlobalConfig = {
//   slug: 'permisos',
//   label: 'Permisos',
//   access: {
//     read: isAdminCollectionAccess,
//     update: isAdminCollectionAccess,
//   },
//   fields: [...COLLECTIONS, ...GLOBALS].map((collection) => ({
//     type: 'group',
//     name: collection.slug,
//     label: collection.slug.toUpperCase(),
//     interfaceName: 'PermisoActions',
//     fields: [
//       {
//         type: 'row',
//         fields: [
//           fieldAccion({ name: PERMISO_ACCION_CREAR, label: 'Crear' }),
//           fieldAccion({ name: PERMISO_ACCION_LEER, label: 'Leer' }),
//           fieldAccion({ name: PERMISO_ACCION_ACTUALIZAR, label: 'Actualizar' }),
//           fieldAccion({ name: PERMISO_ACCION_BORRAR, label: 'Borrar' }),
//         ],
//       },
//     ],
//   })),
// }
