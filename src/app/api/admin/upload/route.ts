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

/** POST /api/admin/upload — Upload an image file via GitHub */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'Nessun file inviato' }, { status: 400 })
    }

    // Determine MIME type: trust file.type first, fall back to extension
    const detectedType = file.type || getMimeType(file.name)

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
    if (!detectedType || !allowedTypes.includes(detectedType)) {
      console.error(`Upload rejected: file.type="${file.type}", name="${file.name}", detectedType="${detectedType}"`)
      return NextResponse.json(
        { error: `Formato non supportato (${file.type || 'sconosciuto'}). Formati ammessi: JPG, PNG, WebP, GIF, SVG` },
        { status: 400 }
      )
    }

    if (file.size > 4 * 1024 * 1024) {
      return NextResponse.json(
        { error: `File troppo grande (${(file.size / 1024 / 1024).toFixed(1)} MB). Il limite è 4 MB. Comprimi l'immagine o usa JPG/WebP.` },
        { status: 400 }
      )
    }

    // Override file type if browser didn't detect it correctly
    const uploadFile = detectedType !== file.type
      ? new File([file], file.name, { type: detectedType })
      : file

    const url = await uploadImage(uploadFile, 'portfolio')

    return NextResponse.json({
      url,
      message: 'Immagine caricata. Il sito si aggiornerà in 1-2 minuti.',
    })
  } catch (err: any) {
    console.error('Upload error:', err)
    const message = err?.message?.includes('GitHub')
      ? 'GitHub storage non configurato. Configura GITHUB_TOKEN e GITHUB_REPO nelle variabili d\'ambiente di Vercel.'
      : `Errore upload: ${err?.message || 'Errore sconosciuto'}`
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
