# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this project is

curlcode recommends hair care products and routines based on user-provided hair information (curl pattern, porosity, goals, current routine, etc.). The full product vision is specified in `docs/product/Hair_Care_Recommendation_Platform_SDS_Final_v1.1.docx` (an enterprise-scale spec: scraping pipeline, ingredient master DB, a 29-rule deterministic recommendation engine, admin tooling). **We are building a deliberately scoped-down MVP, not the full SDS** — see `docs/plans/` and the plan under `.claude/plans/` for the current milestone breakdown. When a task references the SDS, check which milestone we're on before assuming a feature is in scope.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Supabase for Postgres, Auth, and Row Level Security — real auth + persistence as of M2 (hair profile, routines). Product catalog/hairstyle/FR definitions are still mock data; the evaluation engine (M3) that scores against them is real, deterministic logic.
- Vitest + React Testing Library for unit/component tests, Playwright for end-to-end (runs against a real local Supabase)
- ESLint + Prettier
- GitHub Actions CI

## Repo structure

```
src/
  app/
    (auth)/login/         Real email/password signup & login (Supabase Auth)
    (app)/                 Persistent bottom-nav shell + the five primary screens
      today/ products/ routines/ recommendations/ profile/
  components/              Shared UI (BottomNav, Card, ...)
  features/
    auth/                   Server actions: signUp, signIn, signOut
    assessment/              HairProfile: data.ts (read), actions.ts (save), ProfileForm.tsx
    routines/                 Routine: data.ts (read active routine), actions.ts (activate template)
    evaluation/                scoring.ts: product/routine evaluation engine (SDS §14/§15/§17/§18), pure TS, no I/O
  lib/
    supabase/                 Browser/server Supabase clients + env helper
    mock-data/                 Seed catalog, hairstyle, routine template, FR subset, recommendations
  types/                       Domain types mirroring SDS §5 (Core Domain Model)
  proxy.ts                     Session refresh + auth redirect (Next.js 16's "proxy" convention, formerly middleware.ts — see "Next.js 16 notes" below)
supabase/
  migrations/                  hair_profiles, routines, routine_steps, routine_step_products + RLS
e2e/                           Playwright flows (signup → profile → activate routine)
docs/
  product/                    SDS + product decisions
  architecture/               System design, data model, security notes
  decisions/                   ADRs for non-obvious decisions
  plans/                       In-progress implementation plans
  wireframes/
```

New code lands inside `src/` (or `src/app/` for screens), organized by feature under `src/features/` rather than by type, except for genuinely cross-cutting pieces (`components/`, `lib/`, `types/`).

## Commands

Run before considering any change done:

```bash
npm run typecheck   # tsc --noEmit
npm run lint          # ESLint
npm run test           # Vitest
npm run format:check    # Prettier --check
```

The app now requires Supabase to boot at all — `npx supabase start` first (Docker required), copy `.env.example` to `.env.local` using the printed `API_URL`/`ANON_KEY`, then `npm run dev`. There is no way to visually verify a UI change without doing so — say so explicitly if you haven't. `npm run test:e2e` (Playwright) needs both Supabase running and `npx playwright install --with-deps chromium`; it doesn't run on macOS 12 or older (use `channel: 'chrome'` locally there — already configured in `playwright.config.ts`).

## Next.js 16 notes

- The `middleware.ts` file convention is deprecated in Next.js 16 in favor of `proxy.ts` (same behavior, function renamed from `middleware` to `proxy`). Don't recreate `middleware.ts`.
- Supabase mutation queries: when chaining `.insert().select().order()`, the `order()` column must be included in the `select()` list, or PostgREST fails with "column does not exist" (it orders the _returned projection_, not the full row). See `src/features/routines/actions.ts` for the pattern (select id + the sort key, then map by that key rather than assuming array order).
- Every Supabase table needs an explicit `grant` to `authenticated` (and/or `anon`) in the migration, in addition to RLS policies — RLS only restricts rows for a role that already has table-level privileges; without the grant you get `permission denied` even for correctly-scoped policies.

## Conventions

- TypeScript strict mode; no `any` without a comment explaining why it's unavoidable.
- Prefer Server Components; only add `'use client'` where interactivity (state, hooks like `usePathname`) actually requires it.
- Keep Supabase access behind `src/lib/supabase/` — screens and components should not call `supabase-js` directly.
- Every new Supabase table needs a Row Level Security policy in the same migration that creates it. There is no "add RLS later."
- Environment variables exposed to the client must be prefixed `NEXT_PUBLIC_`. The Supabase **service role** key must never appear in client code or any `NEXT_PUBLIC_*` variable — server-side use only.
- Mock data lives in `src/lib/mock-data/` and must stay clearly labeled as mock — don't let it quietly become the source of truth once Supabase is wired in.
- Write tests for recommendation/evaluation logic and form validation as those land; every screen should keep at least one render test. Pure layout changes can rely on typecheck + lint.
- Document non-obvious architecture or product decisions as an ADR in `docs/decisions/`, not as a code comment or a one-off markdown file elsewhere.

## SDS traceability

When implementing a feature that maps to the SDS, reference the section number in a comment or commit message (e.g. `SDS §14.2`) rather than re-deriving the rule from scratch — the scoring bands, FR structure, and explanation schema are already specified there. The FR01–FR29 table itself is not yet provided (SDS §32 lists it as an open input) — the mock FR subset in `src/lib/mock-data/fr-definitions.ts` is illustrative only and must not be treated as authoritative once real definitions arrive.

`src/features/evaluation/scoring.ts` implements §14/§15/§17/§18, but `overall_score` currently equals `fr_coverage_score` alone — the hair/scalp/style/routine compatibility components of §14.2's output schema aren't computed because the mock catalog has no per-product hair/scalp/style signals yet. Don't fake those scores with placeholder numbers; add them only once there's real (or intentionally-modeled mock) data to back them, and update the score-band tests when you do.

## Data sensitivity

User-submitted hair/scalp information is personal and can be health-adjacent. Treat it accordingly:

- Never log full user profile payloads (console logs, error trackers, analytics events).
- Any new query or route touching user data must go through RLS-scoped access, not the service role key.
- Flag in the PR description (or an ADR) any change that adds a new category of collected user data.
- Follow the SDS's safety language boundaries (§38) once any user-facing copy discusses hair/scalp condition — avoid definitive medical claims.

## What not to do

- Don't build ahead of the current milestone — no scraping pipeline, ingredient master DB, admin tooling, or wash-cycle scheduling until the plan says it's time (scheduling/execution history is explicitly deferred in the SDS itself, §47).
- Don't add a state management library (Redux, MobX, etc.) unless a real cross-screen state need appears — React Server Components + local state + Supabase queries should cover most of this app.
- Don't introduce a second backend/BaaS alongside Supabase.
- Don't scaffold speculative screens, tables, or features not covered by the current milestone or an explicit request.
