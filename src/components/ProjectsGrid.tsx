'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/lib/projects'

interface ProjectsGridProps {
  projects: Project[]
  categories: string[]
}

const aspectPattern: Array<'portrait' | 'landscape' | 'square'> = [
  'landscape', 'portrait', 'square', 'landscape', 'portrait', 'landscape', 'square', 'portrait',
]

const aspectClasses = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[16/10]',
  square: 'aspect-square',
}

function getAspect(index: number): 'portrait' | 'landscape' | 'square' {
  return aspectPattern[index % aspectPattern.length]
}

export default function ProjectsGrid({ projects, categories }: ProjectsGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (!activeCategory) return projects
    return projects.filter((p) => p.category === activeCategory)
  }, [projects, activeCategory])

  return (
    <div>
      {/* Filters — always visible, multi-column like onionlab */}
      {categories.length > 0 && (
        <div className="mb-12 flex flex-wrap gap-x-6 gap-y-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`text-[11px] tracking-[0.1em] uppercase transition-colors flex items-center gap-1.5 ${
              !activeCategory ? 'text-white' : 'text-white/40 hover:text-white/70'
            }`}
          >
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${!activeCategory ? 'bg-white' : 'bg-white/20'}`} />
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[11px] tracking-[0.1em] uppercase transition-colors flex items-center gap-1.5 ${
                activeCategory === cat ? 'text-white' : 'text-white/40 hover:text-white/70'
              }`}
            >
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${activeCategory === cat ? 'bg-white' : 'bg-white/20'}`} />
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Masonry grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory || 'all'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="masonry-grid"
        >
          {filtered.map((project, index) => {
            const aspect = getAspect(index)
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link href={`/progetti/${project.slug}`} className="block group">
                  <div className={`relative ${aspectClasses[aspect]} overflow-hidden bg-neutral-900`}>
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Info overlay on image — bottom right, like onionlab */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 right-0 left-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <h3 className="text-sm font-light text-white text-right">
                        {project.title}
                      </h3>
                      <div className="flex items-center justify-end gap-2 mt-1">
                        {project.date && (
                          <span className="text-[10px] tracking-[0.1em] text-white/60">
                            {project.date}
                          </span>
                        )}
                        {project.date && project.place && (
                          <span className="text-white/30">,</span>
                        )}
                        {project.place && (
                          <span className="text-[10px] tracking-[0.1em] text-white/60 uppercase">
                            {project.place}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            )
          })}
        </motion.div>
      </AnimatePresence>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-24">
          <p className="text-white/40 text-sm mb-6">
            No projects in this category.
          </p>
          <button
            onClick={() => setActiveCategory(null)}
            className="text-[11px] tracking-[0.15em] uppercase text-white/50 hover:text-white border border-white/20 px-6 py-2 transition-colors"
          >
            Show all
          </button>
        </div>
      )}
    </div>
  )
}
