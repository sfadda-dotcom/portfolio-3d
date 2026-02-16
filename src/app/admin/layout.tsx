import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin | Portfolio',
  robots: 'noindex, nofollow',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#111] text-white">
      {children}
    </div>
  )
}
