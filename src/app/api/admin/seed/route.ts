import { NextResponse } from 'next/server'
import { seedBlobFromLocal } from '@/lib/blob-storage'

/** POST /api/admin/seed — Initialize Blob storage with local JSON data */
export async function POST() {
  try {
    await seedBlobFromLocal()
    return NextResponse.json({ success: true, message: 'Dati inizializzati su Blob' })
  } catch (err) {
    return NextResponse.json({ error: 'Errore nel seed' }, { status: 500 })
  }
}
