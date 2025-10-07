import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Iniciar Sesión - San Benito',
  description:
    'Accede a tu cuenta de ciudadano de San Benito para gestionar tus trámites y servicios municipales',
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
