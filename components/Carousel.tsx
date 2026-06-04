'use client'

import { useState, useRef, useCallback } from 'react'
import type { Slide } from '@/lib/themes'

interface CarouselProps {
  slides: Slide[]
}

export default function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const isDragging = useRef(false)

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % slides.length) + slides.length) % slides.length)
    },
    [slides.length]
  )

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    isDragging.current = false
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const dx = e.touches[0].clientX - touchStartX.current
    const dy = e.touches[0].clientY - touchStartY.current
    // If horizontal swipe is dominant, mark as dragging
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
      isDragging.current = true
    }
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return
      const dx = e.changedTouches[0].clientX - touchStartX.current
      if (isDragging.current && Math.abs(dx) > 40) {
        if (dx < 0) {
          goTo(current + 1)
        } else {
          goTo(current - 1)
        }
      }
      touchStartX.current = null
      touchStartY.current = null
      isDragging.current = false
    },
    [current, goTo]
  )

  const slide = slides[current]

  return (
    <div className="w-full flex flex-col items-center gap-3">
      {/* Slide display */}
      <div
        className="w-full rounded-3xl overflow-hidden shadow-xl flex flex-col items-center justify-center relative select-none"
        style={{
          minHeight: 180,
          touchAction: 'pan-y',
          background: slide.animatedBg ?? `var(--slide-bg, #a1c4fd)`,
          backgroundSize: '400% 400%',
          animation: 'rainbowPulse 6s ease infinite',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Scene emojis */}
        <div
          className="text-center leading-tight py-4 px-2"
          style={{ fontSize: 'clamp(2.5rem, 12vw, 5rem)', letterSpacing: '0.05em' }}
        >
          {slide.scene}
        </div>

        {/* Title */}
        <div
          className="pb-4 font-bold text-white drop-shadow-lg text-center"
          style={{ fontSize: 'clamp(1.4rem, 5vw, 2rem)', fontFamily: "'Fredoka One', cursive" }}
        >
          {slide.title}
        </div>

        {/* Caption */}
        <div
          className="pb-3 text-white/80 text-center px-4"
          style={{ fontSize: 'clamp(1rem, 3.5vw, 1.4rem)', fontFamily: "'Fredoka One', cursive" }}
        >
          {slide.description}
        </div>

        {/* Swipe hint arrows */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-white/50 text-3xl pointer-events-none">
          ‹
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 text-3xl pointer-events-none">
          ›
        </div>
      </div>

      {/* Dot indicators + nav buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => goTo(current - 1)}
          className="w-10 h-10 rounded-full bg-white/40 text-white text-xl flex items-center justify-center shadow active:scale-90 transition-transform"
          aria-label="Previous slide"
        >
          ‹
        </button>

        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 shadow ${
              i === current
                ? 'w-5 h-5 bg-white'
                : 'w-3 h-3 bg-white/50'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}

        <button
          onClick={() => goTo(current + 1)}
          className="w-10 h-10 rounded-full bg-white/40 text-white text-xl flex items-center justify-center shadow active:scale-90 transition-transform"
          aria-label="Next slide"
        >
          ›
        </button>
      </div>
    </div>
  )
}
