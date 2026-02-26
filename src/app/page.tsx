import Hero from '@/components/Hero'
import ProjectSection from '@/components/ProjectSection'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getFeaturedProjects, getLandingSettings } from '@/lib/projects'

export const revalidate = 60

export default async function Home() {
  const [projects, landing] = await Promise.all([
    getFeaturedProjects(),
    getLandingSettings(),
  ])

  return (
    <main>
      <Hero
        title={landing.heroTitle}
        subtitle={landing.heroSubtitle}
        videoUrl={landing.heroVideoUrl}
        image={landing.heroImage}
        showScrollIndicator={landing.showScrollIndicator}
      />

      {projects.map((project, index) => (
        <ProjectSection key={project.id} project={project} index={index} />
      ))}

      {/* CTA section */}
      <section className="py-32 px-[var(--section-padding-x)] text-center">
        <Link
          href="/progetti"
          className="inline-block px-8 py-3 text-xs tracking-[0.15em] uppercase border border-white/20 text-white/70 hover:bg-white hover:text-black transition-all duration-300"
        >
          View all projects
        </Link>
      </section>

      <Footer />
    </main>
  )
}
