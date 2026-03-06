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
│   ├── reel/page.tsx         # Pagina reel video
│   ├── rd/page.tsx           # Pagina R&D / esperimenti
│   ├── studio/page.tsx       # About/bio
│   ├── contatti/page.tsx     # Contatti + form
│   ├── admin/
│   │   ├── layout.tsx        # Layout admin (no nav pubblica)
│   │   ├── login/page.tsx    # Login admin
│   │   ├── page.tsx          # Dashboard: lista progetti, riordino, CRUD
│   │   ├── landing/page.tsx  # Editor hero/landing settings
│   │   ├── about/page.tsx    # Editor about/studio settings
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
│           ├── landing/route.ts     # GET, PUT landing/hero settings
│           ├── about/route.ts       # GET, PUT about/studio settings
│           ├── upload/route.ts      # POST upload immagini → public/uploads/
│           └── seed/route.ts        # POST inizializzazione dati
├── components/
│   ├── Navigation.tsx
│   ├── NavigationWrapper.tsx  # Nasconde nav sulle pagine admin
│   ├── Hero.tsx
│   ├── ProjectSection.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectsGrid.tsx       # Griglia progetti con filtri
│   ├── GalleryLightbox.tsx    # Lightbox per gallery progetto
│   ├── ContactForm.tsx        # Form contatti
│   ├── ScrollReveal.tsx       # Animazione scroll reveal
│   └── Footer.tsx
├── lib/
│   ├── projects.ts       # Data layer + tipi (Project, LandingSettings, AboutSettings)
│   ├── blob-storage.ts   # Storage via GitHub API (ex Vercel Blob)
│   ├── auth.ts           # JWT auth utilities
│   ├── notion.ts         # Client Notion (legacy, non in uso)
│   └── demo-data.ts      # Dati demo (legacy)
├── data/
│   ├── projects.json     # Dati locali di fallback (progetti)
│   ├── landing.json      # Landing/hero settings (gestito da GitHub API)
│   └── about.json        # About/studio settings (gestito da GitHub API)
└── middleware.ts          # Protezione route /admin
```

## Pannello Admin

Accessibile su `/admin`. Credenziali configurate via env vars.

**Funzionalità:**
- Login con JWT (cookie httpOnly, scadenza 7 giorni)
- Dashboard con lista progetti ordinabile via drag & drop
- Toggle featured direttamente dalla lista
- Editor progetto completo: titolo, slug, categoria, tipo (project/reel/rd), descrizione, video, gallery
- Editor landing/hero (`/admin/landing`): titolo, sottotitolo, video hero, immagine hero
- Editor about/studio (`/admin/about`): bio, foto profilo, discipline, software, esperienze, studi
- Upload immagini diretto (GitHub API → `public/uploads/`) o URL esterno
- Gallery con immagini + video embed (Vimeo/YouTube)
- Pulsante "Carica dati iniziali" per seed da projects.json

**Storage:** GitHub API. I dati JSON (`data/projects.json`, `data/landing.json`, `data/about.json`) e le immagini (`public/uploads/`) sono committati nel repo tramite GitHub API. Senza `GITHUB_TOKEN`/`GITHUB_REPO`, il sito legge da `src/data/projects.json` locale.

## Variabili d'ambiente

```env
# Admin
ADMIN_USER=admin
ADMIN_PASSWORD=password-sicura
ADMIN_JWT_SECRET=secret-lungo-random

# GitHub Storage (sostituisce Vercel Blob)
GITHUB_TOKEN=ghp_xxxxxxxxxxxx   # Personal Access Token (classic) con scope "repo"
GITHUB_REPO=owner/repo-name     # es. sfadda-dotcom/portfolio-3d
GITHUB_BRANCH=main              # branch su cui scrivere (default: main)
```

## Setup GitHub Storage

1. Crea un Personal Access Token GitHub (classic) con scope `repo`
2. Imposta le env vars `GITHUB_TOKEN`, `GITHUB_REPO`, `GITHUB_BRANCH` su Vercel
3. Al primo accesso admin, clicca "Carica dati iniziali" per trasferire i dati da projects.json al repo
4. Da quel momento, tutte le modifiche dall'admin generano commit automatici nel repo (ISR 60s)

**Note:** Le immagini caricate vengono committate in `public/uploads/` e servite come file statici da Next.js (gratis, senza storage esterno). Limite upload: 4 MB per file.

## Tipi di contenuto

I progetti supportano il campo `type: 'project' | 'reel' | 'rd'`:
- `project` → apparisce in `/progetti` (default)
- `reel` → apparisce in `/reel`
- `rd` → apparisce in `/rd`

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
- Hero title/subtitle tramite admin `/admin/landing`
- Bio e servizi tramite admin `/admin/about`
- Email e social in `src/app/contatti/page.tsx` e `src/components/Footer.tsx`

### /add-animation
Aggiungi animazioni Framer Motion a un componente. Pattern esistenti in `ProjectSection.tsx` e `Hero.tsx`.

### /seo
Ottimizza SEO: metadata, Open Graph, sitemap. Modifica `layout.tsx` e aggiungi `sitemap.ts`.

---

## Note per lo sviluppo

- `revalidate = 60` nelle pagine pubbliche per ISR
- Le funzioni in `lib/projects.ts` sono async (leggono da GitHub API / JSON locale)
- `lib/blob-storage.ts` usa GitHub API (il nome storico è rimasto per compatibilità)
- Framer Motion per tutte le animazioni
- Tailwind v4 con config tradizionale per compatibilità Next.js 14
- React 19 con Next.js 14
- Middleware protegge `/admin/*` e `/api/admin/*` (eccetto `/admin/login`)
- Immagini uploadate vanno in `public/uploads/` (hostname relativo, nessuna config next.config.js necessaria)
