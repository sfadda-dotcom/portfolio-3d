'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/lib/notion'

interface ProjectSectionProps {
  project: Project
  index: number
}

export default function ProjectSection({ project, index }: ProjectSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20%' })

  const formatNumber = (n: number) => String(n).padStart(3, '0')

  return (
    <section
      ref={ref}
      className="section-fullscreen relative flex items-center overflow-hidden group"
    >
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        {project.videoUrl ? (
          <iframe
            src={`${project.videoUrl}?background=1&autoplay=1&loop=1&muted=1`}
            className="w-full h-full object-cover"
            allow="autoplay; fullscreen"
            style={{ border: 'none' }}
          />
        ) : (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority={index < 2}
          />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Number & Category */}
          <div className="flex items-center gap-6 mb-4">
            <span className="project-number">{formatNumber(index + 1)}</span>
            <span className="text-xs tracking-[0.3em] text-white/70 uppercase">
              {project.category}
            </span>
          </div>

          {/* Title */}
          <Link href={`/progetti/${project.slug}`}>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight hover:opacity-70 transition-opacity">
              {project.title}
            </h2>
          </Link>

          {/* Description */}
          {project.description && (
            <p className="mt-6 text-white/60 max-w-xl text-lg">
              {project.description}
            </p>
          )}

          {/* CTA */}
          <Link
            href={`/progetti/${project.slug}`}
            className="inline-flex items-center gap-2 mt-8 text-sm tracking-wide text-white/80 hover:text-white transition-colors group/link"
          >
            Scopri il progetto
            <span className="group-hover/link:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
