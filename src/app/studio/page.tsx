import Footer from '@/components/Footer'

export const metadata = {
  title: 'Studio | Portfolio',
  description: 'Chi sono e cosa faccio - Motion Designer 3D',
}

export default function StudioPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-24">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight">
            Studio
          </h1>
        </header>

        {/* Bio */}
        <section className="mb-24">
          <p className="text-2xl md:text-3xl font-light leading-relaxed text-white/90">
            Motion designer specializzato in animazione 3D, contenuti audiovisivi
            e esperienze digitali immersive.
          </p>
          <p className="mt-8 text-lg text-muted leading-relaxed">
            Con una passione per la fusione tra arte e tecnologia, creo contenuti
            visivi che comunicano, emozionano e lasciano il segno. Dall&apos;ideazione
            alla realizzazione, ogni progetto è un viaggio creativo unico.
          </p>
        </section>

        {/* Services */}
        <section className="mb-24">
          <h2 className="text-xs tracking-[0.3em] text-muted uppercase mb-8">
            Servizi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Motion Design',
                description: 'Animazioni 2D e 3D per brand, advertising e contenuti digitali.',
              },
              {
                title: '3D Animation',
                description: 'Modellazione, texturing e animazione di scene e personaggi.',
              },
              {
                title: 'Visual Effects',
                description: 'Compositing, color grading e post-produzione video.',
              },
              {
                title: 'Art Direction',
                description: 'Direzione artistica per progetti audiovisivi e campagne.',
              },
            ].map((service) => (
              <div key={service.title} className="border-l border-neutral-800 pl-6">
                <h3 className="text-xl font-light mb-2">{service.title}</h3>
                <p className="text-muted">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience / Clients */}
        <section className="mb-24">
          <h2 className="text-xs tracking-[0.3em] text-muted uppercase mb-8">
            Clienti & Collaborazioni
          </h2>
          <p className="text-muted">
            Brand, agenzie e studi con cui ho avuto il piacere di collaborare.
          </p>
          {/* Aggiungi loghi o nomi clienti qui */}
        </section>
      </div>

      <Footer />
    </main>
  )
}
