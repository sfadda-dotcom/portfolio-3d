import type { Metadata } from 'next'
import './globals.css'
import NavigationWrapper from '@/components/NavigationWrapper'

export const metadata: Metadata = {
  title: 'MANUEL GUILLIN',
  description: 'Portfolio de motion design 3D, animación y contenido audiovisual',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        <NavigationWrapper />
        {children}
      </body>
    </html>
  )
}
