import { getProjects } from '@/lib/projects'
import Footer from '@/components/Footer'
import Image from 'next/image'

export const metadata = {
  title: 'R&D | Manuel Guillin',
  description: 'Tests, animaciones, simulaciones y experimentos',
}

export const revalidate = 60

export default async function RDPage() {
  const items = await getProjects('rd')

  return (
    <main className="min-h-screen pt-40 md:pt-48 pb-16 px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-4">
            Investigación
          </p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight">
            R&D
          </h1>
          <p className="mt-4 text-lg text-white/50 max-w-2xl">
            Tests, simulaciones, animaciones sin render y experimentos técnicos.
          </p>
        </header>

        {items.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {items.map((item) => (
              <article
                key={item.id}
                className="break-inside-avoid group rounded-lg overflow-hidden bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors"
              >
                {item.videoUrl ? (
                  <div className="aspect-video">
                    <iframe
                      src={item.videoUrl}
                      className="w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      style={{ border: 'none' }}
                    />
                  </div>
                ) : item.thumbnail ? (
                  <div className="relative aspect-video">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div className="p-3">
                  <h3 className="text-sm font-medium">{item.title}</h3>
                  {item.category && (
                    <span className="text-xs text-white/40 mt-0.5 block">{item.category}</span>
                  )}
                  {item.description && (
                    <p className="text-xs text-white/40 mt-2">{item.description}</p>
                  )}
                </div>
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
