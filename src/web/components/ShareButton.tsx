'use client'

interface ShareButtonProps {
  title: string
  url?: string
  type?: 'evento' | 'noticia'
}

export default function ShareButton({ title, url, type = 'evento' }: ShareButtonProps) {
  const handleShare = () => {
    // Use current window location if no url provided, or if url contains localhost
    const currentUrl = typeof window !== 'undefined' ? window.location.href : url || ''
    const shareUrl = url && !url.includes('localhost') ? url : currentUrl

    if (navigator.share) {
      navigator.share({
        title: title,
        text:
          type === 'evento' ? `Te invito a este evento: ${title}` : `Lee esta noticia: ${title}`,
        url: shareUrl,
      })
    } else {
      navigator.clipboard.writeText(shareUrl)
      alert('Enlace copiado al portapapeles')
    }
  }

  return (
    <div className="from-primary to-secondary rounded-2xl bg-linear-to-br p-6 text-white shadow-xl transition-all duration-300 hover:shadow-2xl">
      <h3 className="mb-3 text-lg font-semibold">
        {type === 'evento' ? 'Compartir Evento' : 'Compartir Noticia'}
      </h3>
      <button
        onClick={handleShare}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/20 px-4 py-3 font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/30"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
          />
        </svg>
        Compartir
      </button>
    </div>
  )
}
