import { LineasColectivos } from '@/web/components/lineas-colectivos'
import { IconArrowLeft, IconBus, IconCreditCard } from '@tabler/icons-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Transporte Público y SUBE - San Benito',
  description:
    'Información sobre las líneas de colectivos que conectan San Benito y la ubicación del nuevo punto SUBE para acreditación de saldo y gestión de beneficios.',
}

export default function Coleectivos() {
  return (
    <>
      <main className="container mx-auto p-6">
        <Link
          href="/nuestra-ciudad"
          className="btn btn-link text-primary mb-2 pl-0 hover:no-underline"
        >
          <IconArrowLeft size={18} />
          Volver a Nuestra Ciudad
        </Link>
        <section className="hero bg-base-200 rounded-lg p-10 text-center shadow-lg">
          <div className="hero-content">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-5xl font-bold">Transporte Público</h1>
              <p className="mt-4 text-lg leading-relaxed">
                Servicios de colectivos que conectan San Benito con Paraná, Colonia Avellaneda y Oro
                Verde, fundamentales para la movilidad diaria de los ciudadanos.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 space-y-8">
          <div className="bg-base-100 rounded-lg p-6 shadow-md">
            <div className="mb-6 flex items-center gap-3">
              <IconCreditCard className="text-primary" size={32} stroke={1.5} />
              <h2 className="text-3xl font-semibold">Nuevo Punto SUBE 24hs</h2>
            </div>
            <p className="text-lg leading-relaxed">
              Se ha habilitado una nueva terminal de autoservicio SUBE en la{' '}
              <strong>Biblioteca Municipal "Santiago Tórtul" (Punto Digital)</strong>. La misma está
              disponible las 24hs para consultar saldo, acreditación de cargas virtuales y
              habilitación de beneficios.
            </p>
          </div>
          <div className="bg-base-100 rounded-lg p-6 shadow-md">
            <div className="mb-6 flex items-center gap-3">
              <IconBus className="text-primary" size={32} stroke={1.5} />
              <h2 className="text-3xl font-semibold">Recorridos</h2>
            </div>
            <LineasColectivos />
          </div>
        </section>
      </main>
    </>
  )
}
