import { IconArrowsUp, IconBrandWhatsapp, IconIdBadge2, IconRefresh } from '@tabler/icons-react'
import Link from 'next/link'

export default function PageLicencia() {
  return (
    <main className="container mx-auto px-4 py-6">
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">Licencia Nacional de Conducir</h1>
            <p className="mt-4 text-base leading-relaxed md:text-lg">
              La Licencia Nacional de Conducir es un documento único que la autoridad competente de
              cada jurisdicción otorga a un ciudadano con el objeto de habilitarlo legalmente a
              conducir un vehículo, sea con carácter particular o profesional, previo cumplimiento
              de los requisitos establecidos por la Ley Nacional de Tránsito 24.449.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="mb-6 text-2xl font-semibold md:text-3xl">Trámites</h2>

          <div className="flex flex-col gap-4 md:flex-row md:justify-center">
            <Link
              href="/tramites/licencia/original"
              className="btn btn-primary hover:btn-primary-focus gap-2 shadow-md transition-all duration-300"
            >
              <IconIdBadge2 size={20} stroke={2} />
              <span className="font-medium">Licencia Original</span>
            </Link>

            <Link
              href="/tramites/licencia/renovaciones"
              className="btn btn-accent hover:btn-accent-focus gap-2 shadow-md transition-all duration-300"
            >
              <IconRefresh size={20} stroke={2} />
              <span className="font-medium">Renovaciones</span>
            </Link>

            <Link
              href="/tramites/licencia/ampliacion"
              className="btn btn-secondary hover:btn-secondary-focus gap-2 shadow-md transition-all duration-300"
            >
              <IconArrowsUp size={20} stroke={2} />
              <span className="font-medium">Ampliación</span>
            </Link>
          </div>

          <div className="mt-8 space-y-6">
            <h3 className="text-xl font-semibold">IMPORTANTE</h3>
            <ul className="space-y-4">
              <li>
                El titular de una licencia de conductor debe denunciar a la brevedad todo cambio de
                los datos consignados en ella. Si lo ha sido de jurisdicción, debe solicitar otra
                licencia ante la nueva autoridad jurisdiccional, la cual debe otorgársela previo
                informe del Registro Nacional de Antecedentes del Tránsito contra entrega de la
                anterior y por el período que le resta de vigencia. La licencia caduca a los 90 días
                de producido el cambio no denunciado. (Articulo Nº18 de la Ley Nacional de
                Transito).
              </li>
              <li>
                Para solicitar categorías A y B debés saber leer; y para categorías C, D y E debés
                saber leer y escribir.
              </li>
            </ul>

            <div className="mt-8">
              <h3 className="text-xl font-semibold">Whatsapp Licencia</h3>
              <p className="mt-2 flex items-center gap-2">
                <IconBrandWhatsapp size={24} />
                <a
                  href="https://wa.me/+543436127014"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  3436127014
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h4 className="mb-4 text-center text-xl font-semibold">
            Ubicación de las Pruebas Prácticas
          </h4>
          <p className="mb-4 text-center">Parque Lineal San Benito (Calle Brasil)</p>
          <div className="flex justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2024.6251669570108!2d-60.4505009349845!3d-31.78950882571287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses-419!2sar!4v1729506848119!5m2!1ses-419!2sar"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
