# ADR-0003 — Use a hybrid AI interpretation layer for the 2026 CurlCode beta

**Status:** Accepted as MVP direction (product owner decision, 2026-11-19)  
**Supersedes for product enrichment:** deterministic keyword-based FR assignment as the intended long-term approach. Retains ADR-0001 as description of the existing deployed demo engine.

## Decision

Keep Next.js, Supabase/Postgres, authentication, persisted profiles/routines, existing UI and deterministic safety/validation components. Add a **server-side AI-assisted product intelligence service**, with persisted, versioned assessments. At recommendation time retrieve a constrained candidate set from the actual catalog; let AI consider the user's stated hair/style goals and product usage contexts; validate returned product identifiers and safety constraints, and persist decisions/explanations. Never let a language model invent catalog products or rewrite the canonical FR definitions.

### Product intelligence: asynchronous/offline ingestion

- Use brand scraper data with five canonical fields: name, URL, description, directions, ordered INCI.
- Gate 1 validates provenance, completeness and contamination; Gate 2 resolves product role/type/subtype/application context; one human exception queue. Keep source and normalized text.
- Call an LLM for structured judgments: role, use zone, rinse-off/leave-on/pre-wash, activation/coverage, non-FR capabilities, accepted/conditional/rejected FRs with source and uncertainty.
- Validate JSON schema, allowed FR IDs, source-supported quotes/claims, critical exclusions and confidence. Fail closed to manual review where important evidence is missing. Treat ingredients as plausibility evidence, never proof of finished-formula efficacy.
- Persist one stable AI assessment per `source_hash + prompt_version + model_version + fr_version`. Re-evaluate only when inputs/rules change; retain prior versions and overrides.
- Process catalog with server-side API key; never from the browser. Avoid storing private user profiles in product-classification prompts.

### Personalization and routines

- Read verified catalog product records from Supabase, filter by routine-stage capability and clear constraints first (e.g. actual shampoo can fill cleanse without FR25).
- Rank a short candidate list based on profile, current hairstyle and goals using contextual AI interpretation with structured rationale; validate product IDs and required stages. Keep the existing deterministic scoring as a fallback for explainability, not as scientific ground truth.
- Distinguish **length retention/breakage** from **shedding/thinning/hair loss** in user inputs. FR20 (scalp circulation) must not serve as a generic 'growth support' marketing category.
- User-visible explanations must distinguish manufacturer claims from formulation inference and avoid guaranteed performance or medical diagnoses.

## Why not LLM-only at every page view?

Unbounded repeated calls add cost, latency, inconsistency and risk of fabricated efficacy. Catalog assessments are cached/versioned, while contextual matching is dynamic. Conventional code owns authorization, data validation, saved state, inventory filtering and non-negotiable safeguards.

## Evidence and evaluation

The experimental TGIN v0.4 engine assigned 110 FRs across 38 products; this number is not a quality score. In a *curated, reviewer-supported* benchmark of 16 products / 50 inclusion/exclusion checks assembled November 19, deterministic v0.4 passes **38/50**; this is not a representative accuracy estimate or independent gold standard. Key missed/incorrect checks: Dream Coat FR13, Shine Spray FR24, root cover-up FR10, and dry-detangler category. Compare a real LLM API run against this exact benchmark before selecting a model and replacing existing recommendation flows. Include negative controls, cross-brand split, repeatability and cost/latency records; don't cherry-pick only visible examples.

**Current blocker:** An independent model API comparison has not been executed; ChatGPT conversation reasoning alone is not an external API call. The beta architecture decision does **not** imply that any model has passed the benchmark.

## MVP shipping boundary (December 31, 2026)

1. One saved hair profile and a simple growth-vs-length-retention clarification.
2. Seed a **real, validated** TGIN/Color Wow catalog subset in Supabase (do not commit large raw scraped datasets to the app repo).
3. AI product assessments, sourced and persisted; one exception review queue; FR/capability/usage-context metadata.
4. User receives real catalog product recommendations with short explanations and a practical, saveable routine, using existing UI and persistence.
5. Test the complete path in a deployed private beta.

**Defer:** social/similar users, full ingredient master database, scrape-every-brand goal, unverified hair-growth claims, advanced calendars, elaborate scoring and admin dashboards.

## Integration notes

- Current app: `src/features/evaluation/scoring.ts`, `src/features/recommendations/derive.ts`, `src/lib/mock-data/products.ts`, `src/config/fr-definitions.ts`.
- The repository README currently describes a deterministic-only product vision; update it when AI services and real catalog integration are actually implemented, not before.
- OpenAI Responses API supports schema-constrained JSON responses; **schema validity does not guarantee scientific truth**.
- Store model keys as server-side secrets, avoid logging user hair/scalp payloads, and preserve Supabase Row Level Security.

## Follow-up

Product evaluation benchmark is kept as a small reviewer-assertion fixture and an offline runnable benchmark runner. API provider/model are implementation choices to verify against accuracy, latency, and price; start with a cost-conscious model and escalate only if benchmarks require it.
