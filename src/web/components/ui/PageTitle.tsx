type PageTitleProps = {
  title: string
  subtitle?: string
  className?: string
}

export default function PageTitle({ title, subtitle, className = '' }: PageTitleProps) {
  return (
    <header className={`mb-12 text-center ${className}`}>
      <h1 className="text-base-content text-5xl font-bold">{title}</h1>
      {subtitle && (
        <p className="mt-4 text-base-content/70 text-lg">{subtitle}</p>
      )}
      <div className="bg-primary mx-auto mt-4 h-1 w-24 rounded-full"></div>
    </header>
  )
}
