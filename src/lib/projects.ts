import projectsData from '@/data/projects.json'
import { readProjectsFromBlob, readLandingFromBlob, readAboutFromBlob } from './blob-storage'

export interface LandingSettings {
  heroTitle: string
  heroSubtitle: string
  heroVideoUrl: string | null
  heroImage: string | null
  showScrollIndicator: boolean
}

export const DEFAULT_LANDING: LandingSettings = {
  heroTitle: 'Manuel Guillin',
  heroSubtitle: '2D/3D Motion Graphics Designer · Videomapping · VJing',
  heroVideoUrl: null,
  heroImage: null,
  showScrollIndicator: true,
}

export async function getLandingSettings(): Promise<LandingSettings> {
  const settings = await readLandingFromBlob()
  if (settings) return settings
  return DEFAULT_LANDING
}

export interface Discipline {
  name: string
  description: string
}

export interface ExperienceItem {
  company: string
  role: string
  period: string
}

export interface StudyItem {
  title: string
  institution: string
}

export interface AboutSettings {
  introParagraph1: string
  introParagraph2: string
  disciplines: Discipline[]
  software: string[]
  experience: ExperienceItem[]
  studies: StudyItem[]
}

export const DEFAULT_ABOUT: AboutSettings = {
  introParagraph1:
    'Toda nuestra vida es movimiento. Ni la sociedad, ni la naturaleza se quedan paradas en ningún momento. Todo se mueve y este movimiento tiene un fin.',
  introParagraph2:
    'Bajo las tres dimensiones que rigen el mundo físico, manipulamos la cuarta intangible, el tiempo. Creando así la ilusión de movimiento.',
  disciplines: [
    { name: '2D/3D Motion Graphics', description: 'Colors, shapes, textures and feelings — essential for communication.' },
    { name: 'Videomapping', description: 'Every place has a story, everything is a canvas to complete.' },
    { name: 'VJing', description: 'Listening to light. The art of intensifying sensations through music.' },
  ],
  software: [
    '3Ds Max', 'Cinema 4D', 'After Effects', 'Premiere',
    'Houdini', 'Resolume Arena', 'Vvvv', 'Touch Designer', 'Mad Mapper',
  ],
  experience: [
    { company: 'Legion Creativa', role: 'Motion Designer', period: '2017 — Present' },
    { company: 'Freelance', role: '2D/3D Motion Graphics', period: '2014 — Present' },
    { company: 'BNN Costanera', role: 'VJ Residente', period: '2017 — 2020' },
    { company: 'Gino Club', role: 'VJ Residente', period: '2015 — 2017' },
    { company: 'Rabbit', role: 'VJ Residente', period: '2013 — 2015' },
  ],
  studies: [
    { title: 'Animación 3D FX', institution: 'Image Campus' },
    { title: 'Artes Electrónicas', institution: 'UNTREF' },
    { title: 'Diseño Gráfico', institution: 'UBA' },
  ],
}

export async function getAboutSettings(): Promise<AboutSettings> {
  const settings = await readAboutFromBlob()
  if (settings) return settings
  return DEFAULT_ABOUT
}

export interface GalleryItem {
  type: 'image' | 'vimeo' | 'youtube'
  url: string
  caption?: string
}

export type ProjectType = 'project' | 'reel' | 'rd'

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
  type?: ProjectType
  discipline?: string
  place?: string
  date?: string
}

/** Load projects: Blob in production, local JSON as fallback */
async function loadProjects(): Promise<Project[]> {
  const blobProjects = await readProjectsFromBlob()
  if (blobProjects) return blobProjects
  return projectsData as Project[]
}

export async function getProjects(type: ProjectType = 'project'): Promise<Project[]> {
  const projects = await loadProjects()
  return projects
    .filter((p) => (p.type || 'project') === type)
    .sort((a, b) => a.order - b.order)
}

export async function getAllItems(): Promise<Project[]> {
  const projects = await loadProjects()
  return projects.sort((a, b) => a.order - b.order)
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await loadProjects()
  return projects
    .filter((p) => p.featured && (p.type || 'project') === 'project')
    .sort((a, b) => a.order - b.order)
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await loadProjects()
  return projects.find((p) => p.slug === slug) || null
}

export async function getCategories(type: ProjectType = 'project'): Promise<string[]> {
  const projects = await loadProjects()
  const categories = Array.from(
    new Set(projects.filter((p) => (p.type || 'project') === type).map((p) => p.category))
  )
  return categories.filter(Boolean)
}
