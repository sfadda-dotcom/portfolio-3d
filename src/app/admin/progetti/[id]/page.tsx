'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import type { Project, GalleryItem } from '@/lib/projects'

export default function EditProject() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [saved, setSaved] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin/projects')
        if (res.ok) {
          const projects: Project[] = await res.json()
          const found = projects.find((p) => p.id === id)
          if (found) {
            setProject(found)
          } else {
            router.push('/admin')
          }
        }
      } catch {
        router.push('/admin')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id, router])

  function updateField<K extends keyof Project>(key: K, value: Project[K]) {
    if (!project) return
    setProject({ ...project, [key]: value })
    setSaved(false)
  }

  async function handleSave() {
    if (!project) return
    setSaving(true)
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      })
      if (res.ok) {
        const updated = await res.json()
        setProject(updated)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      }
    } finally {
      setSaving(false)
    }
  }

  async function handleUpload(file: File, target: 'thumbnail' | 'gallery') {
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
        if (target === 'thumbnail') {
          updateField('thumbnail', url)
        } else {
          const gallery = [...(project?.gallery || [])]
          gallery.push({ type: 'image', url, caption: '' })
          updateField('gallery', gallery)
        }
      }
    } finally {
      setUploading(false)
    }
  }

  function handleRemoveGalleryItem(index: number) {
    if (!project) return
    const gallery = [...(project.gallery || [])]
    gallery.splice(index, 1)
    updateField('gallery', gallery)
  }

  function handleAddGalleryVideo() {
    if (!project) return
    const url = prompt('URL del video (Vimeo embed):')
    if (!url) return

    const type = url.includes('youtube') ? 'youtube' : 'vimeo'
    const gallery = [...(project.gallery || [])]
    gallery.push({ type, url, caption: '' })
    updateField('gallery', gallery)
  }

  function handleUpdateGalleryCaption(index: number, caption: string) {
    if (!project) return
    const gallery = [...(project.gallery || [])]
    gallery[index] = { ...gallery[index], caption }
    updateField('gallery', gallery)
  }

  if (loading || !project) {
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
            <h1 className="text-sm font-medium truncate max-w-[200px]">
              {project.title}
            </h1>
          </div>
          <div className="flex items-center gap-3">
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
        {/* Thumbnail */}
        <section>
          <label className="block text-xs text-[#737373] mb-2">Thumbnail</label>
          <div className="relative group">
            {project.thumbnail ? (
              <div className="relative aspect-video rounded-lg overflow-hidden bg-white/5">
                <img
                  src={project.thumbnail}
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
                    onClick={() => updateField('thumbnail', '')}
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
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleUpload(file, 'thumbnail')
                e.target.value = ''
              }}
            />
          </div>
          <div className="mt-2">
            <input
              type="url"
              value={project.thumbnail}
              onChange={(e) => updateField('thumbnail', e.target.value)}
              placeholder="...o pega una URL"
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-xs
                         focus:outline-none focus:border-white/30 transition-colors text-[#737373]"
            />
          </div>
        </section>

        {/* Title & Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-[#737373] mb-1.5">Título</label>
            <input
              type="text"
              value={project.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm
                         focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-[#737373] mb-1.5">Slug (URL)</label>
            <input
              type="text"
              value={project.slug}
              onChange={(e) => updateField('slug', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm
                         focus:outline-none focus:border-white/30 transition-colors font-mono text-xs"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs text-[#737373] mb-1.5">Categoría</label>
          <input
            type="text"
            value={project.category}
            onChange={(e) => updateField('category', e.target.value)}
            placeholder="Ej: 2D/3D Motion Graphics, VJing, Videomapping..."
            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm
                       focus:outline-none focus:border-white/30 transition-colors"
          />
        </div>

        {/* Discipline, Place, Date */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-[#737373] mb-1.5">Disciplina</label>
            <input
              type="text"
              value={project.discipline || ''}
              onChange={(e) => updateField('discipline' as keyof typeof project, e.target.value)}
              placeholder="3D, VJ, Mapping, AI..."
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm
                         focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-[#737373] mb-1.5">Lugar</label>
            <input
              type="text"
              value={project.place || ''}
              onChange={(e) => updateField('place' as keyof typeof project, e.target.value)}
              placeholder="Barcelona, Buenos Aires..."
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm
                         focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-[#737373] mb-1.5">Fecha</label>
            <input
              type="text"
              value={project.date || ''}
              onChange={(e) => updateField('date' as keyof typeof project, e.target.value)}
              placeholder="2024, Jun 2023..."
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm
                         focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs text-[#737373] mb-1.5">Descripción</label>
          <textarea
            value={project.description}
            onChange={(e) => updateField('description', e.target.value)}
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm
                       focus:outline-none focus:border-white/30 transition-colors resize-y"
          />
        </div>

        {/* Video URL */}
        <div>
          <label className="block text-xs text-[#737373] mb-1.5">Video URL (embed Vimeo/YouTube)</label>
          <input
            type="url"
            value={project.videoUrl || ''}
            onChange={(e) => updateField('videoUrl', e.target.value || null)}
            placeholder="https://player.vimeo.com/video/..."
            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm
                       focus:outline-none focus:border-white/30 transition-colors"
          />
          {project.videoUrl && (
            <div className="mt-3 aspect-video rounded-lg overflow-hidden bg-white/5">
              <iframe
                src={project.videoUrl}
                className="w-full h-full"
                allow="autoplay; fullscreen"
                style={{ border: 'none' }}
              />
            </div>
          )}
        </div>

        {/* Featured toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => updateField('featured', !project.featured)}
            className={`relative w-10 h-5 rounded-full transition-colors ${
              project.featured ? 'bg-white' : 'bg-white/20'
            }`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${
                project.featured
                  ? 'left-5.5 bg-black translate-x-[2px]'
                  : 'left-0.5 bg-[#737373]'
              }`}
            />
          </button>
          <span className="text-sm">Mostrar en homepage (Featured)</span>
        </div>

        {/* Gallery */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs text-[#737373]">Gallery</label>
            <div className="flex gap-2">
              <button
                onClick={() => galleryInputRef.current?.click()}
                className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1 rounded transition-colors"
              >
                + Imagen
              </button>
              <button
                onClick={handleAddGalleryVideo}
                className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1 rounded transition-colors"
              >
                + Video
              </button>
            </div>
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleUpload(file, 'gallery')
                e.target.value = ''
              }}
            />
          </div>

          {project.gallery && project.gallery.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {project.gallery.map((item, index) => (
                <div key={index} className="group relative rounded-lg overflow-hidden bg-white/5">
                  {item.type === 'image' ? (
                    <div className="aspect-video">
                      <img src={item.url} alt="" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="aspect-video flex items-center justify-center">
                      <span className="text-xs text-[#737373]">
                        {item.type === 'vimeo' ? '▶ Vimeo' : '▶ YouTube'}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100
                                 flex items-center justify-center transition-opacity">
                    <button
                      onClick={() => handleRemoveGalleryItem(index)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Eliminar
                    </button>
                  </div>
                  <input
                    type="text"
                    value={item.caption || ''}
                    onChange={(e) => handleUpdateGalleryCaption(index, e.target.value)}
                    placeholder="Descripción..."
                    className="w-full bg-transparent border-t border-white/5 px-2 py-1 text-xs
                               focus:outline-none text-[#737373]"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border border-dashed border-white/10 rounded-lg">
              <p className="text-xs text-[#737373]">Sin elementos en la galería</p>
            </div>
          )}
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
