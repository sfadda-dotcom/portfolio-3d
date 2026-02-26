import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import { getAboutSettings } from '@/lib/projects'

export const revalidate = 60

export const metadata = {
  title: 'About Me',
  description: '2D/3D Motion Graphics Designer — Videomapping — VJing',
}

export default async function StudioPage() {
  const about = await getAboutSettings()

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 page-content pb-16 px-[var(--section-padding-x)]">
        <div className="max-w-5xl mx-auto">
          <header className="mb-24">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight">
              About Me
            </h1>
          </header>

          <ScrollReveal>
            <section className="mb-28">
              <span className="section-number">001</span>
              <p className="mt-4 text-2xl md:text-3xl font-extralight leading-relaxed text-white/90">
                {about.introParagraph1}
              </p>
              <p className="mt-8 text-base text-white/50 leading-relaxed max-w-3xl">
                {about.introParagraph2}
              </p>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="mb-28">
              <span className="section-number">002</span>
              <h2 className="mt-4 text-xs tracking-[0.15em] uppercase text-white/40 mb-10">
                Disciplines
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.08]">
                {about.disciplines.map((d) => (
                  <div key={d.name} className="bg-[#0a0a0a] p-6">
                    <h3 className="text-base font-light mb-3">{d.name}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{d.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="mb-28">
              <span className="section-number">003</span>
              <h2 className="mt-4 text-xs tracking-[0.15em] uppercase text-white/40 mb-8">
                Software
              </h2>
              <div className="flex flex-wrap gap-2">
                {about.software.map((tool) => (
                  <span
                    key={tool}
                    className="px-4 py-2 text-xs tracking-[0.1em] text-white/60 border border-white/[0.12]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </section>
          </ScrollReveal>

        </div>
      </div>

      <Footer />
    </main>
  )
}
