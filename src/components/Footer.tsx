import Link from 'next/link'

const socialLinks = [
  { label: 'Instagram', href: '#' },
  { label: 'Vimeo', href: '#' },
  { label: 'LinkedIn', href: '#' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-neutral-800 py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Copyright */}
          <div className="text-sm text-muted">
            © {currentYear} Portfolio. Tutti i diritti riservati.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <a
            href="mailto:info@example.com"
            className="text-sm text-muted hover:text-white transition-colors"
          >
            info@example.com
          </a>
        </div>
      </div>
    </footer>
  )
}
