import Footer from '@/components/Footer'

export const metadata = {
  title: 'Contacto | Manuel Guillin',
  description: 'Contacto para colaboraciones y proyectos',
}

const socialLinks = [
  {
    label: 'Email',
    href: 'mailto:meguillin@gmail.com',
    detail: 'meguillin@gmail.com',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/unamleunam',
    detail: '@unamleunam',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    label: 'Vimeo',
    href: 'https://vimeo.com/unamleunam',
    detail: 'vimeo.com/unamleunam',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197a315.065 315.065 0 003.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.263-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.011.01z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/manuelguillin',
    detail: 'Manuel Guillin',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-40 md:pt-48 pb-16 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-24">
          <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-4">
            Contacto
          </p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight">
            Hablemos
          </h1>
          <p className="mt-4 text-lg text-white/50 max-w-2xl">
            ¿Tenés un proyecto en mente? Escribime.
          </p>
        </header>

        {/* Contact buttons */}
        <section className="mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="group flex items-center gap-5 p-6 rounded-xl bg-white/[0.03] border border-white/5
                           hover:bg-white/[0.08] hover:border-white/15 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center
                               text-white/60 group-hover:text-white group-hover:bg-white/20 transition-all duration-300">
                  {link.icon}
                </div>
                <div>
                  <span className="block text-sm font-medium group-hover:text-white transition-colors">
                    {link.label}
                  </span>
                  <span className="block text-xs text-white/40 mt-0.5">
                    {link.detail}
                  </span>
                </div>
                <svg className="w-4 h-4 ml-auto text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-white/5">
          <p className="text-3xl md:text-4xl font-light leading-relaxed">
            ¿Listo para crear algo extraordinario juntos?
          </p>
          <a
            href="mailto:meguillin@gmail.com?subject=Nuevo proyecto"
            className="inline-block mt-8 px-8 py-4 bg-white text-black text-sm tracking-wide
                       hover:bg-white/90 transition-colors rounded"
          >
            Empecemos
          </a>
        </section>
      </div>

      <div className="mt-24">
        <Footer />
      </div>
    </main>
  )
}
