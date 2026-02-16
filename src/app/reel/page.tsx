import { getProjects } from '@/lib/projects'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Reel | Manuel Guillin',
  description: 'Showreels de motion graphics 3D, 2D y videomapping',
}

export const revalidate = 60

export default async function ReelPage() {
  const reels = await getProjects('reel')

  return (
    <main className="min-h-screen pt-32 pb-16 px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight">
            Reel
          </h1>
          <p className="mt-6 text-white/50 text-lg max-w-2xl">
            Showreels y compilaciones de trabajo.
          </p>
        </header>

        {reels.length > 0 ? (
          <div className="space-y-16">
            {reels.map((reel) => (
              <article key={reel.id} className="group">
                {reel.videoUrl && (
                  <div className="aspect-video rounded-lg overflow-hidden bg-neutral-900">
                    <iframe
                      src={reel.videoUrl}
                      className="w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      style={{ border: 'none' }}
                    />
                  </div>
                )}
                <div className="mt-4 flex items-baseline justify-between">
                  <div>
                    <h2 className="text-xl font-light">{reel.title}</h2>
                    {reel.category && (
                      <span className="text-xs tracking-[0.2em] text-white/40 uppercase mt-1 block">
                        {reel.category}
                      </span>
                    )}
                  </div>
                  {reel.date && (
                    <span className="text-xs text-white/30">{reel.date}</span>
                  )}
                </div>
                {reel.description && (
                  <p className="mt-3 text-sm text-white/50 max-w-3xl">{reel.description}</p>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-white/40 text-lg">
              Próximamente.
            </p>
          </div>
        )}
      </div>

      <div className="mt-24">
        <Footer />
      </div>
    </main>
  )
}
