'use client'
import PageTitle from '@/components/ui/PageTitle'

export default function PageBalancesMensuales() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle title="Balances Mensuales" />
      <div className="mb-12 text-center">
        <p className="text-lg text-gray-600">
          Consulte los balances financieros mensuales del municipio. Esta información se actualiza regularmente para mantener la transparencia de nuestra gestión.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Aquí se pueden agregar los balances mensuales cuando estén disponibles */}
      </div>
    </div>
  )
}