# CurlCode — Week 1 Sprint & Year-End Private Beta Cut Line

**Started:** 2026-11-19  
**Launch target:** 2026-12-31 private beta; not an unrestricted clinical/recommendation product release.  
**Architecture decision:** [ADR-0003](../decisions/0003-hybrid-ai-mvp.md).

## Verified repo state

- Implemented: Next.js/Tailwind screens, Supabase Auth, profile persistence, routine persistence, deterministic FR evaluation, override persistence, tests/CI.
- Not yet implemented in the actual app: real catalog in Supabase; LLM product interpretation; AI-driven personalized matching and real-product saved routine.
- Legacy `src/lib/mock-data/products.ts` is a **mock catalog**, even though FR definitions are real; do not silently treat it as production data.
- README/M5 milestone tracking is more reliable for code state than Linear issue status, which is partly stale.

## Today: Week 1 sprint checklist

- [x] Inspect actual app architecture, current integration points and product catalog state.
- [x] Decide product model: AI-assisted cached catalog enrichment + AI-assisted contextual matching, with validation and Supabase persistence.
- [x] Define beta scope and non-goals; preserve FR definitions and distinguish routine capability from FR.
- [x] Build portable benchmark fixture: 16 reviewer-supported products, 50 positive/negative FR assertions.
- [x] Score legacy v0.4: 38/50 checks passed; 12 failed; NOT a global quality metric.
- [x] Prepare runnable server-side OpenAI Responses API benchmark runner and strict JSON output contract.
- [ ] Run actual API model on the same 16 records, repeat selected tricky cases, compare accuracy/cost/latency. **BLOCKED** until an API key and outbound network are available in the execution environment. Never paste keys into issue/comment/chat or commit.
- [ ] Choose specific model snapshot from actual benchmark; a model suggestion without a measured run remains provisional.

## Recommended implementation cut line

**Week 2:** seed a small real catalog, build AI enrichment job with source provenance + strict schema + review flags, create migrations with RLS, verify import.  
**Week 3:** connect profile → candidate retrieval → AI comparison of catalog IDs → explanation → recommendations. Maintain safe fallback.  
**Week 4:** integrate recommended products into existing routine activation/save flow; no calendar/social work.  
**Week 5:** run end-to-end tests with representative users and fix blockers.  
**Week 6:** deploy and monitor private beta.

## Acceptance tests

- Dream Coat: humidity resistance FR13 recognized; FR01 not inferred from glycerin alone.
- Wax stick: localized hairline use; no whole-fiber FR02.
- Shine spray: FR24; avoid unrelated slip/detangling and unverified protection mechanisms.
- Dry shampoo, pre-shampoo detangler, root cover-up: correct roles without forced hair-care FRs.
- Ordinary shampoo: allowed cleansing routine step even with no FR25.
- Hair-loss concern: distinguish from length retention; avoid presenting scalp oils as regrowth treatments.
- Real catalog IDs only; output with missing/invalid provenance is not auto-published.
- Existing auth/profile/routine flows continue passing.

## Next developer PRs

1. `feat/catalog-persistence`: products + assessments schema, admin-only ingestion, RLS, seed curated products, use real records in product list.
2. `feat/ai-product-enrichment`: server-only API adapter, strict output schema, prompt/model versioning, review queue, tests and benchmark runner.
3. `feat/ai-recommendations`: candidate filtering, server-side ranking, input constraints, explainability, saved routine integration and end-to-end tests.

No API key is present in this repository or chat. Do not commit vendor output containing source copyrighted descriptions unless cleared; keep bench assertions and scripts in GitHub and raw catalog data in local/protected storage.
