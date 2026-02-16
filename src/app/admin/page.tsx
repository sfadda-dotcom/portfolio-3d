'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Project } from '@/lib/projects'

export default function AdminDashboard() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dragIndex, setDragIndex] = useState<number | null>(null)

  const loadProjects = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/projects')
      if (res.ok) {
        setProjects(await res.json())
      }
    } catch (err) {
      console.error('Errore nel caricamento:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Eliminare "${title}"?`)) return
    setSaving(true)
    try {
      await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' })
      await loadProjects()
    } finally {
      setSaving(false)
    }
  }

  async function handleToggleFeatured(project: Project) {
    setSaving(true)
    try {
      await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: project.id, featured: !project.featured }),
      })
      await loadProjects()
    } finally {
      setSaving(false)
    }
  }

  async function handleNewProject() {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Nuovo progetto' }),
      })
      if (res.ok) {
        const project = await res.json()
        router.push(`/admin/progetti/${project.id}`)
      }
    } finally {
      setSaving(false)
    }
  }

  async function handleSeed() {
    setSaving(true)
    try {
      await fetch('/api/admin/seed', { method: 'POST' })
      await loadProjects()
    } finally {
      setSaving(false)
    }
  }

  // Drag & drop reorder
  function handleDragStart(index: number) {
    setDragIndex(index)
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault()
    if (dragIndex === null || dragIndex === index) return

    const reordered = [...projects]
    const [moved] = reordered.splice(dragIndex, 1)
    reordered.splice(index, 0, moved)
    setProjects(reordered)
    setDragIndex(index)
  }

  async function handleDragEnd() {
    setDragIndex(null)
    setSaving(true)
    try {
      await fetch('/api/admin/projects/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds: projects.map((p) => p.id) }),
      })
    } finally {
      setSaving(false)
    }
  }

  // Move up/down buttons for mobile
  async function handleMove(index: number, direction: 'up' | 'down') {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= projects.length) return

    const reordered = [...projects]
    const [moved] = reordered.splice(index, 1)
    reordered.splice(newIndex, 0, moved)
    setProjects(reordered)

    setSaving(true)
    try {
      await fetch('/api/admin/projects/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds: reordered.map((p) => p.id) }),
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#737373]">Caricamento...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#111]/95 backdrop-blur border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-medium">Portfolio Admin</h1>
            {saving && (
              <span className="text-xs text-[#737373] animate-pulse">Salvando...</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="text-xs text-[#737373] hover:text-white transition-colors"
            >
              Vedi sito →
            </a>
            <button
              onClick={handleLogout}
              className="text-xs text-[#737373] hover:text-red-400 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Actions */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-[#737373]">
            {projects.length} progett{projects.length === 1 ? 'o' : 'i'} · Trascina per riordinare
          </p>
          <div className="flex gap-2">
            {projects.length === 0 && (
              <button
                onClick={handleSeed}
                disabled={saving}
                className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded transition-colors"
              >
                Carica dati iniziali
              </button>
            )}
            <button
              onClick={handleNewProject}
              disabled={saving}
              className="text-sm bg-white text-black px-4 py-1.5 rounded font-medium
                         hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              + Nuovo progetto
            </button>
          </div>
        </div>

        {/* Project list */}
        <div className="space-y-2">
          {projects.map((project, index) => (
            <div
              key={project.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`group flex items-center gap-4 bg-white/[0.03] border border-white/5
                         rounded-lg p-3 cursor-grab active:cursor-grabbing transition-all
                         hover:bg-white/[0.06] hover:border-white/10
                         ${dragIndex === index ? 'opacity-50 scale-[0.98]' : ''}`}
            >
              {/* Drag handle + order */}
              <div className="flex items-center gap-2 text-[#737373] shrink-0">
                <span className="text-xs cursor-grab" title="Trascina per riordinare">⠿</span>
                <span className="text-xs w-5 text-center">{index + 1}</span>
              </div>

              {/* Thumbnail */}
              <div className="w-16 h-10 rounded overflow-hidden bg-white/5 shrink-0">
                {project.thumbnail ? (
                  <img
                    src={project.thumbnail}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-[#737373]">
                    —
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{project.title}</p>
                <p className="text-xs text-[#737373] truncate">{project.category || 'Senza categoria'}</p>
              </div>

              {/* Featured badge */}
              <button
                onClick={() => handleToggleFeatured(project)}
                title={project.featured ? 'Rimuovi da homepage' : 'Mostra in homepage'}
                className={`text-xs px-2 py-0.5 rounded shrink-0 transition-colors ${
                  project.featured
                    ? 'bg-white/10 text-white'
                    : 'bg-transparent text-[#737373] opacity-0 group-hover:opacity-100'
                }`}
              >
                {project.featured ? '★ Featured' : '☆ Featured'}
              </button>

              {/* Move buttons (visible on mobile, hidden on desktop) */}
              <div className="flex flex-col gap-0.5 md:hidden shrink-0">
                <button
                  onClick={() => handleMove(index, 'up')}
                  disabled={index === 0}
                  className="text-xs text-[#737373] hover:text-white disabled:opacity-20"
                >
                  ▲
                </button>
                <button
                  onClick={() => handleMove(index, 'down')}
                  disabled={index === projects.length - 1}
                  className="text-xs text-[#737373] hover:text-white disabled:opacity-20"
                >
                  ▼
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => router.push(`/admin/progetti/${project.id}`)}
                  className="text-xs text-[#737373] hover:text-white px-2 py-1 rounded hover:bg-white/10 transition-colors"
                >
                  Modifica
                </button>
                <button
                  onClick={() => handleDelete(project.id, project.title)}
                  className="text-xs text-[#737373] hover:text-red-400 px-2 py-1 rounded hover:bg-red-400/10 transition-colors"
                >
                  Elimina
                </button>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#737373]">Nessun progetto.</p>
            <p className="text-sm text-[#737373] mt-2">
              Crea un nuovo progetto o carica i dati iniziali.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
