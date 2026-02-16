import projectsData from '@/data/projects.json'
import { readProjectsFromBlob } from './blob-storage'

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

/** Load projects: Blob in production, local JSON as fallback */
async function loadProjects(): Promise<Project[]> {
  const blobProjects = await readProjectsFromBlob()
  if (blobProjects) return blobProjects
  return projectsData as Project[]
}

export async function getProjects(): Promise<Project[]> {
  const projects = await loadProjects()
  return projects.sort((a, b) => a.order - b.order)
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await loadProjects()
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order)
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await loadProjects()
  return projects.find((p) => p.slug === slug) || null
}

export async function getCategories(): Promise<string[]> {
  const projects = await loadProjects()
  const categories = Array.from(new Set(projects.map((p) => p.category)))
  return categories.filter(Boolean)
}
