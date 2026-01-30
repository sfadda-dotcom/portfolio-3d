import { getProjects, getCategories } from '@/lib/notion'
import ProjectCard from '@/components/ProjectCard'
import Footer from '@/components/Footer'

export const revalidate = 60

export const metadata = {
  title: 'Progetti | Portfolio',
  description: 'Tutti i progetti di motion design 3D e animazione',
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  const categories = await getCategories()

  return (
    <main className="min-h-screen pt-32 pb-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight">
            Progetti
          </h1>
          <p className="mt-4 text-muted text-lg max-w-2xl">
            Una selezione di lavori in motion design 3D, animazione e contenuti audiovisivi.
          </p>
        </header>

        {/* Categories Filter (visual only, filtro client-side da implementare) */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-12">
            <span className="text-sm tracking-wide text-white border-b border-white pb-1">
              Tutti
            </span>
            {categories.map((cat) => (
              <span
                key={cat}
                className="text-sm tracking-wide text-muted hover:text-white cursor-pointer transition-colors"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Empty state */}
        {projects.length === 0 && (
          <div className="text-center py-24">
            <p className="text-muted text-lg">
              Nessun progetto ancora. Aggiungi il primo progetto su Notion!
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
