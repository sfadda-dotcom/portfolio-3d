'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { AboutSettings, Discipline } from '@/lib/projects'

export default function EditAbout() {
  const router = useRouter()
  const [settings, setSettings] = useState<AboutSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const photoInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin/about')
        if (res.ok) {
          setSettings(await res.json())
        }
      } catch {
        console.error('Error loading about settings')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  function update(partial: Partial<AboutSettings>) {
    setSettings((prev) => (prev ? { ...prev, ...partial } : prev))
    setSaved(false)
  }

  async function handleSave() {
    if (!settings) return
    setSaving(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/about', {
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
    } catch {
      setError('Error de red. Verifica la configuración.')
    } finally {
      setSaving(false)
    }
  }

  async function handlePhotoUpload(file: File) {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Error al subir la foto')
        return
      }
      const { url } = await res.json()
      update({ profilePhoto: url })
    } catch {
      setError('Error de conexión al subir la foto')
    } finally {
      setUploading(false)
    }
  }

  // Discipline helpers
  function updateDiscipline(index: number, field: keyof Discipline, value: string) {
    if (!settings) return
    const updated = [...settings.disciplines]
    updated[index] = { ...updated[index], [field]: value }
    update({ disciplines: updated })
  }

  function addDiscipline() {
    if (!settings) return
    update({ disciplines: [...settings.disciplines, { name: '', description: '' }] })
  }

  function removeDiscipline(index: number) {
    if (!settings) return
    update({ disciplines: settings.disciplines.filter((_, i) => i !== index) })
  }

  // Software helpers
  function updateSoftware(index: number, value: string) {
    if (!settings) return
    const updated = [...settings.software]
    updated[index] = value
    update({ software: updated })
  }

  function addSoftware() {
    if (!settings) return
    update({ software: [...settings.software, ''] })
  }

  function removeSoftware(index: number) {
    if (!settings) return
    update({ software: settings.software.filter((_, i) => i !== index) })
  }

  if (loading || !settings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#737373]">Cargando...</p>
      </div>
    )
  }

  const inputClass =
    'w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-white/30 transition-colors'
  const labelClass = 'block text-xs text-[#737373] mb-1.5'

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
            <h1 className="text-sm font-medium">About Me</h1>
          </div>
          <div className="flex items-center gap-3">
            {error && <span className="text-xs text-red-400">{error}</span>}
            {saved && <span className="text-xs text-green-400">Guardado ✓</span>}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-10">
        {/* Profile Photo */}
        <section>
          <h2 className="text-xs tracking-[0.15em] uppercase text-white/40 mb-4">Foto personal</h2>
          <div className="flex items-start gap-6">
            <div className="relative group">
              {settings.profilePhoto ? (
                <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-white/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={settings.profilePhoto}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100
                                 flex items-center justify-center gap-2 transition-opacity">
                    <button
                      onClick={() => photoInputRef.current?.click()}
                      className="text-[10px] bg-white text-black px-2 py-1 rounded"
                    >
                      Cambiar
                    </button>
                    <button
                      onClick={() => update({ profilePhoto: null })}
                      className="text-[10px] bg-red-500/80 text-white px-2 py-1 rounded"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => photoInputRef.current?.click()}
                  className="w-32 h-32 rounded-lg border-2 border-dashed border-white/10
                             hover:border-white/20 flex items-center justify-center transition-colors"
                >
                  <span className="text-xs text-[#737373] text-center px-2">
                    {uploading ? 'Subiendo...' : 'Subir foto'}
                  </span>
                </button>
              )}
              <input
                ref={photoInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp,.gif"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handlePhotoUpload(file)
                  e.target.value = ''
                }}
              />
            </div>
            <div className="flex-1">
              <label className={labelClass}>...o pega una URL</label>
              <input
                type="url"
                value={settings.profilePhoto || ''}
                onChange={(e) => update({ profilePhoto: e.target.value || null })}
                placeholder="https://..."
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* Intro */}
        <section>
          <h2 className="text-xs tracking-[0.15em] uppercase text-white/40 mb-4">Intro</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Párrafo principal</label>
              <textarea
                value={settings.introParagraph1}
                onChange={(e) => update({ introParagraph1: e.target.value })}
                rows={3}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Párrafo secundario</label>
              <textarea
                value={settings.introParagraph2}
                onChange={(e) => update({ introParagraph2: e.target.value })}
                rows={3}
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* Disciplines */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs tracking-[0.15em] uppercase text-white/40">Disciplines</h2>
            <button
              onClick={addDiscipline}
              className="text-xs text-[#737373] hover:text-white transition-colors"
            >
              + Agregar
            </button>
          </div>
          <div className="space-y-3">
            {settings.disciplines.map((d, i) => (
              <div key={i} className="flex gap-2 items-start">
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={d.name}
                    onChange={(e) => updateDiscipline(i, 'name', e.target.value)}
                    placeholder="Nombre"
                    className={inputClass}
                  />
                  <input
                    type="text"
                    value={d.description}
                    onChange={(e) => updateDiscipline(i, 'description', e.target.value)}
                    placeholder="Descripción"
                    className={inputClass}
                  />
                </div>
                <button
                  onClick={() => removeDiscipline(i)}
                  className="text-[#737373] hover:text-red-400 transition-colors mt-2 px-2"
                  title="Eliminar"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Software */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs tracking-[0.15em] uppercase text-white/40">Software</h2>
            <button
              onClick={addSoftware}
              className="text-xs text-[#737373] hover:text-white transition-colors"
            >
              + Agregar
            </button>
          </div>
          <div className="space-y-2">
            {settings.software.map((tool, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={tool}
                  onChange={(e) => updateSoftware(i, e.target.value)}
                  placeholder="Nombre del software"
                  className={inputClass}
                />
                <button
                  onClick={() => removeSoftware(i)}
                  className="text-[#737373] hover:text-red-400 transition-colors px-2"
                  title="Eliminar"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </section>

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
