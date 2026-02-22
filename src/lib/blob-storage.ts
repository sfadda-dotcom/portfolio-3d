import { put, head, del, list } from '@vercel/blob'
import type { Project, LandingSettings, AboutSettings } from './projects'

const PROJECTS_BLOB_PATH = 'data/projects.json'
const LANDING_BLOB_PATH = 'data/landing.json'
const ABOUT_BLOB_PATH = 'data/about.json'

function isBlobConfigured(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN
}

/** Read projects from Vercel Blob. Returns null if not configured or not found. */
export async function readProjectsFromBlob(): Promise<Project[] | null> {
  if (!isBlobConfigured()) return null

  try {
    const blobs = await list({ prefix: PROJECTS_BLOB_PATH })
    const match = blobs.blobs.find((b) => b.pathname === PROJECTS_BLOB_PATH)
    if (!match) return null

    const res = await fetch(match.url, { cache: 'no-store' })
    if (!res.ok) return null

    return (await res.json()) as Project[]
  } catch (err) {
    console.error('Error reading from Blob:', err)
    return null
  }
}

/** Write projects array to Vercel Blob. */
export async function writeProjectsToBlob(projects: Project[]): Promise<void> {
  if (!isBlobConfigured()) {
    throw new Error('BLOB_READ_WRITE_TOKEN not configured')
  }

  const json = JSON.stringify(projects, null, 2)
  await put(PROJECTS_BLOB_PATH, json, {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  })
}

/** Read landing settings from Vercel Blob. */
export async function readLandingFromBlob(): Promise<LandingSettings | null> {
  if (!isBlobConfigured()) return null

  try {
    const blobs = await list({ prefix: LANDING_BLOB_PATH })
    const match = blobs.blobs.find((b) => b.pathname === LANDING_BLOB_PATH)
    if (!match) return null

    const res = await fetch(match.url, { cache: 'no-store' })
    if (!res.ok) return null

    return (await res.json()) as LandingSettings
  } catch (err) {
    console.error('Error reading landing from Blob:', err)
    return null
  }
}

/** Write landing settings to Vercel Blob. */
export async function writeLandingToBlob(settings: LandingSettings): Promise<void> {
  if (!isBlobConfigured()) {
    throw new Error('BLOB_READ_WRITE_TOKEN not configured')
  }

  const json = JSON.stringify(settings, null, 2)
  await put(LANDING_BLOB_PATH, json, {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  })
}

/** Read about settings from Vercel Blob. */
export async function readAboutFromBlob(): Promise<AboutSettings | null> {
  if (!isBlobConfigured()) return null

  try {
    const blobs = await list({ prefix: ABOUT_BLOB_PATH })
    const match = blobs.blobs.find((b) => b.pathname === ABOUT_BLOB_PATH)
    if (!match) return null

    const res = await fetch(match.url, { cache: 'no-store' })
    if (!res.ok) return null

    return (await res.json()) as AboutSettings
  } catch (err) {
    console.error('Error reading about from Blob:', err)
    return null
  }
}

/** Write about settings to Vercel Blob. */
export async function writeAboutToBlob(settings: AboutSettings): Promise<void> {
  if (!isBlobConfigured()) {
    throw new Error('BLOB_READ_WRITE_TOKEN not configured')
  }

  const json = JSON.stringify(settings, null, 2)
  await put(ABOUT_BLOB_PATH, json, {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  })
}

/** Upload an image to Vercel Blob. Returns the public URL. */
export async function uploadImage(
  file: File,
  folder: string = 'images'
): Promise<string> {
  if (!isBlobConfigured()) {
    throw new Error('BLOB_READ_WRITE_TOKEN not configured')
  }

  const ext = file.name.split('.').pop() || 'jpg'
  const name = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

  const blob = await put(name, file, {
    access: 'public',
    contentType: file.type,
  })

  return blob.url
}

/** Delete an image from Vercel Blob by URL. */
export async function deleteImage(url: string): Promise<void> {
  if (!isBlobConfigured()) return
  try {
    await del(url)
  } catch {
    // Ignore if already deleted or not a blob URL
  }
}

/** Seed Blob with initial data from local JSON (for first-time setup). */
export async function seedBlobFromLocal(): Promise<void> {
  const existing = await readProjectsFromBlob()
  if (existing && existing.length > 0) return // Already seeded

  const { default: localData } = await import('@/data/projects.json')
  await writeProjectsToBlob(localData as Project[])
}
