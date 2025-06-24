export interface Alerta {
  id: string
  mensaje: string
  activa: boolean
  tipo: 'info' | 'warning' | 'error'
  createdAt: string
  updatedAt: string
}
