import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { readAboutFromBlob, writeAboutToBlob } from '@/lib/blob-storage'
import { DEFAULT_ABOUT } from '@/lib/projects'
import type { AboutSettings } from '@/lib/projects'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const settings = await readAboutFromBlob()
    return NextResponse.json(settings || DEFAULT_ABOUT)
  } catch (err) {
    console.error('Error loading about settings:', err)
    return NextResponse.json(DEFAULT_ABOUT)
  }
}

export async function PUT(request: Request) {
  try {
    const body: AboutSettings = await request.json()

    const settings: AboutSettings = {
      introParagraph1: body.introParagraph1 || DEFAULT_ABOUT.introParagraph1,
      introParagraph2: body.introParagraph2 || '',
      disciplines: Array.isArray(body.disciplines) ? body.disciplines : DEFAULT_ABOUT.disciplines,
      software: Array.isArray(body.software) ? body.software : DEFAULT_ABOUT.software,
      experience: Array.isArray(body.experience) ? body.experience : DEFAULT_ABOUT.experience,
      studies: Array.isArray(body.studies) ? body.studies : DEFAULT_ABOUT.studies,
    }

    await writeAboutToBlob(settings)
    revalidatePath('/studio')
    return NextResponse.json(settings)
  } catch (err) {
    console.error('Error saving about settings:', err)
    return NextResponse.json({ error: 'Error saving' }, { status: 500 })
  }
}
