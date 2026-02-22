import { NextRequest, NextResponse } from 'next/server'
import { uploadImage } from '@/lib/blob-storage'

/** POST /api/admin/upload — Upload one or more image files */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('file') as File[]

    if (files.length === 0) {
      return NextResponse.json({ error: 'No se envió ningún archivo' }, { status: 400 })
    }

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        return NextResponse.json({ error: `Solo se permiten imágenes (${file.name})` }, { status: 400 })
      }
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json({ error: `Archivo demasiado grande: ${file.name} (máx 10MB)` }, { status: 400 })
      }
    }

    const urls = await Promise.all(
      files.map((file) => uploadImage(file, 'portfolio'))
    )

    // Return single url for backwards compatibility + urls array
    return NextResponse.json({ url: urls[0], urls })
  } catch (err: any) {
    const message = err?.message?.includes('BLOB_READ_WRITE_TOKEN')
      ? 'Storage no configurado. Configura BLOB_READ_WRITE_TOKEN en Vercel.'
      : `Error al subir: ${err?.message || 'Error desconocido'}`
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
