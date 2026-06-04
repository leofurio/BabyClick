import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ['Fredoka One', 'cursive'],
      },
      animation: {
        'bounce-fun': 'bounceFun 0.6s ease-in-out',
        'spin-fun': 'spinFun 0.6s ease-in-out',
        'grow-fun': 'growFun 0.5s ease-in-out',
        'shake-fun': 'shakeFun 0.5s ease-in-out',
        'wiggle-fun': 'wiggleFun 0.6s ease-in-out',
        'confetti-fly': 'confettiFly 0.8s ease-out forwards',
        'milestone': 'milestoneAnim 1.5s ease-in-out forwards',
        'star-burst': 'starBurst 0.6s ease-out forwards',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        bounceFun: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '30%': { transform: 'translateY(-30px) scale(1.15)' },
          '60%': { transform: 'translateY(-10px) scale(1.05)' },
        },
        spinFun: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.2)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        growFun: {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.4)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
        shakeFun: {
          '0%, 100%': { transform: 'translateX(0)' },
          '15%': { transform: 'translateX(-12px) rotate(-5deg)' },
          '30%': { transform: 'translateX(12px) rotate(5deg)' },
          '45%': { transform: 'translateX(-8px) rotate(-3deg)' },
          '60%': { transform: 'translateX(8px) rotate(3deg)' },
          '75%': { transform: 'translateX(-4px)' },
        },
        wiggleFun: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '20%': { transform: 'rotate(-15deg) scale(1.1)' },
          '40%': { transform: 'rotate(15deg) scale(1.15)' },
          '60%': { transform: 'rotate(-10deg) scale(1.1)' },
          '80%': { transform: 'rotate(10deg) scale(1.05)' },
        },
        confettiFly: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '1' },
          '100%': { transform: 'var(--tx, 60px) var(--ty, -80px) scale(0)', opacity: '0' },
        },
        milestoneAnim: {
          '0%': { transform: 'scale(0) rotate(-10deg)', opacity: '0' },
          '20%': { transform: 'scale(1.2) rotate(5deg)', opacity: '1' },
          '40%': { transform: 'scale(0.95) rotate(-2deg)', opacity: '1' },
          '60%': { transform: 'scale(1.05) rotate(1deg)', opacity: '1' },
          '80%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'scale(0.8)', opacity: '0' },
        },
        starBurst: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'scale(1.3) rotate(180deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(360deg)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
