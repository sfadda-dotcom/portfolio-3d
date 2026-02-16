# Portfolio 3D - Motion Designer

## Panoramica

Portfolio web per motion designer 3D. Stack: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion. I contenuti (progetti) sono gestibili tramite pannello admin integrato.

## Architettura

```
src/
├── app/
│   ├── page.tsx              # Home: hero + progetti featured
│   ├── layout.tsx            # Root layout
│   ├── progetti/
│   │   ├── page.tsx          # Griglia tutti i progetti
│   │   └── [slug]/page.tsx   # Dettaglio singolo progetto
│   ├── studio/page.tsx       # About/bio
│   ├── contatti/page.tsx     # Contatti + form
│   ├── admin/
│   │   ├── layout.tsx        # Layout admin (no nav pubblica)
│   │   ├── login/page.tsx    # Login admin
│   │   ├── page.tsx          # Dashboard: lista progetti, riordino, CRUD
│   │   └── progetti/
│   │       └── [id]/page.tsx # Editor progetto (form + upload)
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts
│       │   └── logout/route.ts
│       └── admin/
│           ├── projects/
│           │   ├── route.ts         # GET, POST, PUT, DELETE progetti
│           │   └── reorder/route.ts # POST riordino
│           ├── upload/route.ts      # POST upload immagini
│           └── seed/route.ts        # POST inizializzazione dati
├── components/
│   ├── Navigation.tsx
│   ├── NavigationWrapper.tsx  # Nasconde nav sulle pagine admin
│   ├── Hero.tsx
│   ├── ProjectSection.tsx
│   ├── ProjectCard.tsx
│   └── Footer.tsx
├── lib/
│   ├── projects.ts       # Data layer (Blob → fallback JSON)
│   ├── blob-storage.ts   # Lettura/scrittura Vercel Blob
│   ├── auth.ts           # JWT auth utilities
│   ├── notion.ts         # Client Notion (legacy, non in uso)
│   └── demo-data.ts      # Dati demo (legacy)
├── data/
│   └── projects.json     # Dati locali di fallback
└── middleware.ts          # Protezione route /admin
```

## Pannello Admin

Accessibile su `/admin`. Credenziali configurate via env vars.

**Funzionalità:**
- Login con JWT (cookie httpOnly, scadenza 7 giorni)
- Dashboard con lista progetti ordinabile via drag & drop
- Toggle featured direttamente dalla lista
- Editor progetto completo: titolo, slug, categoria, descrizione, video, gallery
- Upload immagini diretto (Vercel Blob) o URL esterno
- Gallery con immagini + video embed (Vimeo/YouTube)
- Pulsante "Carica dati iniziali" per seed da projects.json

**Storage:** Vercel Blob. Senza `BLOB_READ_WRITE_TOKEN`, il sito legge da `data/projects.json` locale.

## Variabili d'ambiente

```env
# Admin
ADMIN_USER=admin
ADMIN_PASSWORD=password-sicura
ADMIN_JWT_SECRET=secret-lungo-random

# Vercel Blob
BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxx
```

## Setup Vercel Blob

1. Vai su Vercel Dashboard → Storage → Create → Blob
2. Copia il `BLOB_READ_WRITE_TOKEN` nelle env vars del progetto
3. Al primo accesso admin, clicca "Carica dati iniziali" per trasferire i dati da projects.json al Blob
4. Da quel momento, tutte le modifiche dall'admin sono live (ISR 60s)

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

---

## Commands

### /deploy
Prepara il progetto per il deploy su Vercel:
1. Verifica che `.env.example` sia aggiornato
2. Controlla che non ci siano errori TypeScript: `npx tsc --noEmit`
3. Testa la build: `npm run build`
4. Mostra checklist pre-deploy

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

- `revalidate = 60` nelle pagine pubbliche per ISR
- Le funzioni in `lib/projects.ts` sono async (leggono da Blob)
- Framer Motion per tutte le animazioni
- Tailwind v4 con config tradizionale per compatibilità Next.js 14
- React 19 con Next.js 14
- Middleware protegge `/admin/*` e `/api/admin/*` (eccetto `/admin/login`)
- Immagini uploadate vanno su Vercel Blob (hostname `**.public.blob.vercel-storage.com` già in next.config.js)
