'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/lib/projects'

interface ProjectCardProps {
  project: Project
  index: number
  size?: 'large' | 'medium' | 'small'
}

export default function ProjectCard({ project, index, size = 'medium' }: ProjectCardProps) {
  const aspectClass = size === 'large'
    ? 'aspect-[16/10]'
    : size === 'small'
      ? 'aspect-square'
      : 'aspect-video'

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <Link href={`/progetti/${project.slug}`} className="block group">
        {/* Thumbnail */}
        <div className={`relative ${aspectClass} overflow-hidden bg-neutral-900 rounded-sm`}>
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-80"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />

          {/* Play icon if video */}
          {project.videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white ml-0.5"
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
        <div className="mt-3">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-base font-light tracking-tight group-hover:opacity-70 transition-opacity truncate">
              {project.title}
            </h3>
            {project.date && (
              <span className="text-xs text-white/30 shrink-0">{project.date}</span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            {project.discipline && (
              <span className="text-[10px] tracking-[0.15em] text-white/50 uppercase">
                {project.discipline}
              </span>
            )}
            {project.discipline && project.place && (
              <span className="text-white/20">·</span>
            )}
            {project.place && (
              <span className="text-[10px] tracking-[0.1em] text-white/35">
                {project.place}
              </span>
            )}
            {!project.discipline && !project.place && project.category && (
              <span className="text-[10px] tracking-[0.15em] text-white/50 uppercase">
                {project.category}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
