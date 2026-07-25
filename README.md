# curlcode

A responsive web app that recommends hair care products and routines based on user-provided hair information (curl pattern, porosity, goals, current routine, etc.). Recommendations are explainable and deterministic — see the SDS for the full rationale.

## Current status

The MVP is being built as a scoped-down slice of a much larger spec (see `docs/product/`). It targets one seeded hairstyle, a small mock product catalog, and a subset of the recommendation rule set — not the full ingestion/enrichment pipeline described in the SDS. Milestones (see `docs/plans/` and `.claude/plans/` for the full breakdown):

- **M0/M1 (current):** static walkthrough of all five primary screens (Today, Products, Routines, Recommendations, Profile) against mock data — no auth, no backend required.
- **M2+:** Supabase-backed auth and persistence, the real deterministic evaluation engine, and recommendation overrides.

## Tech stack

- **App:** Next.js (App Router) + TypeScript + Tailwind CSS
- **Backend:** [Supabase](https://supabase.com) (Postgres, Auth, Row Level Security) — wired in from M2 onward
- **Testing:** Vitest + React Testing Library (unit/component), Playwright (end-to-end)
- **Lint/format:** ESLint + Prettier
- **CI:** GitHub Actions

## Prerequisites

- Node.js (LTS)
- npm
- [Supabase CLI](https://supabase.com/docs/guides/cli) for local backend development (not required until M2)

## Getting started

```bash
git clone https://github.com/curlcodeapp/curlcode.git
cd curlcode
npm install
npm run dev
```

Open http://localhost:3000 — it redirects to `/today`. No `.env` is required yet; the current milestone renders entirely from mock data in `src/lib/mock-data/`.

## Environment variables

Not required until Supabase is wired in (M2). When needed, copy `.env.example` to `.env.local` and fill in:

| Variable                        | Description                                                                                    |
| ------------------------------- | ---------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Your Supabase project URL                                                                      |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key (safe for the client; access is enforced via Row Level Security) |

Never commit `.env.local` or put the Supabase **service role** key in any `NEXT_PUBLIC_*` variable — it must only be used server-side.

## Project structure

```
src/
  app/
    (auth)/login/        Login screen (stub until M2 wires real auth)
    (app)/                Persistent bottom-nav shell + the five primary screens
      today/
      products/
      routines/
      recommendations/
      profile/
  components/             Shared UI (BottomNav, Card, ...)
  features/                Feature-scoped domain logic (added as milestones need it)
  lib/
    supabase/              Browser/server Supabase clients (unused until M2)
    mock-data/              Seed catalog, hairstyle, routine template, FR subset, recommendations
  types/                    Domain types mirroring the SDS's core domain model
supabase/
  migrations/               SQL migrations (added from M2)
docs/                       Product spec, architecture, decision records, wireframes
```

## Scripts

```bash
npm run dev           # start the Next.js dev server
npm run build          # production build
npm run lint            # ESLint
npm run typecheck       # tsc --noEmit
npm run test              # Vitest (unit/component)
npm run test:e2e          # Playwright (end-to-end)
npm run format             # Prettier --write
npm run format:check        # Prettier --check
```

## Testing

Run `npm run typecheck`, `npm run lint`, and `npm run test` before opening a PR — all three run in CI. Every screen has at least one render test. Playwright's e2e suite grows as real user flows (create routine, evaluate, accept recommendation) come online in M3+.

## Contributing

- Branch from `main`, open a PR, keep PRs scoped to one change.
- CI (typecheck, lint, format, test, e2e) must pass before merge.
- Document non-obvious architecture or product decisions in `docs/decisions/` as an ADR.

## Documentation

See `docs/` for the product spec (`docs/product/`), architecture notes (`docs/architecture/`), decision records (`docs/decisions/`), wireframes (`docs/wireframes/`), and in-progress plans (`docs/plans/`).
