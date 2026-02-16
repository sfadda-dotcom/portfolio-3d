import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProjectBySlug, getProjects } from '@/lib/projects'
import Footer from '@/components/Footer'

export const revalidate = 60

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug)
  if (!project) return { title: 'Proyecto no encontrado' }

  return {
    title: `${project.title} | Manuel Guillin`,
    description: project.description || `Proyecto: ${project.title}`,
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {project.videoUrl ? (
            <iframe
              src={`${project.videoUrl}?background=1&autoplay=1&loop=1&muted=1`}
              className="w-full h-full"
              allow="autoplay; fullscreen"
              style={{ border: 'none' }}
            />
          ) : (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        </div>

        <div className="relative z-10 w-full px-8 md:px-16 pb-16">
          <span className="text-xs tracking-[0.3em] text-white/60 uppercase">
            {project.category}
          </span>
          <h1 className="mt-4 text-5xl md:text-7xl font-light tracking-tight">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Description */}
      <section className="py-24 px-8 md:px-16">
        <div className="max-w-4xl">
          {project.description && (
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
              {project.description}
            </p>
          )}

          {/* Video principale */}
          {project.videoUrl && (
            <div className="mt-16 aspect-video bg-neutral-900 rounded-lg overflow-hidden">
              <iframe
                src={project.videoUrl}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                style={{ border: 'none' }}
              />
            </div>
          )}
        </div>
      </section>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="px-8 md:px-16 pb-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xs tracking-[0.3em] text-white/60 uppercase mb-8">
              Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((item, index) => (
                <div key={index} className="relative overflow-hidden rounded-lg bg-neutral-900">
                  {item.type === 'image' ? (
                    <div className="relative aspect-video">
                      <Image
                        src={item.url}
                        alt={item.caption || `${project.title} - ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : item.type === 'vimeo' || item.type === 'youtube' ? (
                    <div className="aspect-video">
                      <iframe
                        src={item.type === 'youtube'
                          ? item.url.replace('watch?v=', 'embed/')
                          : item.url
                        }
                        className="w-full h-full"
                        allow="autoplay; fullscreen; picture-in-picture"
                        style={{ border: 'none' }}
                      />
                    </div>
                  ) : null}
                  {item.caption && (
                    <p className="p-4 text-sm text-white/60">{item.caption}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <section className="px-8 md:px-16 pb-24">
        <Link
          href="/progetti"
          className="inline-flex items-center gap-2 text-[#737373] hover:text-white transition-colors"
        >
          <span>←</span>
          Todos los proyectos
        </Link>
      </section>

      <Footer />
    </main>
  )
}
