'use client'

interface ShareButtonProps {
  eventName: string
  eventUrl?: string
}

export default function ShareButton({ eventName, eventUrl }: ShareButtonProps) {
  const handleShare = () => {
    // Use current window location if no eventUrl provided, or if eventUrl contains localhost
    const currentUrl = typeof window !== 'undefined' ? window.location.href : eventUrl || ''
    const shareUrl = eventUrl && !eventUrl.includes('localhost') ? eventUrl : currentUrl
    
    if (navigator.share) {
      navigator.share({
        title: eventName,
        text: `Te invito a este evento: ${eventName}`,
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Enlace copiado al portapapeles');
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
      <h3 className="text-lg font-semibold mb-3">Compartir Evento</h3>
      <button 
        onClick={handleShare}
        className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl py-3 px-4 font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
        Compartir
      </button>
    </div>
  );
}
