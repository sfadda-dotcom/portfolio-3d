import { getProjects } from '@/lib/projects'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Reel',
  description: 'Showreels — motion graphics 3D, 2D and videomapping',
}

export const revalidate = 60

export default async function ReelPage() {
  const reels = await getProjects('reel')

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 page-content pb-16 px-[var(--section-padding-x)]">
        <div className="max-w-6xl mx-auto">
          <header className="mb-10">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight">
              Reel
            </h1>
          </header>

          {reels.length > 0 ? (
            <div className="space-y-16">
              {reels.map((reel) => (
                <article key={reel.id}>
                  {reel.videoUrl ? (
                    <div className="aspect-video bg-neutral-900 overflow-hidden">
                      <iframe
                        src={reel.videoUrl}
                        className="w-full h-full"
                        allow="autoplay; fullscreen; picture-in-picture"
                        style={{ border: 'none' }}
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                      <span className="text-xs tracking-[0.15em] uppercase text-white/20">Video pending</span>
                    </div>
                  )}

                  {reel.title && (
                    <div className="mt-4 flex items-baseline justify-between">
                      <h2 className="text-base font-extralight text-white/60">{reel.title}</h2>
                      {reel.date && (
                        <span className="text-xs text-white/30">{reel.date}</span>
                      )}
                    </div>
                  )}
                </article>
              ))}
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
