'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface HeroProps {
  title: string
  subtitle?: string
  videoUrl?: string | null
  image?: string | null
  showScrollIndicator?: boolean
}

export default function Hero({ title, subtitle, videoUrl, image, showScrollIndicator = true }: HeroProps) {
  return (
    <section className="relative overflow-hidden" style={{ height: '100vh' }}>
      {/* Background — video / image / gradient fallback */}
      <div className="absolute inset-0 z-0">
        {videoUrl ? (
          <iframe
            src={`${videoUrl}?background=1&autoplay=1&loop=1&muted=1`}
            allow="autoplay"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              pointerEvents: 'none',
            }}
          />
        ) : image ? (
          <Image
            src={image}
            alt=""
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />
        )}
      </div>

      {/* Dark overlay */}
      {(videoUrl || image) && (
        <div className="absolute inset-0 bg-black/40 z-[1]" />
      )}

      {/* Content — centered text */}
      <div className="relative z-[2] flex flex-col items-center justify-center h-full text-center px-[var(--section-padding-x)]">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-tight max-w-6xl"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-xs md:text-sm tracking-[0.2em] uppercase text-white/50"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Scroll indicator */}
      {showScrollIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-white/30"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
