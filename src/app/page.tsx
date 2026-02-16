import Hero from '@/components/Hero'
import ProjectSection from '@/components/ProjectSection'
import Footer from '@/components/Footer'
import { getFeaturedProjects } from '@/lib/projects'

export const revalidate = 60

export default async function Home() {
  const projects = await getFeaturedProjects()

  return (
    <main>
      <Hero
        title="Manuel Guillin"
        subtitle="2D/3D Motion Graphics Designer · Videomapping · VJing"
      />

      {projects.map((project, index) => (
        <ProjectSection key={project.id} project={project} index={index} />
      ))}

      <Footer />
    </main>
  )
}
