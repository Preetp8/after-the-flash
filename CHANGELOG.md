# Changelog

All notable changes to this project are documented here.  
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).  
Versioning follows [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

---

## [0.3.0-beta.1] — 2026-06-01

### Changed
- Updated studio location to Alabama & the Southeast (was Los Angeles & New York)
- Updated hero subtitle, commission copy, and all four discipline descriptions
- Renamed "The Artists" section to "The Arsenal" throughout (nav, footer, page)
- Replaced Artists team grid with Arsenal gear list (two-column numbered rows)
- Added Response time metadata to commission section (was "Hours: By appointment")

### Added
- README.md with project structure, photo guide, and deployment docs
- CHANGELOG.md (this file)
- Semantic versioning + pre-release tagging workflow

---

## [0.2.0-beta.1] — 2026-06-01

### Changed
- Removed drag-drop ImageSlot component — replaced with static Photo component
- Images now load from `/public/images/` with tonal color fallback
- Removed Tweaks panel and toggle button
- Hero headline updated to "After the Flash" with FLASH in terracotta accent
- Increased nav/section horizontal padding for more breathing room

---

## [0.1.0-beta.1] — 2026-06-01

### Added
- Initial Next.js 15 / React 19 / TypeScript project
- Converted static HTML/CSS design prototype to component architecture
- All sections: Hero, The Collection, The Work, The Artists, Commission a Shoot, Footer
- Scroll-reveal animations via IntersectionObserver
- Scroll-aware fixed navigation
- Commission form with `/api/inquire` POST route stub
- `lib/db.ts` placeholder for future database wiring
- Git initialized, private GitHub repo created
- Deployed to Vercel with GitHub auto-deploy
