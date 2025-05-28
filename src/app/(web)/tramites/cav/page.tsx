import { IconBrandWhatsapp, IconHeadset } from '@tabler/icons-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Centro de Atención Al Vecino - San Benito',
}

export default function PageCAV() {
  return (
    <main className="container mx-auto px-4 py-6">
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">Centro de Atención Al Vecino (CAV)</h1>
            <p className="mt-4 text-base leading-relaxed md:text-lg">
              El Centro de Atención Al Vecino se encarga de recibir y gestionar los reclamos de los
              ciudadanos, brindando una atención personalizada tanto de manera presencial como a
              través de WhatsApp para mejorar la calidad de vida en nuestra comunidad.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="mb-6 text-center text-2xl font-semibold md:text-3xl">
            Canales de Atención
          </h2>

          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-center">
            <a
              href="https://wa.me/543436127013"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success gap-2 shadow-md transition-transform hover:scale-105"
            >
              <IconBrandWhatsapp size={20} />
              <span>WhatsApp CAV: 3436127013</span>
            </a>

            <Link
              href="#"
              className="btn btn-primary gap-2 shadow-md transition-transform hover:scale-105"
            >
              <IconHeadset size={20} />
              <span>Atención Presencial</span>
            </Link>

            {/* <Link
              href="#"
              className="btn btn-secondary gap-2 shadow-md transition-transform hover:scale-105"
            >
              <IconMessage2 size={20} />
              <span>Consultar Estado de Reclamo</span>
            </Link> */}
          </div>
        </div>

        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Horarios de Atención</h2>
          <p className="text-base leading-relaxed">
            Atención presencial: Lunes a Viernes de 7:00 a 13:00 hs
            <br />
            WhatsApp: Lunes a Viernes de 7:00 a 13:00 hs
          </p>
        </div>
      </section>
    </main>
  )
}
