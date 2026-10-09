# Mohsin Ali Mughal — Portfolio (React + Vite + Tailwind)

Health-tech × full-stack developer portfolio. Static frontend, no backend, deploys free on Vercel or Netlify.

**Stack:** React 18 (functional components + hooks) · Vite · Tailwind CSS 3 · Three.js (hero / DNA / orbit 3D scenes)

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # serve the production build locally
```

Requires Node 18+.

## Project structure

```
src/
  main.jsx, App.jsx, index.css, hooks.js
  components/        one file per section (Hero, StatsBar, Bridge, Timeline, Skills,
                     Projects, Certificates, Leadership, GithubWidget,
                     Contact, Footer) + Nav/CommandPalette, DoubleRibbon, ui.jsx
  data/              ALL content lives here — edit these, not the components
    nav.js  social.js  stats.js  timeline.js  skills.js
    projects.js  certificates.js  leadership.js  images.js
  assets/
    profile.jpg   certs/   projects/   logos/
```

## Updating content

| To change…                      | Edit…                                              |
| ------------------------------- | -------------------------------------------------- |
| Social links / GitHub username  | `src/data/social.js`                               |
| Work experience & education     | `src/data/timeline.js`                             |
| Projects (+ screenshots)        | `src/data/projects.js` + `src/assets/projects/`    |
| Certificates                    | `src/data/certificates.js` + `src/assets/certs/`   |
| Organization logos              | drop a PNG in `src/assets/logos/`, register in `src/data/images.js` |
| Stats numbers                   | `src/data/stats.js`                                |
| Colors / fonts                  | `tailwind.config.js`                               |

## ⚠️ Placeholders to replace before launch

1. **Resume / one-pager buttons** — the "Resume" (nav), "Download resume" (hero) and "Download one-pager (PDF)" (footer) links currently do nothing (`href="#"`). Put your PDFs in `public/` (e.g. `public/resume.pdf`) and change those `href`s to `/resume.pdf` and add the `download` attribute. Files: `components/Nav.jsx`, `components/Hero.jsx`, `components/Footer.jsx`.
2. **Medium** link in `src/data/social.js` points to `medium.com` (no handle yet).
3. **GitHub widget** — the contribution grid and the three numbers are illustrative. To make it live, fetch `https://api.github.com/users/<username>` inside `GithubWidget.jsx` (this works once deployed; it was blocked in the sandboxed preview).
4. **"On the Way" logo** (`logo_ontheway.png`) was an unlabeled icon — confirm it's correct.
5. **Brothers Mobiles & Computers** has no logo yet (shows "BM" initials). Add one to `src/assets/logos/` and set `logo:` in `src/data/timeline.js`.
6. Confirm LinkedIn / GitHub usernames in `src/data/social.js` are exactly right.

## Deploy to Vercel (free)

**Option A — GitHub + dashboard (recommended)**
1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Vite. Confirm: **Build command** `npm run build`, **Output directory** `dist`.
4. Click **Deploy**. Add your custom domain (`mohsinalimughal.tech`) under *Project → Settings → Domains*.

**Option B — CLI**
```bash
npm i -g vercel
vercel          # first deploy (preview)
vercel --prod   # production
```

### Netlify (alternative)
Build command `npm run build`, publish directory `dist`.

## Features

Hero with 3D wireframe + tilt photo · scrolling double ribbon · animated stat cards · DNA-helix "bridge" section · LinkedIn-style grouped career timeline (promotions nest under one company) · skills split technical/domain · project cards linking to GitHub · certificate wall with category filters + lightbox · leadership + 3D "currently learning" orbit · GitHub activity widget · contact · dark/light toggle (saved in localStorage) · ⌘/Ctrl+K command palette · scroll-progress bar · fully responsive · respects `prefers-reduced-motion`.

## Note on verification

This project was assembled and statically checked (syntax + undefined-identifier analysis) but `npm install` / `vite build` could not be run in the environment it was generated in. Run `npm install && npm run build` once locally; if anything errors, send me the message and I'll fix it.
