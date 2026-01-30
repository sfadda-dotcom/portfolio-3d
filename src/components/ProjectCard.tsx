'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/lib/notion'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={`/progetti/${project.slug}`} className="block group">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-neutral-900">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-80"
          />

          {/* Play icon if video */}
          {project.videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-4">
          <span className="text-xs tracking-[0.2em] text-muted uppercase">
            {project.category}
          </span>
          <h3 className="mt-2 text-xl font-light tracking-tight group-hover:opacity-70 transition-opacity">
            {project.title}
          </h3>
        </div>
      </Link>
    </motion.article>
  )
}
