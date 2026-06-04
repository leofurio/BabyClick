import type { SoundConfig } from './themes'

let audioContext: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    }
    return audioContext
  } catch {
    return null
  }
}

// Cache loaded Audio objects to avoid re-fetching on every tap
const audioCache: Record<string, HTMLAudioElement> = {}

export function playAudioUrl(url: string): void {
  try {
    if (!audioCache[url]) {
      const audio = new Audio(url)
      audio.preload = 'auto'
      audioCache[url] = audio
    }
    const audio = audioCache[url]
    audio.currentTime = 0
    audio.volume = 1
    audio.play().catch(() => {
      // Autoplay blocked or network error — silently ignored
    })
  } catch {
    // Silently fail
  }
}

export function playSound(config: SoundConfig, audioUrl?: string): void {
  // If a real audio URL is provided, use it and skip oscillator
  if (audioUrl) {
    playAudioUrl(audioUrl)
    return
  }

  try {
    const ctx = getAudioContext()
    if (!ctx) return

    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.type = config.type
    oscillator.frequency.setValueAtTime(config.freq, ctx.currentTime)

    oscillator.frequency.exponentialRampToValueAtTime(
      config.freq * 1.05,
      ctx.currentTime + config.duration * 0.3
    )
    oscillator.frequency.exponentialRampToValueAtTime(
      config.freq * 0.95,
      ctx.currentTime + config.duration
    )

    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.03)
    gainNode.gain.setValueAtTime(0.35, ctx.currentTime + config.duration * 0.6)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + config.duration)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + config.duration)
  } catch {
    // Silently fail
  }
}

export function playMilestoneSound(): void {
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    if (ctx.state === 'suspended') ctx.resume()

    const notes = [523, 659, 784, 1047]
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15)

      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.15)
      gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + i * 0.15 + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.15 + 0.4)

      osc.start(ctx.currentTime + i * 0.15)
      osc.stop(ctx.currentTime + i * 0.15 + 0.4)
    })
  } catch {
    // Silently fail
  }
}
