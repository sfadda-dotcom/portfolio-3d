import { NextRequest, NextResponse } from 'next/server'
import { uploadImage } from '@/lib/blob-storage'

/** Map file extension to MIME type as fallback */
function getMimeType(filename: string): string | null {
  const ext = filename.toLowerCase().split('.').pop()
  const map: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    gif: 'image/gif',
    svg: 'image/svg+xml',
  }
  return map[ext || ''] || null
}

/** POST /api/admin/upload — Upload an image file */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No se envió ningún archivo' }, { status: 400 })
    }

    // Determine MIME type: trust file.type first, fall back to extension
    const detectedType = file.type || getMimeType(file.name)

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
    if (!detectedType || !allowedTypes.includes(detectedType)) {
      console.error(`Upload rejected: file.type="${file.type}", name="${file.name}", detectedType="${detectedType}"`)
      return NextResponse.json(
        { error: `Formato no soportado (${file.type || 'desconocido'}). Formatos permitidos: JPG, PNG, WebP, GIF, SVG` },
        { status: 400 }
      )
    }

    if (file.size > 25 * 1024 * 1024) {
      return NextResponse.json({ error: 'Archivo demasiado grande (máx 25MB)' }, { status: 400 })
    }

    // Override file type if browser didn't detect it correctly
    const uploadFile = detectedType !== file.type
      ? new File([file], file.name, { type: detectedType })
      : file

    const url = await uploadImage(uploadFile, 'portfolio')

    return NextResponse.json({ url })
  } catch (err: any) {
    console.error('Upload error:', err)
    const message = err?.message?.includes('BLOB_READ_WRITE_TOKEN')
      ? 'Storage no configurado. Configura BLOB_READ_WRITE_TOKEN en Vercel.'
      : `Error al subir: ${err?.message || 'Error desconocido'}`
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
