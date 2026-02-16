import { getProjects, getCategories } from '@/lib/projects'
import ProjectCard from '@/components/ProjectCard'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Proyectos | Manuel Guillin',
  description: 'Proyectos de motion design 3D, videomapping y VJing',
}

export const revalidate = 60

// Pattern: large, medium, medium, small, large, medium, small, medium...
const sizePattern: Array<'large' | 'medium' | 'small'> = [
  'large', 'medium', 'medium', 'small', 'large', 'medium', 'small', 'medium',
]

function getSize(index: number): 'large' | 'medium' | 'small' {
  return sizePattern[index % sizePattern.length]
}

// Grid span classes based on size
function getSpanClass(size: 'large' | 'medium' | 'small'): string {
  switch (size) {
    case 'large': return 'md:col-span-2'
    case 'small': return 'md:col-span-1'
    default: return 'md:col-span-1'
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects('project')
  const categories = await getCategories('project')

  return (
    <main className="min-h-screen pt-32 pb-16 px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight">
            Proyectos
          </h1>
          <p className="mt-6 text-white/50 text-lg max-w-2xl">
            Una selección de trabajos en motion design 3D, videomapping y contenido audiovisual.
          </p>
        </header>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-12">
            <span className="text-sm tracking-wide text-white border-b border-white pb-1">
              Todos
            </span>
            {categories.map((cat) => (
              <span
                key={cat}
                className="text-sm tracking-wide text-white/40 hover:text-white cursor-pointer transition-colors"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 gap-y-8">
          {projects.map((project, index) => {
            const size = getSize(index)
            return (
              <div key={project.id} className={getSpanClass(size)}>
                <ProjectCard project={project} index={index} size={size} />
              </div>
            )
          })}
        </div>

        {projects.length === 0 && (
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
