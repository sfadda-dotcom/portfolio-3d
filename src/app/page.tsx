import Hero from '@/components/Hero'
import ProjectSection from '@/components/ProjectSection'
import Footer from '@/components/Footer'
import { getFeaturedProjects } from '@/lib/projects'

export const revalidate = 60

export default async function Home() {
  const projects = await getFeaturedProjects()

  return (
    <main className="snap-homepage">
      <Hero
        title="Manuel Guillin"
        subtitle="2D/3D Motion Graphics Designer · Videomapping · VJing"
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
