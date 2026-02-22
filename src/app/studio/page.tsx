import Footer from '@/components/Footer'

export const metadata = {
  title: 'Studio | Manuel Guillin',
  description: '2D/3D Motion Graphics Designer · Videomapping · VJing',
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
  { company: 'Legion Creativa', role: 'Motion Designer', period: '2017 - Presente' },
  { company: 'Freelance', role: '2D/3D Motion Graphics', period: '2014 - Presente' },
  { company: 'BNN Costanera', role: 'VJ Residente', period: '2017 - 2020' },
  { company: 'Gino Club', role: 'VJ Residente', period: '2015 - 2017' },
  { company: 'Rabbit', role: 'VJ Residente', period: '2013 - 2015' },
]

const studies = [
  { title: 'Animación 3D FX', institution: 'Image Campus' },
  { title: 'Artes Electrónicas', institution: 'UNTREF' },
  { title: 'Diseño Gráfico', institution: 'UBA' },
]

export default function StudioPage() {
  return (
    <main className="min-h-screen pt-40 md:pt-48 pb-16 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-24">
          <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-4">
            Studio
          </p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight">
            Manuel Guillin
          </h1>
          <p className="mt-4 text-lg text-white/50">
            2D/3D Motion Graphics Designer · Videomapping · VJing
          </p>
        </header>

        {/* Bio */}
        <section className="mb-24">
          <p className="text-2xl md:text-3xl font-light leading-relaxed text-white/90">
            Toda nuestra vida es movimiento. Ni la sociedad, ni la naturaleza se
            quedan paradas en ningún momento. Todo se mueve y este movimiento tiene un fin.
          </p>
          <p className="mt-8 text-lg text-white/60 leading-relaxed">
            Bajo las tres dimensiones que rigen el mundo físico, manipulamos la cuarta
            intangible, el tiempo. Creando así la ilusión de movimiento.
          </p>
        </section>

        {/* Services / Disciplines */}
        <section className="mb-24">
          <h2 className="text-xs tracking-[0.3em] text-white/60 uppercase mb-8">
            Disciplinas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-l border-neutral-800 pl-6">
              <h3 className="text-xl font-light mb-2">2D/3D Motion Graphics</h3>
              <p className="text-white/60">
                Colores, formas, texturas, sentimientos, son cruciales para la comunicación.
              </p>
            </div>
            <div className="border-l border-neutral-800 pl-6">
              <h3 className="text-xl font-light mb-2">Videomapping</h3>
              <p className="text-white/60">
                Todo lugar tiene una historia, todo es un lienzo a completar.
              </p>
            </div>
            <div className="border-l border-neutral-800 pl-6">
              <h3 className="text-xl font-light mb-2">VJing</h3>
              <p className="text-white/60">
                Escuchando la luz. El arte de intensificar sensaciones brindadas por la música.
              </p>
            </div>
          </div>
        </section>

        {/* Software */}
        <section className="mb-24">
          <h2 className="text-xs tracking-[0.3em] text-white/60 uppercase mb-8">
            Software
          </h2>
          <div className="flex flex-wrap gap-3">
            {software.map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 bg-neutral-900 text-white/80 text-sm rounded-full"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-24">
          <h2 className="text-xs tracking-[0.3em] text-white/60 uppercase mb-8">
            Experiencia
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={`${exp.company}-${exp.period}`} className="flex justify-between items-baseline border-b border-neutral-800 pb-4">
                <div>
                  <h3 className="text-lg font-light">{exp.company}</h3>
                  <p className="text-sm text-white/60">{exp.role}</p>
                </div>
                <span className="text-sm text-white/40">{exp.period}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Studies */}
        <section className="mb-24">
          <h2 className="text-xs tracking-[0.3em] text-white/60 uppercase mb-8">
            Estudios
          </h2>
          <div className="space-y-4">
            {studies.map((study) => (
              <div key={study.title} className="flex justify-between items-baseline">
                <h3 className="text-lg font-light">{study.title}</h3>
                <span className="text-sm text-white/60">{study.institution}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
