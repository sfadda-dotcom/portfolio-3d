import Link from 'next/link'

const disciplines = [
  '2D/3D Motion Graphics',
  'Videomapping',
  'VJing',
  'Real-time Visuals',
  'Generative Art',
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.08] pt-16 pb-8 px-[var(--section-padding-x)]">
      <div className="max-w-7xl mx-auto">
        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-white/40 mb-6">
              Contact
            </h4>
            <a
              href="mailto:meguillin@gmail.com"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              meguillin@gmail.com
            </a>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-white/40 mb-6">
              Social
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://instagram.com/unamleunam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://vimeo.com/unamleunam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Vimeo
              </a>
              <a
                href="https://linkedin.com/in/manuelguillin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Disciplines */}
          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-white/40 mb-6">
              Disciplines
            </h4>
            <div className="flex flex-col gap-3">
              {disciplines.map((d) => (
                <span key={d} className="text-sm text-white/70">
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span className="text-xs text-white/25">
            &copy; {currentYear} Manuel Guillin
          </span>
          <a
            href="https://workless.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/20 hover:text-white/50 transition-colors"
          >
            Design by workless.studio
          </a>
        </div>
      </div>
    </footer>
  )
}
