'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import type { GalleryItem } from '@/lib/projects'

interface GalleryLightboxProps {
  items: GalleryItem[]
  projectTitle: string
}

// Alternating aspect ratios for a dynamic, random-looking layout (all col-span-1 to avoid gaps)
const aspectVariants = [
  'pb-[75%]',     // 4:3
  'pb-[100%]',    // square
  'pb-[60%]',     // wide
  'pb-[120%]',    // tall
  'pb-[56.25%]',  // 16:9
  'pb-[85%]',     // near-square
] as const

function isGif(url: string): boolean {
  return url.toLowerCase().endsWith('.gif')
}

export default function GalleryLightbox({ items, projectTitle }: GalleryLightboxProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % items.length : null))
  }, [items.length])

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + items.length) % items.length : null))
  }, [items.length])

  useEffect(() => {
    if (lightboxIndex === null) return

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [lightboxIndex, closeLightbox, goNext, goPrev])

  const currentItem = lightboxIndex !== null ? items[lightboxIndex] : null

  return (
    <>
      {/* Gallery grid with varying aspect ratios */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 px-[var(--section-padding-x)]">
        {items.map((item, index) => {
          const aspectClass = aspectVariants[index % aspectVariants.length]

          return (
            <div
              key={index}
              className="cursor-pointer group relative overflow-hidden bg-neutral-900"
              onClick={() => openLightbox(index)}
            >
              {item.type === 'image' ? (
                <div className={`relative w-full h-0 ${aspectClass}`}>
                  {isGif(item.url) ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={item.url}
                      alt={item.caption || `${projectTitle} — ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <Image
                      src={item.url}
                      alt={item.caption || `${projectTitle} — ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
              ) : (
                <div className="relative w-full h-0 pb-[56.25%]">
                  <iframe
                    src={
                      item.type === 'youtube'
                        ? item.url.replace('watch?v=', 'embed/')
                        : item.url
                    }
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    style={{ border: 'none' }}
                  />
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white/0 group-hover:text-white/80 transition-colors text-xs tracking-[0.15em] uppercase">
                  {item.type === 'image' ? '⤢' : '▶'}
                </span>
              </div>

              {item.caption && (
                <p className="absolute bottom-0 left-0 right-0 px-3 py-2 text-[10px] text-white/50 bg-gradient-to-t from-black/60 to-transparent">
                  {item.caption}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {/* Lightbox overlay */}
      {currentItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/50 hover:text-white text-2xl transition-colors z-10"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Navigation arrows */}
          {items.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev() }}
                className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white text-3xl transition-colors z-10"
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext() }}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white text-3xl transition-colors z-10"
                aria-label="Next"
              >
                ›
              </button>
            </>
          )}

          {/* Content */}
          <div
            className="max-w-[90vw] max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {currentItem.type === 'image' ? (
              isGif(currentItem.url) ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={currentItem.url}
                  alt={currentItem.caption || projectTitle}
                  className="max-w-[90vw] max-h-[85vh] object-contain"
                />
              ) : (
                <div className="relative" style={{ width: '80vw', height: '80vh' }}>
                  <Image
                    src={currentItem.url}
                    alt={currentItem.caption || projectTitle}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              )
            ) : (
              <div style={{ width: '80vw', height: '80vh' }}>
                <iframe
                  src={
                    currentItem.type === 'youtube'
                      ? currentItem.url.replace('watch?v=', 'embed/')
                      : currentItem.url
                  }
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  style={{ border: 'none' }}
                />
              </div>
            )}

            {/* Caption */}
            {currentItem.caption && (
              <p className="text-center text-xs text-white/50 mt-4">
                {currentItem.caption}
              </p>
            )}

            {/* Counter */}
            <p className="text-center text-[10px] text-white/30 mt-2">
              {lightboxIndex + 1} / {items.length}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
