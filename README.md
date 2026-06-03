# After the Flash

**Photography & Film Team — Alabama & the Southeast**

A high-end photography and videography team website. The design concept is a modern art museum — every photo treated like a work of art on display. Built with Next.js 15, React 19, and TypeScript. Deployed on Vercel.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Global CSS (custom design system) |
| Fonts | Bodoni Moda + Archivo via `next/font/google` |
| Deployment | Vercel |
| Repo | GitHub (private) |

---

## Project Structure

```
after-the-flash/
├── app/
│   ├── layout.tsx          — Root layout, font loading, metadata
│   ├── page.tsx            — Page assembly (imports all sections)
│   ├── globals.css         — Full design system
│   └── api/
│       └── inquire/
│           └── route.ts    — POST endpoint for commission form
├── components/
│   ├── Nav.tsx             — Fixed nav with scroll-aware background
│   ├── Hero.tsx            — Full-viewport hero section
│   ├── Collection.tsx      — Portfolio gallery (12-column salon grid)
│   ├── TheWork.tsx         — Four disciplines (numbered rows)
│   ├── Arsenal.tsx         — Gear list (two-column numbered rows)
│   ├── Commission.tsx      — Contact/booking form
│   ├── Footer.tsx          — Footer
│   ├── Photo.tsx           — Static image component with tonal fallback
│   └── ScrollRevealProvider.tsx — IntersectionObserver scroll reveals
├── lib/
│   └── db.ts               — Database client placeholder (Supabase / Neon)
├── public/
│   └── images/             — Drop photos here (see below)
└── _design-prototype/      — Original HTML/CSS design files (reference only)
```

---

## Adding Photos

Drop image files into `public/images/` with these exact filenames — they appear automatically, no code changes needed:

| Section | Filename |
|---|---|
| Hero | `hero.jpg` |
| Collection 01 | `collection-01.jpg` |
| Collection 02 | `collection-02.jpg` |
| Collection 03 | `collection-03.jpg` |
| Collection 04 | `collection-04.jpg` |
| Collection 05 | `collection-05.jpg` |
| Collection 06 | `collection-06.jpg` |

JPG and WebP both work. Recommended sizes: hero at 2400×1600px minimum, collection at 1600px on the long edge.

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment

Every push to `main` auto-deploys via Vercel (GitHub integration).

To deploy manually:

```bash
vercel --prod
```

---

## Adding a Database (Future)

The `/api/inquire` route is stubbed and ready. When you're ready to wire up form submissions:

1. Add your database client to `lib/db.ts` (Supabase example is in the file)
2. Update `app/api/inquire/route.ts` to persist the form data
3. Add your env vars to Vercel dashboard under Project → Settings → Environment Variables

---

## Versioning

This project follows [Semantic Versioning](https://semver.org/). See [CHANGELOG.md](CHANGELOG.md) for release history.

Pre-release versions (e.g. `0.x.0-beta.1`) are deployed to production until `v1.0.0` — the point at which real photos are in, the form is wired, and the site is client-ready.
