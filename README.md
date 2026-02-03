# Manji Website Template

Questo è un template base per siti Astro, creato a partire dal progetto "Daivai".

## Caratteristiche

- **Astro** + **React**
- **Protezione Password Client-side** (configurabile in `src/components/PasswordGate.tsx`)
- Struttura pronta per **GitHub Pages**
- Stili globali e Font inclusi

## Istruzioni

1. Installa le dipendenze:
   ```bash
   npm install
   ```

2. Avvia il server di sviluppo:
   ```bash
   npm run dev
   ```

3. Modifica la password:
   - Vai in `src/components/PasswordGate.tsx`.
   - Modifica `TARGET_HASH` con l'hash SHA256 della tua nuova password.
   - La password attuale di default è: `password`.

4. Configura per GitHub Pages:
   - Modifica `astro.config.mjs` decommentando e impostando `site` e `base`.

## Build

Per creare la versione di produzione:
```bash
npm run build
```
I file saranno nella cartella `dist/`.
