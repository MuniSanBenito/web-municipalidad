'use client'
import PageTitle from '@/components/ui/PageTitle'
import {
  IconExternalLink,
  IconFiles,
  IconSitemap,
  IconStackFront,
  IconWorld,
} from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

interface Mapa {
  image: string
  link: string
}

export default function PageIde() {
  const geoserver = 'https://geoserver.sanbenito.gob.ar/'

  const catastro: Mapa[] = [
    {
      image: '/ide/img/catastro/registro-661.JPG',
      link: '/ide/files/catastro/registro-661.pdf',
    },
    {
      image: '/ide/img/catastro/registro-3450.JPG',
      link: '/ide/files/catastro/registro-3450.pdf',
    },
    {
      image: '/ide/img/catastro/registro-4738.JPG',
      link: '/ide/files/catastro/registro-4738.pdf',
    },
  ]

  const mapas: Mapa[] = [
    {
      image: '/ide/img/mapas/barrios-a3.JPG',
      link: '/ide/files/mapas/barrios-a3.pdf',
    },
    {
      image: '/ide/img/mapas/concesiones-y-esp-verdes.JPG',
      link: '/ide/files/mapas/concesiones-y-esp-verdes.pdf',
    },
    {
      image: '/ide/img/mapas/distribucion-de-tanques-de-agua.JPG',
      link: '/ide/files/mapas/distribucion-de-tanques-de-agua.pdf',
    },
    {
      image: '/ide/img/mapas/lotes-con-conexion-cloacal.JPG',
      link: '/ide/files/mapas/lotes-con-conexion-cloacal.pdf',
    },
    {
      image: '/ide/img/mapas/mapa-de-la-ciudad.JPG',
      link: '/ide/files/mapas/mapa-de-la-ciudad.pdf',
    },
    {
      image: '/ide/img/mapas/mdt.JPG',
      link: '/ide/files/mapas/mdt.pdf',
    },
    {
      image: '/ide/img/mapas/parcelario-y-edificaciones.JPG',
      link: '/ide/files/mapas/parcelario-y-edificaciones.pdf',
    },
    {
      image: '/ide/img/mapas/recorrido-regador.JPG',
      link: '/ide/files/mapas/recorrido-regador.pdf',
    },
    {
      image: '/ide/img/mapas/red-cloacal.JPG',
      link: '/ide/files/mapas/red-cloacal.pdf',
    },
    {
      image: '/ide/img/mapas/superficie-de-calles.JPG',
      link: '/ide/files/mapas/superficie-de-calles.pdf',
    },
    {
      image: '/ide/img/mapas/ubicacion-geografica.JPG',
      link: '/ide/files/mapas/ubicacion-geografica.pdf',
    },
  ]

  return (
    <main className="container mx-auto px-4 py-6">
      <PageTitle title="Infraestructura de Datos Espaciales" />

      <section className="hero bg-base-200 mb-8 rounded-lg p-4 text-center shadow-lg md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <p className="mt-4 text-base leading-relaxed md:text-lg">
              La IDE San Benito es una base geográfica única y oficial que reúne todos los datos
              espaciales del municipio, facilitando el acceso a información georreferenciada para la
              toma de decisiones y la implementación de políticas públicas.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link href="/transparencia/ide/visor/" className="btn btn-primary gap-2">
                <IconWorld size={20} />
                <span>Mapa Interactivo</span>
              </Link>
              <Link href="#geoservicios" className="btn btn-secondary gap-2">
                <IconStackFront size={20} />
                <span>Geoservicios</span>
              </Link>
              <a
                href="https://geonetwork.sanbenito.gob.ar/geonetwork/srv/spa/catalog.search#/home"
                className="btn btn-accent gap-2"
                target="_blank"
              >
                <IconSitemap size={20} />
                <span>Catálogo de Metadatos</span>
              </a>
              <Link href="#documentacion" className="btn btn-outline gap-2">
                <IconFiles size={20} />
                <span>Documentación</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="card bg-base-100 h-full shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold">¿Qué es la IDE San Benito?</h2>
            <p className="text-base-content/80">
              La Infraestructura de Datos Espaciales del Municipio de San Benito es una base
              geográfica única y oficial de todo el municipio, en ella se reúnen todos los datos
              geográficos, a través de un conjunto de políticas, estándares, procedimientos y
              recursos tecnológicos que facilitan la producción, obtención, uso y acceso de toda
              esta información geográficamente referenciada.
            </p>
            <p className="text-base-content/80 mt-2">
              Ésta tiene como objetivo contribuir al conocimiento y sistematización de la
              información geoespacial y estadística referida al municipio y, en consecuencia,
              aportar al diseño e implementación de políticas públicas y de las diversas actividades
              económicas y sociales que se desarrollan en su territorio.
            </p>
            <p className="text-base-content/80 mt-2">
              La información contenida en este portal es de carácter oficial y se actualiza de forma
              constante; por ello pueden considerarse todos los objetos geográficos representados,
              para uso oficial, privado y académico.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 h-full shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold">Adhesión a IDERA</h2>
            <p className="text-base-content/80">
              En Junio de 2019 se celebró la adhesión a la Infraestructura de Datos Espaciales de la
              República Argentina, permitiendo así el comienzo de diversos procesos que nos llevaron
              a la conformación de la IDE SAN BENITO, con gran esfuerzo y entusiasmo por parte de
              los diversos actores del municipio.
            </p>
            <div className="card-actions mt-4 justify-center">
              <a
                className="btn btn-primary gap-2"
                href="/ide/files/Carta_adhesion_IDERA.pdf"
                target="_blank"
              >
                <IconExternalLink size={20} />
                <span>Descargar Carta de Adhesión</span>
              </a>
            </div>
            <div className="mt-4 flex justify-center">
              <a
                href="https://www.idera.gob.ar/"
                target="_blank"
                className="transition-opacity hover:opacity-80"
              >
                <Image
                  src="/ide/img/idera.jpeg"
                  alt="IDERA - Infraestructura de Datos Espaciales de la República Argentina"
                  width={200}
                  height={100}
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div id="geoservicios" className="scroll-mt-20">
        <h2 className="mb-6 border-b pb-2 text-3xl font-bold">Geoservicios</h2>

        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="card bg-base-100 h-full shadow-lg">
            <div className="card-body">
              <h3 className="card-title text-xl font-bold">
                Servicio WMS
                <div className="badge badge-primary ml-2">Mapas Web</div>
              </h3>
              <p className="text-base-content/80 mt-2">
                Servicio que produce mapas de datos referenciados espacialmente, de forma dinámica a
                partir de información geográfica. Los mapas producidos por WMS se generan
                normalmente en un formato de imagen como PNG, GIF o JPEG (Raster), y opcionalmente
                como gráficos vectoriales en formato SVG o WebCGM.
              </p>
              <div className="card-actions mt-4 justify-end">
                <a
                  href={`${geoserver}geoserver/ows?service=wms&version=1.3.0&request=GetCapabilities`}
                  target="_blank"
                  className="btn btn-outline btn-sm gap-2"
                >
                  <IconExternalLink size={16} />
                  <span>Ver Capacidades</span>
                </a>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 h-full shadow-lg">
            <div className="card-body">
              <h3 className="card-title text-xl font-bold">
                Servicio WFS
                <div className="badge badge-secondary ml-2">Entidades Vectoriales</div>
              </h3>
              <p className="text-base-content/80 mt-2">
                Servicio que permite acceder y consultar los atributos de un objeto (feature)
                geográfico como un río, una ciudad o un lago, representado en modo vectorial, con
                una geometría descrita por un conjunto de coordenadas.
              </p>
              <div className="card-actions mt-4 justify-end">
                <a
                  href={`${geoserver}geoserver/ows?service=wfs&version=2.0.0&request=GetCapabilities`}
                  target="_blank"
                  className="btn btn-outline btn-sm gap-2"
                >
                  <IconExternalLink size={16} />
                  <span>Ver Capacidades</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="mb-6 border-b pb-2 text-3xl font-bold">Mapas Temáticos</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mapas.map((mapa, index) => (
            <a
              key={index}
              href={mapa.link}
              target="_blank"
              className="card bg-base-100 overflow-hidden shadow-lg transition-shadow hover:shadow-xl"
            >
              <figure className="relative h-48">
                <Image
                  src={mapa.image}
                  alt={`Mapa temático ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </figure>
              <div className="card-body p-4">
                <div className="card-actions justify-end">
                  <span className="btn btn-sm btn-primary">Ver PDF</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <h2 className="mb-6 border-b pb-2 text-3xl font-bold">Catastro</h2>
        <p className="text-base-content/80 mb-6">
          Una vez digitalizada la información Catastral, se realizó el trabajo de automatización y
          creación de un atlas compositor de impresión, permitiéndonos confeccionar Mapas con
          información parcelaria y estado de ocupación de los inmuebles (baldío, edificado, PH, con
          su correspondiente superficie), dándole así un uso diario a la información geoespacial;
          facilitado una mejor gestión municipal con los vecinos.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {catastro.map((mapa, index) => (
            <a
              key={index}
              href={mapa.link}
              target="_blank"
              className="card bg-base-100 overflow-hidden shadow-lg transition-shadow hover:shadow-xl"
            >
              <figure className="relative h-48">
                <Image
                  src={mapa.image}
                  alt={`Registro catastral ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </figure>
              <div className="card-body p-4">
                <div className="card-actions justify-end">
                  <span className="btn btn-sm btn-primary">Ver PDF</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div id="documentacion" className="mb-10 scroll-mt-20">
        <h2 className="mb-6 border-b pb-2 text-3xl font-bold">Documentación</h2>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title text-xl font-bold">Documentos Técnicos</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <a
                href="/ide/files/estructura_base_datos.pdf"
                target="_blank"
                className="btn btn-outline gap-2"
              >
                <IconExternalLink size={20} />
                <span>Estructura de Base de Datos</span>
              </a>
              <a
                href="/ide/files/codificacion.pdf"
                target="_blank"
                className="btn btn-outline gap-2"
              >
                <IconExternalLink size={20} />
                <span>Codificación</span>
              </a>
              <a
                href="/ide/files/glosario_idera.pdf"
                target="_blank"
                className="btn btn-outline gap-2"
              >
                <IconExternalLink size={20} />
                <span>Glosario IDERA</span>
              </a>
              <a
                href="/ide/files/incorporacion_nuevos_asentamientos.pdf"
                target="_blank"
                className="btn btn-outline gap-2"
              >
                <IconExternalLink size={20} />
                <span>Nuevos Asentamientos</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="alert alert-info mb-6 shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 flex-shrink-0 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div>
            <p>
              Toda la Información publicada en este Geoportal es información pública y oficial del
              municipio de San Benito.
            </p>
            <p className="mt-2">
              La IDE San Benito se enmarca dentro de la{' '}
              <strong>
                ordenanza Nº 663/2, expediente Nº 106/21 &quot;Plan de Modernización Municipal&quot;
              </strong>{' '}
              , y a nivel nacional dentro de la Ley N° 27.275 sancionada el 14 de septiembre de 2016
              &quot;DERECHO DE ACCESO A LA INFORMACIÓN PÚBLICA&quot;.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
