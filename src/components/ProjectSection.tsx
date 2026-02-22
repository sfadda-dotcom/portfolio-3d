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
  const isInView = useInView(ref, { once: true, margin: '-20%' })
  const formatNumber = (n: number) => String(n).padStart(3, '0')
  const isEven = index % 2 === 0

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 px-[var(--section-padding-x)]"
    >
      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center ${
          isEven ? '' : 'direction-rtl'
        }`}>
          {/* Image — 7 columns */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`${isEven ? 'md:col-span-7' : 'md:col-span-7 md:col-start-6'} [direction:ltr]`}
          >
            <Link href={`/progetti/${project.slug}`} className="block group">
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
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
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={index < 2}
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              </div>
            </Link>
          </motion.div>

          {/* Text — 5 columns */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={`${isEven ? 'md:col-span-5' : 'md:col-span-5 md:col-start-1 md:row-start-1'} [direction:ltr]`}
          >
            {/* Number & Category */}
            <div className="flex items-center gap-4 mb-4">
              <span className="section-number">{formatNumber(index + 1)}</span>
              <span className="text-xs tracking-[0.15em] text-white/40 uppercase">
                {project.category}
              </span>
            </div>

            {/* Title */}
            <Link href={`/progetti/${project.slug}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-tight hover:opacity-70 transition-opacity">
                {project.title}
              </h2>
            </Link>

            {/* Description */}
            {project.description && (
              <p className="mt-5 text-white/50 text-sm leading-relaxed line-clamp-3">
                {project.description}
              </p>
            )}

            {/* CTA */}
            <Link
              href={`/progetti/${project.slug}`}
              className="inline-flex items-center gap-2 mt-6 text-xs tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors"
            >
              View project
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
