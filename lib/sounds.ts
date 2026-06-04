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

export function playSound(config: SoundConfig): void {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    // Resume context if suspended (required after user gesture on some browsers)
    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.type = config.type
    oscillator.frequency.setValueAtTime(config.freq, ctx.currentTime)

    // Add a slight frequency sweep for character
    oscillator.frequency.exponentialRampToValueAtTime(
      config.freq * 1.05,
      ctx.currentTime + config.duration * 0.3
    )
    oscillator.frequency.exponentialRampToValueAtTime(
      config.freq * 0.95,
      ctx.currentTime + config.duration
    )

    // Envelope: attack → sustain → release
    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.03)
    gainNode.gain.setValueAtTime(0.35, ctx.currentTime + config.duration * 0.6)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + config.duration)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + config.duration)
  } catch {
    // Silently fail — audio not critical
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
