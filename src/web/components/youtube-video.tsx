const YOUTUBE_HOSTS = new Set(['youtube.com', 'www.youtube.com', 'm.youtube.com'])
const VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/

function getYouTubeVideoId(value: string) {
  try {
    const url = new URL(value)
    const pathSegments = url.pathname.split('/').filter(Boolean)
    const hostname = url.hostname.toLowerCase()
    let videoId: string | null = null

    if (hostname === 'youtu.be') {
      videoId = pathSegments[0] ?? null
    } else if (YOUTUBE_HOSTS.has(hostname)) {
      const route = pathSegments[0]

      if (route === 'watch') {
        videoId = url.searchParams.get('v')
      } else if (route === 'embed' || route === 'shorts') {
        videoId = pathSegments[1] ?? null
      }
    }

    return videoId && VIDEO_ID_PATTERN.test(videoId) ? videoId : null
  } catch {
    return null
  }
}

export function YouTuveVideo(props: { url: string }) {
  const videoId = getYouTubeVideoId(props.url)
  if (!videoId) return null

  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      title="Video de YouTube"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      className="aspect-video w-full max-w-lg"
    ></iframe>
  )
}
