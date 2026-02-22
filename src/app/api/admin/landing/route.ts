import { NextResponse } from 'next/server'
import { readLandingFromBlob, writeLandingToBlob } from '@/lib/blob-storage'
import { DEFAULT_LANDING } from '@/lib/projects'
import type { LandingSettings } from '@/lib/projects'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const settings = await readLandingFromBlob()
    return NextResponse.json(settings || DEFAULT_LANDING)
  } catch (err) {
    console.error('Error loading landing settings:', err)
    return NextResponse.json(DEFAULT_LANDING)
  }
}

export async function PUT(request: Request) {
  try {
    const body: LandingSettings = await request.json()

    const settings: LandingSettings = {
      heroTitle: body.heroTitle || DEFAULT_LANDING.heroTitle,
      heroSubtitle: body.heroSubtitle || '',
      heroVideoUrl: body.heroVideoUrl || null,
      heroImage: body.heroImage || null,
      showScrollIndicator: body.showScrollIndicator ?? true,
    }

    await writeLandingToBlob(settings)
    return NextResponse.json(settings)
  } catch (err) {
    console.error('Error saving landing settings:', err)
    return NextResponse.json({ error: 'Error saving' }, { status: 500 })
  }
}
