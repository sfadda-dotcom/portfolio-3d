import { NextRequest, NextResponse } from 'next/server'
import { uploadImage } from '@/lib/blob-storage'

/** POST /api/admin/upload — Upload an image file */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No se envió ningún archivo' }, { status: 400 })
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Formato no soportado. Formatos permitidos: JPG, PNG, WebP, GIF, SVG' }, { status: 400 })
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'Archivo demasiado grande (máx 10MB)' }, { status: 400 })
    }

    const url = await uploadImage(file, 'portfolio')

    return NextResponse.json({ url })
  } catch (err: any) {
    const message = err?.message?.includes('BLOB_READ_WRITE_TOKEN')
      ? 'Storage no configurado. Configura BLOB_READ_WRITE_TOKEN en Vercel.'
      : `Error al subir: ${err?.message || 'Error desconocido'}`
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
