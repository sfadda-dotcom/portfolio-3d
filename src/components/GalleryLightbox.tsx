'use client'

import { useState, useCallback, useEffect } from 'react'
import type { GalleryItem } from '@/lib/projects'
import { seamlessEmbedUrl, interactiveEmbedUrl } from '@/lib/video-utils'

interface GalleryLightboxProps {
  items: GalleryItem[]
  projectTitle: string
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
      {/* Masonry gallery using CSS columns */}
      <div
        className="px-[var(--section-padding-x)]"
        style={{ columnCount: 2, columnGap: '12px' }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="cursor-pointer group relative overflow-hidden mb-3"
            style={{ breakInside: 'avoid' }}
            onClick={() => openLightbox(index)}
          >
            {item.type === 'image' ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={item.url}
                alt={item.caption || `${projectTitle} — ${index + 1}`}
                className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              /* Video embed — seamless autoplay muted loop, transparent bg */
              <div className="relative w-full overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={seamlessEmbedUrl(item.url)}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  allowFullScreen
                  style={{ border: 'none' }}
                />
              </div>
            )}

            {item.caption && (
              <p className="absolute bottom-0 left-0 right-0 px-3 py-2 text-[10px] text-white/50 bg-gradient-to-t from-black/60 to-transparent">
                {item.caption}
              </p>
            )}
          </div>
        ))}
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
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={currentItem.url}
                alt={currentItem.caption || projectTitle}
                className="max-w-[90vw] max-h-[85vh] object-contain"
              />
            ) : (
              <div style={{ width: '80vw', height: '80vh' }}>
                <iframe
                  src={interactiveEmbedUrl(currentItem.url)}
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  allowFullScreen
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
