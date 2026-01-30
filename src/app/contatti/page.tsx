import Footer from '@/components/Footer'

export const metadata = {
  title: 'Contacto | Manuel Guillin',
  description: 'Contacto para colaboraciones y proyectos',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-24">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight">
            Contacto
          </h1>
          <p className="mt-8 text-xl text-white/60 max-w-2xl">
            ¿Tenés un proyecto en mente? Hablemos.
          </p>
        </header>

        {/* Contact Info */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Email */}
            <div>
              <h2 className="text-xs tracking-[0.3em] text-white/60 uppercase mb-4">
                Email
              </h2>
              <a
                href="mailto:meguillin@gmail.com"
                className="text-2xl font-light hover:opacity-70 transition-opacity"
              >
                meguillin@gmail.com
              </a>
            </div>

            {/* Social */}
            <div>
              <h2 className="text-xs tracking-[0.3em] text-white/60 uppercase mb-4">
                Social
              </h2>
              <div className="flex flex-col gap-3">
                <a
                  href="https://instagram.com/unamleunam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg hover:opacity-70 transition-opacity flex items-center gap-2"
                >
                  <span>Instagram</span>
                  <span className="text-white/40">@unamleunam</span>
                </a>
                <a
                  href="https://vimeo.com/unamleunam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg hover:opacity-70 transition-opacity"
                >
                  Vimeo
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Reels */}
        <section className="mb-24">
          <h2 className="text-xs tracking-[0.3em] text-white/60 uppercase mb-8">
            Reels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="aspect-video bg-neutral-900 rounded-lg overflow-hidden">
                <iframe
                  src="https://player.vimeo.com/video/535480724"
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  style={{ border: 'none' }}
                />
              </div>
              <p className="mt-3 text-sm text-white/60">2D Reel</p>
            </div>
            <div>
              <div className="aspect-video bg-neutral-900 rounded-lg overflow-hidden">
                <iframe
                  src="https://player.vimeo.com/video/298254408"
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  style={{ border: 'none' }}
                />
              </div>
              <p className="mt-3 text-sm text-white/60">3D Reel</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 border-t border-neutral-800">
          <p className="text-3xl md:text-4xl font-light leading-relaxed">
            ¿Listo para crear algo extraordinario juntos?
          </p>
          <a
            href="mailto:meguillin@gmail.com?subject=Nuevo proyecto"
            className="inline-block mt-8 px-8 py-4 bg-white text-black text-sm tracking-wide hover:bg-white/90 transition-colors"
          >
            Empecemos
          </a>
        </section>
      </div>

      <Footer />
    </main>
  )
}
