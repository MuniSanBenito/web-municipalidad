'use client'
import PageTitle from '@/web/components/ui/PageTitle'
import { IconArrowLeft } from '@tabler/icons-react'
import Link from 'next/link'

export default function PageBalancesMensuales() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/transparencia/contabilidad"
        className="btn btn-link text-primary mb-4 pl-0 hover:no-underline"
      >
        <IconArrowLeft size={18} />
        Volver a Contabilidad
      </Link>
      <PageTitle title="Balances Mensuales" />
      <div className="mb-12 text-center">
        <p className="text-base-content/80 mx-auto max-w-3xl text-lg">
          Consulte los balances financieros mensuales del municipio. Esta información se actualiza
          regularmente para mantener la transparencia de nuestra gestión.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Aquí se pueden agregar los balances mensuales cuando estén disponibles */}
      </div>
    </div>
  )
}
