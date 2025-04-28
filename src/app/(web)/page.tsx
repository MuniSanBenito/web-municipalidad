import type { Imagen, Noticia } from '@/payload-types'
import { basePayload } from '@/web/lib/payload'
import Image from 'next/image'

function renderNoticia(noticia: Noticia, index: number, noticias: Noticia[]) {
  const portada = noticia.portada as Imagen

  return (
    <article
      key={noticia.id}
      className="carousel-item card flex w-full flex-col shadow-xl transition-all duration-300"
    >
      <div id={`noticia${index + 1}`} className="h-32 w-full"></div>
      <div className="relative w-full">
        <div className="relative h-72 overflow-hidden sm:h-80 lg:h-96">
          <Image
            alt={portada.alt}
            src={portada.url!}
            fill
            className="absolute inset-0 -z-20 object-contain"
            priority
          />
          {/* <!-- La misma imagen como fondo difuminado --> */}
          <div
            className="absolute inset-0 -z-30 bg-cover bg-center blur-sm"
            style={{ backgroundImage: `url('${portada.url}')` }}
          ></div>
        </div>
        <div className="absolute top-1/2 right-1 left-1 z-0 flex -translate-y-1/2 transform justify-between">
          <a
            href={`#noticia${index === 0 ? noticias.length : index}`}
            className="btn btn-circle btn-soft btn-sm"
          >
            ❮
          </a>
          <a
            href={`#noticia${index === noticias.length - 1 ? 1 : index + 2}`}
            className="btn btn-circle btn-soft btn-sm"
          >
            ❯
          </a>
        </div>
      </div>
      <div className="bg-base-100 flex flex-col gap-3 px-5 py-4">
        <h3 className="text-lg font-bold">{noticia.titulo}</h3>
        <p>{noticia.descripcion}</p>
      </div>
    </article>
  )
}

export default async function Page() {
  const noticias = await basePayload.find({
    collection: 'noticias',
    limit: 4,
  })
  console.log(noticias.docs)

  return (
    <>
      <section className="flex flex-col items-center justify-center">
        <div className="carousel carousel-center w-full max-w-2xl">
          {noticias.docs.map(renderNoticia)}
        </div>
        <div className="hidden w-full justify-center gap-2 py-2 md:flex">
          {noticias.docs.map((noticia, i) => (
            <a key={noticia.id} href={`#noticia${i + 1}`} className="btn btn-xs">
              {i + 1}
            </a>
          ))}
        </div>
      </section>
    </>
  )

  /* return (
    <div className="bg-base-200 rounded-lg p-6 shadow-lg">
      <h1 className="text-primary mb-4 text-3xl font-bold">
        Bienvenido a la Municipalidad de San Benito
      </h1>
      <p className="text-base-content text-lg">
        Aquí puedes encontrar información sobre nuestros servicios, horarios, y cómo contactarnos.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam eveniet facilis, quasi illo
        vel possimus numquam adipisci! In possimus aliquid, recusandae eligendi omnis ipsum eum
        doloribus voluptatem doloremque ducimus sunt?
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure nemo voluptatibus hic
        eligendi est inventore accusamus sunt quis omnis possimus numquam maxime quas cupiditate
        porro repellendus, harum impedit explicabo culpa?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam eveniet facilis, quasi illo
        vel possimus numquam adipisci! In possimus aliquid, recusandae eligendi omnis ipsum eum
        doloribus voluptatem doloremque ducimus sunt?
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure nemo voluptatibus hic
        eligendi est inventore accusamus sunt quis omnis possimus numquam maxime quas cupiditate
        porro repellendus, harum impedit explicabo culpa?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam eveniet facilis, quasi illo
        vel possimus numquam adipisci! In possimus aliquid, recusandae eligendi omnis ipsum eum
        doloribus voluptatem doloremque ducimus sunt?
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure nemo voluptatibus hic
        eligendi est inventore accusamus sunt quis omnis possimus numquam maxime quas cupiditate
        porro repellendus, harum impedit explicabo culpa?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam eveniet facilis, quasi illo
        vel possimus numquam adipisci! In possimus aliquid, recusandae eligendi omnis ipsum eum
        doloribus voluptatem doloremque ducimus sunt?
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure nemo voluptatibus hic
        eligendi est inventore accusamus sunt quis omnis possimus numquam maxime quas cupiditate
        porro repellendus, harum impedit explicabo culpa?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam eveniet facilis, quasi illo
        vel possimus numquam adipisci! In possimus aliquid, recusandae eligendi omnis ipsum eum
        doloribus voluptatem doloremque ducimus sunt?
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure nemo voluptatibus hic
        eligendi est inventore accusamus sunt quis omnis possimus numquam maxime quas cupiditate
        porro repellendus, harum impedit explicabo culpa?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam eveniet facilis, quasi illo
        vel possimus numquam adipisci! In possimus aliquid, recusandae eligendi omnis ipsum eum
        doloribus voluptatem doloremque ducimus sunt?
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure nemo voluptatibus hic
        eligendi est inventore accusamus sunt quis omnis possimus numquam maxime quas cupiditate
        porro repellendus, harum impedit explicabo culpa?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam eveniet facilis, quasi illo
        vel possimus numquam adipisci! In possimus aliquid, recusandae eligendi omnis ipsum eum
        doloribus voluptatem doloremque ducimus sunt?
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure nemo voluptatibus hic
        eligendi est inventore accusamus sunt quis omnis possimus numquam maxime quas cupiditate
        porro repellendus, harum impedit explicabo culpa?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam eveniet facilis, quasi illo
        vel possimus numquam adipisci! In possimus aliquid, recusandae eligendi omnis ipsum eum
        doloribus voluptatem doloremque ducimus sunt?
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure nemo voluptatibus hic
        eligendi est inventore accusamus sunt quis omnis possimus numquam maxime quas cupiditate
        porro repellendus, harum impedit explicabo culpa?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam eveniet facilis, quasi illo
        vel possimus numquam adipisci! In possimus aliquid, recusandae eligendi omnis ipsum eum
        doloribus voluptatem doloremque ducimus sunt?
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure nemo voluptatibus hic
        eligendi est inventore accusamus sunt quis omnis possimus numquam maxime quas cupiditate
        porro repellendus, harum impedit explicabo culpa?
      </p>
    </div>
  ) */
}
