# Changelog

## [1.1.0] - 2026-02-16

### Aggiunto: Pannello Admin

Pannello di amministrazione completo per gestire i contenuti del portfolio senza toccare codice.

#### Autenticazione
- Login protetto su `/admin` con credenziali configurabili via env vars (`ADMIN_USER`, `ADMIN_PASSWORD`)
- Sessione JWT con cookie httpOnly, scadenza 7 giorni
- Middleware che protegge tutte le route `/admin/*` e `/api/admin/*`
- Logout con invalidazione cookie

#### Dashboard (`/admin`)
- Lista progetti con thumbnail, titolo, categoria
- Drag & drop per riordinare i progetti
- Pulsanti ▲/▼ per riordino su mobile
- Toggle featured (★) diretto dalla lista
- Creazione nuovo progetto con un click
- Eliminazione progetto con conferma
- Pulsante "Carica dati iniziali" per primo setup

#### Editor progetto (`/admin/progetti/[id]`)
- Modifica titolo, slug, categoria, descrizione
- Upload thumbnail (file diretto o URL esterno)
- Campo video URL con anteprima embed Vimeo/YouTube
- Gallery multimediale: aggiunta immagini (upload) e video (URL)
- Didascalie per ogni elemento della gallery
- Rimozione elementi gallery
- Toggle featured
- Salvataggio con feedback visivo

#### Storage
- Migrazione da dati statici (`projects.json`) a **Vercel Blob**
- Upload immagini su Vercel Blob (max 10MB, validazione tipo)
- Fallback automatico a `data/projects.json` locale se Blob non configurato
- Seed iniziale: trasferimento dati locali → Blob al primo accesso admin

#### API Routes
- `POST /api/auth/login` — Autenticazione
- `POST /api/auth/logout` — Logout
- `GET /api/admin/projects` — Lista progetti
- `POST /api/admin/projects` — Crea progetto
- `PUT /api/admin/projects` — Aggiorna progetto
- `DELETE /api/admin/projects?id=` — Elimina progetto
- `POST /api/admin/projects/reorder` — Riordina progetti
- `POST /api/admin/upload` — Upload immagine
- `POST /api/admin/seed` — Inizializzazione dati

### Modificato

- **Data layer** (`lib/projects.ts`): tutte le funzioni ora sono `async`, leggono prima da Vercel Blob poi fallback JSON
- **Pagine pubbliche**: convertite ad async server components con `revalidate = 60` (ISR)
- **Root layout**: `Navigation` sostituita con `NavigationWrapper` (nasconde nav sulle pagine admin)
- **next.config.js**: aggiunto hostname `**.public.blob.vercel-storage.com` per immagini Blob
- **Dipendenze**: aggiunti `@vercel/blob` e `jose` (JWT)

### File nuovi

```
src/lib/auth.ts
src/lib/blob-storage.ts
src/middleware.ts
src/components/NavigationWrapper.tsx
src/app/admin/layout.tsx
src/app/admin/page.tsx
src/app/admin/login/page.tsx
src/app/admin/progetti/[id]/page.tsx
src/app/api/auth/login/route.ts
src/app/api/auth/logout/route.ts
src/app/api/admin/projects/route.ts
src/app/api/admin/projects/reorder/route.ts
src/app/api/admin/upload/route.ts
src/app/api/admin/seed/route.ts
```

---

## [1.0.2] - 2026-02-16

- Fix build: downgrade @notionhq/client a v2, fix iterazione Set, aggiunto target TS

## [1.0.1] - 2026-02-16

- Aggiunto .npmrc con legacy-peer-deps per build Vercel

## [1.0.0] - 2026-02-16

- Aggiornato contenuti con info Manuel Guillin
- Initial commit: Portfolio 3D con Next.js 14, Tailwind, Framer Motion
