# Architecture

## Product boundary

Pulse is a public access layer for convention information.

It should optimize for:

- speed to information
- low-friction mobile use
- operational simplicity during event week
- safe content publishing by approved editors

It should not become:

- a social product
- attendee messaging infrastructure
- registration or ticketing infrastructure
- the authoritative source over official convention notices

## App structure

Current structure:

- `src/app/page.tsx`: home and today view
- `src/app/schedule`: schedule list plus session detail routes
- `src/app/updates`: announcements feed
- `src/app/venues`: venue and room lookup
- `src/app/aspac`: ASPAC-focused filtered view
- `src/app/saved`: local bookmark view
- `src/app/about`: framing and disclaimer page

## Data strategy

Current prototype state:

- seeded TypeScript records in `src/lib/pulse-data.ts`
- Supabase SQL scaffold in `supabase/migrations/`
- seed SQL starter in `supabase/seed.sql`
- sample CSV under `data/imports/`

Target production state:

- Supabase Postgres as the source of truth
- Supabase Auth for admin users only
- Row-level security on admin-managed content
- optional storage for downloadable resources or maps

## Key model groups

- Events: convention-level metadata
- Venues and rooms: wayfinding and session location data
- Tracks and segments: fast filtering for public views
- Sessions: the main public content model
- Announcements: time-sensitive updates and pinned notices
- Resources: external links and static support materials
- Admin users and audit logs: content governance

## UX architecture

Every critical user job should be reachable in two taps:

1. open app from QR code
2. land on today view
3. jump to schedule, updates, venue lookup, ASPAC, or saved sessions

Design cues intentionally favor:

- large typography
- high contrast
- short scan paths
- minimal cognitive load
- explicit disclaimer framing

## Offline strategy

The service worker in `public/sw.js` pre-caches key shell routes and uses runtime caching for navigations and previously visited session pages. This is enough for a first convention-floor pass without adding service-worker framework complexity.

## Admin strategy

Not implemented yet in UI. The intended admin slice is:

- Supabase-authenticated admin session
- CRUD for sessions, announcements, rooms, venues, tracks, and segments
- publish toggle
- CSV and JSON import preview
- audit log write on every content mutation

## Deployment shape

- GitHub for source control
- Vercel for preview and production deployments
- GitHub Actions for CI and CodeQL
- Sentry and PostHog after environment setup
