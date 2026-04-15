# Contributing to Pulse

Pulse is the offline-first PWA companion app for ASPAC Manila 2026.

## Setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```bash

## Standards

- TypeScript strict — no implicit any
- Mobile-first, offline-capable by default
- Run before pushing: `pnpm lint && pnpm typecheck && pnpm build`
- Supabase schema changes require a migration file

## Branching

`feat/<scope>/<short-desc>`, `fix/<scope>/<short-desc>`

## Commit format

Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`

## PR checklist

- [ ] pnpm lint passes
- [ ] pnpm typecheck passes
- [ ] pnpm build succeeds
- [ ] Offline behavior tested
- [ ] Mobile viewport tested