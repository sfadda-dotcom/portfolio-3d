'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { LandingSettings } from '@/lib/projects'

export default function EditLanding() {
  const router = useRouter()
  const [settings, setSettings] = useState<LandingSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin/landing')
        if (res.ok) {
          setSettings(await res.json())
        }
      } catch {
        console.error('Error loading landing settings')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  async function handleSave() {
    if (!settings) return
    setSaving(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/landing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (res.ok) {
        const updated = await res.json()
        setSettings(updated)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error || `Error al guardar (${res.status})`)
      }
    } catch (err) {
      setError('Error de red. Verifica que BLOB_READ_WRITE_TOKEN esté configurado.')
    } finally {
      setSaving(false)
    }
  }

  async function handleUpload(file: File) {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        const { url } = await res.json()
        setSettings((prev) => prev ? { ...prev, heroImage: url } : prev)
        setSaved(false)
      }
    } finally {
      setUploading(false)
    }
  }

  if (loading || !settings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#737373]">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#111]/95 backdrop-blur border-b border-white/5">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin')}
              className="text-sm text-[#737373] hover:text-white transition-colors"
            >
              ← Dashboard
            </button>
            <h1 className="text-sm font-medium">Landing Page</h1>
          </div>
          <div className="flex items-center gap-3">
            {error && (
              <span className="text-xs text-red-400">{error}</span>
            )}
            {saved && (
              <span className="text-xs text-green-400">Guardado ✓</span>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="text-sm bg-white text-black px-4 py-1.5 rounded font-medium
                         hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              {saving ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Preview */}
        <section>
          <label className="block text-xs text-[#737373] mb-3">Vista previa del Hero</label>
          <div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-900 border border-white/5">
            {/* Background */}
            {settings.heroVideoUrl ? (
              <iframe
                src={`${settings.heroVideoUrl}?background=1&autoplay=1&loop=1&muted=1`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen"
                style={{ border: 'none' }}
              />
            ) : settings.heroImage ? (
              <img
                src={settings.heroImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />
            )}
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />
            {/* Content preview */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8">
              <p className="text-2xl md:text-3xl font-light tracking-tight">
                {settings.heroTitle || 'Título'}
              </p>
              {settings.heroSubtitle && (
                <p className="mt-3 text-sm text-white/60">
                  {settings.heroSubtitle}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Hero Title */}
        <div>
          <label className="block text-xs text-[#737373] mb-1.5">Título del Hero</label>
          <input
            type="text"
            value={settings.heroTitle}
            onChange={(e) => {
              setSettings({ ...settings, heroTitle: e.target.value })
              setSaved(false)
            }}
            placeholder="Manuel Guillin"
            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm
                       focus:outline-none focus:border-white/30 transition-colors"
          />
        </div>

        {/* Hero Subtitle */}
        <div>
          <label className="block text-xs text-[#737373] mb-1.5">Subtítulo del Hero</label>
          <input
            type="text"
            value={settings.heroSubtitle}
            onChange={(e) => {
              setSettings({ ...settings, heroSubtitle: e.target.value })
              setSaved(false)
            }}
            placeholder="3D Motion · AI · Videomapping · VJing"
            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm
                       focus:outline-none focus:border-white/30 transition-colors"
          />
        </div>

        {/* Hero Video URL */}
        <div>
          <label className="block text-xs text-[#737373] mb-1.5">Video de fondo (embed Vimeo)</label>
          <input
            type="url"
            value={settings.heroVideoUrl || ''}
            onChange={(e) => {
              setSettings({ ...settings, heroVideoUrl: e.target.value || null })
              setSaved(false)
            }}
            placeholder="https://player.vimeo.com/video/..."
            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm
                       focus:outline-none focus:border-white/30 transition-colors"
          />
          <p className="mt-1.5 text-[10px] text-white/30">
            Si hay video, se usa como fondo. Si no, se usa la imagen de abajo.
          </p>
        </div>

        {/* Hero Image */}
        <section>
          <label className="block text-xs text-[#737373] mb-2">Imagen de fondo (fallback)</label>
          <div className="relative group">
            {settings.heroImage ? (
              <div className="relative aspect-video rounded-lg overflow-hidden bg-white/5">
                <img
                  src={settings.heroImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100
                               flex items-center justify-center gap-3 transition-opacity">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs bg-white text-black px-3 py-1.5 rounded"
                  >
                    Cambiar imagen
                  </button>
                  <button
                    onClick={() => {
                      setSettings({ ...settings, heroImage: null })
                      setSaved(false)
                    }}
                    className="text-xs bg-red-500/80 text-white px-3 py-1.5 rounded"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-video rounded-lg border-2 border-dashed border-white/10
                           hover:border-white/20 flex items-center justify-center transition-colors"
              >
                <span className="text-sm text-[#737373]">
                  {uploading ? 'Subiendo...' : 'Clic para subir una imagen'}
                </span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,.gif,.jpg,.jpeg,.png,.webp,.svg"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleUpload(file)
                e.target.value = ''
              }}
            />
          </div>
          <div className="mt-2">
            <input
              type="url"
              value={settings.heroImage || ''}
              onChange={(e) => {
                setSettings({ ...settings, heroImage: e.target.value || null })
                setSaved(false)
              }}
              placeholder="...o pega una URL de imagen"
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-xs
                         focus:outline-none focus:border-white/30 transition-colors text-[#737373]"
            />
          </div>
        </section>

        {/* Scroll indicator toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setSettings({ ...settings, showScrollIndicator: !settings.showScrollIndicator })
              setSaved(false)
            }}
            className={`relative w-10 h-5 rounded-full transition-colors ${
              settings.showScrollIndicator ? 'bg-white' : 'bg-white/20'
            }`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${
                settings.showScrollIndicator
                  ? 'left-5.5 bg-black translate-x-[2px]'
                  : 'left-0.5 bg-[#737373]'
              }`}
            />
          </button>
          <span className="text-sm">Mostrar indicador de scroll</span>
        </div>

        {/* Info */}
        <div className="bg-white/[0.03] border border-white/5 rounded-lg p-4">
          <p className="text-xs text-white/40 leading-relaxed">
            Los proyectos destacados (Featured) se muestran automáticamente debajo del hero.
            Puedes marcar proyectos como destacados desde la pestaña Proyectos del dashboard.
          </p>
        </div>

        {/* Bottom save */}
        <div className="flex justify-between items-center pt-4 border-t border-white/5">
          <button
            onClick={() => router.push('/admin')}
            className="text-sm text-[#737373] hover:text-white transition-colors"
          >
            ← Volver al dashboard
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="text-sm bg-white text-black px-6 py-2 rounded font-medium
                       hover:bg-white/90 transition-colors disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </main>
    </div>
  )
}
