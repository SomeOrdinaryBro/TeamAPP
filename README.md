# Aura Farming — Team & Presenters

A mobile-first, app-feel web app for a live event. Scan the QR → meet the
presenters and the team. Installable to the home screen like a native app.

Built with React + Vite, Tailwind CSS v4, and Framer Motion. No backend,
deploys as a static site.

## Edit the content (the only file you touch)

All people and the app title live in **`src/data.js`**. Add, remove, or reorder
entries — the screens update automatically.

```js
{
  id: 'unique-slug',
  name: 'Full Name',
  title: 'Job Title',
  about: 'Short blurb.',
  isPresenter: true,                 // shows on Presenters + Team, gets strengths
  strengths: ['...', '...'],         // presenters only — omit for everyone else
}
```

- `isPresenter: true` → appears on **both** the Presenters and Team screens and
  gets a Strengths section on their detail page.
- Leave `isPresenter` off (or `false`) for team-only members; omit `strengths`.
- There is intentionally **no weaknesses field**.

## Rebrand the look

Colors and fonts are CSS variables in `src/index.css` under `@theme`. Change
`--color-accent` (and the hero/icon gradient stops) to reskin the whole app.

## Develop / build

```bash
npm install
npm run dev       # local dev server
npm run build     # generates PWA icons, then builds to dist/
npm run preview   # serve the production build locally
```

`npm run build` outputs a static `dist/` folder — drop it on any static host
(Netlify, Vercel, GitHub Pages, S3, Cloudflare Pages). Asset paths are relative,
so a sub-path deploy works too. Serve over HTTPS so "Add to Home Screen" /
install works.

## PWA icons

`public/icon-192.png`, `icon-512.png`, and `apple-touch-icon.png` are generated
from code by `scripts/generate-icons.mjs` (runs automatically on build, or
`npm run icons`). Edit that script — and `public/favicon.svg` — to change the mark.
