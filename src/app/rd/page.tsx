import { getProjects } from '@/lib/projects'
import Footer from '@/components/Footer'
import Image from 'next/image'

export const metadata = {
  title: 'R&D',
  description: 'Tests, simulations, animations and technical experiments',
}

export const revalidate = 60

// Alternating size classes for a random-looking layout
const sizeClasses = [
  'col-span-1',
  'col-span-2',
  'col-span-1',
  'col-span-1',
  'col-span-2',
  'col-span-1',
] as const

const aspectClasses = [
  'pb-[100%]',    // square
  'pb-[56.25%]',  // 16:9
  'pb-[120%]',    // tall
  'pb-[75%]',     // 4:3
  'pb-[50%]',     // wide
  'pb-[90%]',     // near-square
] as const

function isGif(url: string): boolean {
  return url.toLowerCase().endsWith('.gif')
}

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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {items.map((item, index) => {
                const sizeClass = sizeClasses[index % sizeClasses.length]
                const aspectClass = aspectClasses[index % aspectClasses.length]

                return (
                  <article key={item.id} className={`${sizeClass} group`}>
                    <div className={`relative w-full h-0 ${aspectClass} overflow-hidden bg-neutral-900`}>
                      {item.videoUrl ? (
                        <iframe
                          src={item.videoUrl}
                          className="absolute inset-0 w-full h-full"
                          allow="autoplay; fullscreen; picture-in-picture"
                          style={{ border: 'none' }}
                        />
                      ) : item.thumbnail ? (
                        isGif(item.thumbnail) ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <Image
                            src={item.thumbnail}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )
                      ) : (
                        <div className="absolute inset-0 bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                          <span className="text-xs tracking-[0.15em] uppercase text-white/20">R&D</span>
                        </div>
                      )}
                    </div>

                    {item.title && (
                      <p className="mt-2 text-sm font-light text-white/60">{item.title}</p>
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
