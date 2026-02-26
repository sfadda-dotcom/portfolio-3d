import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProjectBySlug, getProjects } from '@/lib/projects'
import Footer from '@/components/Footer'
import GalleryLightbox from '@/components/GalleryLightbox'

export const revalidate = 60

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug)
  if (!project) return { title: 'Project not found' }

  return {
    title: project.title,
    description: project.description || `Project: ${project.title}`,
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      {/* Hero — full viewport, image/video only */}
      <section className="relative h-screen overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </div>
      </section>

      {/* 001 — Title + Meta */}
      <section className="py-20 px-[var(--section-padding-x)]">
        <div className="max-w-5xl">
          <span className="section-number">001</span>
          <h1 className="mt-4 text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight">
            {project.title}
          </h1>

          {/* Credits row */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/[0.08] pt-8">
            {project.category && (
              <div>
                <span className="text-xs tracking-[0.15em] uppercase text-white/35 block mb-1">
                  Category
                </span>
                <span className="text-sm text-white/80">{project.category}</span>
              </div>
            )}
            {project.discipline && (
              <div>
                <span className="text-xs tracking-[0.15em] uppercase text-white/35 block mb-1">
                  Discipline
                </span>
                <span className="text-sm text-white/80">{project.discipline}</span>
              </div>
            )}
            {project.place && (
              <div>
                <span className="text-xs tracking-[0.15em] uppercase text-white/35 block mb-1">
                  Location
                </span>
                <span className="text-sm text-white/80">{project.place}</span>
              </div>
            )}
            {project.date && (
              <div>
                <span className="text-xs tracking-[0.15em] uppercase text-white/35 block mb-1">
                  Year
                </span>
                <span className="text-sm text-white/80">{project.date}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 002 — Description */}
      {project.description && (
        <section className="pb-20 px-[var(--section-padding-x)]">
          <div className="max-w-4xl">
            <span className="section-number">002</span>
            <p className="mt-4 text-xl md:text-2xl font-extralight leading-relaxed text-white/80">
              {project.description}
            </p>
          </div>
        </section>
      )}

      {/* 003 — Video */}
      {project.videoUrl && (
        <section className="pb-20 px-[var(--section-padding-x)]">
          <div className="max-w-6xl">
            <span className="section-number">003</span>
            <div className="mt-4 aspect-video bg-neutral-900 overflow-hidden">
              <iframe
                src={project.videoUrl}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                style={{ border: 'none' }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Gallery — random grid with lightbox */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="pb-20">
          <GalleryLightbox items={project.gallery} projectTitle={project.title} />
        </section>
      )}

      {/* Back link */}
      <section className="px-[var(--section-padding-x)] pb-24">
        <Link
          href="/progetti"
          className="inline-flex items-center gap-3 text-xs tracking-[0.15em] uppercase text-white/40 hover:text-white transition-colors"
        >
          <span>&larr;</span>
          All projects
        </Link>
      </section>

      <Footer />
    </main>
  )
}
