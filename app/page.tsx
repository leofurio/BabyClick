'use client'

import { useState, useCallback } from 'react'
import ThemeSelector from '@/components/ThemeSelector'
import GameBoard from '@/components/GameBoard'
import { themes } from '@/lib/themes'

export default function Home() {
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null)

  const selectedTheme = selectedThemeId
    ? themes.find((t) => t.id === selectedThemeId) ?? null
    : null

  const handleSelectTheme = useCallback((id: string) => {
    setSelectedThemeId(id)
  }, [])

  const handleBack = useCallback(() => {
    setSelectedThemeId(null)
  }, [])

  if (selectedTheme) {
    return <GameBoard theme={selectedTheme} onBack={handleBack} />
  }

  return <ThemeSelector themes={themes} onSelect={handleSelectTheme} />
}
