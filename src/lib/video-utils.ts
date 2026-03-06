/**
 * Video embed utilities — seamless Vimeo & YouTube integration.
 *
 * Vimeo "background" mode removes ALL player UI: play button, progress bar,
 * title, byline, portrait. The video autoplays muted and loops seamlessly
 * as if it were a native part of the page.
 *
 * NOTE: background=1 requires the video to NOT be privacy-restricted on Vimeo.
 * For extra safety we also pass title=0&byline=0&portrait=0.
 */

/** Extract the Vimeo video ID (and optional hash) from any Vimeo URL format. */
function parseVimeoUrl(url: string): { id: string; hash: string | null } | null {
  // player.vimeo.com/video/123456789?h=abc123
  // player.vimeo.com/video/123456789
  // vimeo.com/123456789
  // vimeo.com/123456789/abc123
  const playerMatch = url.match(/player\.vimeo\.com\/video\/(\d+)/)
  if (playerMatch) {
    const hashMatch = url.match(/[?&]h=([a-zA-Z0-9]+)/)
    return { id: playerMatch[1], hash: hashMatch?.[1] || null }
  }

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)(?:\/([a-zA-Z0-9]+))?/)
  if (vimeoMatch) {
    return { id: vimeoMatch[1], hash: vimeoMatch[2] || null }
  }

  return null
}

/** Extract YouTube video ID from any YouTube URL format. */
function parseYoutubeUrl(url: string): string | null {
  // youtube.com/watch?v=ID
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/)
  if (watchMatch) return watchMatch[1]

  // youtube.com/embed/ID or youtu.be/ID
  const embedMatch = url.match(/(?:embed\/|youtu\.be\/)([a-zA-Z0-9_-]+)/)
  if (embedMatch) return embedMatch[1]

  return null
}

/**
 * Build a seamless Vimeo/YouTube embed URL for inline display.
 * - Autoplay, muted, loop
 * - No controls, no branding — video looks native to the page.
 */
export function seamlessEmbedUrl(url: string): string {
  // YouTube
  if (url.includes('youtube') || url.includes('youtu.be')) {
    const id = parseYoutubeUrl(url)
    if (id) {
      return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&rel=0&modestbranding=1`
    }
  }

  // Vimeo
  const vimeo = parseVimeoUrl(url)
  if (vimeo) {
    const hashParam = vimeo.hash ? `&h=${vimeo.hash}` : ''
    return `https://player.vimeo.com/video/${vimeo.id}?background=1&autoplay=1&loop=1&muted=1&transparent=1&title=0&byline=0&portrait=0${hashParam}`
  }

  // Fallback: return URL as-is with basic params
  const sep = url.includes('?') ? '&' : '?'
  return `${url}${sep}autoplay=1&muted=1&loop=1`
}

/**
 * Build an embed URL for lightbox/interactive display.
 * - Autoplay but WITH controls visible so user can interact.
 */
export function interactiveEmbedUrl(url: string): string {
  // YouTube
  if (url.includes('youtube') || url.includes('youtu.be')) {
    const id = parseYoutubeUrl(url)
    if (id) {
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
    }
  }

  // Vimeo
  const vimeo = parseVimeoUrl(url)
  if (vimeo) {
    const hashParam = vimeo.hash ? `&h=${vimeo.hash}` : ''
    return `https://player.vimeo.com/video/${vimeo.id}?autoplay=1&transparent=1&title=0&byline=0&portrait=0${hashParam}`
  }

  const sep = url.includes('?') ? '&' : '?'
  return `${url}${sep}autoplay=1`
}

/** Check if a URL is a video embed (Vimeo or YouTube). */
export function isVideoUrl(url: string): boolean {
  return !!(parseVimeoUrl(url) || parseYoutubeUrl(url))
}
