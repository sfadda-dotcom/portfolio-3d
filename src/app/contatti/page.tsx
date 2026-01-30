import Footer from '@/components/Footer'

export const metadata = {
  title: 'Contatti | Portfolio',
  description: 'Contattami per collaborazioni e progetti',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-24">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight">
            Contatti
          </h1>
          <p className="mt-8 text-xl text-muted max-w-2xl">
            Hai un progetto in mente? Parliamone.
          </p>
        </header>

        {/* Contact Info */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Email */}
            <div>
              <h2 className="text-xs tracking-[0.3em] text-muted uppercase mb-4">
                Email
              </h2>
              <a
                href="mailto:info@example.com"
                className="text-2xl font-light hover:opacity-70 transition-opacity"
              >
                info@example.com
              </a>
            </div>

            {/* Social */}
            <div>
              <h2 className="text-xs tracking-[0.3em] text-muted uppercase mb-4">
                Social
              </h2>
              <div className="flex flex-col gap-2">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg hover:opacity-70 transition-opacity"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg hover:opacity-70 transition-opacity"
                >
                  Vimeo
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg hover:opacity-70 transition-opacity"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 border-t border-neutral-800">
          <p className="text-3xl md:text-4xl font-light leading-relaxed">
            Pronto a creare qualcosa di straordinario insieme?
          </p>
          <a
            href="mailto:info@example.com?subject=Nuovo progetto"
            className="inline-block mt-8 px-8 py-4 bg-white text-black text-sm tracking-wide hover:bg-white/90 transition-colors"
          >
            Iniziamo
          </a>
        </section>
      </div>

      <Footer />
    </main>
  )
}
