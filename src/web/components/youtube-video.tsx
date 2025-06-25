export function YouTuveVideo(props: { url: string }) {
  try {
    const url = new URL(props.url)
    const videoId = url.searchParams.get('v')
    if (!videoId) return null

    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="aspect-video w-full max-w-lg"
      ></iframe>
    )
  } catch (error) {
    return null
  }
}
