'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import type { Theme } from '@/lib/themes'
import BabyButton from './BabyButton'
import Carousel from './Carousel'
import TapCounter from './TapCounter'
import { playMilestoneSound } from '@/lib/sounds'

interface GameBoardProps {
  theme: Theme
  onBack: () => void
}

const MILESTONES = [10, 50, 100]

export default function GameBoard({ theme, onBack }: GameBoardProps) {
  const [tapCount, setTapCount] = useState(0)
  const [milestone, setMilestone] = useState<number | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showCarousel, setShowCarousel] = useState(false)
  const prevCount = useRef(0)

  const handleTap = useCallback(() => {
    setTapCount((c) => c + 1)
  }, [])

  useEffect(() => {
    const newCount = tapCount
    const hit = MILESTONES.find(
      (m) => newCount >= m && prevCount.current < m
    )
    if (hit) {
      setMilestone(hit)
      playMilestoneSound()
    }
    prevCount.current = newCount
  }, [tapCount])

  const handleMilestoneDone = useCallback(() => {
    setMilestone(null)
  }, [])

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch {
      // Fullscreen not supported or denied — ignore
    }
  }, [])

  useEffect(() => {
    const handler = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  return (
    <div
      className={`min-h-screen w-full flex flex-col bg-gradient-to-br ${theme.bg} overflow-y-auto no-scrollbar`}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-3 py-3 flex-shrink-0">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-1 bg-white/30 backdrop-blur-sm rounded-full px-4 py-2 shadow border-2 border-white/50 active:scale-90 transition-transform"
          style={{ fontFamily: "'Fredoka One', cursive", fontSize: 'clamp(1rem, 3.5vw, 1.4rem)', color: 'white' }}
          aria-label="Back to theme selector"
        >
          ◀ Back
        </button>

        {/* Theme label */}
        <div
          className="flex items-center gap-2 font-bold text-white drop-shadow"
          style={{ fontFamily: "'Fredoka One', cursive", fontSize: 'clamp(1.2rem, 4vw, 1.8rem)' }}
        >
          <span>{theme.emoji}</span>
          <span>{theme.name}</span>
        </div>

        {/* Fullscreen button */}
        <button
          onClick={toggleFullscreen}
          className="flex items-center gap-1 bg-white/30 backdrop-blur-sm rounded-full px-4 py-2 shadow border-2 border-white/50 active:scale-90 transition-transform"
          style={{ fontSize: 'clamp(1rem, 3.5vw, 1.4rem)', color: 'white' }}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? '⛶' : '⛶'}
          <span
            className="ml-1"
            style={{ fontFamily: "'Fredoka One', cursive" }}
          >
            {isFullscreen ? 'Exit' : 'Full'}
          </span>
        </button>
      </div>

      {/* Counter */}
      <div className="flex justify-center px-3 mb-2 flex-shrink-0">
        <TapCounter
          count={tapCount}
          milestone={milestone}
          onMilestoneDone={handleMilestoneDone}
        />
      </div>

      {/* Tab bar: Buttons / Slides */}
      <div className="flex justify-center gap-3 px-3 mb-3 flex-shrink-0">
        <button
          onClick={() => setShowCarousel(false)}
          className={`px-6 py-2 rounded-full font-bold shadow border-2 transition-all active:scale-90 ${
            !showCarousel
              ? 'bg-white text-gray-700 border-white scale-105'
              : 'bg-white/30 text-white border-white/50'
          }`}
          style={{ fontFamily: "'Fredoka One', cursive", fontSize: 'clamp(1rem, 3.5vw, 1.3rem)' }}
        >
          🎮 Play
        </button>
        <button
          onClick={() => setShowCarousel(true)}
          className={`px-6 py-2 rounded-full font-bold shadow border-2 transition-all active:scale-90 ${
            showCarousel
              ? 'bg-white text-gray-700 border-white scale-105'
              : 'bg-white/30 text-white border-white/50'
          }`}
          style={{ fontFamily: "'Fredoka One', cursive", fontSize: 'clamp(1rem, 3.5vw, 1.3rem)' }}
        >
          📖 Stories
        </button>
      </div>

      {/* Main content area */}
      <div className="flex-1 px-3 pb-4">
        {showCarousel ? (
          <Carousel slides={theme.slides} />
        ) : (
          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            }}
          >
            {theme.items.map((item) => (
              <BabyButton key={item.id} item={item} onTap={handleTap} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
