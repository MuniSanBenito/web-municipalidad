import { IconStack2 } from '@tabler/icons-react'

export default function PageIde() {
  return (
    <main className="bg-base-100 min-h-screen p-6">
      <section className="hero bg-secondary rounded-lg p-10 text-center shadow-lg">
        <div className="container mx-auto flex items-center justify-center">
          <div className="flex items-center">
            <IconStack2 stroke={1.5} size={48} className="mr-4" />
            <h1 className="text-4xl font-bold">Infraestructura De Datos Espaciales</h1>
          </div>
        </div>
      </section>
    </main>
  )
}
