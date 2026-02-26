import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: 'Contact',
  description: 'Get in touch for collaborations and projects',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 page-content pb-16 px-[var(--section-padding-x)]">
        <div className="max-w-6xl mx-auto">
          <header className="mb-20">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight">
              Contact
            </h1>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <ContactForm />
            </div>

            <div className="space-y-12">
              <div>
                <h3 className="text-xs tracking-[0.15em] uppercase text-white/35 mb-4">
                  Email
                </h3>
                <a
                  href="mailto:meguillin@gmail.com"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  meguillin@gmail.com
                </a>
              </div>

              <div>
                <h3 className="text-xs tracking-[0.15em] uppercase text-white/35 mb-4">
                  Social
                </h3>
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
                    href="https://www.linkedin.com/in/manuel-guillin-1726b1138/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-xs tracking-[0.15em] uppercase text-white/35 mb-4">
                  Based in
                </h3>
                <p className="text-sm text-white/70">
                  Barcelona, Spain
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
