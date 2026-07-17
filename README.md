# WinShot — Website

A single-page marketing / distribution site for the WinShot app.

## Files
- `index.html` — the page (all content).
- `styles.css` — design system + layout.
- `app.js` — sticky nav, mobile menu, scroll reveals, download guard.
- `assets/favicon.svg` — browser-tab icon / logo mark.
- `downloads/` — put your installer here (see below).

Everything is self-contained (no build step, no external fonts or CDNs). Just
open `index.html` locally, or upload the whole folder to any static host.

## Wiring the download button
The **Download** button points at `downloads/WinShot-Setup.exe`.

1. Build your installer and drop it at `downloads/WinShot-Setup.exe`, **or**
2. Edit the two download links in `index.html` (search for `WinShot-Setup.exe`)
   to point at your release URL — e.g. a GitHub Releases asset.

Until a real file exists there, clicking Download shows a friendly "coming soon"
note instead of a 404.

Also update the version / size text (search `Version 1.0` and `~12 MB`).

## Publish (free options)
- **GitHub Pages** — push this folder to a repo, enable Pages on the branch.
- **Netlify / Cloudflare Pages / Vercel** — drag-and-drop or connect the repo.
- **Any web host** — upload the folder via FTP; `index.html` is the entry point.

No server-side code is required.
