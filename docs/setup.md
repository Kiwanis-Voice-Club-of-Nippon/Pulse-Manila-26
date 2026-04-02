# Setup

## Local prerequisites

- Node.js 20+
- npm available locally
- pnpm preferred for team workflows, though npm works for local verification

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

## Verify

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Environment

Copy `.env.example` to `.env.local` and fill values when you connect real services.

## Planned external services

- Supabase
- Vercel
- Sentry
- PostHog
- Resend

## Notes

- The current scaffold runs entirely from seed data.
- `supabase/` contains the relational schema starter but no live client integration yet.
- `scripts/preview-import.mjs` lets you preview the shape of a CSV import before wiring admin flows.
