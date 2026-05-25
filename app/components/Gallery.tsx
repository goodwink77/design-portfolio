'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { GalleryItem } from '@/lib/mdx'

interface GalleryProps {
  items: GalleryItem[]
}

export default function Gallery({ items }: GalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const close = useCallback(() => setOpenIndex(null), [])
  const next = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % items.length))
  }, [items.length])
  const prev = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length))
  }, [items.length])

  useEffect(() => {
    if (openIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [openIndex, close, next, prev])

  if (items.length === 0) return null

  const active = openIndex !== null ? items[openIndex] : null

  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 md:gap-3">
        {items.map((item, i) => (
          <div key={i} className="relative group">
            <button
              onClick={() => setOpenIndex(i)}
              className="relative block aspect-square w-full overflow-hidden bg-parchment focus:outline-none focus:ring-2 focus:ring-terracotta"
              aria-label={`Open ${item.title || `image ${i + 1}`} in gallery`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-75"
              />
            </button>
            {(item.title || item.description) && (
              <div
                role="tooltip"
                className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 max-w-[90vw] bg-ink text-cream px-3 py-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 z-20"
                style={{ boxShadow: '0 10px 25px -10px rgba(0,0,0,0.4)' }}
              >
                {item.title && (
                  <p className="text-[11px] font-sans font-700 uppercase tracking-[0.14em] mb-1">
                    {item.title}
                  </p>
                )}
                {item.description && (
                  <p className="text-[12px] font-light leading-snug text-cream/85">
                    {item.description}
                  </p>
                )}
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-ink"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {active && openIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
            style={{ backgroundColor: 'rgba(17, 17, 17, 0.9)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={active.title || 'Gallery image'}
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                close()
              }}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-10 text-cream/80 hover:text-cream text-[11px] font-sans font-700 uppercase tracking-[0.16em] px-3 py-1.5 border border-cream/40 hover:border-cream bg-ink/40 transition-colors"
              aria-label="Close"
            >
              Close
            </button>

            {items.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prev()
                  }}
                  className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 text-cream/80 hover:text-cream w-10 h-10 flex items-center justify-center border border-cream/30 hover:border-cream bg-ink/40 transition-colors"
                  aria-label="Previous image"
                >
                  <span aria-hidden="true">←</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    next()
                  }}
                  className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 text-cream/80 hover:text-cream w-10 h-10 flex items-center justify-center border border-cream/30 hover:border-cream bg-ink/40 transition-colors"
                  aria-label="Next image"
                >
                  <span aria-hidden="true">→</span>
                </button>
              </>
            )}

            <motion.div
              className="relative flex flex-col md:flex-row max-w-6xl w-full max-h-full bg-cream overflow-hidden"
              style={{ boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.5), 0 15px 30px -10px rgba(0, 0, 0, 0.35)' }}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1 min-h-0 max-h-[60vh] md:max-h-[80vh] flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={`img-${openIndex}`}
                    src={active.image}
                    alt={active.title}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  />
                </AnimatePresence>
              </div>
              <div className="relative md:w-80 md:shrink-0 p-6 md:p-8 flex flex-col justify-center overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`text-${openIndex}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="text-[10px] font-sans font-700 uppercase tracking-[0.2em] text-terracotta-dark mb-3">
                      {openIndex + 1} / {items.length}
                    </p>
                    {active.title && (
                      <h3 className="text-xl font-bold text-ink leading-tight mb-3">{active.title}</h3>
                    )}
                    {active.description && (
                      <p className="text-[14px] font-light text-ink/70 leading-relaxed">
                        {active.description}
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
