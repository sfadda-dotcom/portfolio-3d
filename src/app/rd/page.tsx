import { getProjects } from '@/lib/projects'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'R&D',
  description: 'Tests, simulations, animations and technical experiments',
}

export const revalidate = 60

function isGif(url: string): boolean {
  return url.toLowerCase().endsWith('.gif')
}

/** Build Vimeo/YouTube embed URL with autoplay, muted, loop */
function autoplayUrl(url: string, type: 'vimeo' | 'youtube'): string {
  if (type === 'youtube') {
    const id = url.includes('watch?v=')
      ? url.split('watch?v=')[1]?.split('&')[0]
      : url.split('/embed/')[1]?.split('?')[0] || url
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&rel=0`
  }
  const sep = url.includes('?') ? '&' : '?'
  return `${url}${sep}background=1&autoplay=1&loop=1&muted=1`
}

export default async function RDPage() {
  const items = await getProjects('rd')

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 page-content pb-16 px-[var(--section-padding-x)]">
        <div className="max-w-5xl mx-auto">
          <header className="mb-10">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight">
              R&D
            </h1>
          </header>

          {items.length > 0 ? (
            <div className="space-y-6">
              {items.map((item) => {
                const hasVideo = !!item.videoUrl
                const isYoutube = item.videoUrl?.includes('youtube')

                return (
                  <article key={item.id} className="group">
                    {/* Single media: video OR image/gif */}
                    <div className="relative w-full overflow-hidden bg-neutral-900">
                      {hasVideo ? (
                        <div className="relative w-full h-0 pb-[56.25%]">
                          <iframe
                            src={autoplayUrl(item.videoUrl!, isYoutube ? 'youtube' : 'vimeo')}
                            className="absolute inset-0 w-full h-full"
                            allow="autoplay; fullscreen; picture-in-picture"
                            style={{ border: 'none' }}
                          />
                        </div>
                      ) : item.thumbnail ? (
                        isGif(item.thumbnail) ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-auto block"
                          />
                        ) : (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-auto block"
                          />
                        )
                      ) : (
                        <div className="w-full h-0 pb-[56.25%] bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                          <span className="text-xs tracking-[0.15em] uppercase text-white/20">R&D</span>
                        </div>
                      )}
                    </div>

                    {/* One line of text */}
                    {item.title && (
                      <p className="mt-3 text-sm font-light text-white/60">{item.title}</p>
                    )}
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-white/40 text-sm">Coming soon.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
