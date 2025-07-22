import PageTitle from '@/web/components/ui/PageTitle'

function NoticiaCardSkeleton() {
  return (
    <div className="card bg-base-100 shadow-xl animate-pulse">
      <figure className="relative h-48 w-full bg-base-300"></figure>
      <div className="card-body">
        <div className="h-4 w-1/3 rounded bg-base-300"></div>
        <div className="mt-2 h-6 w-full rounded bg-base-300"></div>
        <div className="mt-2 h-6 w-5/6 rounded bg-base-300"></div>
        <div className="mt-2 h-4 w-full rounded bg-base-300"></div>
        <div className="mt-1 h-4 w-full rounded bg-base-300"></div>
        <div className="mt-1 h-4 w-3/4 rounded bg-base-300"></div>
        <div className="card-actions mt-4 justify-end">
          <div className="h-8 w-24 rounded bg-base-300"></div>
        </div>
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    <main className="container mx-auto min-h-screen px-4 py-12">
      <PageTitle title="Últimas Noticias" />
      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <NoticiaCardSkeleton key={i} />
        ))}
      </section>
    </main>
  )
}
