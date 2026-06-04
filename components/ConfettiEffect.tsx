'use client'

import { useEffect, useRef } from 'react'

interface ConfettiParticle {
  id: number
  x: number
  y: number
  tx: number
  ty: number
  color: string
  size: number
  shape: 'circle' | 'square' | 'star'
}

interface ConfettiEffectProps {
  x: number
  y: number
  onDone: () => void
}

const COLORS = [
  '#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3',
  '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43',
  '#10ac84', '#ee5a24',
]

const SHAPES: Array<'circle' | 'square' | 'star'> = ['circle', 'square', 'star']

export default function ConfettiEffect({ x, y, onDone }: ConfettiEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const particles: ConfettiParticle[] = Array.from({ length: 18 }, (_, i) => {
      const angle = (i / 18) * 2 * Math.PI + (Math.random() - 0.5) * 0.5
      const distance = 60 + Math.random() * 80
      return {
        id: i,
        x,
        y,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance - 20,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 8 + Math.floor(Math.random() * 10),
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      }
    })

    const container = containerRef.current
    if (!container) return

    particles.forEach((p) => {
      const el = document.createElement('div')
      el.style.cssText = `
        position: fixed;
        left: ${p.x}px;
        top: ${p.y}px;
        width: ${p.size}px;
        height: ${p.size}px;
        background: ${p.color};
        border-radius: ${p.shape === 'circle' ? '50%' : p.shape === 'square' ? '3px' : '0'};
        pointer-events: none;
        z-index: 9999;
        --tx: ${p.tx}px;
        --ty: ${p.ty}px;
        transform-origin: center center;
        clip-path: ${p.shape === 'star' ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' : 'none'};
      `
      el.className = 'animate-confetti-fly'
      container.appendChild(el)
    })

    const timer = setTimeout(() => {
      onDone()
    }, 850)

    return () => {
      clearTimeout(timer)
    }
  }, [x, y, onDone])

  return (
    <div
      ref={containerRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}
    />
  )
}
