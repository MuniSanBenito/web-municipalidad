import { basePayload } from '@/web/lib/payload'

export default async function PageHCD() {
  const autoridades: any = await basePayload.findGlobal({ slug: 'autoridades' })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-primary mb-8 text-center text-4xl font-bold">Autoridades</h1>

      <div className="mb-8 flex justify-center">
        <a
          href="https://ben-ent-hcd.paisdigital.innovacion.gob.ar/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary text-lg font-semibold"
        >
          HCD Transparente
        </a>
      </div>

      {/* Sección de Presidente y Secretario */}
      <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="bg-base-100 rounded-lg p-6 text-center shadow-lg">
          <h2 className="text-primary mb-2 text-2xl font-semibold">Presidente</h2>
          <p className="text-lg">{autoridades.presidente}</p>
        </div>
        <div className="bg-base-100 rounded-lg p-6 text-center shadow-lg">
          <h2 className="text-primary mb-2 text-2xl font-semibold">Secretario</h2>
          <p className="text-lg">{autoridades.secretario}</p>
        </div>
      </div>

      {/* Sección de Bloques */}
      <h2 className="text-primary mb-6 text-center text-3xl font-bold">Bloques Políticos</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {autoridades.bloques.map((bloque: any) => (
          <div key={bloque.id} className="bg-base-100 rounded-lg p-6 shadow-lg">
            <h3 className="text-primary mb-4 text-xl font-semibold">{bloque.nombre}</h3>
            <ul className="space-y-2">
              {bloque.concejales.map((concejal: any, index: number) => (
                <li key={index} className="text-base-content">
                  • {concejal.concejal}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
