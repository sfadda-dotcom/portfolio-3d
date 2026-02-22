'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Project, ProjectType } from '@/lib/projects'

const TABS: { key: ProjectType; label: string }[] = [
  { key: 'project', label: 'Proyectos' },
  { key: 'reel', label: 'Reel' },
  { key: 'rd', label: 'R&D' },
]

export default function AdminDashboard() {
  const router = useRouter()
  const [allProjects, setAllProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<ProjectType>('project')
  const [error, setError] = useState<string | null>(null)

  function showError(msg: string) {
    setError(msg)
    setTimeout(() => setError(null), 6000)
  }

  const loadProjects = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/projects')
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        showError(data.error || `Error al cargar proyectos (${res.status})`)
        return
      }
      setAllProjects(await res.json())
    } catch (err) {
      showError('Error de conexión al cargar proyectos')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  // Filter projects by active tab
  const projects = allProjects.filter((p) => (p.type || 'project') === activeTab)

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`¿Eliminar "${title}"?`)) return
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        showError(data.error || `Error al eliminar (${res.status})`)
        return
      }
      await loadProjects()
    } catch {
      showError('Error de conexión al eliminar')
    } finally {
      setSaving(false)
    }
  }

  async function handleToggleFeatured(project: Project) {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: project.id, featured: !project.featured }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        showError(data.error || `Error al actualizar (${res.status})`)
        return
      }
      await loadProjects()
    } catch {
      showError('Error de conexión al actualizar')
    } finally {
      setSaving(false)
    }
  }

  async function handleNewProject() {
    setSaving(true)
    try {
      const labels: Record<ProjectType, string> = {
        project: 'Nuevo proyecto',
        reel: 'Nuevo reel',
        rd: 'Nuevo test',
      }
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: labels[activeTab], type: activeTab }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        showError(data.error || `Error al crear proyecto (${res.status})`)
        return
      }
      const project = await res.json()
      router.push(`/admin/progetti/${project.id}`)
    } catch {
      showError('Error de conexión al crear proyecto')
    } finally {
      setSaving(false)
    }
  }

  async function handleSeed() {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/seed', { method: 'POST' })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        showError(data.error || `Error al cargar datos iniciales (${res.status})`)
        return
      }
      await loadProjects()
    } catch {
      showError('Error de conexión al cargar datos iniciales')
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

    const filteredIds = projects.map((p) => p.id)
    const reordered = [...allProjects]

    // Find the actual indices in allProjects
    const fromId = filteredIds[dragIndex]
    const toId = filteredIds[index]
    const fromIdx = reordered.findIndex((p) => p.id === fromId)
    const toIdx = reordered.findIndex((p) => p.id === toId)

    const [moved] = reordered.splice(fromIdx, 1)
    reordered.splice(toIdx, 0, moved)
    setAllProjects(reordered)
    setDragIndex(index)
  }

  async function handleDragEnd() {
    setDragIndex(null)
    setSaving(true)
    try {
      const orderedIds = projects.map((p) => p.id)
      const res = await fetch('/api/admin/projects/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        showError(data.error || `Error al reordenar (${res.status})`)
      }
    } catch {
      showError('Error de conexión al reordenar')
    } finally {
      setSaving(false)
    }
  }

  async function handleMove(index: number, direction: 'up' | 'down') {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= projects.length) return

    const filteredIds = projects.map((p) => p.id)
    const reordered = [...allProjects]

    const fromId = filteredIds[index]
    const toId = filteredIds[newIndex]
    const fromIdx = reordered.findIndex((p) => p.id === fromId)
    const toIdx = reordered.findIndex((p) => p.id === toId)

    const [moved] = reordered.splice(fromIdx, 1)
    reordered.splice(toIdx, 0, moved)
    setAllProjects(reordered)

    setSaving(true)
    try {
      const updatedFiltered = reordered.filter((p) => (p.type || 'project') === activeTab)
      const res = await fetch('/api/admin/projects/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds: updatedFiltered.map((p) => p.id) }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        showError(data.error || `Error al reordenar (${res.status})`)
      }
    } catch {
      showError('Error de conexión al reordenar')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#737373]">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Error toast */}
      {error && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4">
          <div className="bg-red-500/90 backdrop-blur text-white text-sm px-4 py-3 rounded-lg shadow-lg flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-3 text-white/70 hover:text-white text-lg leading-none">&times;</button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#111]/95 backdrop-blur border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-medium">Portfolio Admin</h1>
            {saving && (
              <span className="text-xs text-[#737373] animate-pulse">Guardando...</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="text-xs text-[#737373] hover:text-white transition-colors"
            >
              Ver sitio →
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
        {/* Landing Page editor link */}
        <button
          onClick={() => router.push('/admin/landing')}
          className="w-full mb-8 flex items-center justify-between p-4 rounded-lg
                     bg-white/[0.03] border border-white/5 hover:bg-white/[0.06]
                     hover:border-white/10 transition-all group"
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">🏠</span>
            <div className="text-left">
              <p className="text-sm font-medium">Landing Page</p>
              <p className="text-xs text-[#737373]">Hero, video de fondo, título y subtítulo</p>
            </div>
          </div>
          <span className="text-xs text-[#737373] group-hover:text-white transition-colors">
            Editar →
          </span>
        </button>

        {/* About Me editor link */}
        <button
          onClick={() => router.push('/admin/about')}
          className="w-full mb-8 flex items-center justify-between p-4 rounded-lg
                     bg-white/[0.03] border border-white/5 hover:bg-white/[0.06]
                     hover:border-white/10 transition-all group"
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">👤</span>
            <div className="text-left">
              <p className="text-sm font-medium">About Me</p>
              <p className="text-xs text-[#737373]">Bio, disciplinas, software, experiencia y estudios</p>
            </div>
          </div>
          <span className="text-xs text-[#737373] group-hover:text-white transition-colors">
            Editar →
          </span>
        </button>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-8 border-b border-white/5">
          {TABS.map((tab) => {
            const count = allProjects.filter((p) => (p.type || 'project') === tab.key).length
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2.5 text-sm transition-colors relative
                  ${activeTab === tab.key
                    ? 'text-white'
                    : 'text-[#737373] hover:text-white/70'
                  }`}
              >
                {tab.label}
                <span className="ml-1.5 text-xs text-[#737373]">{count}</span>
                {activeTab === tab.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-white" />
                )}
              </button>
            )
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[#737373]">
            {projects.length} elemento{projects.length !== 1 ? 's' : ''} · Arrastra para reordenar
          </p>
          <div className="flex gap-2">
            {allProjects.length === 0 && (
              <button
                onClick={handleSeed}
                disabled={saving}
                className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded transition-colors"
              >
                Cargar datos iniciales
              </button>
            )}
            <button
              onClick={handleNewProject}
              disabled={saving}
              className="text-sm bg-white text-black px-4 py-1.5 rounded font-medium
                         hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              + Nuevo
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
                <span className="text-xs cursor-grab" title="Arrastra para reordenar">⠿</span>
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
                <div className="flex items-center gap-2 text-xs text-[#737373] truncate">
                  {project.discipline && <span>{project.discipline}</span>}
                  {project.place && <span>· {project.place}</span>}
                  {project.date && <span>· {project.date}</span>}
                  {!project.discipline && !project.place && project.category && (
                    <span>{project.category}</span>
                  )}
                </div>
              </div>

              {/* Featured badge (only for projects) */}
              {activeTab === 'project' && (
                <button
                  onClick={() => handleToggleFeatured(project)}
                  title={project.featured ? 'Quitar de homepage' : 'Mostrar en homepage'}
                  className={`text-xs px-2 py-0.5 rounded shrink-0 transition-colors ${
                    project.featured
                      ? 'bg-white/10 text-white'
                      : 'bg-transparent text-[#737373] opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {project.featured ? '★ Featured' : '☆ Featured'}
                </button>
              )}

              {/* Move buttons (mobile) */}
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
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(project.id, project.title)}
                  className="text-xs text-[#737373] hover:text-red-400 px-2 py-1 rounded hover:bg-red-400/10 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#737373]">Sin elementos.</p>
            <p className="text-sm text-[#737373] mt-2">
              Crea uno nuevo o carga los datos iniciales.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
