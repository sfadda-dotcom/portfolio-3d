import { getProjects } from '@/lib/projects'
import Footer from '@/components/Footer'
import Image from 'next/image'

export const metadata = {
  title: 'R&D',
  description: 'Tests, simulations, animations and technical experiments',
}

export const revalidate = 60

export default async function RDPage() {
  const items = await getProjects('rd')

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 page-content pb-16 px-[var(--section-padding-x)]">
        <div className="max-w-7xl mx-auto">
          <header className="mb-10">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight">
              R&D
            </h1>
          </header>

          {items.length > 0 ? (
            <div className="masonry-grid">
              {items.map((item) => (
                <article key={item.id} className="group">
                  {item.videoUrl ? (
                    <div className="aspect-video overflow-hidden bg-neutral-900">
                      <iframe
                        src={item.videoUrl}
                        className="w-full h-full"
                        allow="autoplay; fullscreen; picture-in-picture"
                        style={{ border: 'none' }}
                      />
                    </div>
                  ) : item.thumbnail ? (
                    <div className="relative aspect-video overflow-hidden bg-neutral-900">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  <div className="mt-3 mb-2">
                    <h3 className="text-sm font-light">{item.title}</h3>
                    {item.category && (
                      <span className="text-[10px] tracking-[0.1em] text-white/35 uppercase mt-1 block">
                        {item.category}
                      </span>
                    )}
                    {item.description && (
                      <p className="text-xs text-white/35 mt-2 leading-relaxed">{item.description}</p>
                    )}
                  </div>
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
