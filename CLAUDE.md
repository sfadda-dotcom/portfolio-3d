# Portfolio 3D - Motion Designer

## Panoramica

Portfolio web per motion designer 3D. Stack: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion. I contenuti (progetti) vengono da Notion tramite API.

## Architettura

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home: hero + progetti featured (fullscreen scroll)
│   ├── progetti/
│   │   ├── page.tsx       # Griglia tutti i progetti
│   │   └── [slug]/page.tsx # Dettaglio singolo progetto
│   ├── studio/page.tsx    # About/bio
│   └── contatti/page.tsx  # Contatti + form
├── components/
│   ├── Navigation.tsx     # Nav + mobile menu (framer-motion)
│   ├── Hero.tsx          # Hero section animato
│   ├── ProjectSection.tsx # Progetto fullscreen (stile Onionlab)
│   ├── ProjectCard.tsx   # Card per griglia progetti
│   └── Footer.tsx        # Footer con social
└── lib/
    ├── notion.ts         # Client Notion + query
    └── demo-data.ts      # Dati fallback quando Notion non configurato
```

## Integrazione Notion

Il database Notion deve avere queste proprietà:
- **Nome** (title): titolo progetto
- **Categoria** (select): Motion Design, 3D Animation, Visual Effects, etc.
- **Descrizione** (rich_text): descrizione breve
- **Thumbnail** (url): URL immagine esterna (Cloudinary consigliato)
- **Video** (url): embed Vimeo (opzionale)
- **Featured** (checkbox): mostra in homepage
- **Ordine** (number): ordinamento

Le funzioni in `notion.ts` gestiscono automaticamente nomi proprietà in italiano/inglese.

## Variabili d'ambiente

```env
NOTION_API_KEY=secret_xxxxx
NOTION_DATABASE_ID=xxxxx
```

Senza queste variabili, il sito usa `demo-data.ts` come fallback.

## Stile

Design ispirato a onionlab.com:
- Sfondo scuro (#0a0a0a)
- Sezioni fullscreen con scroll-snap
- Tipografia grande, light weight
- Hover sottili, transizioni fluide
- Video/immagini a tutto schermo con overlay

## Comandi

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
```

---

## Skills

### /new-project
Aggiungi un nuovo progetto demo in `demo-data.ts` per testing locale.

### /update-style
Modifica il design system in `globals.css` e `tailwind.config.ts`. Colori principali: background, foreground, accent, muted.

### /add-page
Crea una nuova pagina nel sito. Segui la struttura esistente in `src/app/`.

### /notion-debug
Verifica la connessione Notion e mostra i dati raw del database per debugging.

---

## Commands

### /deploy
Prepara il progetto per il deploy su Vercel:
1. Verifica che `.env.example` sia aggiornato
2. Controlla che non ci siano errori TypeScript: `npx tsc --noEmit`
3. Testa la build: `npm run build`
4. Mostra checklist pre-deploy

### /add-category
Aggiungi una nuova categoria di progetti. Aggiorna:
1. Le opzioni select in Notion (istruzioni)
2. Eventuali filtri nella pagina progetti

### /customize
Personalizza i testi statici del sito:
- Hero title/subtitle in `src/app/page.tsx`
- Bio e servizi in `src/app/studio/page.tsx`
- Email e social in `src/app/contatti/page.tsx` e `src/components/Footer.tsx`

### /add-animation
Aggiungi animazioni Framer Motion a un componente. Pattern esistenti in `ProjectSection.tsx` e `Hero.tsx`.

### /seo
Ottimizza SEO: metadata, Open Graph, sitemap. Modifica `layout.tsx` e aggiungi `sitemap.ts`.

---

## Note per lo sviluppo

- Le immagini Notion scadono dopo 1 ora → usa sempre URL esterni
- `revalidate = 60` nelle pagine per ISR (aggiornamento ogni 60s)
- Framer Motion per tutte le animazioni (già installato)
- Tailwind v4 con config tradizionale per compatibilità Next.js 14
- Il progetto usa React 19 con Next.js 14
