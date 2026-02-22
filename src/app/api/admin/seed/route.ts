import { NextResponse } from 'next/server'
import { seedBlobFromLocal } from '@/lib/blob-storage'

/** POST /api/admin/seed — Initialize Blob storage with local JSON data */
export async function POST() {
  try {
    await seedBlobFromLocal()
    return NextResponse.json({ success: true, message: 'Dati inizializzati su Blob' })
  } catch (err: any) {
    const message = err?.message?.includes('BLOB_READ_WRITE_TOKEN')
      ? 'Storage no configurado. Configura BLOB_READ_WRITE_TOKEN en las variables de entorno de Vercel.'
      : `Error al inicializar datos: ${err?.message || 'Error desconocido'}`
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
