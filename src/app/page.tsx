import Hero from '@/components/Hero'
import ProjectSection from '@/components/ProjectSection'
import Footer from '@/components/Footer'
import { getFeaturedProjects } from '@/lib/notion'

// Ricarica i dati ogni 60 secondi
export const revalidate = 60

export default async function Home() {
  const projects = await getFeaturedProjects()

  return (
    <main>
      {/* Hero */}
      <Hero
        title="Motion Design & Visual Experience"
        subtitle="Creo esperienze visive attraverso animazione 3D, motion graphics e design audiovisivo."
      />

      {/* Featured Projects */}
      {projects.map((project, index) => (
        <ProjectSection key={project.id} project={project} index={index} />
      ))}

      {/* Footer */}
      <Footer />
    </main>
  )
}
