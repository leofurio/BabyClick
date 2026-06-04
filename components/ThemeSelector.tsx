'use client'

import type { Theme } from '@/lib/themes'

interface ThemeSelectorProps {
  themes: Theme[]
  onSelect: (id: string) => void
}

export default function ThemeSelector({ themes, onSelect }: ThemeSelectorProps) {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8"
      style={{
        background: 'linear-gradient(135deg, #ff9a9e, #fad0c4, #ffecd2, #a1c4fd, #c2e9fb)',
        backgroundSize: '400% 400%',
        animation: 'rainbowPulse 8s ease infinite',
      }}
    >
      {/* Title */}
      <div className="mb-8 text-center">
        <h1
          className="font-bold text-white drop-shadow-lg leading-tight"
          style={{
            fontSize: 'clamp(2.5rem, 10vw, 4.5rem)',
            fontFamily: "'Fredoka One', cursive",
            textShadow: '3px 3px 0 rgba(0,0,0,0.15)',
          }}
        >
          🎉 BabyClick! 🎉
        </h1>
        <p
          className="text-white/90 mt-2 drop-shadow"
          style={{
            fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
            fontFamily: "'Fredoka One', cursive",
          }}
        >
          Pick a theme to play!
        </p>
      </div>

      {/* Theme cards grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onSelect(theme.id)}
            onTouchStart={() => onSelect(theme.id)}
            className={`
              flex flex-col items-center justify-center gap-3
              rounded-3xl shadow-xl border-4 border-white/70
              bg-gradient-to-br ${theme.bg}
              transition-transform duration-150 active:scale-90
              tap-feedback animate-pop-in
              p-5
            `}
            style={{
              minHeight: 140,
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation',
            }}
            aria-label={`${theme.name} theme`}
          >
            <span
              className="leading-none"
              style={{ fontSize: 'clamp(3rem, 12vw, 4.5rem)' }}
            >
              {theme.emoji}
            </span>
            <span
              className={`font-bold ${theme.accent} drop-shadow`}
              style={{
                fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
                fontFamily: "'Fredoka One', cursive",
              }}
            >
              {theme.name}
            </span>
          </button>
        ))}
      </div>

      {/* Decorative bouncing emojis */}
      <div className="mt-8 flex gap-4 text-4xl">
        {['🌈', '🎈', '🎊', '🌟', '🎠'].map((e, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              animation: `floatUp 2s ease-in-out ${i * 0.3}s infinite alternate`,
            }}
          >
            {e}
          </span>
        ))}
      </div>
    </div>
  )
}
