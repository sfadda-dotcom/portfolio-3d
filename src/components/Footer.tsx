const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/unamleunam' },
  { label: 'Vimeo', href: 'https://vimeo.com/unamleunam' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/manuelguillin' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Copyright */}
          <div className="text-sm text-white/30">
            © {currentYear} Manuel Guillin. Todos los derechos reservados.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/30 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact + Credit */}
          <div className="flex items-center gap-6">
            <a
              href="mailto:meguillin@gmail.com"
              className="text-sm text-white/30 hover:text-white transition-colors"
            >
              meguillin@gmail.com
            </a>
            <span className="text-white/10">|</span>
            <a
              href="https://workless.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/20 hover:text-white/50 transition-colors"
            >
              workless.studio
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
