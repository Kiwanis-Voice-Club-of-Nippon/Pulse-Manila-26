# Pulse Manila 2026

Mobile-first convention companion for the Kiwanis ASPAC convention in Manila, June 2026.

Live: [pulse-kiwanis-309064718968.us-west1.run.app](https://pulse-kiwanis-309064718968.us-west1.run.app)

Pulse is a focused tool, not a platform:

- Convention schedule with fast search and room/venue lookup
- Announcements and floor updates
- ASPAC highlights
- On-device saved sessions — no attendee login required
- Offline-capable on weak venue internet

Not a social network, not a ticketing layer, not a replacement for official Kiwanis communications.

## Stack

- Next.js 15 · TypeScript · Tailwind CSS
- pnpm 9.x
- Supabase

## Quick start

```bash
pnpm install && pnpm dev
```

## Commands

| Command | What it does |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm lint` | Lint |
| `pnpm typecheck` | Type check |
| `pnpm test` | Run tests |
| `pnpm import:preview` | Preview data import |

## Repo map

| Path | Contents |
|------|----------|
| `src/app` | Public app routes |
| `src/components/pulse` | Shared UI and PWA helpers |
| `src/lib/pulse-data.ts` | Seed data and schedule helpers |
| `supabase/migrations/` | Relational schema |
| `data/imports/` | Sample import files |
| `docs/` | Architecture and content-operations guides |

## Roadmap

1. Replace seed data with Supabase-backed live reads
2. Admin auth and content CRUD (sessions, rooms, announcements, tracks)
3. Push notifications and multilingual support
4. Production data sync pipeline