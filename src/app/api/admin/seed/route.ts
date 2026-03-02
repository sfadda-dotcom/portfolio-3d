import { NextResponse } from 'next/server'
import { seedBlobFromLocal } from '@/lib/blob-storage'

/** POST /api/admin/seed — Initialize Blob storage with local JSON data */
export async function POST() {
  try {
    await seedBlobFromLocal()
    return NextResponse.json({ success: true, message: 'Dati inizializzati su Blob' })
  } catch (err: any) {
    const message = err?.message?.includes('GitHub')
      ? 'Storage non configurato. Configura GITHUB_TOKEN e GITHUB_REPO nelle variabili d\'ambiente di Vercel.'
      : `Errore nell'inizializzazione dati: ${err?.message || 'Errore sconosciuto'}`
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
