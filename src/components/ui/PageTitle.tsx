type PageTitleProps = {
  title: string
  className?: string
}

export default function PageTitle({ title, className = '' }: PageTitleProps) {
  return (
    <header className={`mb-12 text-center ${className}`}>
      <h1 className="text-base-content text-5xl font-bold">{title}</h1>
      <div className="bg-primary mx-auto mt-4 h-1 w-24 rounded-full"></div>
    </header>
  )
}
