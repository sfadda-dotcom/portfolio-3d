// Dati demo per testare il sito senza Notion
// Rimuovi questo file quando hai configurato Notion

import type { Project } from './notion'

export const demoProjects: Project[] = [
  {
    id: '1',
    slug: 'geometric-dreams',
    title: 'Geometric Dreams',
    category: 'Motion Design',
    description: 'Un viaggio visivo attraverso forme geometriche astratte e colori vivaci. Progetto personale che esplora il ritmo e il movimento.',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80',
    videoUrl: null,
    featured: true,
    order: 1,
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    slug: 'neon-city',
    title: 'Neon City',
    category: '3D Animation',
    description: 'Paesaggio urbano cyberpunk realizzato interamente in 3D. Atmosfere notturne, neon e architetture futuristiche.',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    videoUrl: null,
    featured: true,
    order: 2,
    createdAt: '2024-02-01',
  },
  {
    id: '3',
    slug: 'fluid-forms',
    title: 'Fluid Forms',
    category: 'Visual Effects',
    description: 'Simulazione di fluidi e particelle per un brand di cosmetica. Eleganza e fluidità in ogni frame.',
    thumbnail: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1200&q=80',
    videoUrl: null,
    featured: true,
    order: 3,
    createdAt: '2024-03-01',
  },
  {
    id: '4',
    slug: 'abstract-loops',
    title: 'Abstract Loops',
    category: 'Motion Design',
    description: 'Serie di loop infiniti per social media. Ipnotici, colorati, perfetti per catturare l\'attenzione.',
    thumbnail: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=1200&q=80',
    videoUrl: null,
    featured: false,
    order: 4,
    createdAt: '2024-04-01',
  },
]
