'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/lib/projects'

interface ProjectSectionProps {
  project: Project
  index: number
}

export default function ProjectSection({ project, index }: ProjectSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const formatNumber = (n: number) => String(n).padStart(3, '0')

  return (
    <section ref={ref} className="py-8 md:py-12 px-[var(--section-padding-x)]">
      <Link href={`/progetti/${project.slug}`} className="block group">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Large image/video — near full viewport height */}
          <div className="relative w-full overflow-hidden bg-neutral-900" style={{ height: '70vh' }}>
            {project.videoUrl ? (
              <iframe
                src={`${project.videoUrl}?background=1&autoplay=1&loop=1&muted=1`}
                className="w-full h-full"
                allow="autoplay; fullscreen"
                style={{ border: 'none', pointerEvents: 'none' }}
              />
            ) : project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                priority={index < 2}
              />
            ) : (
              <div className="absolute inset-0 bg-neutral-800" />
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

            {/* Gradient at bottom for text readability */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Info overlay — bottom left */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex items-end justify-between">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="section-number text-white/50">{formatNumber(index + 1)}</span>
                  <span className="text-[10px] tracking-[0.15em] text-white/50 uppercase">
                    {project.category}
                  </span>
                </div>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-extralight tracking-tight text-white">
                  {project.title}
                </h2>
              </div>

              <span className="hidden md:inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-white/40 group-hover:text-white/80 transition-colors shrink-0 ml-8">
                View project
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </section>
  )
}
