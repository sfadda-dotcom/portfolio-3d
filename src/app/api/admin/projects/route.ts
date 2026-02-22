import { NextRequest, NextResponse } from 'next/server'
import { readProjectsFromBlob, writeProjectsToBlob } from '@/lib/blob-storage'
import type { Project } from '@/lib/projects'
import projectsLocal from '@/data/projects.json'

export const dynamic = 'force-dynamic'

/** GET /api/admin/projects — List all projects */
export async function GET() {
  try {
    const projects = (await readProjectsFromBlob()) || (projectsLocal as Project[])
    const sorted = [...projects].sort((a, b) => a.order - b.order)
    return NextResponse.json(sorted)
  } catch (err) {
    return NextResponse.json({ error: 'Errore nel caricamento progetti' }, { status: 500 })
  }
}

/** POST /api/admin/projects — Create a new project */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const projects = (await readProjectsFromBlob()) || (projectsLocal as Project[])

    const projectType = body.type || 'project'
    const sameTypeProjects = projects.filter((p) => (p.type || 'project') === projectType)

    const newProject: Project = {
      id: Date.now().toString(),
      slug: body.slug || slugify(body.title),
      title: body.title || 'Nuevo proyecto',
      category: body.category || '',
      description: body.description || '',
      thumbnail: body.thumbnail || '',
      videoUrl: body.videoUrl || null,
      gallery: body.gallery || [],
      featured: body.featured ?? false,
      order: body.order ?? sameTypeProjects.length + 1,
      type: projectType,
      discipline: body.discipline || '',
      place: body.place || '',
      date: body.date || '',
    }

    // Check slug uniqueness
    if (projects.some((p) => p.slug === newProject.slug)) {
      newProject.slug += '-' + Date.now().toString(36)
    }

    projects.push(newProject)
    await writeProjectsToBlob(projects)

    return NextResponse.json(newProject, { status: 201 })
  } catch (err: any) {
    const message = err?.message?.includes('BLOB_READ_WRITE_TOKEN')
      ? 'Storage no configurado. Configura BLOB_READ_WRITE_TOKEN en las variables de entorno de Vercel.'
      : `Error al crear: ${err?.message || 'Error desconocido'}`
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

/** PUT /api/admin/projects — Update a project by id (sent in body) */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: 'ID richiesto' }, { status: 400 })
    }

    const projects = (await readProjectsFromBlob()) || (projectsLocal as Project[])
    const index = projects.findIndex((p) => p.id === id)

    if (index === -1) {
      return NextResponse.json({ error: 'Progetto non trovato' }, { status: 404 })
    }

    // Update slug if title changed and slug wasn't manually set
    if (updates.title && !updates.slug) {
      const newSlug = slugify(updates.title)
      const slugTaken = projects.some((p) => p.slug === newSlug && p.id !== id)
      if (!slugTaken) {
        updates.slug = newSlug
      }
    }

    projects[index] = { ...projects[index], ...updates }
    await writeProjectsToBlob(projects)

    return NextResponse.json(projects[index])
  } catch (err: any) {
    const message = err?.message?.includes('BLOB_READ_WRITE_TOKEN')
      ? 'Storage no configurado. Configura BLOB_READ_WRITE_TOKEN en las variables de entorno de Vercel.'
      : `Error al guardar: ${err?.message || 'Error desconocido'}`
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

/** DELETE /api/admin/projects — Delete a project by id (query param) */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID richiesto' }, { status: 400 })
    }

    const projects = (await readProjectsFromBlob()) || (projectsLocal as Project[])
    const filtered = projects.filter((p) => p.id !== id)

    if (filtered.length === projects.length) {
      return NextResponse.json({ error: 'Progetto non trovato' }, { status: 404 })
    }

    // Re-order remaining
    filtered.sort((a, b) => a.order - b.order).forEach((p, i) => {
      p.order = i + 1
    })

    await writeProjectsToBlob(filtered)

    return NextResponse.json({ success: true })
  } catch (err: any) {
    const message = err?.message?.includes('BLOB_READ_WRITE_TOKEN')
      ? 'Storage no configurado. Configura BLOB_READ_WRITE_TOKEN en las variables de entorno de Vercel.'
      : `Error al eliminar: ${err?.message || 'Error desconocido'}`
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
