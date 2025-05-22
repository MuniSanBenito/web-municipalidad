import { Breadcrumbs } from '@/components/ui/Breadcrumbs' // Assuming this path is correct

export default function TransparenciaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* Breadcrumbs will be rendered here, above the page content */}
      <div className="container mx-auto px-4 pt-4 md:pt-6">
        <Breadcrumbs />
      </div>
      {children}
    </section>
  )
}
