import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BabyClick 🎉',
  description: 'A fun interactive app for young children to tap, explore, and play!',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#ff6b9d',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap"
          rel="stylesheet"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="font-fredoka overflow-hidden" style={{ fontFamily: "'Fredoka One', cursive" }}>
        {children}
      </body>
    </html>
  )
}
