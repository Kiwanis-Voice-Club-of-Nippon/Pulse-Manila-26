# Pulse Manila 2026

Pulse is a standalone, mobile-first convention companion for the Kiwanis International Convention in Manila, June 2026.

## Live

- Publish entrypoint: https://aistudio.google.com/apps/c181d287-4d12-4299-9a6b-420f4c2a5bba?showAssistant=true&showPreview=true
- Frontend: https://pulse-kiwanis-309064718968.us-west1.run.app

It is intentionally narrow:

- public access to the convention schedule
- fast session, room, and venue lookup
- announcements and floor updates
- ASPAC-specific highlights
- local saved sessions without attendee login

Pulse is not a social network, not a ticketing layer, and not a replacement for official Kiwanis communication.

## Current scaffold status

This repo currently ships:

- a public-facing Next.js 15 PWA shell
- seeded schedule, announcements, venue, and ASPAC highlight data
- schedule search and filters
- session detail and room lookup pages
- local bookmarks stored on-device
- install prompt plus offline caching shell
- import preview script, sample CSV, and Supabase-ready schema artifacts

Not yet wired:

- Supabase auth and live content CRUD
- admin dashboard and analytics
- push notifications
- multilingual support
- production data sync/import pipeline

## Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- pnpm 9.x as the intended package manager
- Supabase schema scaffolds in `supabase/`

## Quick start

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Commands

```bash
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm test
pnpm import:preview
```

## Repo map

- [src/app](./src/app): public app routes
- [src/components/pulse](./src/components/pulse): shared UI and PWA helpers
- [src/lib/pulse-data.ts](./src/lib/pulse-data.ts): seed data and schedule helpers
- [supabase/migrations/202603260001_init_pulse.sql](./supabase/migrations/202603260001_init_pulse.sql): relational schema scaffold
- [data/imports/pulse-sessions.sample.csv](./data/imports/pulse-sessions.sample.csv): sample import file
- [docs/architecture.md](./docs/architecture.md): product and technical structure
- [docs/content-operations-event-week.md](./docs/content-operations-event-week.md): event-week content workflow

## Product constraints

- mobile first
- no attendee login
- low-friction use on weak venue internet
- admin-only content editing
- companion framing, never replacement framing

## Next implementation slice

1. Replace seed data with Supabase-backed reads.
2. Add admin auth and secure CRUD for sessions, announcements, rooms, tracks, and segments.
3. Add publish workflow, audit logging, and analytics overview.
4. Connect preview and production deployments in Vercel.
