'use client'

import { useState, useCallback, useRef } from 'react'
import type { ThemeItem } from '@/lib/themes'
import { playSound } from '@/lib/sounds'
import ConfettiEffect from './ConfettiEffect'

interface BabyButtonProps {
  item: ThemeItem
  onTap: () => void
}

const ANIMATION_CLASS: Record<ThemeItem['animation'], string> = {
  bounce: 'animate-bounce-fun',
  spin: 'animate-spin-fun',
  grow: 'animate-grow-fun',
  shake: 'animate-shake-fun',
  wiggle: 'animate-wiggle-fun',
}

interface ConfettiInstance {
  id: number
  x: number
  y: number
}

let confettiCounter = 0

export default function BabyButton({ item, onTap }: BabyButtonProps) {
  const [animClass, setAnimClass] = useState('')
  const [confettis, setConfettis] = useState<ConfettiInstance[]>([])
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleTap = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      e.preventDefault()

      // Get tap position
      let clientX = 0
      let clientY = 0
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      } else if ('changedTouches' in e && (e as React.TouchEvent).changedTouches.length > 0) {
        clientX = (e as React.TouchEvent).changedTouches[0].clientX
        clientY = (e as React.TouchEvent).changedTouches[0].clientY
      } else {
        clientX = (e as React.MouseEvent).clientX
        clientY = (e as React.MouseEvent).clientY
      }

      // Play sound
      playSound(item.sound)

      // Trigger animation
      setAnimClass('')
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      // Force re-render to restart animation
      requestAnimationFrame(() => {
        setAnimClass(ANIMATION_CLASS[item.animation])
        timeoutRef.current = setTimeout(() => setAnimClass(''), 700)
      })

      // Spawn confetti
      const id = ++confettiCounter
      setConfettis((prev) => [...prev, { id, x: clientX, y: clientY }])

      // Notify parent
      onTap()
    },
    [item, onTap]
  )

  const removeConfetti = useCallback((id: number) => {
    setConfettis((prev) => prev.filter((c) => c.id !== id))
  }, [])

  return (
    <>
      <button
        onTouchStart={handleTap}
        onClick={handleTap}
        className={`
          relative flex flex-col items-center justify-center
          rounded-3xl shadow-lg border-4 border-white/60
          transition-transform duration-100 active:scale-90
          tap-feedback select-none
          ${animClass}
        `}
        style={{
          backgroundColor: item.color,
          minWidth: 120,
          minHeight: 120,
          width: '100%',
          aspectRatio: '1 / 1',
          cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
        }}
        aria-label={item.label}
      >
        <span
          className="leading-none select-none pointer-events-none"
          style={{ fontSize: 'clamp(3rem, 10vw, 5rem)' }}
        >
          {item.emoji}
        </span>
        <span
          className="mt-1 font-bold text-gray-700 text-center leading-tight pointer-events-none"
          style={{ fontSize: 'clamp(0.9rem, 3vw, 1.4rem)', fontFamily: "'Fredoka One', cursive" }}
        >
          {item.label}
        </span>
      </button>

      {confettis.map((c) => (
        <ConfettiEffect
          key={c.id}
          x={c.x}
          y={c.y}
          onDone={() => removeConfetti(c.id)}
        />
      ))}
    </>
  )
}
