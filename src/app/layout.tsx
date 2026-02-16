import type { Metadata } from 'next'
import './globals.css'
import NavigationWrapper from '@/components/NavigationWrapper'

export const metadata: Metadata = {
  title: 'Portfolio | Motion Designer 3D',
  description: 'Portfolio di motion design 3D, animazione e contenuti audiovisivi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className="antialiased">
        <NavigationWrapper />
        {children}
      </body>
    </html>
  )
}
