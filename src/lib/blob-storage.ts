import type { Project, LandingSettings, AboutSettings } from './projects'

// ─── GitHub API Configuration ───────────────────────────────────────────────
// Replaces Vercel Blob with GitHub-based storage.
// Images are committed to public/uploads/ and served as static files for free.
// JSON data is committed to data/ and read by the deployed Next.js app.
//
// Required env vars:
//   GITHUB_TOKEN  — Personal Access Token (classic) with "repo" scope
//   GITHUB_REPO   — "owner/repo-name"
//   GITHUB_BRANCH — branch name (default: "main")
// ─────────────────────────────────────────────────────────────────────────────

const PROJECTS_PATH = 'data/projects.json'
const LANDING_PATH = 'data/landing.json'
const ABOUT_PATH = 'data/about.json'

function getGitHubConfig() {
  return {
    token: process.env.GITHUB_TOKEN || '',
    repo: process.env.GITHUB_REPO || '',
    branch: process.env.GITHUB_BRANCH || 'main',
  }
}

function isGitHubConfigured(): boolean {
  const { token, repo } = getGitHubConfig()
  return !!(token && repo)
}

// ─── Low-level GitHub API helpers ────────────────────────────────────────────

interface GitHubFileInfo {
  content: string
  sha: string
}

/** Get file content + SHA from GitHub (needed for updates). */
async function ghGetFile(path: string): Promise<GitHubFileInfo | null> {
  const { token, repo, branch } = getGitHubConfig()

  try {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
        cache: 'no-store',
      }
    )
    if (!res.ok) return null
    const data = await res.json()
    return { content: data.content, sha: data.sha }
  } catch {
    return null
  }
}

/** Read a text file from GitHub. Returns decoded string or null. */
async function ghReadFile(path: string): Promise<string | null> {
  const file = await ghGetFile(path)
  if (!file) return null
  return Buffer.from(file.content, 'base64').toString('utf-8')
}

/** Create or update a file on GitHub. */
async function ghWriteFile(
  path: string,
  content: string | Buffer,
  message: string
): Promise<void> {
  const { token, repo, branch } = getGitHubConfig()

  // Get current SHA if file exists (required for updates)
  const existing = await ghGetFile(path)

  const base64 =
    typeof content === 'string'
      ? Buffer.from(content).toString('base64')
      : content.toString('base64')

  const body: Record<string, unknown> = {
    message,
    content: base64,
    branch,
  }
  if (existing) {
    body.sha = existing.sha
  }

  const res = await fetch(
    `https://api.github.com/repos/${repo}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  )

  if (!res.ok) {
    const err = await res.json()
    throw new Error(`GitHub API error: ${err.message || res.statusText}`)
  }
}

// ─── Projects ────────────────────────────────────────────────────────────────

/** Read projects from GitHub repo. Returns null if not configured or not found. */
export async function readProjectsFromBlob(): Promise<Project[] | null> {
  if (!isGitHubConfigured()) return null

  try {
    const raw = await ghReadFile(PROJECTS_PATH)
    if (!raw) return null
    return JSON.parse(raw) as Project[]
  } catch (err) {
    console.error('Error reading projects from GitHub:', err)
    return null
  }
}

/** Write projects array to GitHub repo. */
export async function writeProjectsToBlob(projects: Project[]): Promise<void> {
  if (!isGitHubConfigured()) {
    throw new Error('GitHub storage not configured. Set GITHUB_TOKEN and GITHUB_REPO.')
  }

  const json = JSON.stringify(projects, null, 2)
  await ghWriteFile(PROJECTS_PATH, json, 'Update projects data')
}

// ─── Landing settings ────────────────────────────────────────────────────────

/** Read landing settings from GitHub repo. */
export async function readLandingFromBlob(): Promise<LandingSettings | null> {
  if (!isGitHubConfigured()) return null

  try {
    const raw = await ghReadFile(LANDING_PATH)
    if (!raw) return null
    return JSON.parse(raw) as LandingSettings
  } catch (err) {
    console.error('Error reading landing from GitHub:', err)
    return null
  }
}

/** Write landing settings to GitHub repo. */
export async function writeLandingToBlob(settings: LandingSettings): Promise<void> {
  if (!isGitHubConfigured()) {
    throw new Error('GitHub storage not configured. Set GITHUB_TOKEN and GITHUB_REPO.')
  }

  const json = JSON.stringify(settings, null, 2)
  await ghWriteFile(LANDING_PATH, json, 'Update landing settings')
}

// ─── About settings ──────────────────────────────────────────────────────────

/** Read about settings from GitHub repo. */
export async function readAboutFromBlob(): Promise<AboutSettings | null> {
  if (!isGitHubConfigured()) return null

  try {
    const raw = await ghReadFile(ABOUT_PATH)
    if (!raw) return null
    return JSON.parse(raw) as AboutSettings
  } catch (err) {
    console.error('Error reading about from GitHub:', err)
    return null
  }
}

/** Write about settings to GitHub repo. */
export async function writeAboutToBlob(settings: AboutSettings): Promise<void> {
  if (!isGitHubConfigured()) {
    throw new Error('GitHub storage not configured. Set GITHUB_TOKEN and GITHUB_REPO.')
  }

  const json = JSON.stringify(settings, null, 2)
  await ghWriteFile(ABOUT_PATH, json, 'Update about settings')
}

// ─── Image upload ────────────────────────────────────────────────────────────

/** Upload an image to GitHub repo (public/uploads/). Returns the public URL path. */
export async function uploadImage(
  file: File,
  _folder: string = 'images'
): Promise<string> {
  if (!isGitHubConfigured()) {
    throw new Error('GitHub storage not configured. Set GITHUB_TOKEN and GITHUB_REPO.')
  }

  const ext = file.name.split('.').pop() || 'jpg'
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const repoPath = `public/uploads/${filename}`

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  await ghWriteFile(repoPath, buffer, `Upload image: ${filename}`)

  // Return the public path (served by Next.js from /public)
  return `/uploads/${filename}`
}

/** Delete an image — no-op for GitHub storage (would need separate commit). */
export async function deleteImage(_url: string): Promise<void> {
  // For GitHub-based storage, we skip deletion to avoid unnecessary commits.
  // Old images can be cleaned up manually from the repo.
}

/** Seed GitHub repo with initial data from local JSON. */
export async function seedBlobFromLocal(): Promise<void> {
  const existing = await readProjectsFromBlob()
  if (existing && existing.length > 0) return // Already seeded

  const { default: localData } = await import('@/data/projects.json')
  await writeProjectsToBlob(localData as Project[])
}
