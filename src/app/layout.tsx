import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavigationWrapper from '@/components/NavigationWrapper'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'MANUEL GUILLIN',
    template: '%s — Manuel Guillin',
  },
  description: 'Motion Graphics Designer — Videomapping — VJing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="antialiased">
        <NavigationWrapper />
        {children}
      </body>
    </html>
  )
}
