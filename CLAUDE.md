# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this project is

curlcode recommends hair care products and routines based on user-provided hair information (curl pattern, porosity, goals, current routine, etc.). The full product vision is specified in `docs/product/Hair_Care_Recommendation_Platform_SDS_Final_v1.1.docx` (an enterprise-scale spec: scraping pipeline, ingredient master DB, a 29-rule deterministic recommendation engine, admin tooling). **We are building a deliberately scoped-down MVP, not the full SDS** — see `docs/plans/` and the plan under `.claude/plans/` for the current milestone breakdown. When a task references the SDS, check which milestone we're on before assuming a feature is in scope.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Supabase for Postgres, Auth, and Row Level Security — not wired into the UI until M2; the current milestone runs entirely on mock data
- Vitest + React Testing Library for unit/component tests, Playwright for end-to-end
- ESLint + Prettier
- GitHub Actions CI

## Repo structure

```
src/
  app/
    (auth)/login/        Login screen (stub until M2 wires real auth)
    (app)/                Persistent bottom-nav shell + the five primary screens
      today/ products/ routines/ recommendations/ profile/
  components/             Shared UI (BottomNav, Card, ...)
  features/                Feature-scoped domain logic — add as milestones need it
  lib/
    supabase/              Browser/server Supabase clients (unused until M2)
    mock-data/              Seed catalog, hairstyle, routine template, FR subset, recommendations
  types/                    Domain types mirroring SDS §5 (Core Domain Model)
supabase/
  migrations/               SQL migrations (added from M2)
docs/
  product/                 SDS + product decisions
  architecture/            System design, data model, security notes
  decisions/                ADRs for non-obvious decisions
  plans/                    In-progress implementation plans
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

Use `npm run dev` to run the app locally; there is no way to visually verify a UI change without doing so — say so explicitly if you haven't. `npm run test:e2e` (Playwright) needs `npx playwright install --with-deps chromium` first, and doesn't run on macOS 12 or older.

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
