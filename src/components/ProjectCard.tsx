'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/lib/projects'

interface ProjectCardProps {
  project: Project
  index: number
  aspect?: 'portrait' | 'landscape' | 'square'
}

const aspectClasses = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[16/10]',
  square: 'aspect-square',
}

export default function ProjectCard({ project, index, aspect = 'landscape' }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
    >
      <Link href={`/progetti/${project.slug}`} className="block group">
        {/* Thumbnail */}
        <div className={`relative ${aspectClasses[aspect]} overflow-hidden bg-neutral-900`}>
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
        </div>

        {/* Info */}
        <div className="mt-3">
          <h3 className="text-sm font-light tracking-wide group-hover:opacity-70 transition-opacity">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            {project.date && (
              <span className="text-[10px] tracking-[0.1em] text-white/35">
                {project.date}
              </span>
            )}
            {project.date && project.place && (
              <span className="text-white/15">·</span>
            )}
            {project.place && (
              <span className="text-[10px] tracking-[0.1em] text-white/35">
                {project.place}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
