'use client'

import { useEffect, useState, useRef } from 'react'

interface TapCounterProps {
  count: number
  milestone: number | null
  onMilestoneDone: () => void
}

const MILESTONES = [10, 50, 100]

const MILESTONE_MESSAGES: Record<number, string> = {
  10: '10 Taps! 🎉',
  50: '50 Taps! 🌟',
  100: '100 Taps! 🏆',
}

export default function TapCounter({ count, milestone, onMilestoneDone }: TapCounterProps) {
  const [animating, setAnimating] = useState(false)
  const prevCount = useRef(count)

  useEffect(() => {
    if (count !== prevCount.current) {
      prevCount.current = count
      setAnimating(true)
      const t = setTimeout(() => setAnimating(false), 400)
      return () => clearTimeout(t)
    }
  }, [count])

  useEffect(() => {
    if (milestone !== null) {
      const t = setTimeout(() => {
        onMilestoneDone()
      }, 1600)
      return () => clearTimeout(t)
    }
  }, [milestone, onMilestoneDone])

  const nextMilestone = MILESTONES.find((m) => m > count) ?? null

  return (
    <>
      {/* Counter pill */}
      <div className="flex items-center gap-2 bg-white/30 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border-2 border-white/50">
        <span className="text-2xl">⭐</span>
        <span
          className={`text-3xl font-bold text-white drop-shadow-md transition-transform ${
            animating ? 'animate-counter-pop' : ''
          }`}
          style={{ fontFamily: "'Fredoka One', cursive", minWidth: '2.5rem', textAlign: 'center' }}
        >
          {count}
        </span>
        {nextMilestone && (
          <span className="text-lg text-white/70 ml-1">
            / {nextMilestone}
          </span>
        )}
      </div>

      {/* Milestone overlay */}
      {milestone !== null && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          style={{ background: 'rgba(0,0,0,0.35)' }}
        >
          <div
            className="animate-milestone flex flex-col items-center gap-4 bg-white rounded-3xl shadow-2xl px-10 py-8"
          >
            <div className="text-8xl">{milestone === 10 ? '🎉' : milestone === 50 ? '🌟' : '🏆'}</div>
            <div
              className="text-5xl font-bold text-purple-600 text-center"
              style={{ fontFamily: "'Fredoka One', cursive" }}
            >
              {MILESTONE_MESSAGES[milestone]}
            </div>
            <div className="text-3xl text-gray-500">Amazing!</div>
          </div>
        </div>
      )}
    </>
  )
}
