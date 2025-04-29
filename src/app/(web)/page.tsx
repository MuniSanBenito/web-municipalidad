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
      <div id={`noticia${index + 1}`} className="-z-50 h-32 w-full"></div>
      <div className="relative w-full">
        <div
          id="foto-texto"
          className="flex h-72 items-center justify-between overflow-hidden sm:h-80 lg:mx-5 lg:my-5 lg:h-96 2xl:justify-center"
        >
          <div id="foto" className="relative h-full w-full 2xl:w-[45%]">
            <Image
              alt={portada.alt}
              src={portada.url!}
              fill
              className="absolute inset-0 -z-20 object-contain"
              priority
            />
          </div>
          <div
            id="text"
            className="bg-base-100/80 hidden h-full w-full max-w-1/3 flex-col gap-3 px-5 py-4 md:flex"
          >
            <h3 className="text-xl font-extrabold">{noticia.titulo}</h3>
            <p className="line-clamp-none max-h-full overflow-hidden text-lg md:line-clamp-4 lg:line-clamp-6 xl:line-clamp-none">
              {noticia.descripcion}
            </p>
          </div>
        </div>
        {/* La misma imagen como fondo difuminado */}
        <div
          className="absolute inset-0 -z-30 bg-cover bg-center blur-sm"
          style={{ backgroundImage: `url('${portada.url}')` }}
        ></div>
        {/* Flechas */}
        <div className="absolute top-1/2 right-1 left-1 z-0 flex -translate-y-1/2 transform justify-between">
          <a
            href={`#noticia${index === 0 ? noticias.length : index}`}
            className="btn btn-square btn-soft btn-sm rounded-xs"
          >
            ❮
          </a>
          <a
            href={`#noticia${index === noticias.length - 1 ? 1 : index + 2}`}
            className="btn btn-square btn-soft btn-sm rounded-xs"
          >
            ❯
          </a>
        </div>
      </div>
      <div className="bg-base-100 flex flex-col gap-3 px-5 py-4 md:hidden">
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

  return (
    <>
      <section className="flex flex-col items-center justify-center">
        <div className="carousel carousel-center w-full">{noticias.docs.map(renderNoticia)}</div>
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
}
