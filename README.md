# curlcode

A responsive web app that recommends hair care products and routines based on user-provided hair information (curl pattern, porosity, goals, current routine, etc.). Recommendations are explainable and deterministic — see the SDS for the full rationale.

## Current status

The MVP is being built as a scoped-down slice of a much larger spec (see `docs/product/`). It targets one seeded hairstyle, a small mock product catalog, and a subset of the recommendation rule set — not the full ingestion/enrichment pipeline described in the SDS. Milestones (see `docs/plans/` and `.claude/plans/` for the full breakdown):

- **M0/M1 (done):** static walkthrough of all five primary screens (Today, Products, Routines, Recommendations, Profile) against mock data.
- **M2 (done):** real Supabase Auth (email/password) and per-user persistence for the hair profile and an activated routine.
- **M3 (current):** the deterministic evaluation engine (SDS §14/§15/§17) scores each assigned product against its step's required functional requirements and renders a fit rating + explanation (SDS §18) on the Routines screen. The product catalog, hairstyle, and FR definitions are still mock data — see "Mock vs. real data" below.
- **M4+:** recommendation accept/reject/override flows.

The app now requires Supabase to run at all (every route goes through `src/proxy.ts`, which needs a Supabase session) — see Getting started.

## Tech stack

- **App:** Next.js (App Router) + TypeScript + Tailwind CSS
- **Backend:** [Supabase](https://supabase.com) (Postgres, Auth, Row Level Security)
- **Testing:** Vitest + React Testing Library (unit/component), Playwright (end-to-end, runs against a real local Supabase instance)
- **Lint/format:** ESLint + Prettier
- **CI:** GitHub Actions

## Prerequisites

- Node.js (LTS)
- npm
- [Supabase CLI](https://supabase.com/docs/guides/cli) + Docker, for local backend development

## Getting started

```bash
git clone https://github.com/curlcodeapp/curlcode.git
cd curlcode
npm install
npx supabase start   # starts local Postgres/Auth in Docker, applies supabase/migrations
```

`supabase start` prints a local `API_URL` and `ANON_KEY`. Copy `.env.example` to `.env.local` and fill those in, then:

```bash
npm run dev
```

Open http://localhost:3000 — it redirects to `/login`. Sign up with any email/password (local dev auto-confirms, no real email is sent).

## Environment variables

Copy `.env.example` to `.env.local`:

| Variable                        | Description                                                                                    |
| ------------------------------- | ---------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Your Supabase project URL (`npx supabase status` for local)                                    |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key (safe for the client; access is enforced via Row Level Security) |

Never commit `.env.local` or put the Supabase **service role** key in any `NEXT_PUBLIC_*` variable — it must only be used server-side.

## Mock vs. real data

- **Real (Supabase-backed):** auth, the user's hair profile (`hair_profiles`), and an activated routine with its steps (`routines`, `routine_steps`, `routine_step_products`).
- **Real (computed, not mock):** the evaluation engine (`src/features/evaluation/`) — it deterministically scores each assigned product against its step's required FRs and produces a real rating + explanation. What's "mock" is its _inputs_ (see below), not the scoring logic itself.
- **Still mock (`src/lib/mock-data/`):** the product catalog (including `frCoverage` scores), the one seeded hairstyle, the FR (functional requirement) subset, and the recommendation cards on the Recommendations screen. Activating a routine copies the mock routine _template_ into real per-user rows — the template itself stays mock. The FR01–FR29 table itself doesn't exist yet (SDS §32 open input) — the 5 FRs in `fr-definitions.ts` are illustrative placeholders.

## Project structure

```
src/
  app/
    (auth)/login/         Real email/password signup & login (Supabase Auth)
    (app)/                 Persistent bottom-nav shell + the five primary screens
      today/ products/ routines/ recommendations/ profile/
  components/              Shared UI (BottomNav, Card, ...)
  features/
    auth/                  Server actions: signUp, signIn, signOut
    assessment/             HairProfile: data.ts (read), actions.ts (save), ProfileForm.tsx
    routines/                Routine: data.ts (read active routine), actions.ts (activate template)
    evaluation/              scoring.ts: product/routine evaluation engine (SDS §14/§15/§17/§18)
  lib/
    supabase/                Browser/server Supabase clients + env helper
    mock-data/                Seed catalog, hairstyle, routine template, FR subset, recommendations
  types/                      Domain types mirroring the SDS's core domain model
  proxy.ts                    Session refresh + auth redirect (Next.js 16's proxy, formerly "middleware")
supabase/
  migrations/                 hair_profiles, routines, routine_steps, routine_step_products + RLS
e2e/                          Playwright end-to-end flows (signup → profile → activate routine)
docs/                         Product spec, architecture, decision records, wireframes
```

## Scripts

```bash
npm run dev           # start the Next.js dev server
npm run build          # production build
npm run lint            # ESLint
npm run typecheck       # tsc --noEmit
npm run test              # Vitest (unit/component)
npm run test:e2e          # Playwright (end-to-end) — needs `npx supabase start` running first
npm run format             # Prettier --write
npm run format:check        # Prettier --check
```

## Testing

Run `npm run typecheck`, `npm run lint`, and `npm run test` before opening a PR — all run in CI, along with `npm run test:e2e` against a fresh local Supabase instance started in the CI job itself. Every screen has at least one render test (Vitest mocks the Supabase-backed data calls). The Playwright suite exercises the real signup → complete profile → activate routine flow against a real database — it's the source of truth for whether auth/persistence actually works end to end.

## Contributing

- Branch from `main`, open a PR, keep PRs scoped to one change.
- CI (typecheck, lint, format, test, e2e) must pass before merge.
- Document non-obvious architecture or product decisions in `docs/decisions/` as an ADR.

## Documentation

See `docs/` for the product spec (`docs/product/`), architecture notes (`docs/architecture/`), decision records (`docs/decisions/`), wireframes (`docs/wireframes/`), and in-progress plans (`docs/plans/`).
