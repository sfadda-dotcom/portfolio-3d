import projectsData from '@/data/projects.json'

export interface GalleryItem {
  type: 'image' | 'vimeo' | 'youtube'
  url: string
  caption?: string
}

export interface Project {
  id: string
  slug: string
  title: string
  category: string
  description: string
  thumbnail: string
  videoUrl: string | null
  gallery?: GalleryItem[]
  featured: boolean
  order: number
}

const projects: Project[] = projectsData as Project[]

export function getProjects(): Project[] {
  return projects.sort((a, b) => a.order - b.order)
}

export function getFeaturedProjects(): Project[] {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order)
}

export function getProjectBySlug(slug: string): Project | null {
  return projects.find((p) => p.slug === slug) || null
}

export function getCategories(): string[] {
  const categories = [...new Set(projects.map((p) => p.category))]
  return categories.filter(Boolean)
}
