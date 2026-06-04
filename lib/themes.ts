export type OscillatorType = 'sine' | 'square' | 'sawtooth' | 'triangle'

export type SoundConfig = {
  freq: number
  type: OscillatorType
  duration: number
}

export type ThemeItem = {
  id: string
  emoji: string
  label: string
  color: string
  sound: SoundConfig
  audioUrl?: string   // real sound file URL (optional, falls back to oscillator)
  animation: 'bounce' | 'spin' | 'grow' | 'shake' | 'wiggle'
}

export type Slide = {
  id: string
  bg: string
  title: string
  scene: string // large emoji scene
  description: string
}

export type Theme = {
  id: string
  name: string
  emoji: string
  bg: string
  accent: string
  buttonBg: string
  items: ThemeItem[]
  slides: Slide[]
}

export const themes: Theme[] = [
  {
    id: 'animals',
    name: 'Animals',
    emoji: '🐄',
    bg: 'from-green-300 via-yellow-200 to-green-400',
    accent: 'text-green-700',
    buttonBg: 'bg-green-500',
    items: [
      {
        id: 'cow',
        emoji: '🐄',
        label: 'Cow',
        color: '#f0e6c8',
        sound: { freq: 220, type: 'sine', duration: 0.6 },
        audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Moo.ogg',
        animation: 'bounce',
      },
      {
        id: 'pig',
        emoji: '🐷',
        label: 'Pig',
        color: '#ffb3c6',
        sound: { freq: 330, type: 'sine', duration: 0.4 },
        audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Pig_oink.ogg',
        animation: 'wiggle',
      },
      {
        id: 'chicken',
        emoji: '🐔',
        label: 'Chicken',
        color: '#fff3b0',
        sound: { freq: 440, type: 'triangle', duration: 0.3 },
        audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/73/010_Cogburn_and_hens.ogg',
        animation: 'shake',
      },
      {
        id: 'horse',
        emoji: '🐴',
        label: 'Horse',
        color: '#d4a574',
        sound: { freq: 196, type: 'sine', duration: 0.7 },
        audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Horse_-_Jeremy_Weate.ogg',
        animation: 'bounce',
      },
      {
        id: 'sheep',
        emoji: '🐑',
        label: 'Sheep',
        color: '#e8e8e8',
        sound: { freq: 262, type: 'sine', duration: 0.5 },
        audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Sheep_bleating_converted.ogg',
        animation: 'grow',
      },
      {
        id: 'duck',
        emoji: '🦆',
        label: 'Duck',
        color: '#ffe066',
        sound: { freq: 370, type: 'triangle', duration: 0.35 },
        audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Limpkin_and_duck.ogg',
        animation: 'wiggle',
      },
      {
        id: 'dog',
        emoji: '🐶',
        label: 'Dog',
        color: '#c8a97e',
        sound: { freq: 294, type: 'sine', duration: 0.4 },
        audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Barking_of_a_dog.ogg',
        animation: 'bounce',
      },
      {
        id: 'cat',
        emoji: '🐱',
        label: 'Cat',
        color: '#f4b8d1',
        sound: { freq: 392, type: 'sine', duration: 0.45 },
        audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Cat_crying_-_purring.ogg',
        animation: 'spin',
      },
    ],
    slides: [
      {
        id: 'farm1',
        bg: 'from-sky-300 to-green-400',
        title: 'The Farm',
        scene: '🌾🐄🌾',
        description: 'A happy cow on the farm!',
      },
      {
        id: 'farm2',
        bg: 'from-yellow-300 to-orange-300',
        title: 'Sunny Day',
        scene: '☀️🐓🌻',
        description: 'The rooster greets the sun!',
      },
      {
        id: 'farm3',
        bg: 'from-pink-300 to-red-300',
        title: 'Pig Pen',
        scene: '🐷🌈🐷',
        description: 'Piggies love to play!',
      },
      {
        id: 'farm4',
        bg: 'from-green-400 to-emerald-500',
        title: 'Meadow',
        scene: '🐑🌿🌸',
        description: 'Fluffy sheep in the meadow!',
      },
    ],
  },
  {
    id: 'space',
    name: 'Space',
    emoji: '🚀',
    bg: 'from-indigo-900 via-purple-800 to-blue-900',
    accent: 'text-yellow-300',
    buttonBg: 'bg-indigo-600',
    items: [
      {
        id: 'rocket',
        emoji: '🚀',
        label: 'Rocket',
        color: '#4f46e5',
        sound: { freq: 880, type: 'sawtooth', duration: 0.5 },
        animation: 'grow',
      },
      {
        id: 'star',
        emoji: '⭐',
        label: 'Star',
        color: '#fbbf24',
        sound: { freq: 1046, type: 'sine', duration: 0.3 },
        animation: 'spin',
      },
      {
        id: 'moon',
        emoji: '🌙',
        label: 'Moon',
        color: '#c4b5fd',
        sound: { freq: 523, type: 'sine', duration: 0.6 },
        animation: 'bounce',
      },
      {
        id: 'planet',
        emoji: '🪐',
        label: 'Planet',
        color: '#7c3aed',
        sound: { freq: 349, type: 'sine', duration: 0.7 },
        animation: 'spin',
      },
      {
        id: 'alien',
        emoji: '👾',
        label: 'Alien',
        color: '#10b981',
        sound: { freq: 659, type: 'square', duration: 0.4 },
        animation: 'wiggle',
      },
      {
        id: 'ufo',
        emoji: '🛸',
        label: 'UFO',
        color: '#6ee7b7',
        sound: { freq: 784, type: 'triangle', duration: 0.45 },
        animation: 'shake',
      },
      {
        id: 'comet',
        emoji: '☄️',
        label: 'Comet',
        color: '#fcd34d',
        sound: { freq: 440, type: 'sawtooth', duration: 0.3 },
        animation: 'spin',
      },
      {
        id: 'astronaut',
        emoji: '👨‍🚀',
        label: 'Astronaut',
        color: '#93c5fd',
        sound: { freq: 587, type: 'sine', duration: 0.5 },
        animation: 'bounce',
      },
    ],
    slides: [
      {
        id: 'space1',
        bg: 'from-indigo-900 to-purple-900',
        title: 'Blast Off!',
        scene: '🚀✨🌟',
        description: '3... 2... 1... Blast off!',
      },
      {
        id: 'space2',
        bg: 'from-blue-900 to-indigo-800',
        title: 'The Moon',
        scene: '🌙⭐🌙',
        description: 'Twinkle twinkle little star!',
      },
      {
        id: 'space3',
        bg: 'from-purple-900 to-violet-800',
        title: 'Planets',
        scene: '🪐🌍🪐',
        description: 'So many planets to discover!',
      },
      {
        id: 'space4',
        bg: 'from-slate-900 to-blue-900',
        title: 'Alien Friends',
        scene: '👾🛸👾',
        description: 'Friendly aliens say hello!',
      },
    ],
  },
  {
    id: 'ocean',
    name: 'Ocean',
    emoji: '🐠',
    bg: 'from-cyan-400 via-blue-400 to-teal-500',
    accent: 'text-blue-900',
    buttonBg: 'bg-blue-500',
    items: [
      {
        id: 'fish',
        emoji: '🐠',
        label: 'Fish',
        color: '#f97316',
        sound: { freq: 523, type: 'sine', duration: 0.35 },
        animation: 'wiggle',
      },
      {
        id: 'whale',
        emoji: '🐳',
        label: 'Whale',
        color: '#0ea5e9',
        sound: { freq: 165, type: 'sine', duration: 0.9 },
        animation: 'bounce',
      },
      {
        id: 'octopus',
        emoji: '🐙',
        label: 'Octopus',
        color: '#ec4899',
        sound: { freq: 311, type: 'sine', duration: 0.5 },
        animation: 'shake',
      },
      {
        id: 'crab',
        emoji: '🦀',
        label: 'Crab',
        color: '#ef4444',
        sound: { freq: 415, type: 'triangle', duration: 0.4 },
        animation: 'wiggle',
      },
      {
        id: 'dolphin',
        emoji: '🐬',
        label: 'Dolphin',
        color: '#38bdf8',
        sound: { freq: 698, type: 'sine', duration: 0.4 },
        animation: 'bounce',
      },
      {
        id: 'turtle',
        emoji: '🐢',
        label: 'Turtle',
        color: '#22c55e',
        sound: { freq: 247, type: 'sine', duration: 0.6 },
        animation: 'spin',
      },
      {
        id: 'starfish',
        emoji: '⭐',
        label: 'Starfish',
        color: '#fbbf24',
        sound: { freq: 587, type: 'triangle', duration: 0.3 },
        animation: 'spin',
      },
      {
        id: 'shark',
        emoji: '🦈',
        label: 'Shark',
        color: '#94a3b8',
        sound: { freq: 185, type: 'sawtooth', duration: 0.5 },
        animation: 'grow',
      },
    ],
    slides: [
      {
        id: 'ocean1',
        bg: 'from-cyan-500 to-blue-600',
        title: 'Under the Sea',
        scene: '🐠🐡🐟',
        description: 'Colorful fish swim by!',
      },
      {
        id: 'ocean2',
        bg: 'from-blue-500 to-teal-600',
        title: 'Big Whale',
        scene: '🐳💧🐳',
        description: 'The whale splashes big waves!',
      },
      {
        id: 'ocean3',
        bg: 'from-teal-400 to-emerald-600',
        title: 'Coral Reef',
        scene: '🐙🦀🐚',
        description: 'Sneaky octopus hides!',
      },
      {
        id: 'ocean4',
        bg: 'from-sky-400 to-blue-500',
        title: 'Dolphin Play',
        scene: '🐬🌊🐬',
        description: 'Dolphins love to jump!',
      },
    ],
  },
  {
    id: 'fruits',
    name: 'Fruits',
    emoji: '🍓',
    bg: 'from-red-300 via-yellow-200 to-pink-300',
    accent: 'text-red-700',
    buttonBg: 'bg-red-500',
    items: [
      {
        id: 'strawberry',
        emoji: '🍓',
        label: 'Strawberry',
        color: '#ef4444',
        sound: { freq: 659, type: 'sine', duration: 0.3 },
        animation: 'bounce',
      },
      {
        id: 'banana',
        emoji: '🍌',
        label: 'Banana',
        color: '#fde047',
        sound: { freq: 523, type: 'sine', duration: 0.35 },
        animation: 'wiggle',
      },
      {
        id: 'watermelon',
        emoji: '🍉',
        label: 'Watermelon',
        color: '#86efac',
        sound: { freq: 349, type: 'sine', duration: 0.5 },
        animation: 'grow',
      },
      {
        id: 'orange',
        emoji: '🍊',
        label: 'Orange',
        color: '#fb923c',
        sound: { freq: 440, type: 'sine', duration: 0.35 },
        animation: 'bounce',
      },
      {
        id: 'grapes',
        emoji: '🍇',
        label: 'Grapes',
        color: '#a855f7',
        sound: { freq: 587, type: 'triangle', duration: 0.3 },
        animation: 'shake',
      },
      {
        id: 'pineapple',
        emoji: '🍍',
        label: 'Pineapple',
        color: '#fbbf24',
        sound: { freq: 392, type: 'triangle', duration: 0.4 },
        animation: 'spin',
      },
      {
        id: 'apple',
        emoji: '🍎',
        label: 'Apple',
        color: '#f87171',
        sound: { freq: 494, type: 'sine', duration: 0.35 },
        animation: 'bounce',
      },
      {
        id: 'cherry',
        emoji: '🍒',
        label: 'Cherry',
        color: '#dc2626',
        sound: { freq: 784, type: 'sine', duration: 0.25 },
        animation: 'wiggle',
      },
    ],
    slides: [
      {
        id: 'fruit1',
        bg: 'from-red-300 to-pink-400',
        title: 'Yummy Berries',
        scene: '🍓🫐🍒',
        description: 'So sweet and yummy!',
      },
      {
        id: 'fruit2',
        bg: 'from-yellow-300 to-orange-400',
        title: 'Tropical Fun',
        scene: '🍌🍍🥭',
        description: 'Tropical fruits are the best!',
      },
      {
        id: 'fruit3',
        bg: 'from-green-300 to-teal-400',
        title: 'Watermelon Day',
        scene: '🍉🍈🍏',
        description: 'Cool and refreshing!',
      },
      {
        id: 'fruit4',
        bg: 'from-purple-300 to-violet-400',
        title: 'Fruit Salad',
        scene: '🍇🍑🍊',
        description: 'Mix them all together!',
      },
    ],
  },
]
