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
    <section className="section-fullscreen relative flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {videoUrl ? (
          <iframe
            src={`${videoUrl}?background=1&autoplay=1&loop=1&muted=1`}
            className="w-full h-full"
            allow="autoplay; fullscreen"
            style={{ border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
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
        {/* Overlay — always present when there's media */}
        {(videoUrl || image) && (
          <div className="absolute inset-0 bg-black/40" />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Scroll indicator */}
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-white/40 text-xs tracking-widest"
            >
              SCROLL
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
