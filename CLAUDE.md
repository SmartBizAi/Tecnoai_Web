# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start local dev server (localhost:3000)
npm run build    # Production build (used by Vercel)
npm run lint     # ESLint check
npx tsc --noEmit # TypeScript type check (no test suite exists)
```

## Git rules

- **Always commit and push directly to `main`** — no feature branches.
- Vercel auto-deploys on every push to `main`.

## Architecture

**Next.js 14 App Router** deployed on Vercel. No backend, no database — this is a pure marketing/documentation site.

Every page file starts with `'use client'` because all pages consume the `LanguageContext` hook. The root layout (`app/layout.tsx`) wraps everything in `<LanguageProvider>` + `<Header>` + `<Footer>`.

### i18n system

`lib/i18n/` — custom client-side i18n, no library.

- `en.ts` and `es.ts` are plain objects exported as `as const`.
- `en.ts` also exports `TranslationKey = keyof typeof en` — this is the single source of truth for all translation keys. **Every key added to `en.ts` must also be added to `es.ts`.**
- `LanguageContext.tsx` exposes `useLanguage()` → `{ t, lang, setLang }`.
- Usage in any component: `const { t } = useLanguage(); t('some.key')`.
- When using a key that TypeScript doesn't statically know (e.g. built from a template string), cast with `as any` or `as TranslationKey`.

### Styling

Tailwind CSS with a custom `brand` color scale (navy blues: `brand-50` through `brand-950`, primary is `brand-900: #0f2250`).

Reusable utility classes are defined in `app/globals.css` under `@layer utilities` — prefer these over inline Tailwind when they exist:
- `btn-primary`, `btn-secondary`, `btn-ghost` — button variants
- `input-field`, `label` — form elements
- `section-pad` — `py-20 px-6` section padding
- `container-narrow` — `max-w-5xl mx-auto`
- `card-hover` — hover lift animation
- `gradient-brand`, `gradient-text` — blue→purple gradient

### Navigation

`components/Header.tsx` defines `navLinks` array — add new routes here. The header renders only the first 6 links in the desktop nav; all links appear in the mobile menu. If you add a nav link, you need a `nav.*` key in both `en.ts` and `es.ts`.

### App detail pages (`/apps/*`)

Pattern: each app page (`rxroutes`, `bookingpro`, `inventaryeasy`) uses:
- `AppSlideshow` — tabbed slideshow with coded UI mock slides. Pass `slides` array and `accentColor` (`'blue'|'violet'|'emerald'`).
- `RequestAccessModal` — triggered by a local `useState(false)` + a button `onClick`.
- All copy comes from i18n keys namespaced by the app (e.g. `rxroutes.headline`, `rxroutes.features.1`).

### User manuals (`/user-manuals/*`)

Each role has a standalone HTML file in `public/user-manuals/<role>/manual.html` (served as a static asset by Vercel). The corresponding Next.js page at `app/user-manuals/<role>/page.tsx` renders just a breadcrumb bar + a full-height `<iframe src="/user-manuals/<role>/manual.html">`. The HTML files are self-contained with inline `<style>` — edit the HTML directly when updating manual content.

Roles: `admin`, `salesrep`, `locations_owner`.

### Key components

| Component | Purpose |
|---|---|
| `Header.tsx` | Fixed nav with language toggle (EN/ES), mobile hamburger menu |
| `Footer.tsx` | Links + contact info — does NOT include user-manuals link (only Header does) |
| `AppSlideshow.tsx` | Tabbed mock-UI slideshow used on all app detail pages |
| `HeroBgCarousel.tsx` | Decorative background panels on the home hero, cycles every 3s |
| `RequestAccessModal.tsx` | Lead capture modal, local form state only (no API call yet) |
