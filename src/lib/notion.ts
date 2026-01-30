import { Client } from '@notionhq/client'
import { demoProjects } from './demo-data'

// Verifica se Notion è configurato
const isNotionConfigured =
  process.env.NOTION_API_KEY && process.env.NOTION_DATABASE_ID

// Inizializza il client Notion solo se configurato
const notion = isNotionConfigured
  ? new Client({ auth: process.env.NOTION_API_KEY })
  : null

const databaseId = process.env.NOTION_DATABASE_ID || ''

// Tipo per un progetto
export interface Project {
  id: string
  slug: string
  title: string
  category: string
  description: string
  thumbnail: string
  videoUrl: string | null
  featured: boolean
  order: number
  createdAt: string
}

// Estrae le proprietà dal risultato Notion
function extractProject(page: any): Project {
  const props = page.properties

  // Estrai il titolo
  const titleProp = props.Nome || props.Title || props.name || props.title
  const title = titleProp?.title?.[0]?.plain_text || 'Senza titolo'

  // Estrai la categoria
  const categoryProp = props.Categoria || props.Category || props.categoria
  const category = categoryProp?.select?.name || 'Altro'

  // Estrai la descrizione
  const descProp = props.Descrizione || props.Description || props.descrizione
  const description = descProp?.rich_text?.[0]?.plain_text || ''

  // Estrai il thumbnail (URL esterno o file Notion)
  const thumbProp = props.Thumbnail || props.thumbnail || props.Immagine || props.Cover
  let thumbnail = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80'
  if (thumbProp?.files?.[0]) {
    const file = thumbProp.files[0]
    thumbnail = file.external?.url || file.file?.url || thumbnail
  } else if (thumbProp?.url) {
    thumbnail = thumbProp.url
  }

  // Estrai video URL
  const videoProp = props.Video || props.video || props.VideoUrl
  const videoUrl = videoProp?.url || null

  // Estrai featured
  const featuredProp = props.Featured || props.featured || props.InHome
  const featured = featuredProp?.checkbox || false

  // Estrai ordine
  const orderProp = props.Ordine || props.Order || props.ordine
  const order = orderProp?.number || 0

  // Crea slug dal titolo
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  return {
    id: page.id,
    slug,
    title,
    category,
    description,
    thumbnail,
    videoUrl,
    featured,
    order,
    createdAt: page.created_time,
  }
}

// Ottieni tutti i progetti
export async function getProjects(): Promise<Project[]> {
  // Se Notion non è configurato, usa dati demo
  if (!notion || !databaseId) {
    console.log('⚠️ Notion non configurato, usando dati demo')
    return demoProjects
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'Ordine',
          direction: 'ascending',
        },
      ],
    })

    return response.results.map(extractProject)
  } catch (error) {
    console.error('Errore nel recupero progetti da Notion:', error)
    return demoProjects // Fallback ai dati demo in caso di errore
  }
}

// Ottieni solo i progetti featured (per la home)
export async function getFeaturedProjects(): Promise<Project[]> {
  // Se Notion non è configurato, usa dati demo featured
  if (!notion || !databaseId) {
    return demoProjects.filter((p) => p.featured)
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Featured',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Ordine',
          direction: 'ascending',
        },
      ],
    })

    return response.results.map(extractProject)
  } catch (error) {
    console.error('Errore nel recupero progetti featured:', error)
    return demoProjects.filter((p) => p.featured)
  }
}

// Ottieni un progetto singolo per slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects()
  return projects.find((p) => p.slug === slug) || null
}

// Ottieni le categorie uniche
export async function getCategories(): Promise<string[]> {
  const projects = await getProjects()
  const categories = [...new Set(projects.map((p) => p.category))]
  return categories.filter(Boolean)
}

// Ottieni progetti per categoria
export async function getProjectsByCategory(category: string): Promise<Project[]> {
  const projects = await getProjects()
  return projects.filter((p) => p.category === category)
}
