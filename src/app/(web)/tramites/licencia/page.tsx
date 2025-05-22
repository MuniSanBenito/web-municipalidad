import { HeroTramite } from '@/components/tramites/HeroTramite'
import { SeccionContenidoTramite } from '@/components/tramites/SeccionContenidoTramite'
import { BotonEnlaceInterno } from '@/components/tramites/BotonEnlaceInterno'
import { IconArrowsUp, IconBrandWhatsapp, IconIdBadge2, IconRefresh } from '@tabler/icons-react'

export default function PageLicencia() {
  const descripcionIntro = (
    <>
      La Licencia Nacional de Conducir es un documento único que la autoridad competente de cada
      jurisdicción otorga a un ciudadano con el objeto de habilitarlo legalmente a conducir un
      vehículo, sea con carácter particular o profesional, previo cumplimiento de los requisitos
      establecidos por la Ley Nacional de Tránsito 24.449.
    </>
  )

  return (
    <main className="container mx-auto px-4 py-6">
      <HeroTramite
        titulo="Licencia Nacional de Conducir"
        descripcionIntro={descripcionIntro}
      />

      <SeccionContenidoTramite tituloSeccion="Trámites">
        <div className="flex flex-col gap-4 md:flex-row md:justify-center">
          <BotonEnlaceInterno
            href="/tramites/licencia/original"
            titulo="Licencia Original"
            Icono={IconIdBadge2}
            className="btn-primary hover:btn-primary-focus"
          />
          <BotonEnlaceInterno
            href="/tramites/licencia/renovaciones"
            titulo="Renovaciones"
            Icono={IconRefresh}
            className="btn-accent hover:btn-accent-focus"
          />
          <BotonEnlaceInterno
            href="/tramites/licencia/ampliacion"
            titulo="Ampliación"
            Icono={IconArrowsUp}
            className="btn-secondary hover:btn-secondary-focus"
          />
        </div>

        <div className="mt-8 space-y-6">
          <h3 className="text-xl font-semibold">IMPORTANTE</h3>
          <ul className="list-disc space-y-4 pl-5">
            <li>
              El titular de una licencia de conductor debe denunciar a la brevedad todo cambio de los
              datos consignados en ella. Si lo ha sido de jurisdicción, debe solicitar otra licencia
              ante la nueva autoridad jurisdiccional, la cual debe otorgársela previo informe del
              Registro Nacional de Antecedentes del Tránsito contra entrega de la anterior y por el
              período que le resta de vigencia. La licencia caduca a los 90 días de producido el
              cambio no denunciado. (Articulo Nº18 de la Ley Nacional de Transito).
            </li>
            <li>
              Para solicitar categorías A y B debés saber leer; y para categorías C, D y E debés
              saber leer y escribir.
            </li>
          </ul>

          <div className="mt-8">
            <p className="flex items-center gap-2">
              <IconBrandWhatsapp size={24} className="text-success" /> 
              <strong>WhatsApp Licencia:</strong>
              <a
                href="https://wa.me/543436127014" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                +54 9 343 612-7014 
              </a>
            </p>
          </div>
        </div>
      </SeccionContenidoTramite>

      <SeccionContenidoTramite tituloSeccion="Ubicación de las Pruebas Prácticas">
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
            title="Ubicación Pruebas Prácticas Licencia de Conducir"
          />
        </div>
      </SeccionContenidoTramite>
    </main>
  )
}
