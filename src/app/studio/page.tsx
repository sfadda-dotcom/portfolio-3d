import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata = {
  title: 'About Me',
  description: '2D/3D Motion Graphics Designer — Videomapping — VJing',
}

const software = [
  '3Ds Max',
  'Cinema 4D',
  'After Effects',
  'Premiere',
  'Houdini',
  'Resolume Arena',
  'Vvvv',
  'Touch Designer',
  'Mad Mapper',
]

const experience = [
  { company: 'Legion Creativa', role: 'Motion Designer', period: '2017 — Present' },
  { company: 'Freelance', role: '2D/3D Motion Graphics', period: '2014 — Present' },
  { company: 'BNN Costanera', role: 'VJ Residente', period: '2017 — 2020' },
  { company: 'Gino Club', role: 'VJ Residente', period: '2015 — 2017' },
  { company: 'Rabbit', role: 'VJ Residente', period: '2013 — 2015' },
]

const studies = [
  { title: 'Animación 3D FX', institution: 'Image Campus' },
  { title: 'Artes Electrónicas', institution: 'UNTREF' },
  { title: 'Diseño Gráfico', institution: 'UBA' },
]

const disciplines = [
  { name: '2D/3D Motion Graphics', desc: 'Colors, shapes, textures and feelings — essential for communication.' },
  { name: 'Videomapping', desc: 'Every place has a story, everything is a canvas to complete.' },
  { name: 'VJing', desc: 'Listening to light. The art of intensifying sensations through music.' },
]

export default function StudioPage() {
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
                Toda nuestra vida es movimiento. Ni la sociedad, ni la naturaleza se
                quedan paradas en ningún momento. Todo se mueve y este movimiento tiene un fin.
              </p>
              <p className="mt-8 text-base text-white/50 leading-relaxed max-w-3xl">
                Bajo las tres dimensiones que rigen el mundo físico, manipulamos la cuarta
                intangible, el tiempo. Creando así la ilusión de movimiento.
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
                {disciplines.map((d) => (
                  <div key={d.name} className="bg-[#0a0a0a] p-6">
                    <h3 className="text-base font-light mb-3">{d.name}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{d.desc}</p>
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
                {software.map((tool) => (
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

          <ScrollReveal>
            <section className="mb-28">
              <span className="section-number">004</span>
              <h2 className="mt-4 text-xs tracking-[0.15em] uppercase text-white/40 mb-8">
                Experience
              </h2>
              <div className="space-y-0">
                {experience.map((exp) => (
                  <div
                    key={`${exp.company}-${exp.period}`}
                    className="flex justify-between items-baseline border-b border-white/[0.08] py-5"
                  >
                    <div>
                      <h3 className="text-base font-light">{exp.company}</h3>
                      <p className="text-xs text-white/40 mt-1">{exp.role}</p>
                    </div>
                    <span className="text-xs text-white/30">{exp.period}</span>
                  </div>
                ))}
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="mb-28">
              <span className="section-number">005</span>
              <h2 className="mt-4 text-xs tracking-[0.15em] uppercase text-white/40 mb-8">
                Education
              </h2>
              <div className="space-y-0">
                {studies.map((study) => (
                  <div
                    key={study.title}
                    className="flex justify-between items-baseline border-b border-white/[0.08] py-5"
                  >
                    <h3 className="text-base font-light">{study.title}</h3>
                    <span className="text-xs text-white/40">{study.institution}</span>
                  </div>
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
