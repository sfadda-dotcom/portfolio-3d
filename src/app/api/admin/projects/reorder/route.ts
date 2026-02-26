import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { readProjectsFromBlob, writeProjectsToBlob } from '@/lib/blob-storage'
import type { Project } from '@/lib/projects'
import projectsLocal from '@/data/projects.json'

export const dynamic = 'force-dynamic'

/** POST /api/admin/projects/reorder — Reorder projects */
export async function POST(request: NextRequest) {
  try {
    const { orderedIds } = await request.json() as { orderedIds: string[] }

    if (!Array.isArray(orderedIds)) {
      return NextResponse.json({ error: 'orderedIds deve essere un array' }, { status: 400 })
    }

    const projects = (await readProjectsFromBlob()) || (projectsLocal as Project[])

    // Assign new order based on position in array
    orderedIds.forEach((id, index) => {
      const project = projects.find((p) => p.id === id)
      if (project) {
        project.order = index + 1
      }
    })

    await writeProjectsToBlob(projects)
    revalidatePath('/')
    revalidatePath('/progetti')
    revalidatePath('/reel')
    revalidatePath('/rd')

    const sorted = [...projects].sort((a, b) => a.order - b.order)
    return NextResponse.json(sorted)
  } catch (err: any) {
    const message = err?.message?.includes('BLOB_READ_WRITE_TOKEN')
      ? 'Storage no configurado. Configura BLOB_READ_WRITE_TOKEN en Vercel.'
      : `Error al reordenar: ${err?.message || 'Error desconocido'}`
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
