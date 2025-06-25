import { LineasColectivos } from '@/web/components/lineas-colectivos'

export default function Coleectivos() {
  return (
    <>
      <main className="container mx-auto p-6">
        <section className="hero bg-base-200 rounded-lg p-10 text-center shadow-lg">
          <div className="hero-content">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-5xl font-bold">Transporte</h1>
              <p className="mt-4 text-lg leading-relaxed">
                A modo informativo, presentamos los servicios de colectivos que conectan San Benito
                con Paraná, Colonia Avellaneda y Oro Verde. Estas líneas de transporte público son
                fundamentales para la movilidad diaria de los ciudadanos, permitiendo un fácil
                acceso al trabajo, educación y servicios en toda la región.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 space-y-6">
          <div className="bg-base-100 rounded-lg p-6 shadow-md">
            <LineasColectivos />
          </div>
        </section>
      </main>
    </>
  )
}
