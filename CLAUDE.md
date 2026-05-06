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

**Next.js 14 App Router** deployed on Vercel. Marketing site + authenticated client portal backed by Supabase.

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

---

## Client Portal (`/portal`)

Added in May 2026. Authenticated area for TecnoAI clients.

### Supabase project

- **Project:** `Tecnoaiwebproject` — ID `intpugdrshnnntddgadm`
- **URL:** `https://intpugdrshnnntddgadm.supabase.co`
- **Anon key:** in `.env.local` (also must be set in Vercel env vars)
- **Client:** `lib/supabase.ts` — exports `supabase` singleton + TypeScript types

### Portal routes

| Route | Access | Purpose |
|---|---|---|
| `/portal` | Public | Login with email + password |
| `/portal/register` | Public | Self-registration (creates `client` role) |
| `/portal/dashboard` | Authenticated client | View own services and documents |
| `/portal/admin` | Admin only | Manage clients, services, documents |

### Database schema (public)

- `profiles` — one row per user; columns: `id`, `full_name`, `company_name`, `email`, `role` (`client`\|`admin`), `created_at`. Linked to `auth.users` via trigger that auto-creates a profile on signup.
- `services` — service catalog created by admin
- `client_services` — assignment of a service to a client (`active`\|`paused`\|`cancelled`)
- `documents` — files/links associated to a client or service

### Row Level Security

All tables have RLS enabled. Key rules:
- Clients see only their own rows; admins see everything.
- `is_admin()` helper function: `SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'`.
- **Users cannot self-escalate to admin.** The `profiles_update_self` policy uses `WITH CHECK (role = (SELECT role FROM profiles WHERE id = auth.uid()))` — any attempt to set `role = 'admin'` from the client is rejected by the DB.
- Only admins can update the `role` field (`profiles_update_admin` policy).

### Making someone admin (manual, one-time SQL)

Run this in the Supabase SQL editor or via MCP:

```sql
UPDATE profiles SET role = 'admin' WHERE email = 'user@example.com';
```

**Never add a UI or API endpoint that allows self-promotion to admin.**

### Local development

Create `.env.local` at the project root:

```
NEXT_PUBLIC_SUPABASE_URL=https://intpugdrshnnntddgadm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key from Supabase dashboard>
```

The `lib/supabase.ts` client falls back to placeholder values at build time so Vercel builds don't fail when env vars are absent — but the portal will not work without real values.
