import Hero from '@/components/Hero'
import ProjectSection from '@/components/ProjectSection'
import Footer from '@/components/Footer'
import { getFeaturedProjects, getLandingSettings } from '@/lib/projects'

export const revalidate = 60

export default async function Home() {
  const [projects, landing] = await Promise.all([
    getFeaturedProjects(),
    getLandingSettings(),
  ])

  return (
    <main className="snap-homepage">
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

      {/* Footer section with snap alignment */}
      <section className="scroll-snap-align-start">
        <Footer />
      </section>
    </main>
  )
}
