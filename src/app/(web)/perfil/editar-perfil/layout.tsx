import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Editar Perfil - San Benito',
  description: 'Edita la información de tu perfil de ciudadano',
}

export default function EditarPerfilLayout({ children }: { children: React.ReactNode }) {
  return children
}
