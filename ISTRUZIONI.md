# Portfolio 3D - Guida per il Compagno

## Come funziona

Il sito legge i progetti da **Notion**. Tu aggiungi progetti su Notion, il sito si aggiorna automaticamente.

---

## Setup iniziale (una volta sola)

### 1. Crea l'integrazione Notion

1. Vai su https://www.notion.so/my-integrations
2. Clicca **"New integration"**
3. Nome: "Portfolio" (o quello che preferisci)
4. Workspace: seleziona il tuo workspace
5. Clicca **"Submit"**
6. Copia il **"Internal Integration Secret"** (inizia con `secret_...`)

### 2. Crea il database progetti su Notion

1. Crea una nuova pagina in Notion
2. Aggiungi un **Database - Full page**
3. Rinomina in "Progetti Portfolio"
4. Aggiungi queste colonne (proprietà):

| Nome colonna | Tipo | Descrizione |
|--------------|------|-------------|
| Nome | Title | Nome del progetto |
| Categoria | Select | Es: Motion Design, 3D Animation, Visual Effects |
| Descrizione | Text | Breve descrizione del progetto |
| Thumbnail | URL | Link all'immagine di copertina* |
| Video | URL | Link Vimeo (opzionale) |
| Featured | Checkbox | Spunta per mostrare in homepage |
| Ordine | Number | Numero per ordinare i progetti (1, 2, 3...) |

### 3. Connetti l'integrazione al database

1. Apri il database "Progetti Portfolio"
2. Clicca i tre puntini ••• in alto a destra
3. Clicca **"Connections"** → **"Add connections"**
4. Seleziona l'integrazione "Portfolio" che hai creato

### 4. Ottieni l'ID del database

1. Apri il database in Notion
2. L'URL sarà tipo: `notion.so/workspace/abc123def456...?v=...`
3. La parte `abc123def456` (32 caratteri) è il tuo DATABASE_ID

---

## Deploy su Vercel

### 1. Carica su GitHub

```bash
cd portfolio-3d
git init
git add .
git commit -m "Initial commit"
```

Poi crea un repository su GitHub e pushalo.

### 2. Collega a Vercel

1. Vai su https://vercel.com
2. Clicca **"Add New Project"**
3. Importa il repository da GitHub
4. In **"Environment Variables"** aggiungi:
   - `NOTION_API_KEY` = il tuo secret_...
   - `NOTION_DATABASE_ID` = l'ID del database
5. Clicca **"Deploy"**

### 3. (Opzionale) Compra un dominio

Su Vercel o su Namecheap/Porkbun (~12€/anno).

---

## Come aggiungere un progetto

1. Apri il database "Progetti Portfolio" su Notion
2. Clicca **"+ New"**
3. Compila:
   - **Nome**: titolo del progetto
   - **Categoria**: scegli o creane una nuova
   - **Descrizione**: 1-2 frasi
   - **Thumbnail**: URL dell'immagine (vedi sotto)
   - **Video**: link Vimeo (es: https://player.vimeo.com/video/123456789)
   - **Featured**: spunta se vuoi in homepage
   - **Ordine**: numero per ordinare
4. Il sito si aggiorna automaticamente in ~60 secondi

---

## Dove mettere le immagini

Le immagini NON vanno caricate direttamente su Notion (scadono dopo 1 ora).

### Opzione 1: Cloudinary (consigliata, gratis)

1. Registrati su https://cloudinary.com (gratis)
2. Vai su **Media Library**
3. Trascina l'immagine
4. Clicca sull'immagine → copia l'URL
5. Incolla in Notion nella colonna Thumbnail

### Opzione 2: Usa la thumbnail di Vimeo

Se il progetto ha un video Vimeo, puoi usare l'URL della thumbnail automatica:
```
https://vimeocdn.com/video/VIDEO_ID_1280x720.jpg
```

---

## Come modificare i testi del sito

I testi statici (bio, servizi, contatti) sono nel codice. Per modificarli serve accesso al codice:

- **Homepage hero**: `src/app/page.tsx`
- **Pagina Studio**: `src/app/studio/page.tsx`
- **Pagina Contatti**: `src/app/contatti/page.tsx`
- **Footer**: `src/components/Footer.tsx`

Dopo la modifica, Vercel fa automaticamente un nuovo deploy.

---

## Problemi comuni

**Il sito non mostra i progetti nuovi**
- Aspetta 60 secondi (cache)
- Verifica che l'integrazione sia connessa al database

**Le immagini non si caricano**
- Usa URL esterni (Cloudinary), non upload diretti su Notion

**Errore 500 o pagina bianca**
- Controlla le variabili d'ambiente su Vercel
- Verifica che NOTION_API_KEY e NOTION_DATABASE_ID siano corretti

---

## Supporto

Per modifiche al codice o problemi tecnici, contatta chi ti ha fatto il sito.
