import { getProjects, getCategories } from '@/lib/projects'
import ProjectsGrid from '@/components/ProjectsGrid'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Work',
  description: 'Motion design, videomapping and audiovisual projects',
}

export const revalidate = 60

export default async function ProjectsPage() {
  const [projects, categories] = await Promise.all([
    getProjects('project'),
    getCategories('project'),
  ])

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 page-content pb-16 px-[var(--section-padding-x)]">
        <div className="max-w-7xl mx-auto">
          <header className="mb-10">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight">
              Work
            </h1>
          </header>

          <ProjectsGrid projects={projects} categories={categories} />
        </div>
      </div>

      <Footer />
    </main>
  )
}
