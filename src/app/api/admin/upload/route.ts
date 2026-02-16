import { NextRequest, NextResponse } from 'next/server'
import { uploadImage } from '@/lib/blob-storage'

/** POST /api/admin/upload — Upload an image file */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'Nessun file inviato' }, { status: 400 })
    }

    // Validate type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Solo immagini sono permesse' }, { status: 400 })
    }

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File troppo grande (max 10MB)' }, { status: 400 })
    }

    const url = await uploadImage(file, 'portfolio')

    return NextResponse.json({ url })
  } catch (err) {
    return NextResponse.json({ error: 'Errore nell\'upload' }, { status: 500 })
  }
}
