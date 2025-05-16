'use client'
import { IconArrowUp, IconExternalLink, IconGlobe, IconSitemap } from '@tabler/icons-react'
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
      image: '/servicios/ide/img/catastro/registro-661.JPG',
      link: '/servicios/ide/files/catastro/registro-661.pdf',
    },
    {
      image: '/servicios/ide/img/catastro/registro-3450.JPG',
      link: '/servicios/ide/files/catastro/registro-3450.pdf',
    },
    {
      image: '/servicios/ide/img/catastro/registro-4738.JPG',
      link: '/servicios/ide/files/catastro/registro-4738.pdf',
    },
  ]

  const mapas: Mapa[] = [
    {
      image: '/servicios/ide/img/mapas/barrios-a3.JPG',
      link: '/servicios/ide/files/mapas/barrios-a3.pdf',
    },
    {
      image: '/servicios/ide/img/mapas/concesiones-y-esp-verdes.JPG',
      link: '/servicios/ide/files/mapas/concesiones-y-esp-verdes.pdf',
    },
    {
      image: '/servicios/ide/img/mapas/distribucion-de-tanques-de-agua.JPG',
      link: '/servicios/ide/files/mapas/distribucion-de-tanques-de-agua.pdf',
    },
    {
      image: '/servicios/ide/img/mapas/lotes-con-conexion-cloacal.JPG',
      link: '/servicios/ide/files/mapas/lotes-con-conexion-cloacal.pdf',
    },
    {
      image: '/servicios/ide/img/mapas/mapa-de-la-ciudad.JPG',
      link: '/servicios/ide/files/mapas/mapa-de-la-ciudad.pdf',
    },
    {
      image: '/servicios/ide/img/mapas/mdt.JPG',
      link: '/servicios/ide/files/mapas/mdt.pdf',
    },
    {
      image: '/servicios/ide/img/mapas/parcelario-y-edificaciones.JPG',
      link: '/servicios/ide/files/mapas/parcelario-y-edificaciones.pdf',
    },
    {
      image: '/servicios/ide/img/mapas/recorrido-regador.JPG',
      link: '/servicios/ide/files/mapas/recorrido-regador.pdf',
    },
    {
      image: '/servicios/ide/img/mapas/red-cloacal.JPG',
      link: '/servicios/ide/files/mapas/red-cloacal.pdf',
    },
    {
      image: '/servicios/ide/img/mapas/superficie-de-calles.JPG',
      link: '/servicios/ide/files/mapas/superficie-de-calles.pdf',
    },
    {
      image: '/servicios/ide/img/mapas/ubicacion-geografica.JPG',
      link: '/servicios/ide/files/mapas/ubicacion-geografica.pdf',
    },
  ]

  return (
    <main>
      <section className="bg-info text-white py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold mt-4">
            <IconArrowUp className="inline-block mr-2" />
            <a href={geoserver} className="hover:underline">
              <span className="font-bold">Infraestructura de Datos Espaciales</span>
            </a>
          </h1>
          <div className="flex justify-center gap-4 mt-6">
            <Link href="/servicios/ide/visor/" className="btn btn-outline btn-light">
              <IconGlobe className="mb-2" />
              <span className="font-bold">Mapa Interactivo</span>
            </Link>
            <Link href="/servicios/ide#geoservicios" className="btn btn-outline btn-light">
              <IconArrowUp className="mb-2" />
              <span className="font-bold">Geoservicios</span>
            </Link>
            <a href="https://geonetwork.sanbenito.gob.ar/geonetwork/srv/spa/catalog.search#/home" className="btn btn-outline btn-light">
              <IconSitemap className="mb-2" />
              <span className="font-bold">Catálogo de Metadatos</span>
            </a>
            <Link href="/servicios/ide#documentacion" className="btn btn-outline btn-light">
              <IconExternalLink className="mb-2" />
              <span className="font-bold">Documentación</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto mt-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card p-5">
            <h2 className="text-2xl font-bold mb-4">¿Qué es la IDE San Benito?</h2>
            <p>
              La Infraestructura de Datos Espaciales del Municipio de San Benito es una base geográfica única y oficial de todo el municipio, en ella se
              reúnen todos los datos geográficos, a través de un conjunto de políticas, estándares, procedimientos y recursos tecnológicos que facilitan
              la producción, obtención, uso y acceso de toda esta información geográficamente referenciada. Ésta tiene como objetivo contribuir al
              conocimiento y sistematización de la información geoespacial y estadística referida al municipio y, en consecuencia, aportar al diseño e
              implementación de políticas públicas y de las diversas actividades económicas y sociales que se desarrollan en su territorio. La
              información contenida en este portal es de carácter oficial y se actualiza de forma constante; por ello pueden considerarse todos los
              objetos geográficos representados, para uso oficial, privado y académico.
            </p>
          </div>
          <div className="card p-5">
            <h2 className="text-2xl font-bold mb-4">Adhesión a IDERA</h2>
            <p>
              En Junio de 2019 se celebró la adhesión a la Infraestructura de Datos Espaciales de la República Argentina, permitiendo así el comienzo
              de diversos procesos que nos llevaron a la conformación de la IDE SAN BENITO, con gran esfuerzo y entusiasmo por parte de los diversos
              actores del municipio.
            </p>
            <div className="mt-auto">
              <a className="btn btn-dark" href="/servicios/ide/files/Carta_adhesion_IDERA.pdf" target="_blank">
                <IconExternalLink className="mb-2" />
                <span className="font-bold">Descargar</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-6 px-4" id="geoservicios">
        <h2 className="text-2xl font-bold pb-4">Geoservicios</h2>
        
        <div className="card mt-4">
          <div className="card-body">
            <h3 className="text-xl font-bold">
              <a href={`${geoserver}geoserver/ows?service=wms&version=1.3.0&request=GetCapabilities`} target="_blank">
                <IconExternalLink className="inline-block mr-2" />
              </a>
              Servicio WMS
            </h3>
            <h4 className="text-lg mb-4">Servicio de Mapas Web</h4>
            <p>
              Servicio que produce mapas de datos referenciados espacialmente, de forma dinámica a partir de información geográfica. Los mapas
              producidos por WMS se generan normalmente en un formato de imagen como PNG, GIF o JPEG (Raster), y opcionalmente como gráficos vectoriales
              en formato SVG (Scalable Vector Graphics) o WebCGM (Web Computer Graphics Metafile.
            </p>
            <p className="mt-4">
              La especificación "Web Map Service (WMS) Implementation Specification v1.3" del Open Geospatial Consortium, aprobada como ISO 19128
              "Geographic Information – Web Map Server Interface" define las operaciones para obtener una descripción de los mapas ofrecidos por el
              servidor (GetCapabilities), obtener un mapa (GetMap) y consultar cierta información limitada sobre las entidades mostradas en el mapa
              (GetFeatureInfo).
            </p>
          </div>
        </div>

        {/* Repite el mismo patrón para WFS y WMTS */}
      </div>

      <div className="container mx-auto mt-4 px-4">
        <h2 className="text-2xl font-bold py-4">Mapas Temáticos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mapas.map((mapa, index) => (
            <a key={index} href={mapa.link} target="_blank" className="relative h-[300px] overflow-hidden shadow-lg">
              <Image
                src={mapa.image}
                alt={`Mapa ${index + 1}`}
                fill
                className="object-cover scale-150"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Sección de Catastro */}
      <div className="container mx-auto mt-4 px-4">
        <h2 className="text-2xl font-bold pt-4">Catastro</h2>
        <p className="mb-4">
          Una vez digitalizada la información Catastral, se realizó el trabajo de automatización y creación de un atlas compositor de impresión,
          permitiéndonos confeccionar Mapas con información parcelaria y estado de ocupación de los inmuebles (baldío, edificado, PH, con su
          correspondiente superficie), dándole así un uso diario a la información geoespacial; facilitado una mejor gestión municipal con los vecinos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {catastro.map((mapa, index) => (
            <a key={index} href={mapa.link} target="_blank" className="relative h-[300px] overflow-hidden shadow-lg">
              <Image
                src={mapa.image}
                alt={`Catastro ${index + 1}`}
                fill
                className="object-cover scale-150"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Sección de Documentación */}
      <div className="container mx-auto mt-4 px-4" id="documentacion">
        <h2 className="text-2xl font-bold py-4">Documentación</h2>
        
        {/* Repite el mismo patrón para cada sección de documentación */}
      </div>

      <div className="flex justify-center items-center my-6">
        <a href="https://www.idera.gob.ar/" target="_blank">
          <Image src="/servicios/ide/img/idera.jpeg" alt="idera.gob.ar" width={200} height={100} />
        </a>
      </div>

      <div className="container mx-auto mb-6 px-4">
        <div className="alert">
          <p>Toda la Información publicada en este Geoportal es información pública y oficial del municipio de San Benito.</p>
          <p>
            La IDE San Benito se enmarca dentro de la
            <strong> ordenanza Nº 663/2, expediente Nº 106/21 "Plan de Modernización Municipal" </strong>, y a nivel nacional dentro de la Ley N° 27.275
            sancionada el 14 de septiembre de 2016 "DERECHO DE ACCESO A LA INFORMACIÓN PÚBLICA". La presente ley tiene por objeto garantizar el efectivo
            ejercicio del derecho de acceso a la información publica, promover la participación ciudadana y la transparencia de la gestión pública.
          </p>
        </div>
      </div>
    </main>
  )
}
